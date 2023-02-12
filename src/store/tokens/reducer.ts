/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOKENS_IN_LOCAL_STORAGE } from 'consts'
import { PoolInfo } from 'services/api/addresses'
import { getOfficialTokens, getUsersTokens, poolInfoStringify } from './utils'
import { onSetFoundJetton } from 'store/tokens/actions'

export type State = {
  allTokens: PoolInfo[];
  officialTokens: PoolInfo[];
  userTokens: PoolInfo[];
  address: string;
  error: null | string;
  isLoading: boolean
  foundJetton: PoolInfo | null
};

const initialState = {
  allTokens: [],
  officialTokens: getOfficialTokens(),
  userTokens: getUsersTokens(),
  address: '',
  error: null,
  isLoading: false,
  foundJetton: null
} as State;

const TokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    addToken(state, action: PayloadAction<PoolInfo>) {
      const pool = action.payload;
      const tokenExist = state.userTokens.find(
        (m) => m.ammMinter === pool.ammMinter
      );
      if (tokenExist) {
        return;
      }
      pool.isCustom = true;
      state.userTokens.push(pool);
      const customTokens = state.userTokens.filter((it) => {
        return it.isCustom;
      });
      localStorage.setItem(
        TOKENS_IN_LOCAL_STORAGE,
        poolInfoStringify(customTokens)
      );
    },
    onAddressChange(state, action) {
      state.address = action.payload
    },
    onSetError(state, action) {
      state.error = action.payload
    },
    onSetIsLoading(state, action) {
      state.error = action.payload
    },
    onSetUsersTokens(state) {
      let updatedJettons: PoolInfo[] = getUsersTokens()
      if(!state.foundJetton) return
      updatedJettons = [state.foundJetton, ...updatedJettons.filter((jetton) => jetton.tokenMinter !== state.foundJetton?.tokenMinter)]
      window.localStorage.setItem(TOKENS_IN_LOCAL_STORAGE, JSON.stringify(updatedJettons))

      state.userTokens = getUsersTokens()
    },
    onSetAllTokens(state, action) {
      state.allTokens = action.payload
    },
    onResetFoundJetton(state) {
      state.foundJetton = null
    }
  },
  extraReducers:(builder) => {
    builder
      .addCase(onSetFoundJetton.pending, (state) => {
        state.error = null
        state.isLoading = true
      })
      .addCase(onSetFoundJetton.rejected, (state) => {
        state.isLoading = false
        state.error = 'Jetton not found'
      })
      .addCase(onSetFoundJetton.fulfilled, (state, action) => {
        state.foundJetton = action.payload
        state.isLoading = false
        state.error = null
      })
  }
});

export const { addToken } = TokensSlice.actions;

export default TokensSlice.reducer;
