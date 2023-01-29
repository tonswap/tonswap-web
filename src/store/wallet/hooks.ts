import { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Adapter, Adapters } from 'services/wallets/types'
import { walletService } from 'services/wallets/WalletService'
import { RootState } from 'store/store'
import { awaitWalletReadiness, resetWallet, setConnecting, updateWallet } from './actions'
import { connect } from 'services/wallets/adapters/TonConnectAdapter'

export const useWalletStore = () => {
  return useSelector((state: RootState) => state.wallet)
}

export const useWalletSelect = () => {
  const dispatch = useDispatch<any>()
  const [adapter, setAdapter] = useState<Adapter | null>(null)
  const [session, setSession] = useState<null | string>(null)
  const { resetWallet } = useWalletActions()
  const wallets = useSelector((state:RootState) => state.wallet.allWallets)
  const _resetWallet = () => {
    setSession(null)
    resetWallet()
  }

  const selectWallet = async (adapterId: Adapters, supportsTonConnect?: boolean) => {
    resetWallet()
    const adapter:Adapter | null = wallets?.find((wallet) => wallet.type === adapterId) || null
    if(!adapter) return
    setAdapter(adapter)

    if (!supportsTonConnect) {
      const _session: string | {} = await walletService.createSession(adapterId)
      dispatch(awaitWalletReadiness({ adapterId, session: _session }))
      const parsedSession = typeof _session === 'string' ? JSON.parse(_session) : _session
      parsedSession.link.replace('ton-test://', 'https://test.tonhub.com/').replace('ton://', 'https://tonhub.com/')
      setSession(parsedSession.link)
      return
    }
    if (adapterId === Adapters.OPENMASK && (window.ton as any).isOpenMask) {
      const accounts = await window.ton?.send('ton_requestAccounts')
      dispatch(updateWallet({ wallet: { address: accounts[0] }, adapterId: Adapters.TON_KEEPER }))
      return
    }
    const wallet = await connect(adapter.walletInfo, {
      onSessionLinkReady: (val: string) => {
        setSession(val)
      },
    })
    dispatch(updateWallet({ wallet, adapterId: Adapters.TON_KEEPER }))
  }
  return { selectWallet, session, resetWallet: _resetWallet, adapter }
}

export const useWalletActions = (): {
  restoreSession: () => void;
  resetWallet: () => void;
} => {
  const dispatch = useDispatch<any>()

  const reset = useCallback(async () => {
    dispatch(resetWallet())
  }, [dispatch])

  const restoreSession = useCallback(() => {
    const adapterId = localStorage.getItem('wallet:adapter-id')
    const session = localStorage.getItem('wallet:session')

    if (!adapterId || !session) {
      dispatch(setConnecting(false))
      return
    }
    dispatch(
      awaitWalletReadiness({
        adapterId: adapterId as Adapters,
        session: JSON.parse(session),
      }),
    )
  }, [dispatch])

  return { restoreSession, resetWallet: reset }
}
