import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Adapters, Wallet } from "services/wallets/types";
import { walletService } from "services/wallets/WalletService";

export const onWalletConnect = createAction<{
    wallet: Wallet;
    _adapterId?: string;
}>("wallet/onWalletConnect");
export const resetWallet = createAction("wallet/resetWallet");
export const setConnecting = createAction<boolean>("wallet/setConnecting");

export const setSession = createAction<string | {}>("wallet/setSession");
export const updateWallet = createAction<any>("wallet/updateWallet");

export const awaitWalletReadiness = createAsyncThunk<
    // Return type of the payload creator
    { wallet: Wallet; adapterId: Adapters },
    { adapterId: Adapters; session: string | {} }
>("wallet/createWalletSession", async ({ adapterId, session }, thunkApi) => {
    const wallet = await walletService.awaitReadiness(adapterId, session);
    if (!wallet) {
        thunkApi.dispatch(resetWallet);
        throw new Error("");
    }
    return {
        wallet,
        adapterId,
    };
});
