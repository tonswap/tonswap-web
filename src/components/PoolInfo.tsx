import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { fromDecimals } from 'utils'
import { ton } from 'services/api/addresses'
import { client, getPoolData } from 'services/api'
import { Address } from 'ton'
import BN from 'bn.js'
import useUsdValue from 'hooks/useUsdValue'
import { useTokenOperationsStore } from 'store/token-operations/hooks'

const calculateDecimals = (val: string) => {
  const n = parseFloat(val)
  if (n > 1) return n.toFixed(2)
  else if (n < 0.01) return n.toFixed(6)
  else return n.toFixed(4)
}

export const PoolInfo = () => {
  const [poolInfo, setPoolInfo] = useState<{totalSupply: BN, jettonWalletAddress: Address, mintable: string, tonReserves: BN, tokenReserves: BN} | null>(null);
  const {usd} = useUsdValue(ton.name, fromDecimals(poolInfo?.tonReserves.muln(2) || 0, ton.decimals))
  const { selectedToken } = useTokenOperationsStore();

  useEffect(() => {
    const fetchPoolData = async () => {
      if(!selectedToken || !client) return
      const data = await getPoolData(Address.parse(selectedToken.ammMinter), selectedToken.ammVersion)
      setPoolInfo(data)
    }
    fetchPoolData()
  }, [selectedToken, client])

  return (
    <Box sx={{maxWidth: 380, margin: 'auto'}}>
      {poolInfo && <Box sx={{ background: 'rgba(173,216,230,0.6)', borderRadius: 1.5, padding: '8px 16px' }}>
          <Typography fontSize='12px' sx={{fontWeight: 'bold'}} align='center'>Pool info</Typography>
          <Box display='flex' alignItems='center' justifyContent='space-between' sx={{ width: '100%' }}>
            <Typography fontSize='12px'>Liquidity (TVL)</Typography>
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
    </Box>
  )
}