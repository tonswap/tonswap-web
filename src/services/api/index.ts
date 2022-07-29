import { Address, Cell, toNano, TonClient, fromNano } from "ton";
import {  cellToString, hexToBn } from "utils";
import { DexActions } from "./dex";
import { bytesToAddress, bytesToBase64, getToken, PoolInfo } from "./addresses";
import BN from "bn.js";
import { OPS } from "./ops";
import { LOCAL_STORAGE_ADDRESS, ZERO_ADDRESS } from "consts";
import { parseJettonOnchainMetadata } from "./deploy-pool";
import axios from "axios";
import { ton } from "tokens";

let rpcUrl = "https://mainnet.tonhubapi.com/jsonRPC";

if (document.location.href.indexOf("testnet=") > -1) {
  rpcUrl = "https://testnet.tonhubapi.com/jsonRPC";
} else if (document.location.href.indexOf("sandbox=") > -1) {
  rpcUrl = "https://sandbox.tonhubapi.com/jsonRPC";
}

/* eslint no-eval: 0 */
const client = new TonClient({
  endpoint: rpcUrl,
});

export enum GAS_FEE {
  SWAP = 0.08,
  FORWARD_TON = 0.01,
  ADD_LIQUIDITY = 0.12,
  REMOVE_LIQUIDITY = 0.08,
}

const sleep = (milliseconds: number) => {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
};


export const isContractDeployed = (address: string) => {
  return  client.isContractDeployed(Address.parse(address));
}

const callWithRetry = async (address: Address, method: string, params: any) => {
  try {
    return await client.callGetMethod(address, method, params);
  } catch (ignore) {
    await sleep(500);
    return client.callGetMethod(address, method, params);
  }
};

export const getTokenBalance = async (token: PoolInfo) => {
  const tokenData = await getToken(client, token.name, getOwner());
      
  //sending jetton master, + owner wallet will resolve to jetton wallet and fetch the balance
  
  return getTokenBalanceByMinter(tokenData.tokenMinter!!);
};

export const getLPTokenBalance = async (token: string) => {
  const tokenData = await getToken(client, token, getOwner());
  return _getJettonBalance(tokenData.lpWallet, tokenData.ammMinter!!);
};

export const getTokensOfLPBalances = async (token: string) => {
  const tokenObjects = await getToken(client, token, getOwner());
  const [jettonData, lpBalance] = await Promise.all([

    getPoolData(tokenObjects.ammMinter!!),
    getLPTokenBalance(token),
  ]);
  if (lpBalance.balance.toString() === "0") {
    return [fromNano("0"), fromNano("0")];
  }
  const tonSide2 = lpBalance.balance
    .mul(jettonData.tonReserves)
    .div(jettonData.totalSupply);
  const tokenSide2 = lpBalance.balance
    .mul(jettonData.tokenReserves)
    .div(jettonData.totalSupply);

  return [fromNano(tonSide2), fromNano(tokenSide2)];
};

// TODO: Remove later
(window as any).getLPTokenBalance = getLPTokenBalance;
(window as any).getData = getPoolData;

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

function getOwner() {
  const address = localStorage.getItem(LOCAL_STORAGE_ADDRESS) || ZERO_ADDRESS;
  return Address.parse(address as string)
}

// const _getWalletData = async (jettonWallet: Address) => {
//     let res = await client.callGetMethod(jettonWallet, "get_wallet_data", []);

//     const balance = hexToBn(res.stack[0][1]);
//     const walletOwner = bytesToAddress(res.stack[1][1].bytes);
//     const jettonMaster = bytesToAddress(res.stack[2][1].bytes);

//     return {
//         balance,
//         walletOwner,
//         jettonMaster,
//     };
// };

