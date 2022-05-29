import { Adapter, Adapters } from "./types";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";


const adapters: Adapter[] = [
    {
      text: "Tonhub",
      type: Adapters.TON_HUB,
      icon: AccountBalanceWalletIcon,
      mobileCompatible: true
    },
    {
      text: "Ton Wallet",
      type: Adapters.TON_WALLET,
      icon: ExtensionIcon,
      mobileCompatible: false
    },
  ];

  export {adapters}