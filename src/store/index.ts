import { LOCAL_STORAGE_ADDRESS } from "consts";
import { action, computed, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { Wallet, Adapters } from "services/wallets/types";
import { walletService } from "services/wallets/WalletService";
import { Token } from "types";

class Store {
  address?: string;
  selectedToken?: Token;
  navMenuOpen = false;
  seqno?: string;
  wallet: Wallet | null = null;
  session: any;
  adapterId?: string; 

  constructor() {
    makeObservable(this, {
      address: observable,
      selectedToken: observable,
      setToken: action,
      navMenuOpen: observable,
      seqno: observable,
      wallet: observable,
      session: observable,
      sessionLink: computed,
      disconnect: action.bound,
      adapterId: observable
    });
  }


  get sessionLink() {
    return this.session?.link
      ?.replace("ton-test://", "https://test.tonhub.com/")
      .replace("ton://", "https://tonhub.com/");
  }

  setToken(token?: Token) {
    this.selectedToken = token;
  }
  setNavbarMenuOpen(value: boolean) {
    this.navMenuOpen = value;
  }

  setAddress(_address?: string) {        
    if(_address){
      localStorage.setItem(LOCAL_STORAGE_ADDRESS, _address)
    }else{
      localStorage.removeItem(LOCAL_STORAGE_ADDRESS)
    }
    this.address = _address;
  }

  setWallet(wallet: Wallet | null, _adapterId?: string) {
    this.adapterId = _adapterId
    this.wallet = wallet;
    this.setAddress(wallet?.address);
  }

  setSeqno(value: string) {
    this.seqno = value;
  }

  reset() {
    this.setSession(null);
    this.setWallet(null);
    this.setAddress(undefined)
  }

  setSession(_session: any) {        
    this.session =  typeof _session === 'string' ?  JSON.parse(_session) : _session
  }

  

  async createWalletSession(adapterId: Adapters) {
    const _session = await walletService.createSession(adapterId);
    this.setSession(_session)

    try {
      const _wallet = await walletService.awaitReadiness(adapterId, _session);
      this.setWallet(_wallet, adapterId);
      localStorage.setItem("wallet:adapter-id", adapterId);
      localStorage.setItem("wallet:session", JSON.stringify(_session));
    } catch (e: any) {
      this.reset();
    }
  }

  disconnect() {
    localStorage.removeItem("wallet:adapter-id");
    localStorage.removeItem("wallet:session");
    this.reset();
  }

  async restoreSession() {
    const adapterId = localStorage.getItem("wallet:adapter-id");
    const _session = localStorage.getItem("wallet:session");
    if (!adapterId || !_session) {
      throw new Error("Nothing to restore.");
    }
    
    this.setSession(_session)

    try {
      const _wallet = await walletService.awaitReadiness(
        adapterId,
        JSON.parse(_session)
      );
    
      this.setWallet(_wallet, adapterId);
      return _wallet.address
    } catch {
      console.log('');
      
      this.reset();
      
    }
  }
}

const store = new Store();

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