export async function _getJettonBalance(
  jettonWallet: Address,
  minterAddress?: Address
) {
  try {
    console.log(
      `fetching wallet_data from jettonWallet ${jettonWallet.toFriendly()}`
    );

    let res = await client.callGetMethod(jettonWallet, "get_wallet_data", []);
    const balance = hexToBn(res.stack[0][1]);
    const walletOwner = bytesToAddress(res.stack[1][1].bytes);
    const jettonMaster = bytesToAddress(res.stack[2][1].bytes);
    return {
      balance,
      walletOwner,
      jettonMaster,
    };
  } catch (e) {
    console.log(e);
    
    return {
      balance: new BN(0),
      walletOwner: getOwner(),
      jettonMaster: minterAddress,
    };
  }
}

export const getTokenBalanceByMinter = async (minterAddress: Address) => {
  let cell = new Cell();
  cell.bits.writeAddress(getOwner());
  const b64data = bytesToBase64(await cell.toBoc({ idx: false }));
  const jettonWallet = await callWithRetry(
    minterAddress,
    "get_wallet_address",
    [["tvm.Slice", b64data]]
  );

  let jettonWalletAddress = bytesToAddress(jettonWallet.stack[0][1].bytes);
  return _getJettonBalance(jettonWalletAddress, minterAddress);
  // jettonWalletAddress = Address.parse("kQBaIvo07zP5git3cfVmImayYzTfhKT3L2wZmE2qBIVbaCXv");
};

export const getTonBalance = async () => {
  const address = localStorage.getItem(LOCAL_STORAGE_ADDRESS) as string;
  if(!address){
    throw new Error('Address missing')
  }
  
  const balance = await client.getBalance(Address.parse(address));

  return parseNumber(new BN(balance));
};

async function getAmountOut(
  minterAddress: Address,
  amountIn: BN,
  reserveIn: BN,
  reserveOut: BN
) {
  console.log(`fromNano(amountIn), fromNano(reserveIn), fromNano(reserveOut)`);
  console.log(fromNano(amountIn), fromNano(reserveIn), fromNano(reserveOut));

  let res = await client.callGetMethod(minterAddress, "get_amount_out", [
    ["num", amountIn.toString()],
    ["num", reserveIn.toString()],
    ["num", reserveOut.toString()],
  ]);
  console.log(hexToBn(res.stack[0][1]).toString());
  
  return hexToBn(res.stack[0][1]).toString();
}


export async function tokenToMinter(token:string) {
  return (await getToken(client, token, getOwner())).ammMinter
}

export const getAmountsOut = async (
  token: string,
  isSourceToken: boolean,
  srcAmount: BN | null,
  destAmount: BN | null
) => {
  const tokenAmm = (await getToken(client, token, getOwner())).ammMinter;

  const tokenData = await getPoolData(tokenAmm!!);

  if (srcAmount) {
    // TODO
    const amountIn = srcAmount;
    if (isSourceToken) {
      return getAmountOut(
        tokenAmm!!,
        amountIn,
        tokenData.tokenReserves,
        tokenData.tonReserves
      );
    } else {
      return getAmountOut(
        tokenAmm!!,
        amountIn,
        tokenData.tonReserves,
        tokenData.tokenReserves
      );
    }
  } else {  // Dest amount
    // when calculating in amount by inputing dest amount we reverse the isSourceToken falg
    const amountIn = destAmount || new BN(0);
    if (!isSourceToken) {
      return getAmountOut(
        tokenAmm!!,
        amountIn,
        tokenData.tokenReserves,
        tokenData.tonReserves
      );
    } else {
      return getAmountOut(
        tokenAmm!!,
        new BN(amountIn),
        new BN(tokenData.tonReserves),
        new BN(tokenData.tokenReserves)
      );
    }
  }
};

export async function getPoolInfo(token: string) {
  const tokenObjects: any = await getToken(
    client,
    token,
    getOwner()
  );
  return getPoolData(tokenObjects.ammMinter);
}

export async function getPoolData(ammMinter: Address) {
  let res = await client.callGetMethod(ammMinter, "get_jetton_data", []);
  
  const totalSupply = hexToBn(res.stack[0][1]);
  const mintable = res.stack[1][1] as string;
  const jettonWalletAddressBytes = res.stack[2][1].bytes as string;
  const tonReserves = hexToBn(res.stack[3][1]);
  const tokenReserves = hexToBn(res.stack[4][1]);
  return {
    totalSupply,
    jettonWalletAddress: bytesToAddress(jettonWalletAddressBytes),
    mintable,
    tonReserves,
    tokenReserves,
  };
}

