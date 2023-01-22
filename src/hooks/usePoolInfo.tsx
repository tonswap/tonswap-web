import BN from 'bn.js'
import { Address } from 'ton'
import { client, getPoolData } from 'services/api'
import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { atom, useRecoilState } from 'recoil'

const defaultState:{totalSupply?: BN, jettonWalletAddress?: Address, mintable?: string, tonReserves?: BN, tokenReserves?: BN}  = {}

const poolInfoState = atom({
  key: "poolInfoState",
  default: defaultState
})

export const usePoolInfo = () => {
  const [poolInfo, setPoolInfo] = useRecoilState(poolInfoState);
  const { selectedToken } = useTokenOperationsStore();

  const fetchPoolData = async () => {
    if(!selectedToken || !client) return
    const data = await getPoolData(Address.parse(selectedToken.ammMinter), selectedToken.ammVersion)
    setPoolInfo(data)
  }
  return {
    poolInfo, fetchPoolData
  }
}