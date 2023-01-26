import { Adapter, Adapters } from "./types";
import TonhubImg from "assets/images/shared/tonhub.png";
import ChromeExtImg from "assets/images/shared/chrome.svg";
import TonKeeper from "assets/images/shared/tonkeeper.svg";

let adapters: Adapter[] = [
    // {
    //     name: "Tonkeeper",
    //     type: Adapters.TON_KEEPER,
    //     icon: TonKeeper,
    //     mobileCompatible: true,
    //     description: "A mobile wallet in your pocket",
    //     disabled: false,
    // },
    {
        name: "Tonhub",
        type: Adapters.TON_HUB,
        icon: TonhubImg,
        mobileCompatible: true,
        description: "Crypto wallet for Toncoin",
        tonConnect: false,
    },
    // {
    //     name: "Google Chrome Plugin",
    //     type: Adapters.TON_WALLET,
    //     icon: ChromeExtImg,
    //     mobileCompatible: false,
    //     description: "TON Wallet Plugin for Google Chrome",
    // },
];

export { adapters };
