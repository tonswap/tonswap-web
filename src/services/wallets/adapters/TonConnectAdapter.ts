import TonConnect, {
  IStorage, SendTransactionResponse,
  WalletInfo,
  WalletInfoInjected,
  WalletInfoRemote,
} from '@tonconnect/sdk'
import { Address, Cell, StateInit } from 'ton'

export const getWallets = () => {
  return connector.getWallets()
}

export interface TonWalletProvider {
  connect(): Promise<Wallet>;
  requestTransaction(request: TransactionDetails, onSuccess?: () => void): Promise<void>;
  disconnect(): Promise<void>;
}

export type TonkeeperProviderConfig = {
  manifestUrl: string;
  onSessionLinkReady: (link: string) => void;
  storage?: IStorage;
};

export function stateInitToBuffer(s: StateInit): Buffer {
  const INIT_CELL = new Cell();
  s.writeTo(INIT_CELL);
  return INIT_CELL.toBoc();
}

export interface Wallet {
  address: string;
}

export interface TransactionDetails {
  to: string;
  value: string;
  stateInit?: StateInit;
  message?: Cell;
}

// TODO revert to the link below after pr is approved
//"https://tonswap.org/tonswap-manifest.json"
export const connector = new TonConnect({ manifestUrl: "https://tonverifier.live/tonconnect-manifest.json"});

 export async function disconnectTC(): Promise<void> {
   localStorage.removeItem('ton-connect-storage_bridge-connection')
   localStorage.removeItem('ton-connect-storage_http-bridge-gateway')

   try {
     await connector.disconnect();
   } catch (e) {
     console.log(e)
   }
}

export const getTonConnectWallets = async () => await connector.getWallets();

function isInjected(walletInfo: WalletInfo): walletInfo is WalletInfoInjected {
  return "jsBridgeKey" in walletInfo && "injected" in walletInfo && walletInfo.injected;
}

function isRemote(walletInfo: WalletInfo): walletInfo is WalletInfoRemote {
  return "universalLink" in walletInfo && "bridgeUrl" in walletInfo;
}

export async function connect(walletInfo: any, config: any): Promise<Wallet> {
  const getWalletP = new Promise<Wallet>((resolve, reject) => {
  connector.onStatusChange((wallet) => {
    try {
      if (wallet) {
        resolve({
          address: Address.parse(wallet.account.address).toFriendly(),
        });
      } else {
        reject("No wallet received");
      }
    } catch (e) {
      reject(e);
    }
  }, reject);
});

await connector.restoreConnection();

if (!connector.connected) {
  if (isInjected(walletInfo)) {
    connector.connect({ jsBridgeKey: walletInfo.jsBridgeKey });
  } else if (isRemote(walletInfo)) {
    const sessionLink = connector.connect({
      universalLink: walletInfo.universalLink,
      bridgeUrl: walletInfo.bridgeUrl,
    });
    config.onSessionLinkReady(sessionLink);
  } else {
    throw new Error("Unknown wallet type");
  }
}
return getWalletP;
}


export async function requestTonConnectTransaction(
  request: TransactionDetails,
): Promise<SendTransactionResponse> {
  await connector.restoreConnection()

  const message = {
    address: request.to,
    amount: request.value,
    //@ts-ignore
    payload: request.payload,
  }

  return connector.sendTransaction({
    validUntil: Date.now() + 5 * 60 * 1000,
    messages: [message],
  });
}