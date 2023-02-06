import { createAsyncThunk } from '@reduxjs/toolkit'
import { PoolInfoExtended } from 'store/pool-info/reducer'
import { fetchPrice, getLPTokenBalance, getPoolData, getTokenData, getTokensOfLPBalances } from 'services/api'
import { calculateDecimals, fromDecimals } from 'utils'
import { Address } from 'ton'
import BN from 'bn.js'
import BigNumber from 'bignumber.js'
import { ton } from 'services/api/addresses'

export const setPoolInfo = createAsyncThunk<{
  totalSupply?: BN,
  jettonWalletAddress?: Address,
  mintable?: string,
  tonReserves?: BN,
  tokenReserves?: BN,

  extendedInfo?: PoolInfoExtended
},
  {
    ammMinter: string,
    ammVersion: number,
    usd: string,
    tokenDecimals: number
  }>('poolInfo/setPoolInfo', async ({
  ammVersion, ammMinter, usd, tokenDecimals
}, thunkAPI) => {
  const poolData = await getPoolData(Address.parse(ammMinter), ammVersion)
  const { name } = await getTokenData(Address.parse(ammMinter))
  const calculateTotalLPSupply = (total: BN) => new BigNumber(new BigNumber(total.toString()).div(new BigNumber(10).pow(9))).toString()

  return {
    totalSupply: poolData.totalSupply,
    jettonWalletAddress: poolData.jettonWalletAddress,
    mintable: poolData.mintable,
    tonReserves: poolData.tonReserves,
    tokenReserves: poolData.tokenReserves,

    extendedInfo: {
      liquidity: calculateDecimals(usd),
      lpTokenName: name,
      totalLPTokenAmount: calculateDecimals(calculateTotalLPSupply(poolData.totalSupply)),
      poolTonAmount: calculateDecimals(fromDecimals(poolData.tonReserves, ton.decimals)),
      poolTokenAmount: calculateDecimals(fromDecimals(poolData.tokenReserves, tokenDecimals)),
    }
  }
})

export const setTokenDetails = createAsyncThunk<PoolInfoExtended,
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
  tokenDecimals,
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
  tokenData.liquidity = calculateDecimals(usd)

  tokenData.poolTonAmount = calculateTonAmountInPool()
  tokenData.poolTokenAmount = calculateSelectedTokenAmount()

  tokenData.totalLPTokenAmount = calculateDecimals(calculateTotalLPSupply(totalSupply))

  tokenData.userShareOfLiquidityPool = calculateUserShareOfLiquidityPool()
  tokenData.userUSDValueAmount = calculateUSDValue()
  return tokenData
})