export async function getTokenData(jettonAddress: Address) {
  let jettonDataRes = await client.callGetMethod(jettonAddress, "get_jetton_data", []);
  const totalSupply = hexToBn(jettonDataRes.stack[0][1]);
  const owner = b64ToCell(jettonDataRes.stack[2][1].bytes).beginParse().readAddress();
  
  let cell = Cell.fromBoc(Buffer.from(jettonDataRes.stack[3][1].bytes, "base64"))[0];
  
  // metadata is on chain 

  // metadata is string 
  //let uri = readString(cell);
  let metadata;
  try {
    let uri = cellToString(cell);
    //uri = "https://api.npoint.io/402e32572b294e845cde"
    if(uri.length == 2) {
      throw "onchain data";
    }
    let metadataRes = await fetch(uri);
    metadata = await metadataRes.json();
  } catch(e) {
    metadata = parseJettonOnchainMetadata(cell.beginParse()).metadata;
  }

  return {
    owner,
    totalSupply,
     ... metadata
  };
}

export const getLiquidityAmount = async (
  srcToken: string,
  destToken: string,
  srcAmount: string | null,
  destAmount: string | null
): Promise<BN> => {
  const tokenObjects: any = await getToken(
    client,
    srcToken !== "ton" ? srcToken : destToken,
    getOwner()
  );
  const lpTokenData = await getPoolData(tokenObjects.ammMinter);

  const tokenReserves = lpTokenData.tokenReserves;
  const tonReserves = lpTokenData.tonReserves;
  if(tokenReserves.toNumber() === 0 && tonReserves.toNumber() === 0) {
    return new BN(0)
  }


  console.log(
    `tokenReserves: ${fromNano(tokenReserves)} tonReserves: ${fromNano(
      tonReserves
    )}`
  );

  // return muldiv(amount_a, reserve_b, reserve_a);

  if (srcToken === "ton") {
    if (srcAmount != null) {
      return new BN(srcAmount)
        .mul(tokenReserves)
        .div(tonReserves)
    } else if (destAmount != null) {
      return toNano(destAmount)
        .mul(tonReserves)
        .div(tokenReserves)
    }
  } else {
    if (srcAmount != null) {
      return new BN(srcAmount)
        .mul(tokenReserves)
        .div(tonReserves)
    } else if (destAmount != null) {
      return new BN(destAmount)
        .mul(tonReserves)
        .div(tokenReserves)
    }
  }
  return new BN(0);
};

export const getTokenDollarValue = async (
  token: string,
  amount: string
): Promise<string> => {
  let ratio = 1;
  
  if (token !== "ton") {
    
    const tokenData = await getToken(client, token, getOwner());
    const lpTokenData = await getPoolData(tokenData.ammMinter!!);
    const tokenReserves = lpTokenData.tokenReserves;
    const tonReserves = lpTokenData.tonReserves;
    // TODO !
    ratio = parseFloat(fromNano(tonReserves.mul(new BN(1e9)).div(tokenReserves)));
  }
  console.log({ratio: ratio.toString()});
  
  const cgPrice = await fetchPrice();
  const tonPriceWithAmount = toNano(amount).mul(toNano(cgPrice)).div(new BN(1e9));

  return  fromNano(tonPriceWithAmount.mul(toNano(ratio) ).div(new BN(1e9)));
};

let tonPrice = 0;

