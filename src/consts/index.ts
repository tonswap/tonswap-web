import { getParamsFromUrl } from "utils";

const LOCAL_STORAGE_ADDRESS = "ton_address";
const LAYOUT_MAX_WIDTH = "1200px";
const TELEGRAM_WEBAPP_PARAM = "tg";
const DESTINATION_PATH = "destination_path";
const APP_NAME = "TonSwap";
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
  LOCAL_STORAGE_ADDRESS,
  LAYOUT_MAX_WIDTH,
  TELEGRAM_WEBAPP_PARAM,
  TON_WALLET_EXTENSION_URL,
  DESTINATION_PATH,
  APP_NAME,
  TEST_MODE,
  TOKENS_IN_LOCAL_STORAGE,
  colors,
};

export const COMING_SOON = "(coming soon)";

export const GITHUB = "https://github.com/tonswap";
export const TELEGRAM = "https://t.me/tonswap";

export const SUPPORT = "https://t.me/TonSwapCommunity";

export const ZERO_ADDRESS = "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c";

export const BETA_TEXT = "TonSwap is in Beta, use at your own risk";

export const isDebug = () => getParamsFromUrl("debug") || localStorage["debug"];

export const DECIMALS_LIMIT = 9;

export const BASE_ERROR_MESSAGE = "Oops, something went wrong";

export const TON_RPC_NAME = "tonswap_amm_rpc";
