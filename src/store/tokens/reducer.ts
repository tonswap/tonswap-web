/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOKENS_IN_LOCAL_STORAGE } from 'consts'
import { PoolInfo } from 'services/api/addresses'
import { getTokens, poolInfoStringify } from './utils'
import { onSetFoundJetton } from 'store/tokens/actions'

const getUserJettons = () => JSON.parse(localStorage.getItem('userJettons') || '[]')

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
  officialTokens: getTokens(),
  userTokens: getUserJettons(),
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
      const tokenExist = state.officialTokens.find(
        (m) => m.ammMinter === pool.ammMinter
      );
      if (tokenExist) {
        return;
      }
      pool.isCustom = true;
      state.officialTokens.push(pool);
      const customTokens = state.officialTokens.filter((it) => {
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
      let updatedJettons: PoolInfo[] = getUserJettons()
      if(!state.foundJetton) return
      updatedJettons = [...updatedJettons.filter((jetton) => jetton.tokenMinter !== state.foundJetton?.tokenMinter), state.foundJetton]
      window.localStorage.setItem('userJettons', JSON.stringify(updatedJettons))

      state.userTokens = getUserJettons()
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
