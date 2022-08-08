/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import BN from "bn.js";
import { BooleanLiteral } from "typescript";

interface jettonData {
  name: string;
  image: string;
  balance: string;
  symbol: string;
}

export type State = {
  jettonAddress: string;
  tokenBalance?: string;
  txLoading: boolean;
  getTokenLoading: BooleanLiteral;
  tokenData?:jettonData
};

const initialState = {
  jettonAddress:''

} as State;

const applicationSlice = createSlice({
  name: "create-pool",
  initialState,
  reducers: {
    resetState: () => initialState,
    setTokenData(state, action: PayloadAction<jettonData>) {
      state.tokenData = action.payload;
    },
    setJettonAddress(state, action: PayloadAction<string>) {
      state.jettonAddress = action.payload;
    },
  },
});

export const {setTokenData, setJettonAddress, resetState} = applicationSlice.actions

export default applicationSlice.reducer;
