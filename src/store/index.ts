import { action, configure, makeObservable, observable } from "mobx";
import { createContext, useContext } from "react";
import { Token } from "types";


class Store {
  address = "";
  selectedToken?: Token;
  navMenuOpen  = false

  constructor() {
    makeObservable(this, {
      address: observable,
      selectedToken: observable,
      setToken: action,
      setAddress: action,
      navMenuOpen: observable
    });
  }

  setToken(token?: Token) {
    this.selectedToken = token
  }
  setNavbarMenuOpen(value: boolean){
      this.navMenuOpen = value
  }

  setAddress(address: string) {
    this.address = address;
  }
}

const store = new Store();

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);
