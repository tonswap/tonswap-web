/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Wallet } from 'ton';


export interface State {
    address: string | null;
    wallet: Wallet | null;
    session: any;
    adapterId: string | null;
}

const initialState = {
    address: null,
    wallet: null,
    session: null,
    adapterId: null
} as State;

const WalletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
        setWallet(state, action: PayloadAction<Wallet | null>) {
            state.wallet = action.payload;
        },
        setSession(state, action: PayloadAction<any>) {
            state.session = action.payload;
        },
        setAdapterId(state, action: PayloadAction<string | null>) {
            state.adapterId = action.payload;
        },
    }
});

export const { setAddress, setWallet, setSession, setAdapterId } = WalletSlice.actions;

export default WalletSlice.reducer;
