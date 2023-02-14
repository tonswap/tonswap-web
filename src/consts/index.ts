import { getParamsFromUrl } from "utils";

const LAYOUT_MAX_WIDTH = "1200px";
const TELEGRAM_WEBAPP_PARAM = "tg";
const APP_NAME = "TonSwap";
const APP_VERSION = '1.0.9'
const TEST_MODE = "test-mode";
const TON_WALLET_EXTENSION_URL =
  "https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd";
const colors = [
  "#FFA40A",
  "#1B8362",
  "#9F8728",
  "#E08618",
  "#4D67CD",
  "#9F8728",
  "#C20268",
  "#28619E",
  "#1490CD",
];

const TOKENS_IN_LOCAL_STORAGE = "user_tokens";
export {
  LAYOUT_MAX_WIDTH,
  TELEGRAM_WEBAPP_PARAM,
  TON_WALLET_EXTENSION_URL,
  APP_NAME,
  TEST_MODE,
  TOKENS_IN_LOCAL_STORAGE,
  colors,
  APP_VERSION,
};

export const COMING_SOON = "(coming soon)";

export const GITHUB = "https://github.com/tonswap";
export const TELEGRAM = "https://t.me/mint_xyz";

export const SUPPORT = "https://t.me/Mint_xyz_chat";

export const isDebug = () => getParamsFromUrl("beta") || localStorage["debug"];

export const DECIMALS_LIMIT = 9;

export const BASE_ERROR_MESSAGE = "Oops, something went wrong";

export const FOUND_JETTON = 'foundJetton'