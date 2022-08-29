export enum AnalyticsClickAction {
  OPEN_MENU = "open menu click",
  CLOSE_MENU = "close menu click",
  TRADE = "trade click",
  MANAGE_LIQUIDITY = "manage liquidity click",
  CREATE_POOL = "create pool click",
  SUPPORT = "support click",
  TELEGRAM = "telegram click",
  GITHUB = "github click",
  ADD_LIQUIDITY = "add liquidity click",
  REMOVE_LIQUIDITY = "remove liquidity click",
  BUY = "buy click",
  SELL = "sell click",
  CONNECT = "connect click",
  SELECT_WALLET = "select wallet click",
  DISCONNECT = "disconnect click",
  ADD_LIQUIDITY_TX = "add liquidity tx request click",
  REMOVE_LIQUIDITY_TX = "remove liquidity tx request click",
  SELL_TX = "sell tx request click",
  BUY_TX = "buy tx request click",
  SELECT_TOKEN_TO_TRADE = "select token to trade",
  SELECT_TOKEN_TO_MANAGE_LIQUIDITY = "select token to manage liquidity",
  CHANGE_TOKEN_IN_MANAGE_LIQUIDITY = "change token in manage liquidity liquidity",
  CHANGE_TOKEN_IN_TRADE = "change token in trade",
  MAX = "max click",
}

export enum AnalyticsCategory {
  Click = "click",
  Language = "language",
}

export enum AnalyticsLanguages {
  English = "English",
  Russian = "Russian",
}
