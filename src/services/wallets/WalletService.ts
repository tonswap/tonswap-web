import { TonhubConnector } from 'ton-x';

import { TonhubWalletAdapter } from './adapters/TonhubWalletAdapter';
import { TonWalletWalletAdapter } from './adapters/TonWalletAdapter';
import { WalletAdapter, TransactionRequest, Wallet, Adapters } from './types';


const IS_TESTNET = false


export class WalletService {
  private readonly adapters: Map<string, WalletAdapter<any>> = new Map();
  
  
  registerAdapter(adapterId: string, adapter: WalletAdapter<any>) {
    console.log(this.adapters);

    this.adapters.set(adapterId, adapter);
  }

  createSession<S>(adapterId: string): Promise<S> {
    const adapter = this.adapters.get(adapterId) as WalletAdapter<S>;
    return adapter.createSession();
  }

  async awaitReadiness<S>(adapterId: string, session: S): Promise<Wallet> {
    const adapter = this.adapters.get(adapterId) as WalletAdapter<S>;
    return adapter.awaitReadiness(session);
  }

  async getWallet<S>(adapterId: string, session: S): Promise<Wallet> {
    const adapter = this.adapters.get(adapterId) as WalletAdapter<S>;
    return adapter.getWallet(session);
  }

  async requestTransaction<S>(adapterId: string, session: S, request: TransactionRequest): Promise<void | boolean> {    
    const adapter = this.adapters.get(adapterId) as WalletAdapter<S>;
    return adapter.requestTransaction(session, request)
  }
}

export const walletService = new WalletService();

const tonhubConnector = new TonhubConnector({ network: IS_TESTNET ? "sandbox": "mainnet" });

walletService.registerAdapter(Adapters.TON_HUB, new TonhubWalletAdapter(tonhubConnector));
walletService.registerAdapter(Adapters.TON_WALLET, new TonWalletWalletAdapter());
