import { useSelectedAdapter, useWalletStore } from 'store/wallet/hooks'
import { client, waitForSeqno } from 'services/api'
import { Address } from 'ton'
import { walletService } from 'services/wallets/WalletService'
import { isMobile } from 'react-device-detect'
import { requestTonConnectTransaction } from 'services/wallets/adapters/TonConnectAdapter'
import { useTokenOperationsActions } from 'store/token-operations/hooks'
import { Dispatch, SetStateAction } from 'react'

export const useSubmitTransaction = () => {
  const selectedAdapter = useSelectedAdapter()
  const {
    getTokensBalance,
    sendTransaction,
    sendTonConnectTransaction,
    setTransactionStatus,
  } = useTokenOperationsActions();
  const { address, adapterId, session } = useWalletStore();

  const submitTransaction = async (getTxRequest: () => any, sendAnalyticsEvent: () => (undefined | void), getBalances: () => Promise<any>) => {
    setTransactionStatus(true)
    const txRequest = await getTxRequest();

    const waiter = await waitForSeqno(
      client.openWalletFromAddress({
        source: Address.parse(address!!),
      })
    )
    if(!selectedAdapter?.tonConnect) {
      const tx = async () => {
        let deepLinkUrl = await walletService.requestTransaction(adapterId!!, session, txRequest);
        if (typeof deepLinkUrl === 'string') {
          if (isMobile) {
            window.location.href = deepLinkUrl
          }
        }
      }
      sendTransaction(tx)
      await waiter();
    } else {
      if(isMobile) {
        window.location.href = `https://app.tonkeeper.com`
      }
      sendTonConnectTransaction(async () => await requestTonConnectTransaction(txRequest))
      await waiter();
    }

    sendAnalyticsEvent()
    getTokensBalance(getBalances)
  }

  return submitTransaction
}