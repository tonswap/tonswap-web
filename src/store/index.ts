import { LOCAL_STORAGE_ADDRESS, TOKENS_IN_LOCAL_STORAGE } from "consts";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { createContext, useContext } from "react";

import { addToken, MainNetPools } from "services/api/addresses";
import { Wallet, Adapters } from "services/wallets/types";
import { walletService } from "services/wallets/WalletService";
import { Address } from "ton";

import {
  PoolInfo,
} from "services/api/addresses";

const getTokens = () => {
  const pools = MainNetPools();
  var result = Object.keys(pools).map((key) => {
    return {
      ...pools[key],
      name: pools[key].name,
    };
  });

  return result;
  // }
};

class Store {
  address?: string;
  selectedToken?: PoolInfo;
  navMenuOpen = false;
  seqno?: string;
  wallet: Wallet | null = null;
  session: any;
  adapterId?: string;
  isConnecting: boolean = true;
  isRestoring: boolean = true;
  tokens: PoolInfo[] = getTokens();

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
      adapterId: observable,
      setWallet: action,
      setAddress: action,
      setSession: action,
      isConnecting: observable,
      isRestoring: observable,
      tokens: observable,
      addToken: action,
    });
  }

  get sessionLink() {
    return this.session?.link
      ?.replace("ton-test://", "https://test.tonhub.com/")
      .replace("ton://", "https://tonhub.com/");
  }

  setToken(token?: PoolInfo) {
    this.selectedToken = token;
  }

  addToken(pool: PoolInfo) {
    const tokenExist = this.tokens.find(
      (m) => m.ammMinter?.toFriendly() === pool.ammMinter?.toFriendly()
    );
    if (tokenExist) {
      return;
    }
    pool.isCustom = true;

    this.tokens.push(pool);
    let customTokens = this.tokens.filter((it) => {
      return it.isCustom;
    });
    localStorage.setItem(
      TOKENS_IN_LOCAL_STORAGE,
      poolInfoStringify(customTokens)
    );
  }

  setNavbarMenuOpen(value: boolean) {
    this.navMenuOpen = value;
  }

  setAddress(_address?: string) {
    if (_address) {
      localStorage.setItem(LOCAL_STORAGE_ADDRESS, _address);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_ADDRESS);
    }
    this.address = _address;
  }

  setAdapterId(_adapterId?: string) {
    this.adapterId = _adapterId;
  }

  setWallet(wallet: Wallet | null, _adapterId?: string) {
    this.wallet = wallet;
    this.setAdapterId(_adapterId);
    this.setAddress(wallet?.address);
  }

  setSeqno(value: string) {
    this.seqno = value;
  }

  reset() {
    this.setSession(null);
    this.setWallet(null);
    this.setAddress(undefined);
    this.setToken(undefined);
    this.isConnecting = false;
  }

  setSession(_session: any) {
    this.session =
      typeof _session === "string" ? JSON.parse(_session) : _session;
  }

  async createWalletSession(adapterId: Adapters) {
    const _session = await walletService.createSession(adapterId);
    this.setSession(_session);
    this.isConnecting = true;
    try {
      const _wallet = await walletService.awaitReadiness(adapterId, _session);

      this.setWallet(_wallet, adapterId);
      this.isConnecting = false;
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
      this.isRestoring = false;
      throw new Error("Nothing to restore.");
    }

    this.setSession(_session);

    try {
      const _wallet = await walletService.awaitReadiness(
        adapterId,
        JSON.parse(_session)
      );

      this.setWallet(_wallet, adapterId);
    } catch {
      this.reset();
    } finally {
      this.isRestoring = false;
    }
  }
}

export function addTokenToList(
  name: string,
  data: PoolInfo,
  tokenMinter: Address,
  ammMinter: Address
) {
  store.tokens.push(data);
  addToken(name, {
    tokenMinter,
    ammMinter,
    ...data,
  });
}

export const store = new Store();

const StoreContext = createContext(store);

export const useStore = () => useContext(StoreContext);

function poolInfoStringify(pools: PoolInfo[]) {
  let list = pools.map((pi) => {
    return {
      ammMinter: pi.ammMinter?.toFriendly(),
      tokenMinter: pi.tokenMinter?.toFriendly(),
      image: pi.image,
      displayName: pi.displayName,
      color: pi.color,
      name: pi.name,
      isCustom: true,
    };
  });

  return JSON.stringify(list);
}