async function fetchPrice() {
  if (tonPrice) {
    return tonPrice;
  }
  const coinsResponse = await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`
  );
  const result = await coinsResponse.json();
  tonPrice = parseFloat(result["the-open-network"].usd);
  setTimeout(() => (tonPrice = 0), 60 * 1000);
  return tonPrice;
}

export const generateSellLink = async (
  token: string,
  tokenAmount: string,
  tonAmount: string
) => {
  const tokenData = await getToken(client, token, getOwner());
  let transfer = DexActions.transferOverload(
      tokenData.ammMinter!!,
      toNano(tokenAmount),
      getOwner(), // owner wallet should get jetton-wallet excess messages + tons
      toNano(GAS_FEE.FORWARD_TON),
      OPS.SWAP_TOKEN,
      toNano(tonAmount).mul(new BN(995)).div(new BN(1000))
  );
  const boc64 = transfer.toBoc().toString("base64");
  const value = toNano(GAS_FEE.SWAP);
  return sendTransaction(tokenData.jettonWallet, value, boc64);
};

export const generateBuyLink = async (
  token: string,
  tonAmount: string,
  tokenAmount: string
) => {
  // 0.5% slippage
  //TODO add slippage explicit
  let transfer = await DexActions.swapTon(
    toNano(tonAmount),
    toNano(tokenAmount).mul(new BN(995)).div(new BN(1000))
  );
  const boc64 = transfer.toBoc().toString("base64");
  const tokenObjects = await getToken(client, token, getOwner());
  const value = toNano(tonAmount).add(toNano(GAS_FEE.SWAP));
  return sendTransaction(tokenObjects.ammMinter!!, value, boc64);
};

export const generateAddLiquidityLink = async (
  token: string,
  tonAmount: string,
  tokenAmount: string
) => {
  
  const tokenData = await getToken(client, token, getOwner());
  const slippage = new BN(5); // TODO
  const transferAndLiq = await DexActions.addLiquidity(
    tokenData.ammMinter!!,
    toNano(tokenAmount),
    getOwner(), // owner wallet should get jetton-wallet excess messages + tons
    toNano(tonAmount).add( toNano( GAS_FEE.FORWARD_TON)),
    slippage,
    toNano(tonAmount)  // TODO dust issue 
  );
  const boc64 = transferAndLiq.toBoc().toString("base64");
  const value = toNano(tonAmount).add(toNano(GAS_FEE.ADD_LIQUIDITY ));
  return sendTransaction(tokenData.jettonWallet, value, boc64);
};

export const generateRemoveLiquidityLink = async (
  token: string,
  tonAmount: number | string
) => {
  const tokenData = await getToken(client, token, getOwner());
  const jettonData = await getPoolData(tokenData.ammMinter!!);

  let shareToRemove = toNano(tonAmount)
    .mul(jettonData.totalSupply)
    .div(jettonData.tonReserves);

  const userLpBalance = (await getLPTokenBalance(token)).balance;
  // round up 98 and above to use the max lp

  
  if((shareToRemove.mul(new BN(100)).div(userLpBalance).gte(new BN(98)) )) {
    shareToRemove = userLpBalance;
  }
  
  const removeLiquidity = await DexActions.removeLiquidity(
    shareToRemove,
    getOwner()
  );
  const boc64 = removeLiquidity.toBoc().toString("base64");
  const tokenObjects: any = await getToken(client, token, getOwner());
  const value = toNano(GAS_FEE.REMOVE_LIQUIDITY);
  return sendTransaction(tokenObjects.lpWallet, value, boc64);
};



function sendTransaction(to: Address, value: BN, boc64: string, stateInit = null) {
  return {
    to: to.toFriendly(),
    value: value.toString(),
    timeout: 5 * 60 * 1000,
    //stateInit,
    payload: boc64,
  };
}

export const getSeqno = async (
  address: string
): Promise<{ gas_used: number; stack: any[] }> => {
  return client.callGetMethod(Address.parse(address), "seqno", []);
};
 


function readString(cell: Cell) {
  let str ="";
  let slice = cell.beginParse();
  let len = slice.readUint(10);
  return slice.readBuffer(len.toNumber()).toString();
}

function readString2(cell: Cell) {
  let str ="";
  return cellToString
}


function b64ToCell(b64: string) {
  return Cell.fromBoc(Buffer.from(b64, "base64"))[0];
}