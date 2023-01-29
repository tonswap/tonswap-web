import TonConnect, {
  IStorage,
  WalletInfo,
  WalletInfoInjected,
  WalletInfoRemote,
} from "@tonconnect/sdk";
import { Address, Cell, StateInit } from 'ton'
import BN from 'bn.js'

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
  to: Address;
  value: BN;
  stateInit?: StateInit;
  message?: Cell;
}

export const connector = new TonConnect({ manifestUrl: "https://tonverifier.live/tonconnect-manifest.json"});

 export async function disconnectTC(): Promise<void> {
  await connector.disconnect();
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
  onSuccess?: (() => void) | undefined
): Promise<void> {
  await connector.sendTransaction({
    validUntil: Date.now() + 5 * 60 * 1000,
    messages: [
      {
        address: request.to.toFriendly(),
        amount: request.value.toString(),
        stateInit: request.stateInit
          ? stateInitToBuffer(request.stateInit).toString("base64")
          : undefined,
        payload: request.message ? request.message.toBoc().toString("base64") : undefined,
      },
    ],
  });

  onSuccess?.();
}