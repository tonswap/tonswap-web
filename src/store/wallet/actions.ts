import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Adapter, Adapters, Wallet } from 'services/wallets/types'
import { walletService } from "services/wallets/WalletService";
import { getTonConnectWallets } from 'services/wallets/adapters/TonConnectAdapter'

export const onWalletConnect = createAction<{
    wallet: Wallet;
    _adapterId?: string;
}>("wallet/onWalletConnect");
export const resetWallet = createAction("wallet/resetWallet");
export const setConnecting = createAction<boolean>("wallet/setConnecting");
export const setAdapter = createAction<Adapter>("wallet/setAdapter")

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

export const fetchTonConnectWallets = createAsyncThunk<Adapter[]>(
  "wallet/fetchTonConnectWallets", async () => {
      const supportedWallets = await getTonConnectWallets()
      const result = supportedWallets.map((w) => {
          return {
              name: w.name,
              type: w.name === 'OpenMask' ? Adapters.OPENMASK : Adapters.TON_KEEPER,
              icon: w.imageUrl,
              mobileCompatible: w.name !== 'OpenMask',
              description: w.name === 'OpenMask'
                ? 'TON Wallet Plugin for Google Chrome'
                : 'A mobile wallet in your pocket',
              tonConnect: true,
              walletInfo: w,
          }
      })

    return result
  }
)