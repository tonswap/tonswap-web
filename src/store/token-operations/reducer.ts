import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PoolInfo } from "services/api/addresses";

import { getAmounts, onSendTransaction } from "./actions";

export enum OperationType {
  SWAP,
  MANAGE_LIQUIDITY,
}

interface TxConfirmation {
  destTokenAmount: string;
  srcTokenAmount: string;
  tokenName?: string;
}

export enum InInput {
  SOURCE,
  DEST
} 
interface State {
  txPending: boolean;
  txError?: string;
  txSuccess: boolean;
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
  operationType: OperationType;
  selectedToken?: PoolInfo;
  txConfirmation: TxConfirmation;
  inInput: InInput,
}

const initialState: State = {
  inInput: InInput.SOURCE,
  txSuccess: false,
  txPending: false,
  txConfirmation: {
    srcTokenAmount: "0",
    destTokenAmount: "0",
  },
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
  operationType: OperationType.SWAP,
};

const WalletOperationSlice = createSlice({
  name: "token-operations",
  initialState,
  reducers: {
    resetState: () => initialState,
    setOperationType(state, action: PayloadAction<OperationType>) {
      state.operationType = action.payload;
    },
    setInInput(state, action:  PayloadAction<InInput> ) {
      state.inInput = action.payload

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
    setSelectedToken(state, action: PayloadAction<PoolInfo | undefined>) {
      state.selectedToken = action.payload;
    },
    onSuccessModalClose(state) {
      state.txSuccess = false
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
    setTxError(state, action: PayloadAction<string | undefined>) {
      state.txError = action.payload
    },
    setDestLoading(state, action) {
      state.destLoading = action.payload;
    },
    toggleAction(state) {
      const stateCopy: State = JSON.parse(JSON.stringify(state));

      state.destTokenAmount = stateCopy.srcTokenAmount;
      state.srcTokenAmount = stateCopy.destTokenAmount;
      state.inInput = state.inInput === InInput.DEST ? InInput.SOURCE  : InInput.DEST
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
      })
      .addCase(onSendTransaction.pending, (state, action) => {
        state.txPending = true;
        state.txConfirmation = {
          destTokenAmount: state.destTokenAmount,
          srcTokenAmount: state.srcTokenAmount,
          tokenName: state.selectedToken?.displayName,
        };
      })
      .addCase(onSendTransaction.rejected, (state, action) => {
        state.txError = action.error.message;
        state.txPending = false;
      })
      .addCase(onSendTransaction.fulfilled, (state, action) => {
        state.txPending = false;
        state.txSuccess = true;
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
  setOperationType,
  setSelectedToken,
  setTxError,
  onSuccessModalClose,
  setInInput
} = WalletOperationSlice.actions;

export default WalletOperationSlice.reducer;
