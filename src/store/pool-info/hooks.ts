import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { client, getPoolData } from 'services/api'
import { Address } from 'ton'
import { setPoolInfo, clearPoolInfo } from 'store/pool-info/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import useUsdValue from 'hooks/useUsdValue'
import { ton } from 'services/api/addresses'
import { fromDecimals } from 'utils'
import { setTokenDetails } from 'store/pool-info/actions'

export const usePoolInfo = () => {
  const { selectedToken } = useTokenOperationsStore();
  const poolInfo = useSelector((state: RootState) => state.poolInfo)
  const { usd } = useUsdValue(ton.name, fromDecimals(poolInfo.tonReserves?.muln(2) || 0, ton.decimals))
  const dispatch = useDispatch<any>()

  const fetchPoolData = async () => {
    if (!selectedToken || !client) return
    const data = await getPoolData(Address.parse(selectedToken.ammMinter), selectedToken.ammVersion)
    dispatch(setPoolInfo(data))
  }

  const fetchExtendedData = () => {
    poolInfo?.tokenReserves &&
    poolInfo?.totalSupply &&
    poolInfo?.tonReserves &&
    usd?.length &&
    selectedToken?.tokenMinter &&
    selectedToken?.ammMinter &&
    dispatch(setTokenDetails({
      tokenMinter: selectedToken.tokenMinter,
      ammMinter: selectedToken.ammMinter,
      usd: usd,
      totalSupply: poolInfo.totalSupply,
      tonReserves: poolInfo.tonReserves,
      tokenDecimals: selectedToken.decimals,
      tokenReserves: poolInfo.tokenReserves,
    }))
  }


  const resetPoolInfo = () => dispatch(clearPoolInfo())

  return { fetchPoolData, poolInfo, resetPoolInfo, fetchExtendedData }
}