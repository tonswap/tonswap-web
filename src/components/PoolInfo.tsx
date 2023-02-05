import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material'
import { fromDecimals } from 'utils'
import { ton } from 'services/api/addresses'
import { client } from 'services/api'
import useUsdValue from 'hooks/useUsdValue'
import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { useTranslation } from 'react-i18next'
import { usePoolInfo } from 'store/pool-info/hooks'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useWalletStore } from 'store/wallet/hooks'
import { styled } from '@mui/styles'

const StyledAvatar = styled(Avatar)({
  width: 22,
  height: 22,
})

const PoolInfoLine = styled(Box)({
  display: 'flex',
  alignItems: 'center',
})

const PoolInfoLineWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 8,
})

const PoolInfoCenteringWrapper = styled(PoolInfoLineWrapper)({
  justifyContent: 'center',
})

const PoolInfoText = styled(Typography)({
  color: '#000',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '-0.15px',
  fontFamily: 'Roboto',
})

const PoolInfoPlug = styled(PoolInfoText)({
  textAlign: 'center',
  color: '#B9B9B9',
})

const PoolInfoTitle = styled(PoolInfoText)({
  fontWeight: 700,
  textAlign: 'center',
})

export const calculateDecimals = (val: string) => {
  const n = parseFloat(val)
  if (n > 1) {
    return n.toFixed(2)
  } else if (n < 0.01) {
    return n.toFixed(6)
  } else {
    return n.toFixed(4)
  }
}

export const PoolInfo = () => {
  const {
    fetchPoolData,
    poolInfo,
    resetPoolInfo,
    calculateTotalLPSupply,
    userLPTokenTitle,
    userLPToken,
    tonPoolBalance,
    price,
    tokenPoolBalance,
    calculateSelectedTokenAmount,
    calculateUSDValue,
    calculateUserShareOfLiquidityPool,
    calculateTonAmountInPool,
  } = usePoolInfo()
  const { wallet } = useWalletStore()
  const { usd } = useUsdValue(ton.name, fromDecimals(poolInfo.tonReserves?.muln(2) || 0, ton.decimals))
  const { selectedToken } = useTokenOperationsStore()
  const { t } = useTranslation()
  const { txSuccess } = useTokenOperationsStore()
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    fetchPoolData()
    return () => {
      resetPoolInfo()
    }
  }, [selectedToken, client, wallet, txSuccess])

  return (
    <Box sx={{ maxWidth: 380, margin: 'auto' }}>
      <Accordion sx={{
        background: 'linear-gradient(180deg, #F3F3F3 0%, #F9F9F9 100%)',
        boxShadow: 'none',
        borderRadius: '12px !important',
        '.MuiAccordionSummary-content': {
          marginBottom: '0',
        },
      }}>
        <AccordionSummary onClick={() => setExpanded(prevState => !prevState)} sx={{
          '.Mui-expanded': {
            minHeight: '44px !important',
          },
        }}>
          <PoolInfoCenteringWrapper>
            <PoolInfoTitle>{t('pool-info')}</PoolInfoTitle>
            {expanded
              ? <ExpandLessIcon sx={{ color: 'black' }} />
              : <ExpandMoreIcon sx={{ color: 'black' }} />
            }
          </PoolInfoCenteringWrapper>
        </AccordionSummary>
        <AccordionDetails>
          {poolInfo && <Box>
              <PoolInfoLineWrapper>
                  <PoolInfoText>{t('liquidity')} (TVL)</PoolInfoText>
                  <PoolInfoText>${calculateDecimals(usd)}</PoolInfoText>
              </PoolInfoLineWrapper>
              <PoolInfoLineWrapper>
                  <PoolInfoText>Total {userLPTokenTitle}</PoolInfoText>
                  <PoolInfoText>{poolInfo?.totalSupply && calculateTotalLPSupply(poolInfo.totalSupply)}</PoolInfoText>
              </PoolInfoLineWrapper>
              <PoolInfoLineWrapper>
                  <PoolInfoLine>
                    {ton?.image && <StyledAvatar src={ton.image} alt="token" sx={{ marginRight: 1 }} />}
                      <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>TON</PoolInfoText>
                  </PoolInfoLine>
                  <PoolInfoText>{calculateTonAmountInPool()}</PoolInfoText>
              </PoolInfoLineWrapper>
              <PoolInfoLineWrapper>
                  <PoolInfoLine>
                    {selectedToken?.image &&
                        <StyledAvatar src={selectedToken.image} alt="token" sx={{ marginRight: 1 }} />}
                      <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>
                        {selectedToken?.displayName || 'TOKEN'}
                      </PoolInfoText>
                  </PoolInfoLine>
                  <PoolInfoText>{calculateSelectedTokenAmount()}</PoolInfoText>
              </PoolInfoLineWrapper>
              <Box sx={{ width: '100%', height: 1, borderBottom: '1px solid #E4E4E4' }} my={2} />
              <Box>
                  <PoolInfoTitle mb={1}>Your current LP position</PoolInfoTitle>
                {
                  !wallet
                    ? <PoolInfoPlug>No liquidity provided yet</PoolInfoPlug>
                    : <Box>
                      <PoolInfoLineWrapper>
                        <PoolInfoText>{userLPTokenTitle}</PoolInfoText>
                        <PoolInfoText>{userLPToken}</PoolInfoText>
                      </PoolInfoLineWrapper>
                      <PoolInfoLineWrapper>
                        <PoolInfoText>Share of liquidity pool</PoolInfoText>
                        <PoolInfoText>{calculateUserShareOfLiquidityPool()}%</PoolInfoText>
                      </PoolInfoLineWrapper>
                      <PoolInfoLineWrapper>
                        <PoolInfoLine>
                          {ton?.image && <StyledAvatar src={ton.image} alt="token" sx={{ marginRight: 1 }} />}
                          <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>TON</PoolInfoText>
                        </PoolInfoLine>
                        <PoolInfoText>{tonPoolBalance}</PoolInfoText>
                      </PoolInfoLineWrapper>
                      <PoolInfoLineWrapper>
                        <PoolInfoLine>
                          {selectedToken?.image &&
                              <StyledAvatar src={selectedToken.image} alt="token" sx={{ marginRight: 1 }} />}
                          <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>
                            {selectedToken?.displayName || 'TOKEN'}
                          </PoolInfoText>
                        </PoolInfoLine>
                        <PoolInfoText>{tokenPoolBalance}</PoolInfoText>
                      </PoolInfoLineWrapper>
                      <PoolInfoLineWrapper>
                        <PoolInfoText>USD value</PoolInfoText>
                        <PoolInfoText>
                          ${calculateUSDValue()}
                        </PoolInfoText>
                      </PoolInfoLineWrapper>
                    </Box>
                }
              </Box>
          </Box>}
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}