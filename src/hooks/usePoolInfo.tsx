import { useState } from 'react'
import BN from 'bn.js'
import { Address } from 'ton'
import { client, getPoolData } from 'services/api'
import { useTokenOperationsStore } from 'store/token-operations/hooks'

export const usePoolInfo = () => {
  const [poolInfo, setPoolInfo] = useState<{totalSupply: BN, jettonWalletAddress: Address, mintable: string, tonReserves: BN, tokenReserves: BN} | null>(null);
  const { selectedToken } = useTokenOperationsStore();

  const fetchPoolData = async () => {
    if(!selectedToken || !client) return
    console.log('%c upd', "background: red")
    const data = await getPoolData(Address.parse(selectedToken.ammMinter), selectedToken.ammVersion)
    setPoolInfo(data)
  }
  return {
    poolInfo, fetchPoolData
  }
}