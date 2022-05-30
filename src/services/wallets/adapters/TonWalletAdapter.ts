import { TON_WALLET_EXTENSION_URL } from 'consts';
import { tonWalletClient } from '../clients/TonWalletClient';
import { TransactionRequest, Wallet, WalletAdapter } from '../types';


export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class TonWalletWalletAdapter implements WalletAdapter<boolean> {
  async createSession(): Promise<boolean> {
    try {
      await tonWalletClient.ready(150);
      return true;
    } catch (error) {
      window.open(TON_WALLET_EXTENSION_URL, '_blank');
      throw error;
    }
  }

  async awaitReadiness(session: boolean): Promise<Wallet> {
    await tonWalletClient.ready();

    const [[wallet]] = await Promise.all([
      tonWalletClient.requestWallets(),
      delay(150),
    ]);

    if (!wallet) {
      throw new Error('TON Wallet is not configured.');
    }

    return wallet;
  }

  getWallet(session: boolean): Promise<Wallet> {
    return this.awaitReadiness(session);
  }

  isAvailable(): boolean {
    return !!(window as any).ton?.isTonWallet;
  }

  async requestTransaction(_session: any, request: TransactionRequest): Promise<void> {

    try {
      return tonWalletClient.sendTransaction({
        to: request.to,
        value: request.value,
        dataType: 'boc',
        data: request.payload,
        // stateInit: request.stateInit?.toString('base64'),
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }
}
