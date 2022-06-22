import { StateInit } from "ton";


export interface TransactionRequest {
  /** Destination */
  to: string;

  /** Amount in nano-tons */
  value: string;

  /** Timeout */
  timeout: number;

  stateInit?: StateInit | null;

  text?: string | null;

  payload: string;
}

export interface Wallet {
    address: string;
    publicKey: string;
    walletVersion: string;
  }

  
export interface WalletAdapter<S> {
  isAvailable(): boolean;
  createSession(): Promise<S>;
  awaitReadiness(session: S): Promise<Wallet>;
  getWallet(session: S): Promise<Wallet>;
  requestTransaction(session: S, request: TransactionRequest, onSuccess?: () => void): Promise<void>;
}

export interface TonWalletProvider {
    isTonWallet: boolean;
    send(method: string, params?: any[]): Promise<any>;
    on(eventName: string, handler: (...data: any[]) => any): void;
  }

export enum Adapters  {
    TON_HUB = 'tonhub',
    TON_WALLET = 'ton-wallet'
}


export interface Adapter {
  name: string,
    type: Adapters,
    icon: string,
    mobileCompatible: boolean,
    description: string;
}