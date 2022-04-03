import { Address, TonClient } from "ton";
import TonWeb from "tonweb";
import { base64StrToCell, cellToString, stripBoc } from "utils";
import { DexActions } from "./dex";
import { tokens as supportedTokens } from "tokens";
import { Token } from "types";
const BN = require("bn.js");
/* eslint no-eval: 0 */
const client = new TonClient({
  endpoint: "https://scalable-api.tonwhales.com/jsonRPC",
});

const gasFee = 0.2;

const tonweb = new TonWeb(
  new TonWeb.HttpProvider("https://scalable-api.tonwhales.com/jsonRPC")
);

const getToken = (token: string) => {
  return supportedTokens.find((t: any) => t.name === token);
};

export const getTokenBalance = async (token: Token) => {
  return _getTokenBalance(token.address!!);
};

export const getLPTokenBalance = async (token: string) => {
  const tokenObjects: any = getToken(token);
  return _getTokenBalance(tokenObjects.amm);
};

export const getTokensOfLPBalances = async (token: string) => {
  const [data, lpBalance] = await Promise.all([
    getData(token),
    getLPTokenBalance(token),
  ]);

  const totalLPs = parseNumber(new BN(eval(data.totalSupply)));
  const ratio = lpBalance / totalLPs;

  return [
    parseNumber(
      new BN(eval(data.tonReserves)).mul(new BN(ratio * 1e9)).div(new BN(1e9))
    ),
    parseNumber(
      new BN(eval(data.tokenReserves)).mul(new BN(ratio * 1e9)).div(new BN(1e9))
    ),
  ];
};

// TODO: Remove later
(window as any).getLPTokenBalance = getLPTokenBalance;
(window as any).getData = getData;

const parseNumber = (
  num: any,
  units: number = 9,
  decimalPoints: number = 4
): number => {
  if (num.toString().length <= 9) {
    return parseFloat(
      parseFloat(
        "0." + num.toString().padStart(units).replaceAll(" ", "0")
      ).toFixed(decimalPoints)
    );
  } else {
    return parseFloat(
      parseFloat(
        num.div(new BN(10 ** units)).toString() +
          "." +
          num.mod(new BN(10 ** units)).toString()
      ).toFixed(decimalPoints)
    );
  }
};

const _getTokenBalance = async (tokenAddress: string) => {
  const owner = Address.parse(localStorage.getItem("address") as string);
  let wc = owner.workChain;
  let address = new BN(owner.hash);
  const res = await tonweb.call(tokenAddress, "ibalance_of", [
    ["num", wc.toString(10)],
    ["num", address.toString(10)],
  ]);

  return parseNumber(new BN(eval(res.stack[0][1])));
};

export const getTonBalance = async () => {
  const address = localStorage.getItem("address") as string;
  const balance = await tonweb.getBalance(address);

  return parseNumber(new BN(balance));
};

export const getAmountsOut = async (
  srcToken: string,
  destToken: string,
  srcAmount: number | null,
  destAmount: number | null
) => {
  let res;
  const tokenObjects: any = getToken(srcToken !== "ton" ? srcToken : destToken);

  if (srcAmount != null) {
    const amountIn = srcAmount * 1e9;
    const isTokenSource = srcToken !== "ton"; // && srcAmount != null || destToken === "ton" && destAmount != null;
    res = await tonweb.call(tokenObjects.amm, "get_amount_out_lp", [
      ["num", amountIn.toString(10)],
      ["num", isTokenSource ? "1" : "0"],
    ]);
  } else if (destAmount != null) {
    const amountIn = (destAmount || 0) * 1e9;
    const isTokenSource = srcToken !== "ton"; // && srcAmount != null || destToken === "ton" && destAmount != null;
    res = await tonweb.call(tokenObjects.amm, "get_amount_in_lp", [
      ["num", amountIn.toString(10)],
      ["num", isTokenSource ? "1" : "0"],
    ]);
  }

  if (res.stack[0][1].indexOf("-") === 0) {
    const data = await getData(tokenObjects.name);
    if (srcToken === "ton") {
      return parseNumber(new BN(eval(data.tonReserves)));
    } else {
      return parseNumber(new BN(eval(data.tokenReserves)));
    }
  } else {
    return parseNumber(new BN(eval(res.stack[0][1])));
  }
};

