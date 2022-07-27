import { createReducer } from "@reduxjs/toolkit";
import { LOCAL_STORAGE_ADDRESS } from "consts";
import { Wallet } from "services/wallets/types";
import { awaitWalletReadiness, resetWallet, setConnecting, setSession } from "./actions";

interface State {
  address?: string;
  seqno?: string;
  wallet: Wallet | null;
  session: any;
  adapterId?: string;
  sessionLink?: string;
  connectng: boolean;
}

const initialState: State = {
  address: undefined,
  seqno: undefined,
  wallet: null,
  session: null,
  adapterId: undefined,
  sessionLink: undefined,
  connectng: true
};





const reducer = createReducer(initialState, (builder) => {
  // actionCreator.toString() will automatically be called here
  // also, if you use TypeScript, the action type will be correctly inferred
  builder
  .addCase(setConnecting, (state, action) => {
    state.connectng = action.payload;

  })
  builder
    .addCase(resetWallet, (state) => {
      state.wallet = null;
      state.adapterId = undefined;
      state.address = undefined;
      state.sessionLink = undefined;
      localStorage.removeItem("wallet:adapter-id");
      localStorage.removeItem("wallet:session");
    })
    .addCase(setSession, (state, action) => {
      const { payload } = action;
      const session =
        typeof payload === "string" ? JSON.parse(payload) : payload;
      state.session = session;

      if (session === "object") {
        state.sessionLink = session
          .replace("ton-test://", "https://test.tonhub.com/")
          .replace("ton://", "https://tonhub.com/");
      }
    })
    .addCase(awaitWalletReadiness.fulfilled, (state, action) => {
      const { wallet, adapterId } = action.payload;
      state.wallet = wallet;
      state.adapterId = adapterId;
      state.address = wallet.address;
      localStorage.setItem("wallet:adapter-id", adapterId);
      localStorage.setItem("wallet:session", JSON.stringify(state.session));
      localStorage.setItem(LOCAL_STORAGE_ADDRESS, wallet.address);
      state.connectng = false
    });

  // Or, you can reference the .type field:
  // if using TypeScript, the action type cannot be inferred that way
});

export default reducer;
