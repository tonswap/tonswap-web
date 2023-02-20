import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Adapter, Adapters } from 'services/wallets/types'
import { walletService } from 'services/wallets/WalletService'
import { RootState } from 'store/store'
import { awaitWalletReadiness, resetWallet, setAdapter, setConnecting, setTonHubSession, updateWallet } from './actions'
import { connect, disconnectTC, Wallet } from 'services/wallets/adapters/TonConnectAdapter'
import { Address } from 'ton'

const findAdapter = (wallets: any, adapterId: Adapters): Adapter | null => wallets?.find((wallet: Adapter) => wallet.type === adapterId) || null

export const useWalletStore = () => {
  return useSelector((state: RootState) => state.wallet)
}

export const useSelectedAdapter = () => {
  return useSelector((state: RootState) => state.wallet.adapter)
}

export const useWalletSelect = () => {
  const dispatch = useDispatch<any>()
  const [localSession, setLocalSession] = useState<null | string>(null)
  const { resetWallet } = useWalletActions()
  const wallets = useSelector((state: RootState) => state.wallet.allWallets)

  const selectWallet = async (adapterId: Adapters, supportsTonConnect?: boolean) => {
    resetWallet()
    disconnectTC()
    const adapter: Adapter | null = findAdapter(wallets, adapterId)
    if (!adapter) {
      return
    }
    dispatch(setAdapter(adapter))
    if (!supportsTonConnect) {
      const _session: string | {} = await walletService.createSession(adapterId)
      dispatch(setTonHubSession(_session))
      dispatch(awaitWalletReadiness({ adapterId, session: _session }))
      const parsedSession = typeof _session === 'string' ? JSON.parse(_session) : _session
      const deepLink = parsedSession.link.replace('ton-test://', 'https://test.tonhub.com/').replace('ton://', 'https://tonhub.com/')
      setLocalSession(deepLink)
      return
    }
    if (adapterId === Adapters.OPENMASK && (window.ton as any).isOpenMask) {
      const accounts = await window.ton?.send('ton_requestAccounts')
      dispatch(updateWallet({ wallet: { address: accounts[0] }, adapterId: Adapters.OPENMASK }))
      localStorage.setItem('ton-connect-storage_bridge-connection', '{"type":"injected","jsBridgeKey":"openmask"}')
      return
    }
    if (adapterId === Adapters.MYTONWALLET && (window as any).myTonWallet.isMyTonWallet) {
      const wallet = await connect(adapter.walletInfo, {
        onSessionLinkReady: (val: string) => {
          setLocalSession(val)
        },
      })
      dispatch(updateWallet({ wallet, adapterId: Adapters.MYTONWALLET }))
      return
    }
    const wallet = await connect(adapter.walletInfo, {
      onSessionLinkReady: (val: string) => {
        setLocalSession(val)
      },
    })
    dispatch(updateWallet({ wallet, adapterId: adapterId }))
  }
  return { selectWallet, session: localSession }
}

export const useWalletActions = (): {
  restoreSession: () => void;
  resetWallet: () => void;
  restoreAdapter: (adapterId: string) => void;
} => {
  const dispatch = useDispatch<any>()
  const wallets = useSelector((state: RootState) => state.wallet.allWallets)

  const reset = useCallback(async () => {
    dispatch(resetWallet())
  }, [dispatch])

  const restoreAdapter = (adapterId: string) => {
    const adapter: Adapter | null = findAdapter(wallets, adapterId as Adapters)
    if (!adapter) {
      return
    }
    dispatch(setAdapter(adapter))
  }

  const restoreSession = useCallback(async () => {
    const adapterId = localStorage.getItem('wallet:adapter-id')
    const session = localStorage.getItem('wallet:session')

    const tcBridgeConnection = JSON.parse(localStorage.getItem('ton-connect-storage_bridge-connection') || '{}')
    const tcBridgeGateway = localStorage.getItem('ton-connect-storage_http-bridge-gateway')

    if (adapterId && session) {
      dispatch(setTonHubSession(session))
      dispatch(
        awaitWalletReadiness({
          adapterId: adapterId as Adapters,
          session: JSON.parse(session),
        }),
      )
      return
    }

    if (tcBridgeConnection.jsBridgeKey === Adapters.OPENMASK) {
      const accounts = await window.ton?.send('ton_requestAccounts')
      dispatch(updateWallet({ wallet: { address: accounts[0] }, adapterId: Adapters.OPENMASK }))
      return
    }
    if (tcBridgeConnection.jsBridgeKey === Adapters.MYTONWALLET) {
      //@ts-ignore
      const accounts = await window.myTonWallet.send('ton_requestAccounts')
      dispatch(updateWallet({ wallet: { address: accounts[0] }, adapterId: Adapters.MYTONWALLET }))
      return
    }
    if (tcBridgeConnection?.session && tcBridgeGateway?.length) {
      const wallet: Wallet = { address: Address.parse(tcBridgeConnection.connectEvent.payload.items[0].address).toFriendly() }
      const _adapter = tcBridgeConnection.connectEvent.payload.device.appName.toLowerCase()
      dispatch(updateWallet({ wallet, adapterId: _adapter }))
      return
    }
    dispatch(setConnecting(false))
    return
  }, [dispatch])

  return { restoreSession, resetWallet: reset, restoreAdapter }
}
