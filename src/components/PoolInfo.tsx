import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Button, Typography } from '@mui/material'
import { fromDecimals } from 'utils'
import { ton } from 'services/api/addresses'
import { client, getPoolData } from 'services/api'
import { Address } from 'ton'
import BN from 'bn.js'
import useUsdValue from 'hooks/useUsdValue'
import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { useTranslation } from 'react-i18next'
import { usePoolInfo } from 'hooks/usePoolInfo'

const calculateDecimals = (val: string) => {
  const n = parseFloat(val)
  if (n > 1) return n.toFixed(2)
  else if (n < 0.01) return n.toFixed(6)
  else return n.toFixed(4)
}

export const PoolInfo = () => {
  const {poolInfo, fetchPoolData} = usePoolInfo()
  const {usd} = useUsdValue(ton.name, fromDecimals(poolInfo?.tonReserves.muln(2) || 0, ton.decimals))
  const { selectedToken } = useTokenOperationsStore();
  const {t} = useTranslation()

  useEffect(() => {
    fetchPoolData()
  }, [selectedToken, client])

  return (
    <Box sx={{maxWidth: 380, margin: 'auto'}}>
      {poolInfo && <Box sx={{ background: 'rgba(173,216,230,0.6)', borderRadius: 1.5, padding: '8px 16px' }}>
          <Typography fontSize='12px' sx={{fontWeight: 'bold'}} align='center'>{t('pool-info')}</Typography>
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
            <Typography fontSize='12px'>{t('liquidity')} (TVL)</Typography>
            <Typography fontSize='12px'>${calculateDecimals(usd)}</Typography>
          </Box>
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
            <Typography fontSize='12px'>TON</Typography>
            <Typography fontSize='12px'>{calculateDecimals(fromDecimals(poolInfo.tonReserves, ton.decimals))}</Typography>
          </Box>
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
            <Typography fontSize='12px'>{selectedToken?.displayName || "TOKEN"}</Typography>
            <Typography fontSize='12px'>{selectedToken && calculateDecimals(fromDecimals(poolInfo.tokenReserves, selectedToken.decimals))}</Typography>
          </Box>
        </Box>
      }
      <Button onClick={() => fetchPoolData()}>Update</Button>
    </Box>
  )
}