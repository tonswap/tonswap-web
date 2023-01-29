import React, { useCallback, useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material'
import { fromDecimals } from 'utils'
import { ton } from 'services/api/addresses'
import { client, fetchPrice, getLPTokenBalance, getTokensOfLPBalances } from 'services/api'
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
});

const PoolInfoLineWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  marginBottom: 5,
})

const PoolInfoCenteringWrapper = styled(PoolInfoLineWrapper)({
  justifyContent: 'center',
})

const PoolInfoText = styled(Typography)({
  color: '#000',
  fontSize: '14px',
  fontWeight: 400,
  letterSpacing: '-0.15px',
  fontFamily: "Roboto",
})

const PoolInfoPlug = styled(PoolInfoText)({
  textAlign: 'center',
  color: '#B9B9B9'
})

const PoolInfoTitle = styled(PoolInfoText)({
  fontWeight: 700,
  textAlign: 'center',
})

const calculateDecimals = (val: string) => {
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
  const { fetchPoolData, poolInfo, resetPoolInfo } = usePoolInfo()
  const { wallet } = useWalletStore()
  const { usd } = useUsdValue(ton.name, fromDecimals(poolInfo.tonReserves?.muln(2) || 0, ton.decimals))
  const { selectedToken } = useTokenOperationsStore()
  const { totalBalances } = useTokenOperationsStore();
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)
  const [price, setPrice] = useState<number | null>(null)
  const [userLPToken, setUserLPToken] = useState<null | string>(null)
  const [tonPoolBalance, setTonPoolBalance] = useState<null | string>(null)
  const [tokenPoolBalance, setTokenPoolBalance] = useState<null | string>(null)

  const getUserLPToken = async () => {
    if (!selectedToken?.tokenMinter) return
    const lPBalance = await getLPTokenBalance(selectedToken?.tokenMinter)
    setUserLPToken(fromDecimals(lPBalance?.balance, 9))
  }

  const calculateUserShare = async () => {
    if (!selectedToken?.tokenMinter || !selectedToken?.ammMinter) return
    const data = await getTokensOfLPBalances(selectedToken?.tokenMinter)
    console.log(data)
    setTonPoolBalance(calculateDecimals(data[0]))
    setTokenPoolBalance(calculateDecimals(data[1]))
  }

  useEffect(() => {
    const fetchTonPrice = async () => {
      const tonPrice = await fetchPrice();
      setPrice(tonPrice)
    }
    fetchTonPrice()
  }, [])

  useEffect(() => {
    selectedToken?.tokenMinter && !!client && getUserLPToken()
    selectedToken?.tokenMinter && !!client && calculateUserShare()
  }, [selectedToken])

  useEffect(() => {
    fetchPoolData()
    return () => {
      resetPoolInfo()
    }
  }, [selectedToken, client])

  return (
    <Box sx={{ maxWidth: 380, margin: 'auto' }}>
      <Accordion sx={{
        background: 'linear-gradient(180deg, #F3F3F3 0%, #F9F9F9 100%)',
        '.MuiAccordionSummary-content': {
          marginBottom: '0',
        }
      }}>
        <AccordionSummary onClick={() => setExpanded(prevState => !prevState)}>
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
              <PoolInfoText sx={{display: 'flex', alignItems: 'center'}}>
                {ton?.image && <StyledAvatar src={ton.image} alt="token" sx={{marginRight: 1}} />}
                  TON
              </PoolInfoText>
              <PoolInfoText>{poolInfo?.tonReserves && calculateDecimals(fromDecimals(poolInfo.tonReserves, ton.decimals))}</PoolInfoText>
            </PoolInfoLineWrapper>
            <PoolInfoLineWrapper>
              <PoolInfoText sx={{display: 'flex', alignItems: 'center'}}>
                {selectedToken?.image && <StyledAvatar src={selectedToken.image} alt="token" sx={{marginRight: 1}} />}
                {selectedToken?.displayName || 'TOKEN'}
              </PoolInfoText>
              <PoolInfoText>{selectedToken && poolInfo?.tokenReserves && calculateDecimals(fromDecimals(poolInfo.tokenReserves, selectedToken.decimals))}</PoolInfoText>
            </PoolInfoLineWrapper>
              <Box sx={{ width: '100%', height: 1, borderBottom: '1px solid #E4E4E4'}} my={2} />
            <Box>
              <PoolInfoTitle mb={1.5}>Your current LP position</PoolInfoTitle>
              {
                !wallet
                  ? <PoolInfoPlug>No liquidity provided yet</PoolInfoPlug>
                  : <Box>
                    <PoolInfoLineWrapper>
                      <PoolInfoText>LP Token</PoolInfoText>
                      <PoolInfoText>{userLPToken}</PoolInfoText>
                    </PoolInfoLineWrapper>
                    <PoolInfoLineWrapper>
                      <PoolInfoText>Share of pool</PoolInfoText>
                      <PoolInfoText>{`${calculateUserShare()}%`}</PoolInfoText>
                    </PoolInfoLineWrapper>
                    <PoolInfoLineWrapper>
                      <PoolInfoText sx={{display: 'flex', alignItems: 'center'}}>
                        {ton?.image && <StyledAvatar src={ton.image} alt="token" sx={{marginRight: 1}} />}
                        TON
                      </PoolInfoText>
                      <PoolInfoText>{tonPoolBalance}</PoolInfoText>
                    </PoolInfoLineWrapper>
                    <PoolInfoLineWrapper>
                      <PoolInfoText sx={{display: 'flex', alignItems: 'center'}}>
                        {selectedToken?.image && <StyledAvatar src={selectedToken.image} alt="token" sx={{marginRight: 1}} />}
                        {selectedToken?.displayName || 'TOKEN'}
                      </PoolInfoText>
                      <PoolInfoText>{tokenPoolBalance}</PoolInfoText>
                    </PoolInfoLineWrapper>
                    <PoolInfoLineWrapper>
                      <PoolInfoText>USD value</PoolInfoText>
                      <PoolInfoText>
                        {poolInfo?.tonReserves && price && `$${parseFloat(usd) * 2}`}
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