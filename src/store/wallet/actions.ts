import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Adapter, Adapters, Wallet } from 'services/wallets/types'
import { walletService } from 'services/wallets/WalletService'
import { getTonConnectWallets } from 'services/wallets/adapters/TonConnectAdapter'

export const onWalletConnect = createAction<{
  wallet: Wallet;
  _adapterId?: string;
}>('wallet/onWalletConnect')
export const resetWallet = createAction('wallet/resetWallet')
export const setConnecting = createAction<boolean>('wallet/setConnecting')
export const setAdapter = createAction<Adapter>('wallet/setAdapter')

export const setTonHubSession = createAction<string | {}>('wallet/setTonHubSession')
export const updateWallet = createAction<any>('wallet/updateWallet')

export const awaitWalletReadiness = createAsyncThunk<{ wallet: Wallet; adapterId: Adapters },
  { adapterId: Adapters; session: string | {} }>('wallet/createWalletSession', async ({
  adapterId,
  session,
}, thunkApi) => {

  const wallet = await walletService.awaitReadiness(adapterId, session)
  if (!wallet) {
    thunkApi.dispatch(resetWallet)
    throw new Error('')
  }
  return {
    wallet,
    adapterId,
  }
})

const defineWalletDescription: any = (name: string) => {
  if (name === 'OpenMask') {
    return 'TON Wallet Plugin for Google Chrome'
  }
  return 'A mobile wallet in your pocket'
}

const defineIsMobileCompatible: any = (name: string) => {
  if (name === 'OpenMask') {
    return false
  }
  if (name === 'Tonkeeper') {
    return true
  }
  if (name === 'MyTonWallet') {
    return false
  }
}

export const fetchTonConnectWallets = createAsyncThunk<Adapter[]>(
  'wallet/fetchTonConnectWallets', async () => {
    const supportedWallets = await getTonConnectWallets()
    return supportedWallets.map((w) => {
      return {
        name: w.name,
        //@ts-ignore
        type: w.jsBridgeKey,
        icon: w.imageUrl,
        mobileCompatible: defineIsMobileCompatible(w.name),
        description: defineWalletDescription(w.name),
        tonConnect: true,
        walletInfo: w,
      }
    })
  },
)