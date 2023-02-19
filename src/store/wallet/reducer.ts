import { createReducer } from "@reduxjs/toolkit";
import { Adapter, Adapters, Wallet } from 'services/wallets/types'
import {
    awaitWalletReadiness,
    fetchTonConnectWallets,
    resetWallet,
    setConnecting,
    setTonHubSession,
    setAdapter,
    updateWallet,
} from './actions'
import { adapters } from 'services/wallets/config'

interface State {
    address?: string;
    seqno?: string;
    wallet: Wallet | null;
    session: any;
    adapterId?: string;
    sessionLink?: string;
    connecting: boolean;
    tonConnectWallets?: Adapter[]
    allWallets?: Adapter[]
    mobileWallets?: Adapter[]
    adapter?: Adapter
}

const initialState: State = {
    address: undefined,
    seqno: undefined,
    wallet: null,
    session: null,
    adapterId: undefined,
    sessionLink: undefined,
    connecting: true,
};

const reducer = createReducer(initialState, (builder) => {
    // actionCreator.toString() will automatically be called here
    // also, if you use TypeScript, the action type will be correctly inferred
    builder.addCase(setConnecting, (state, action) => {
        state.connecting = action.payload;
    });
    builder
        .addCase(resetWallet, (state) => {
            state.wallet = null;
            state.adapterId = undefined;
            state.address = undefined;
            state.sessionLink = undefined;
            localStorage.removeItem("wallet:adapter-id");
            localStorage.removeItem("wallet:session");
        })
        .addCase(updateWallet, (state, action) => {
            const { payload } = action;
            state.wallet = payload.wallet;
            state.adapterId = payload.adapterId;
            state.address = payload.wallet.address;
            state.connecting = false
        })
        .addCase(setTonHubSession, (state, action) => {
            const { payload } = action;
            const session = typeof payload === "string" ? JSON.parse(payload) : payload;
            state.session = session;

            try {
                state.sessionLink = session.link.replace("ton-test://", "https://test.tonhub.com/").replace("ton://", "https://tonhub.com/");
            } catch (error) {}
        })
        .addCase(awaitWalletReadiness.fulfilled, (state, action) => {
            const { wallet, adapterId } = action.payload;
            state.wallet = wallet;
            state.adapterId = adapterId;
            state.address = wallet.address;
            if(!!state.session && adapterId) {
                localStorage.setItem("wallet:adapter-id", adapterId);
                localStorage.setItem("wallet:session", JSON.stringify({ ...state.session, address: wallet.address }));
            }
            state.connecting = false;
        })

      .addCase(fetchTonConnectWallets.fulfilled, (state, action) => {
          state.tonConnectWallets = action.payload
          const _allWallets = [...adapters, ...action.payload]
          state.allWallets = _allWallets

          state.mobileWallets = _allWallets.filter((wallet) => wallet.mobileCompatible || wallet.name.toLowerCase() === Adapters.TONSAFE)
      })
        .addCase(setAdapter, (state, action) => {
            state.adapter = action.payload
        })
    // Or, you can reference the .type field:
    // if using TypeScript, the action type cannot be inferred that way
});

export default reducer;
