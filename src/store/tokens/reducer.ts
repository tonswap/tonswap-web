/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOKENS_IN_LOCAL_STORAGE } from "consts";
import { PoolInfo } from "services/api/addresses";
import { getTokens } from "./utils";
import { poolInfoStringify } from "./utils";





export type State = {
  selectedToken?: PoolInfo;
  tokens: PoolInfo[];
};

const initialState = {
  selectedToken: undefined,
  tokens: getTokens()
} as State;

const TokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    setSelectedToken(state, action: PayloadAction<PoolInfo | undefined>) {
      state.selectedToken = action.payload;
    },
    addToken(state, action: PayloadAction<PoolInfo>) {
      const pool = action.payload
      const tokenExist = state.tokens.find(
        (m) => m.ammMinter?.toFriendly() === pool.ammMinter?.toFriendly()
      );
      if (tokenExist) {
        return;
      }
      pool.isCustom = true;
      state.tokens.push(pool);
      const  customTokens = state.tokens.filter((it) => {
        return it.isCustom;
      });
      localStorage.setItem(
        TOKENS_IN_LOCAL_STORAGE,
        poolInfoStringify(customTokens)
      );

    },

  },
});

export const { setSelectedToken, addToken } = TokensSlice.actions;

export default TokensSlice.reducer;
