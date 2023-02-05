import BN from 'bn.js'
import { Address } from 'ton'
import { createSlice } from '@reduxjs/toolkit'
import { setTokenDetails } from 'store/pool-info/actions'

export interface PoolInfoExtended {
  liquidity?: string
  lpTokenName?: string
  totalLPTokenAmount?: string
  poolTonAmount?: string
  poolTokenAmount?: string
  userLPTokenAmount?: string
  userShareOfLiquidityPool?: string
  userTonAmount?: string
  userTokenAmount?: string
  userUSDValueAmount?: string
  isLoading?: boolean
}

export interface IPoolInfo {
  totalSupply?: BN,
  jettonWalletAddress?: Address,
  mintable?: string,
  tonReserves?: BN,
  tokenReserves?: BN

  extendedInfo: PoolInfoExtended
}

const initialState: IPoolInfo = { extendedInfo: {} }

const poolInfoSlice = createSlice({
  name: 'poolInfo',
  initialState,
  reducers: {
    setPoolInfo(state, action) {
      state.tokenReserves = action.payload.tokenReserves
      state.jettonWalletAddress = action.payload.jettonWalletAddress
      state.tonReserves = action.payload.tonReserves
      state.mintable = action.payload.mintable
      state.totalSupply = action.payload.totalSupply
    },
    clearPoolInfo(state) {
      state.tokenReserves = undefined
      state.jettonWalletAddress = undefined
      state.tonReserves = undefined
      state.mintable = undefined
      state.totalSupply = undefined
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(setTokenDetails.pending, (state) => {
      state.extendedInfo.isLoading = true
    })
    .addCase(setTokenDetails.fulfilled, (state, action) => {
      const {
        userLPTokenAmount,
        userTonAmount,
        userTokenAmount,
        lpTokenName,
        liquidity,
        totalLPTokenAmount,
        poolTokenAmount,
        poolTonAmount,
        userUSDValueAmount,
        userShareOfLiquidityPool
      } = action.payload
      state.extendedInfo.lpTokenName = lpTokenName
      state.extendedInfo.userLPTokenAmount = userLPTokenAmount
      state.extendedInfo.userTokenAmount = userTokenAmount
      state.extendedInfo.userTonAmount = userTonAmount
      state.extendedInfo.liquidity = liquidity
      state.extendedInfo.totalLPTokenAmount = totalLPTokenAmount
      state.extendedInfo.poolTonAmount = poolTonAmount
      state.extendedInfo.poolTokenAmount = poolTokenAmount
      state.extendedInfo.userUSDValueAmount = userUSDValueAmount
      state.extendedInfo.userShareOfLiquidityPool = userShareOfLiquidityPool
      state.extendedInfo.isLoading = false
    })
  },
})

export const { setPoolInfo, clearPoolInfo } = poolInfoSlice.actions

export default poolInfoSlice.reducer