/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PoolInfo } from "services/api/addresses";
import { initialTokens } from "./data";

export interface State {
  tokens: PoolInfo[];
}

const initialState = {
  tokens: initialTokens
} as State;

const TokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setTokens(state, action: PayloadAction<PoolInfo[]>) {
      state.tokens = action.payload;
    },
    addToken(state, action: PayloadAction<PoolInfo>) {
      state.tokens.push(action.payload);
    },
  },
});

export const { setTokens, addToken } = TokensSlice.actions;

export default TokensSlice.reducer;
