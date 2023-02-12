import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import useUsdValue from 'hooks/useUsdValue'
import { ton } from 'services/api/addresses'
import { fromDecimals } from 'utils'
import { setPoolInfo, setTokenDetails } from 'store/pool-info/actions'
import { clearPoolInfo } from 'store/pool-info/reducer'
import { useEffect } from 'react'
import { useWalletStore } from 'store/wallet/hooks'

export const usePoolInfo = () => {
  const { wallet } = useWalletStore()
  const { selectedToken } = useTokenOperationsStore()
  const poolInfo = useSelector((state: RootState) => state.poolInfo)
  const { usd } = useUsdValue(ton.name, fromDecimals(poolInfo.tonReserves?.muln(2) || 0, ton.decimals))
  const dispatch = useDispatch<any>()

  const fetchPoolData = async () => {
    selectedToken?.ammMinter &&
    selectedToken?.tokenMinter &&
    dispatch(setPoolInfo({ ammMinter: selectedToken.ammMinter, ammVersion: selectedToken.ammVersion || 1.2, usd: usd, tokenDecimals: selectedToken.decimals }))
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

  useEffect(() => {
    if(!!parseFloat(usd) && wallet?.address) fetchExtendedData()
    else if(!!parseFloat(usd)) fetchPoolData()
  }, [usd])

  const resetPoolInfo = () => dispatch(clearPoolInfo())

  return { fetchPoolData, poolInfo, resetPoolInfo, fetchExtendedData }
}