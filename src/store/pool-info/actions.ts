import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { IPoolInfo, PoolInfoExtended } from 'store/pool-info/reducer'
import { calculateDecimals } from 'components/PoolInfo'
import { fetchPrice, getLPTokenBalance, getTokenData, getTokensOfLPBalances } from 'services/api'
import { fromDecimals } from 'utils'
import { Address } from 'ton'
import BN from 'bn.js'
import BigNumber from 'bignumber.js'
import { ton } from 'services/api/addresses'

export const setPoolInfo = createAction<IPoolInfo>('poolInfo/setPoolInfo')

export const setTokenDetails = createAsyncThunk<
  PoolInfoExtended,
  {
    tokenMinter: string,
    ammMinter: string,
    usd: string,
    totalSupply: BN,
    tonReserves: BN,
    tokenReserves: BN,
    tokenDecimals: number,
  }>('poolInfo/setTokenDetails', async ({
  tokenMinter,
  ammMinter,
  usd,
  totalSupply,
  tonReserves,
  tokenReserves,
  tokenDecimals
}, thunkAPI) => {

  let tokenData: PoolInfoExtended = {}

  const getUserLPToken = async () => {
    const lPBalance = await getLPTokenBalance(tokenMinter)
    return fromDecimals(lPBalance?.balance, 9)
  }

  const tonPrice = await fetchPrice()

  const userLPTokenAmount = calculateDecimals(await getUserLPToken())

  const calculateTotalLPSupply = (total: BN) => new BigNumber(new BigNumber(total.toString()).div(new BigNumber(10).pow(9))).toString()

  const calculateTonAmountInPool = () => tonReserves && calculateDecimals(fromDecimals(tonReserves, ton.decimals))

  const calculateSelectedTokenAmount = () => calculateDecimals(fromDecimals(tokenReserves, tokenDecimals))

  const calculateUserShare = async () => await getTokensOfLPBalances(tokenMinter)

  const calculateUSDValue = () => calculateDecimals((parseFloat(calculateDecimals(poolBalances[0])) * 2 * tonPrice).toString())

  const calculateUserShareOfLiquidityPool = () => calculateDecimals((new BigNumber(userLPTokenAmount).div(calculateTotalLPSupply(totalSupply)).multipliedBy(100)).toString())

  tokenData.userLPTokenAmount = userLPTokenAmount
  const poolBalances = await calculateUserShare()
  const { name } = await getTokenData(Address.parse(ammMinter))

  tokenData.userTonAmount = calculateDecimals(poolBalances[0])
  tokenData.userTokenAmount = calculateDecimals(poolBalances[1])

  tokenData.lpTokenName = name
  tokenData.liquidity = usd

  tokenData.poolTonAmount = calculateTonAmountInPool()
  tokenData.poolTokenAmount = calculateSelectedTokenAmount()

  tokenData.totalLPTokenAmount = calculateTotalLPSupply(totalSupply)

  tokenData.userShareOfLiquidityPool = calculateUserShareOfLiquidityPool()
  tokenData.userUSDValueAmount = calculateUSDValue()
  return tokenData
})