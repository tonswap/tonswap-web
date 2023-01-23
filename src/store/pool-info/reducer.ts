import BN from 'bn.js'
import { Address } from 'ton'
import { createSlice } from '@reduxjs/toolkit'

export interface IPoolInfo {totalSupply?: BN, jettonWalletAddress?: Address, mintable?: string, tonReserves?: BN, tokenReserves?: BN}

const initialState:IPoolInfo = {}

const poolInfoSlice = createSlice({
  name: "poolInfo",
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
    }
  }
})

export const {setPoolInfo, clearPoolInfo} = poolInfoSlice.actions

export default poolInfoSlice.reducer