async function getData(token: string) {
  const tokenObjects: any = getToken(token);
  const res = await client.callGetMethod(
    Address.parse(tokenObjects.amm),
    "get_token_data",
    []
  );
  const cellName = base64StrToCell(res.stack[0][1].bytes);
  const name = cellToString(cellName[0]);
  const cSymbol = base64StrToCell(res.stack[1][1].bytes);
  const symbol = cellToString(cSymbol[0]);
  const decimals = res.stack[2][1];
  const totalSupply = res.stack[3][1];
  const tokenReserves = res.stack[4][1];
  const tonReserves = res.stack[5][1];
  const initialized = res.stack[7][1];

  return {
    name,
    symbol,
    decimals,
    totalSupply,
    tokenReserves,
    tonReserves,
    initialized,
  };
}

export const getLiquidityAmount = async (
  srcToken: string,
  destToken: string,
  srcAmount: number | null,
  destAmount: number | null
): Promise<number> => {
  const tokenObjects: any = getToken(srcToken !== "ton" ? srcToken : destToken);
  const lpTokenData = await getData(tokenObjects.name);

  const tokenReserves = new BN(BigInt(lpTokenData.tokenReserves));
  const tonReserves = new BN(BigInt(lpTokenData.tonReserves));

  const ratio =
    tonReserves.mul(new BN(1e9)).div(tokenReserves).toString() / 1e9;

  if (srcToken === "ton") {
    if (srcAmount != null) {
      return srcAmount / ratio;
    } else if (destAmount != null) {
      return destAmount * ratio;
    }
  } else {
    if (srcAmount != null) {
      return srcAmount * ratio;
    } else if (destAmount != null) {
      return destAmount / ratio;
    }
  }
  return 0;
};

export const getTokenDollarValue = async (
  token: string,
  amount: number
): Promise<number> => {
  let ratio = 1;

  if (token !== "ton") {
    const lpTokenData = await getData(token);

    const tokenReserves = new BN(BigInt(lpTokenData.tokenReserves));
    const tonReserves = new BN(BigInt(lpTokenData.tonReserves));

    ratio = tonReserves.mul(new BN(1e9)).div(tokenReserves).toString() / 1e9;
  }

  const coinsResponse = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`
  );
  const result = await coinsResponse.json();
  const tonPriceWithAmount = parseFloat(
    (parseFloat(result["the-open-network"].usd) * amount).toPrecision(4)
  );

  return parseFloat((tonPriceWithAmount * ratio).toFixed(4));
};

export const getRewards = async (token: string) => {
  const owner = Address.parse(localStorage.getItem("address") as string);
  let wc = owner.workChain;
  let address = new BN(owner.hash);
  const tokenObjects: any = getToken(token);
  const res = await tonweb.call(tokenObjects.amm, "get_rewards_of", [
    ["num", wc.toString(10)],
    ["num", address.toString(10)],
  ]);

  return parseNumber(new BN(eval(res.stack[0][1])), undefined, 7);
};

export const generateSellLink = async (token: string, tokenAmount: number) => {
  const tokenObjects: any = getToken(token);
  let transfer = await DexActions.transferAndSwapOut(
    Address.parse(tokenObjects.amm),
    new BN(tokenAmount * 1e9),
    new BN(2)
  );
  const transferStr = transfer.toString();
  const bocT = stripBoc(transferStr);

  const provider = (window as any).ton;
  const value = gasFee * 1e9;
  if (provider) {
    provider.send("ton_sendTransaction", [
      {
        to: tokenObjects.address, // TON Foundation
        value, // 10000 nanotons = 0.00001 TONs
        data: bocT,
        dataType: "text",
      },
    ]);
  } else {
    const deeplinkTransfer = `ton://transfer/${tokenObjects.address}?amount=${value}&text=${bocT}`;

    console.log(deeplinkTransfer);
    return window.open(deeplinkTransfer);
  }
};

