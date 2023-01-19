import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { fromDecimals } from 'utils'
import { ton } from 'services/api/addresses'
import { getPoolData } from 'services/api'
import { Address } from 'ton'
import BN from 'bn.js'
import useUsdValue from 'hooks/useUsdValue'
import { useTokenOperationsStore } from 'store/token-operations/hooks'

export const PoolInfo = () => {
  const [poolInfo, setPoolInfo] = useState<{totalSupply: BN, jettonWalletAddress: Address, mintable: string, tonReserves: BN, tokenReserves: BN} | null>(null);
  const {usd} = useUsdValue(ton.name, fromDecimals(poolInfo?.tonReserves.muln(2) || 0, ton.decimals))
  const { selectedToken } = useTokenOperationsStore();


  useEffect(() => {
    const fetchPoolData = async () => {
      if(!selectedToken) return
      const data = await getPoolData(Address.parse(selectedToken.ammMinter))
      setPoolInfo(data)
    }
    fetchPoolData()
  }, [selectedToken])

  return (
    <Box sx={{maxWidth: 380, margin: 'auto'}}>
      {poolInfo && <Box sx={{ background: '#ADD8E6', borderRadius: 1.5, padding: '8px 16px', fontSize: '13px!important' }}>
          <Typography align='center'>Pool info</Typography>
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
            <Typography>Liquidity (TVL)</Typography>
            <Typography>${usd}</Typography>
          </Box>
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
            <Typography>TON</Typography>
            <Typography>{fromDecimals(poolInfo.tonReserves, ton.decimals)}</Typography>
          </Box>
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
            <Typography>{selectedToken?.displayName || "TOKEN"}</Typography>
            <Typography>{selectedToken && fromDecimals(poolInfo.tokenReserves, selectedToken.decimals)}</Typography>
          </Box>
        </Box>
      }
    </Box>
  )
}