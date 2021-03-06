
import Usdt from "assets/images/tokens/usdt.svg";
import Ton from "assets/images/tokens/ton.svg";
import Shib from "assets/images/tokens/shiba.svg";



export interface Token {
  
  image: string,
  displayName: string,
  color: string,
  name: string,
  isActive?:  boolean
}

const tokens: Token[] = [
  {
    image: Shib,
    displayName: "SHIB",
    name: "shib",
    color: "#FFA40A",
    // address: "EQAycqbigAAkekkGG1A_3LSVGS1RfvJb4YavqUcbUg0pYK0u",
    // amm: "EQCSOxDQI94b0vGCN2Lc3DPan8v3P_JRt-z4PJ9Af2_BPHx5",
  },
  {
    image: Usdt,
    displayName: "USDT",
    name: "usdt",
    color: "#1B8362",
  },
  // {
  //   image: Dai,
  //   displayName: "DAI",
  //   name: "dai",
  //   color: "#9F8728",
  //   isActive: false,
  // },
  // {
  //   image: BTC,
  //   displayName: "BTC",
  //   name: "btc",
  //   color: "#E08618",
  //   isActive: false,
  // },
  // {
  //   image: ETH,
  //   displayName: "ETH",
  //   name: "eth",
  //   color: "#4D67CD",
  //   isActive: false,
  // },
  // {
  //   image: Doge,
  //   displayName: "DOGE",
  //   name: "doge",
  //   color: "#9F8728",
  //   isActive: false,
  // },
  // {
  //   image: Dot,
  //   displayName: "DOT",
  //   name: "dot",
  //   color: "#C20268",
  //   isActive: false,
  // },
  // {
  //   image: Usdc,
  //   displayName: "USDC",
  //   name: "usdc",
  //   color: "#28619E",
  //   isActive: false,
  // },
];

const ton: Token = {
  image: Ton,
  displayName: "TON",
  name: "ton",
  color: "#1490CD",
  isActive: true,
};


export { tokens, ton };
