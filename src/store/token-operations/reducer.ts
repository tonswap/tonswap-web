import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAmounts } from "./actions";


export enum OperationType  {
  SWAP,
  MANAGE_LIQUIDITY
}
interface State {
  totalBalances: {
    destBalance: string;
    srcBalance: string;
  };
  srcLoading: boolean;
  destLoading: boolean;
  destTokenAmount: string;
  srcTokenAmount: string;
  srcAvailableAmountLoading: boolean;
  destAvailableAmountLoading: boolean;
  operationType:OperationType;
}

const initialState: State = {
  totalBalances: {
    srcBalance: "",
    destBalance: "",
  },
  destTokenAmount: "",
  srcTokenAmount: "",
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
      state.destTokenAmount = "";
      state.srcTokenAmount = "";
    },
    resetBalances(state) {
      state.totalBalances = {
        srcBalance: "",
        destBalance: "",
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
        state.totalBalances.destBalance = "";
        state.totalBalances.srcBalance = "";
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
