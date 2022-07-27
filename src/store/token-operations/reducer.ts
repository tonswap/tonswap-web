import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAmounts } from "./actions";


export enum OperationType  {
  SWAP,
  MANAGE_LIQUIDITY
}
interface State {
  totalBalances: {
    destBalance: number;
    srcBalance: number;
  };
  srcLoading: boolean;
  destLoading: boolean;
  destTokenAmount: number;
  srcTokenAmount: number;
  srcAvailableAmountLoading: boolean;
  destAvailableAmountLoading: boolean;
  operationType:OperationType;
}

const initialState: State = {
  totalBalances: {
    srcBalance: 0,
    destBalance: 0,
  },
  destTokenAmount: 0,
  srcTokenAmount: 0,
  srcLoading: false,
  destLoading: false,
  srcAvailableAmountLoading: false,
  destAvailableAmountLoading: false,
  operationType: OperationType.SWAP
};

const WalletOperationSlice = createSlice({
  name: "token-operations",
  initialState,
  reducers: {
    resetState: () => initialState,
    setOperationType(state, action: PayloadAction<OperationType>) {
      state.operationType = action.payload
    },
    resetAmounts(state) {
      state.destTokenAmount = 0;
      state.srcTokenAmount = 0;
    },
    resetBalances(state) {
      state.totalBalances = {
        srcBalance: 0,
        destBalance: 0,
      };
    },

    setSrcTokenAmount(state, action) {
      state.srcTokenAmount = action.payload;
    },
    setDestTokenAmount(state, action) {
      state.destTokenAmount = action.payload;
    },
    setSrcLoading(state, action) {
      state.srcLoading = action.payload;
    },
    setDestLoading(state, action) {
      state.destLoading = action.payload;
    },
    toggleAction(state) {
      const stateCopy: State = JSON.parse(JSON.stringify(state));

      state.destTokenAmount = stateCopy.srcTokenAmount;
      state.srcTokenAmount = stateCopy.destTokenAmount;
      state.totalBalances = {
        srcBalance: stateCopy.totalBalances.destBalance,
        destBalance: stateCopy.totalBalances.srcBalance,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAmounts.pending, (state, action) => {
        state.totalBalances.destBalance = 0;
        state.totalBalances.srcBalance = 0;
        state.srcAvailableAmountLoading = true;
        state.destAvailableAmountLoading = true;
      })
      .addCase(getAmounts.fulfilled, (state, action) => {
        state.srcAvailableAmountLoading = false;
        state.destAvailableAmountLoading = false;
        state.totalBalances.destBalance = action.payload.destBalance;
        state.totalBalances.srcBalance = action.payload.srcBalance;
      });
  },
});

export const {
  resetState,
  setDestLoading,
  setSrcLoading,
  setDestTokenAmount,
  resetAmounts,
  setSrcTokenAmount,
  toggleAction,
  resetBalances,
  setOperationType
} = WalletOperationSlice.actions;

export default WalletOperationSlice.reducer;
