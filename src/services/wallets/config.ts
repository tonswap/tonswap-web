import { Adapter, Adapters } from "./types";
import TonhubImg from "assets/images/shared/tonhub.png";
import ChromeExtImg from "assets/images/shared/chrome.svg";

let adapters: Adapter[] = [
    {
        name: "Tonhub",
        type: Adapters.TON_HUB,
        icon: TonhubImg,
        mobileCompatible: true,
        description: "Crypto wallet for Toncoin",
        tonConnect: false,
    },
];

export { adapters };
