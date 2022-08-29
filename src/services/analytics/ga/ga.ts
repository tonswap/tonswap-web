import { LANGUAGE } from "components/Navbar/Menu/language";
import ReactGA from "react-ga4";
import store from "store/store";
import {
  AnalyticsCategory,
  AnalyticsClickAction,
  AnalyticsLanguages,
} from "./types";

const getToken = () =>
  store.getState().tokenOperations.selectedToken?.displayName;

class GaAnalytics {
  constructor(key?: string) {
    if (key) {
      ReactGA.initialize(key!!);
      ReactGA.send(window.location.pathname + window.location.search);
    }
  }

  sendEvent(category: string, action: string, label?: string) {
    if (!ReactGA.isInitialized) {
      return;
    }
    ReactGA.event({
      category,
      action,
      label,
    });
  }

  selectWallet(name: string) {
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.SELECT_WALLET,
      `wallet ${name}`
    );
  }

  selectTokenToTrade(name: string) {
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.SELECT_TOKEN_TO_TRADE,
      name && `token ${name}`
    );
  }

  selectTokenToManageLiquidity(name: string) {
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.SELECT_TOKEN_TO_MANAGE_LIQUIDITY,
      name && `token ${name}`
    );
  }

  goToBuy() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.BUY,
      name && `token ${name}`
    );
  }

  goToSell() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.SELL,
      name && `token ${name}`
    );
  }

  goToAddLiquidity() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.ADD_LIQUIDITY,
      name && `token ${name}`
    );
  }

  goToRemoveLiquidity() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.REMOVE_LIQUIDITY,
      name && `token ${name}`
    );
  }

  buyTransaction() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.BUY_TX,
      name && `token ${name}`
    );
  }

  sellTransaction() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.SELL_TX,
      name && `token ${name}`
    );
  }

  addLiquidityTransaction() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.ADD_LIQUIDITY_TX,
      name && `token ${name}`
    );
  }

  removeLiquidityTransaction() {
    const name = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.REMOVE_LIQUIDITY_TX,
      name && `token ${name}`
    );
  }

  changeTokenInManageLiquidity(name: string) {
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.CHANGE_TOKEN_IN_MANAGE_LIQUIDITY,
      `token ${name}`
    );
  }

  changeTokenInTrade(name: string) {
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.CHANGE_TOKEN_IN_TRADE,
      `token ${name}`
    );
  }

  openMenu() {
    this.sendEvent(AnalyticsCategory.Click, AnalyticsClickAction.OPEN_MENU);
  }

  closeMenu() {
    this.sendEvent(AnalyticsCategory.Click, AnalyticsClickAction.CLOSE_MENU);
  }

  support() {
    this.sendEvent(AnalyticsCategory.Click, AnalyticsClickAction.SUPPORT);
  }

  trade() {
    this.sendEvent(AnalyticsCategory.Click, AnalyticsClickAction.TRADE);
  }

  manageLiquidity() {
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.MANAGE_LIQUIDITY
    );
  }

  createPool() {
    this.sendEvent(AnalyticsCategory.Click, AnalyticsClickAction.CREATE_POOL);
  }

  onMaxClick() {
    const token = getToken();
    this.sendEvent(
      AnalyticsCategory.Click,
      AnalyticsClickAction.MAX,
      `token ${token}`
    );
  }

  disconnect() {
    this.sendEvent(AnalyticsCategory.Click, AnalyticsClickAction.DISCONNECT);
  }

  connect() {
    this.sendEvent(AnalyticsCategory.Click, AnalyticsClickAction.CONNECT);
  }

  onLanguageSelect(lang: string) {
    if (lang === LANGUAGE.en) {
      this.sendEvent(AnalyticsCategory.Language, AnalyticsLanguages.English);
    } else if (lang === LANGUAGE.ru) {
      this.sendEvent(AnalyticsCategory.Language, AnalyticsLanguages.Russian);
    }
  }
}

const gaAnalytics = new GaAnalytics(process.env.REACT_APP_GA);

export default gaAnalytics;
