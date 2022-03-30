import Luna from "assets/images/tokens/Luna.svg";
import Dai from "assets/images/tokens/DAI.svg";
import Doge from "assets/images/tokens/doge.svg";
import Dot from "assets/images/tokens/dot.svg";
import Usdc from "assets/images/tokens/usdc.svg";
import Usdt from "assets/images/tokens/usdt.svg";
import BTC from "assets/images/tokens/BTC.svg";
import ETH from "assets/images/tokens/ETH.svg";
import Ton from "assets/images/tokens/ton.svg";



import { Token } from "types";

const tokens: Token[] = [
  {
    image: Luna,
    name: "LUNA",
    id: "luna",
    color: "#E32372",
    isActive: false
  },
  {
    image: Dai,
    name: "DAI",
    id: "dai",
    color: "#F5AC37",
    isActive: false
  },
  {
    image: BTC,
    name: "BTC",
    id: "btc",
    color: "#F7931A",
    isActive: true
  },
  {
    image: ETH,
    name: "ETH",
    id: "eth",
    color: "#627EEA",
    isActive: true
  },
  {
    image: Doge,
    name: "DOGE",
    id: "doge",
    color: "#C3A634",
    isActive: true
  },
  {
    image: Dot,
    name: "DOT",
    id: "dot",
    color: "#E6007A",
    isActive: true
  },
  {
    image: Usdc,
    name: "USDC",
    id: "usdc",
    color: "#2675C9",
    isActive: true
  },
  {
    image: Usdt,
    name: "USDT",
    id: "usdt",
    color: "#26A17B",
    isActive: true
  },

  
];

const ton: Token = {
  image: Ton,
  name: "TON",
  id: "ton",
  color: "#1490CD",
  isActive: true
};

export { tokens, ton };
