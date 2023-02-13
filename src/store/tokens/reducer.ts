/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOKENS_IN_LOCAL_STORAGE } from "consts";
import { PoolInfo } from "services/api/addresses";
import { getTokens } from "./utils";
import { poolInfoStringify } from "./utils";

export type State = {
  tokens: PoolInfo[];
};

const initialState = {
  selectedToken: undefined,
  tokens: getTokens(),
} as State;

const TokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<PoolInfo>) {
      const pool = action.payload;
      const tokenExist = state.tokens.find(
        (m) => m.ammMinter === pool.ammMinter
      );
      if (tokenExist) {
        return;
      }
      pool.isCustom = true;
      state.tokens = [pool, ...state.tokens];
      const customTokens = state.tokens.filter((it) => {
        return it.isCustom;
      });
      localStorage.setItem(
        TOKENS_IN_LOCAL_STORAGE,
        poolInfoStringify(customTokens)
      );
    },
  },
});

export const { addToken } = TokensSlice.actions;

export default TokensSlice.reducer;
