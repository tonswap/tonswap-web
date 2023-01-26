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
    requestTransaction(session: S, request: TransactionRequest): Promise<void> | Promise<string>;
}

export interface TonWalletProvider {
    isTonWallet: boolean;
    send(method: string, params?: any[]): Promise<any>;
    on(eventName: string, handler: (...data: any[]) => any): void;
}

export enum Adapters {
    TON_HUB = "tonhub",
    TON_WALLET = "ton-wallet",
    TON_KEEPER = "ton-keeper",
    OPENMASK = 'openmask'
}

export interface Adapter {
    name: string;
    type: Adapters;
    icon: string;
    mobileCompatible: boolean;
    description: string;
    disabled?: boolean;
    tonConnect?: boolean
}

export enum ActionCategory {
    SWAP = "Swap",
    MANAGE_LIQUIDITY = "Manage liquidity",
}

export enum ActionType {
    BUY = "Buy",
    SELL = "Sell",
    ADD_LIQUIDITY = "Add liquidity",
    REMOVE_LIQUIDITY = "Remove liquidity",
}
