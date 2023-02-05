import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { client, fetchPrice, getLPTokenBalance, getPoolData, getTokenData, getTokensOfLPBalances } from 'services/api'
import { Address } from 'ton'
import { setPoolInfo, clearPoolInfo } from 'store/pool-info/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'
import { useEffect, useState } from 'react'
import { fromDecimals } from 'utils'
import BN from 'bn.js'
import BigNumber from 'bignumber.js'
import { ton } from 'services/api/addresses'
import { calculateDecimals } from 'components/PoolInfo'

export const usePoolInfo = () => {
  const { selectedToken } = useTokenOperationsStore()
  const poolInfo = useSelector((state: RootState) => state.poolInfo)
  const dispatch = useDispatch()

  const [price, setPrice] = useState<number | null>(null)
  const [userLPToken, setUserLPToken] = useState<null | string>(null)
  const [userLPTokenTitle, setUserLPTokenTitle] = useState<string>('Token')
  const [tonPoolBalance, setTonPoolBalance] = useState<null | string>(null)
  const [tokenPoolBalance, setTokenPoolBalance] = useState<null | string>(null)

  const getUserLPToken = async (tokenMinter: string) => {
    const lPBalance = await getLPTokenBalance(tokenMinter)
    return fromDecimals(lPBalance?.balance, 9)
  }

  const calculateUserShare = async (tokenMinter: string) => await getTokensOfLPBalances(tokenMinter)

  const getJettonMetadata = async (address: string) => await getTokenData(Address.parse(address))

  const calculateTotalLPSupply = (total: BN) => new BigNumber(new BigNumber(total.toString()).div(new BigNumber(10).pow(9))).toString()

  const calculateUSDValue = () => tonPoolBalance?.length && price && calculateDecimals((parseFloat(tonPoolBalance) * 2 * price).toString())

  const calculateUserShareOfLiquidityPool = () => userLPToken?.length && poolInfo?.totalSupply && calculateDecimals((new BigNumber(userLPToken).div(calculateTotalLPSupply(poolInfo.totalSupply)).multipliedBy(100)).toString())

  const calculateSelectedTokenAmount = () => selectedToken && poolInfo?.tokenReserves && calculateDecimals(fromDecimals(poolInfo.tokenReserves, selectedToken.decimals))

  const calculateTonAmountInPool = () => poolInfo?.tonReserves && calculateDecimals(fromDecimals(poolInfo.tonReserves, ton.decimals))

  const fetchPoolData = async () => {
    if (!selectedToken || !client) {
      return
    }
    const data = await getPoolData(Address.parse(selectedToken.ammMinter), selectedToken.ammVersion)
    dispatch(setPoolInfo(data))
  }

  const resetPoolInfo = () => dispatch(clearPoolInfo())

  useEffect(() => {
    const fetchTonPrice = async () => {
      const tonPrice = await fetchPrice()
      setPrice(tonPrice)
    }
    fetchTonPrice()
  }, [])

  useEffect(() => {
    const fn = async (tokenMinter: string) => {
      setUserLPToken(calculateDecimals(await getUserLPToken(tokenMinter)))
      const poolBalances = await calculateUserShare(tokenMinter)
      setTonPoolBalance(calculateDecimals(poolBalances[0]))
      setTokenPoolBalance(calculateDecimals(poolBalances[1]))

      if (!selectedToken?.ammMinter) {
        return
      }
      const { name } = await getJettonMetadata(selectedToken.ammMinter)
      setUserLPTokenTitle(name)
    }
    selectedToken?.tokenMinter && !!client && fn(selectedToken.tokenMinter)
  }, [selectedToken])

  return {
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
    calculateTonAmountInPool
  }
}