export const generateBuyLink = async (
  token: string,
  tonAmount: number,
  tokenAmount: number
) => {
  // 0.5% slippage
  const minAmount = tokenAmount * 0.995 * 1e9;
  let transfer = await DexActions.swapIn(new BN(minAmount));
  const transferStr = transfer.toString();
  const bocT = stripBoc(transferStr);
  const tokenObjects: any = getToken(token);

  const provider = (window as any).ton;
  const value = (tonAmount + gasFee) * 1e9;
  if (provider) {
    provider.send("ton_sendTransaction", [
      {
        to: tokenObjects.amm, // TON Foundation
        value, // 10000 nanotons = 0.00001 TONs
        data: bocT,
        dataType: "text",
      },
    ]);
  } else {
    const deeplinkTransfer = `ton://transfer/${tokenObjects.amm}?amount=${value}&text=${bocT}`;

    console.log(deeplinkTransfer);
    return window.open(deeplinkTransfer);
  }
};

export const generateAddLiquidityLink = async (
  token: string,
  tonAmount: number | string,
  tokenAmount: number
) => {
  const tokenObjects: any = getToken(token);
  const transferAndLiq = await DexActions.transferAndAddLiquidity(
    Address.parse(tokenObjects.amm),
    new BN(tokenAmount * 1e9),
    10
  );
  const boc = stripBoc(transferAndLiq.toString());

  const provider = (window as any).ton;
  const value = (parseFloat(tonAmount.toString()) + gasFee) * 1e9;
  if (provider) {
    provider.send("ton_sendTransaction", [
      {
        to: tokenObjects.address, // TON Foundation
        value, // 10000 nanotons = 0.00001 TONs
        data: boc,
        dataType: "text",
      },
    ]);
  } else {
    const deeplink = `ton://transfer/${tokenObjects.address}?amount=${value}&text=${boc}`;

    console.log(deeplink);
    return window.open(deeplink);
  }
};

export const generateRemoveLiquidityLink = async (
  token: string,
  tonAmount: number | string
) => {
  const data = await getData(token);
  const ratio =
    parseFloat(tonAmount.toString()) /
    parseNumber(new BN(eval(data.tonReserves)));
  const totalLPs = parseNumber(new BN(eval(data.totalSupply)));

  const transferAndLiq = await DexActions.removeLiquidity(
    new BN(totalLPs * ratio * 1e9)
  );

  const boc = stripBoc(transferAndLiq.toString());
  const tokenObjects: any = getToken(token);
  const provider = (window as any).ton;
  const value = gasFee * 1e9;
  if (provider) {
    provider.send("ton_sendTransaction", [
      {
        to: tokenObjects.amm, // TON Foundation
        value, // 10000 nanotons = 0.00001 TONs
        data: boc,
        dataType: "text",
      },
    ]);
  } else {
    const deeplink = `ton://transfer/${tokenObjects.amm}?amount=${value}&text=${boc}`;

    return window.open(deeplink);
  }
};

export const generateClaimRewards = async (token: string) => {
  const provider = (window as any).ton;

  const claimRewards = await DexActions.claimRewards();
  const boc = stripBoc(claimRewards.toString());
  const tokenObjects: any = getToken(token);
  const value = gasFee * 1e9;
  if (provider) {
    provider.send("ton_sendTransaction", [
      {
        to: tokenObjects.amm, // TON Foundation
        value, // 10000 nanotons = 0.00001 TONs
        data: boc,
        dataType: "text",
      },
    ]);
  } else {
    const deeplink = `ton://transfer/${tokenObjects.amm}?amount=${value}&text=${boc}`;
    return window.open(deeplink);
  }
};
