import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Typography } from '@mui/material'
import { ton } from 'services/api/addresses'
import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { useTranslation } from 'react-i18next'
import { usePoolInfo } from 'store/pool-info/hooks'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import { useWalletStore } from 'store/wallet/hooks'
import { styled } from '@mui/styles'
import CircularProgress from '@mui/material/CircularProgress'

const ComponentWrapper = styled(Box)({
  maxWidth: 380,
  margin: 'auto',
})

const PoolInfoAccordion = styled(Accordion)({
  background: 'linear-gradient(180deg, #F3F3F3 0%, #F9F9F9 100%)',
  boxShadow: 'none',
  borderRadius: '12px !important',
  '.MuiAccordionSummary-content': {
    marginTop: 0,
    marginBottom: '0',
  },
  '.MuiAccordionSummary-root': {
    height: '44px', minHeight: '0 !important',
  },
})

const PoolInfoAccordionSummary = styled(AccordionSummary)({
  '.Mui-expanded': {
    minHeight: '44px !important',
  },
})

const CenteringBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const StyledAvatar = styled(Avatar)({
  width: 22,
  height: 22,
  marginRight: 8,
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
  marginBottom: 0,
})

const PoolInfoText = styled(Typography)({
  color: '#000',
  fontSize: '12px',
  fontWeight: 400,
  letterSpacing: '-0.15px',
  fontFamily: 'Roboto',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  maxWidth: 150,
})

const PoolInfoPlug = styled(PoolInfoText)({
  textAlign: 'center',
  color: '#B9B9B9',
})

const PoolInfoTitle = styled(PoolInfoText)({
  fontWeight: 700,
  textAlign: 'center',
})

export const PoolInfo = () => {
  const {
    fetchPoolData,
    poolInfo,
    resetPoolInfo,
    fetchExtendedData,
  } = usePoolInfo()
  const { wallet } = useWalletStore()
  const { selectedToken } = useTokenOperationsStore()
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    !!wallet && expanded && fetchExtendedData()
  }, [expanded, wallet])

  useEffect(() => {
    fetchPoolData()
    return () => {
      resetPoolInfo()
    }
  }, [selectedToken])

  return (
    <ComponentWrapper>
      <PoolInfoAccordion>
        <PoolInfoAccordionSummary onClick={() => setExpanded(prevState => !prevState)}>
          <PoolInfoCenteringWrapper>
            <PoolInfoTitle>{t('pool-info')}</PoolInfoTitle>
            {expanded
              ? <ExpandLessIcon sx={{ color: 'black' }} />
              : <ExpandMoreIcon sx={{ color: 'black' }} />
            }
          </PoolInfoCenteringWrapper>
        </PoolInfoAccordionSummary>
        <AccordionDetails>
          {poolInfo.isLoading
            ? <CenteringBox>
              <CircularProgress size={20} />
            </CenteringBox>
            : <Box>
              <PoolInfoLineWrapper>
                <PoolInfoText>{t('liquidity')} (TVL)</PoolInfoText>
                <PoolInfoText>${poolInfo.extendedInfo.liquidity}</PoolInfoText>
              </PoolInfoLineWrapper>
              <PoolInfoLineWrapper>
                <PoolInfoText>Total {poolInfo.extendedInfo.lpTokenName}</PoolInfoText>
                <PoolInfoText>{poolInfo.extendedInfo.totalLPTokenAmount}</PoolInfoText>
              </PoolInfoLineWrapper>
              <PoolInfoLineWrapper>
                <PoolInfoLine>
                  {ton?.image && <StyledAvatar src={ton.image} alt="token" />}
                  <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>TON</PoolInfoText>
                </PoolInfoLine>
                <PoolInfoText>{poolInfo.extendedInfo.poolTonAmount}</PoolInfoText>
              </PoolInfoLineWrapper>
              <PoolInfoLineWrapper>
                <PoolInfoLine>
                  {selectedToken?.image &&
                      <StyledAvatar src={selectedToken.image} alt="token" />}
                  <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>
                    {selectedToken?.displayName || 'TOKEN'}
                  </PoolInfoText>
                </PoolInfoLine>
                <PoolInfoText>{poolInfo.extendedInfo.poolTokenAmount}</PoolInfoText>
              </PoolInfoLineWrapper>

              {wallet && <> <Box sx={{ width: '100%', height: 1, borderBottom: '1px solid #E4E4E4' }} my={2} />
                  <Box>
                      <CenteringBox><PoolInfoTitle mb={1}>Your current LP position</PoolInfoTitle></CenteringBox>
                    {
                      !parseFloat(poolInfo.extendedInfo.userShareOfLiquidityPool!)
                        ? <CenteringBox><PoolInfoPlug>No Liquidity</PoolInfoPlug></CenteringBox>
                        : <Box>
                          <PoolInfoLineWrapper>
                            <PoolInfoText>{poolInfo.extendedInfo.lpTokenName}</PoolInfoText>
                            <PoolInfoText>{poolInfo.extendedInfo.userLPTokenAmount}</PoolInfoText>
                          </PoolInfoLineWrapper>
                          <PoolInfoLineWrapper>
                            <PoolInfoText>Share of liquidity pool</PoolInfoText>
                            <PoolInfoText>{poolInfo.extendedInfo.userShareOfLiquidityPool}%</PoolInfoText>
                          </PoolInfoLineWrapper>
                          <PoolInfoLineWrapper>
                            <PoolInfoLine>
                              {ton?.image && <StyledAvatar src={ton.image} alt="token" />}
                              <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>TON</PoolInfoText>
                            </PoolInfoLine>
                            <PoolInfoText>{poolInfo.extendedInfo.userTonAmount}</PoolInfoText>
                          </PoolInfoLineWrapper>
                          <PoolInfoLineWrapper>
                            <PoolInfoLine>
                              {selectedToken?.image &&
                                  <StyledAvatar src={selectedToken.image} alt="token" />}
                              <PoolInfoText sx={{ display: 'flex', alignItems: 'center' }}>
                                {selectedToken?.displayName || 'TOKEN'}
                              </PoolInfoText>
                            </PoolInfoLine>
                            <PoolInfoText>{poolInfo.extendedInfo.userTokenAmount}</PoolInfoText>
                          </PoolInfoLineWrapper>
                          <PoolInfoLineWrapper>
                            <PoolInfoText>USD value</PoolInfoText>
                            <PoolInfoText>
                              ${poolInfo.extendedInfo.userUSDValueAmount}
                            </PoolInfoText>
                          </PoolInfoLineWrapper>
                        </Box>
                    }
                  </Box>
              </>}
            </Box>}
        </AccordionDetails>
      </PoolInfoAccordion>
    </ComponentWrapper>
  )
}