import { LOCAL_STORAGE_ADDRESS } from "consts";
import { action, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { Token } from "types";

class Store {
  address = "";
  selectedToken?: Token;
  navMenuOpen = false;
  seqno?: string;

  constructor() {
    makeObservable(this, {
      address: observable,
      selectedToken: observable,
      setToken: action,
      setAddress: action,
      navMenuOpen: observable,
      seqno: observable,
    });
  }

  setToken(token?: Token) {
    this.selectedToken = token;
  }
  setNavbarMenuOpen(value: boolean) {
    this.navMenuOpen = value;
  }

  setAddress(address: string) {
    this.address = address;
    localStorage.setItem(LOCAL_STORAGE_ADDRESS, address);
  }

  setSeqno(value: string) {
    this.seqno = value;
  }
}

const store = new Store();

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
