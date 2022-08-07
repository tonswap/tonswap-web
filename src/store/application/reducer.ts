/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ApplicationModal {
  WALLET,
}

export enum OperationType {
  SWAP,
  MANAGE_LIQUIDITY,
}


export type State = {
  openModal: ApplicationModal | null;
  selectedAction: string;
  isExpandedView: boolean;
  operationType: OperationType;
};

const initialState = {
  openModal: null,
  selectedAction: 'buy',
  isExpandedView: true,
  operationType: OperationType.SWAP,

} as State;

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
     setOperationType(state, action: PayloadAction<OperationType>) {
      state.operationType = action.payload;
    },
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    setAction(state, action: PayloadAction<string>) {
      state.selectedAction = action.payload;
    },
    setExpandedView(state, action: PayloadAction<boolean>) {
      state.isExpandedView = action.payload;
    },
  },
});

export const { setOpenModal, setAction, setExpandedView, setOperationType } = applicationSlice.actions;

export default applicationSlice.reducer;
