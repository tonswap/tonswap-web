import { Adapter, Adapters } from "./types";
import TonhubImg from 'assets/images/shared/tonhub.png'
import ChromeExtImg from 'assets/images/shared/chrome.svg'

const adapters: Adapter[] = [
    {
      name: "Tonhub",
      type: Adapters.TON_HUB,
      icon: TonhubImg,
      mobileCompatible: true,
      description: 'A mobile wallet in your pocket'
    },
    {
      name: "Google Chrome Plugin",
      type: Adapters.TON_WALLET,
      icon: ChromeExtImg,
      mobileCompatible: false,
      description: 'TON Wallet Plugin for Google Chrome'
    },
  ];

  export {adapters}