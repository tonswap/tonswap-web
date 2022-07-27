/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ApplicationModal {
  WALLET,
}

export type State = {
  openModal: ApplicationModal | null;
  selectedAction: string;
};

const initialState = {
  openModal: null,
  selectedAction: 'buy'
} as State;

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    setAction(state, action: PayloadAction<string>) {
      state.selectedAction = action.payload;
    },
  },
});

export const { setOpenModal, setAction } = applicationSlice.actions;

export default applicationSlice.reducer;
