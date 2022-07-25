import { Address } from "ton";
import Usdt from "assets/images/tokens/usdt.svg";
import Shib from "assets/images/tokens/shiba.svg";

export const initialTokens = [
  {
    name: "shib",
    ammMinter: Address.parse(
      "EQA5JvHOjixFSsDgaKZa3-kVBfvahGDoiOT5X_cHCyeSpQhC"
    ),
    tokenMinter: Address.parse(
      "EQC6T74KYR_ajy0MUzbHsRlIWkdQJf9ovcqCjfmko-WSpjOo"
    ),
    displayName: "SHIB",
    image: Shib,
    color: "#FFA40A",
  },
  {
    name: "usdt",
    ammMinter: Address.parse(
      "EQAI3UTR0ldQ1mDjyjivLR_qOsCtmYG5JvgDaACSxJ1N0nZI"
    ),
    tokenMinter: Address.parse(
      "EQAmf7jp3F_yHcwMv8ya02Q4hcCb9OGs63jcHWg3wzEfzban"
    ),
    displayName: "USDT",
    image: Usdt,
    color: "#1B8362",
  },
];
