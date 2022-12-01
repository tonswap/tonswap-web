import { Address, Cell, toNano, TonClient, fromNano, Wallet } from "ton";
import { cellToString, delay, fromDecimals, hexToBn, toDecimals } from "utils";
import { DexActions } from "./dex";
import { bytesToAddress, bytesToBase64, getToken, PoolInfo, Pools } from "./addresses";
import BN from "bn.js";
import { OPS } from "./ops";
import { BASE_ERROR_MESSAGE, LOCAL_STORAGE_ADDRESS } from "consts";
import { parseJettonOnchainMetadata } from "./deploy-pool";
import axios from "axios";
import store from "store/store";
import { getWalletAddress } from "store/wallet/utils";
import i18next from "i18next";

let rpcUrl = "https://mainnet.tonhubapi.com/jsonRPC";

if (document.location.href.indexOf("testnet=") > -1) {
    rpcUrl = "https://testnet.tonhubapi.com/jsonRPC";
} else if (document.location.href.indexOf("sandbox=") > -1) {
    rpcUrl = "https://sandbox.tonhubapi.com/jsonRPC";
}

/* eslint no-eval: 0 */
export const client = new TonClient({
    endpoint: rpcUrl,
    //apiKey: "j46He&x63GFc",
});

export enum GAS_FEE {
    SWAP = 0.14,
    FORWARD_TON = 0.09,
    ADD_LIQUIDITY_FORWARD_TON = 0.12, //0.12
    ADD_LIQUIDITY = 0.2,
    REMOVE_LIQUIDITY = 0.2,
}

const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

export const isContractDeployed = (address: string) => {
    return client.isContractDeployed(Address.parse(address));
};

const callWithRetry = async (address: Address, method: string, params: any) => {
    try {
        return await client.callGetMethod(address, method, params);
    } catch (ignore) {
        await sleep(500);
        return client.callGetMethod(address, method, params);
    }
};

export const getTokenBalance = async (token: PoolInfo) => {
    const tokenData = await getToken(client, token.tokenMinter, getOwner());

    //sending jetton master, + owner wallet will resolve to jetton wallet and fetch the balance

    return getTokenBalanceByMinter(Address.parse(tokenData.tokenMinter!!));
};

export const getLPTokenBalance = async (token: string) => {
    const tokenData = await getToken(client, token, getOwner());
    return _getJettonBalance(tokenData.lpWallet, Address.parse(tokenData.ammMinter!!));
};

export const getTokensOfLPBalances = async (token: string) => {
    const tokenObject = await getToken(client, token, getOwner());
    const [jettonData, lpBalance] = await Promise.all([getPoolData(Address.parse(tokenObject.ammMinter!!)), getLPTokenBalance(token)]);
    if (lpBalance.balance.toString() === "0") {
        return [fromDecimals("0", tokenObject.decimals), fromDecimals("0", tokenObject.decimals)];
    }
    const tonSide = lpBalance.balance.mul(jettonData.tonReserves).div(jettonData.totalSupply);

    const tokenSide = lpBalance.balance.mul(jettonData.tokenReserves).div(jettonData.totalSupply);

    return [fromDecimals(tonSide, 9), fromDecimals(tokenSide, tokenObject.decimals)];
};

function getOwner() {
    const address = getWalletAddress();

    if (!address) throw new Error("No owner logged in");
    return Address.parse(address as string);
}

export async function _getJettonBalance(jettonWallet: Address, minterAddress?: Address) {
    try {
        console.log(`_getJettonBalance::  jettonWallet at ${jettonWallet.toFriendly()}`);

        let res = await client.callGetMethod(jettonWallet, "get_wallet_data", []);
        const balance = hexToBn(res.stack[0][1]);
        const walletOwner = bytesToAddress(res.stack[1][1].bytes);
        const jettonMaster = bytesToAddress(res.stack[2][1].bytes);
        const { decimals } = await getTokenData(minterAddress!);
        return {
            balance,
            walletOwner,
            jettonMaster,
            decimals,
        };
    } catch (e) {
        console.log(e);

        return {
            balance: new BN(0),
            walletOwner: getOwner(),
            jettonMaster: minterAddress,
            decimals: 9,
        };
    }
}

export const getTokenBalanceByMinter = async (minterAddress: Address) => {
    let cell = new Cell();
    cell.bits.writeAddress(getOwner());
    const b64data = bytesToBase64(await cell.toBoc({ idx: false }));
    const jettonWallet = await callWithRetry(minterAddress, "get_wallet_address", [["tvm.Slice", b64data]]);

    let jettonWalletAddress = bytesToAddress(jettonWallet.stack[0][1].bytes);
    return _getJettonBalance(jettonWalletAddress, minterAddress);
    // jettonWalletAddress = Address.parse("kQBaIvo07zP5git3cfVmImayYzTfhKT3L2wZmE2qBIVbaCXv");
};

export const getTonBalance = async () => {
    const balance = await client.getBalance(getOwner());

    return fromNano(balance);
};

async function getAmountOut(minterAddress: Address, amountIn: BN, reserveIn: BN, reserveOut: BN) {
    console.log(amountIn.toString(), reserveIn.toString(), reserveOut.toString());

    let res = await client.callGetMethod(minterAddress, "get_amount_out", [
        ["num", amountIn.toString()],
        ["num", reserveIn.toString()],
        ["num", reserveOut.toString()],
    ]);
    console.log(`GetAmountOut(amountIn), (reserveIn), (reserveOut) =>`, hexToBn(res.stack[0][1]).toString());

    return hexToBn(res.stack[0][1]).toString();
}

async function getAmountIn2(minterAddress: Address, amountOut: BN, reserveIn: BN, reserveOut: BN) {
    console.log(`amountIn.toString(), reserveIn.toString(), reserveOut.toString()`);
    console.log(fromDecimals(amountOut, 18), fromDecimals(reserveIn, 9), fromDecimals(reserveOut, 18));

    let res = await client.callGetMethod(minterAddress, "get_amount_in", [
        ["num", amountOut.toString()],
        ["num", reserveIn.toString()],
        ["num", reserveOut.toString()],
    ]);
    console.log(`getAmountIn2(amountIn), (reserveIn), (reserveOut)`);
    console.log("getAmountIn2=", hexToBn(res.stack[0][1]).toString());

    return hexToBn(res.stack[0][1]).toString();
}

export async function tokenToMinter(token: string) {
    return (await getToken(client, token, getOwner())).ammMinter;
}

export const getAmountsOut = async (tokenName: string, isSourceToken: boolean, srcAmount: BN | null, destAmount: BN | null) => {
    const token = Pools()[tokenName];
    const tokenAmm = token.ammMinter;

    if (!tokenAmm) {
        throw new Error("Amm address missing");
    }

    const tokenData = await getPoolData(Address.parse(tokenAmm!!), token.ammVersion);
    const tokenAmmAddr = Address.parse(tokenAmm!!);

    // Top Box Has value
    if (srcAmount) {
        const amountIn = srcAmount;
        if (isSourceToken) {
            return getAmountOut(tokenAmmAddr, amountIn, tokenData.tokenReserves, tokenData.tonReserves);
        } else {
            return getAmountOut(tokenAmmAddr, amountIn, tokenData.tonReserves, tokenData.tokenReserves);
        }
    } else {
        // Dest amount
        // when calculating in amount by inputing dest amount we reverse the isSourceToken falg
        const amountIn = destAmount || new BN(0);
        // Token -> TON
        if (!isSourceToken) {
            return getAmountIn2(tokenAmmAddr, new BN(amountIn), tokenData.tonReserves, tokenData.tokenReserves);
            //  TON -> Token
        } else {
            return getAmountIn2(tokenAmmAddr, new BN(amountIn), tokenData.tokenReserves, tokenData.tonReserves);
        }
    }
};

export async function getPoolInfo(token: string) {
    const tokenObjects: any = await getToken(client, token, getOwner());
    return getPoolData(tokenObjects.ammMinter, tokenObjects.ammVersion);
}
//tokenReserves -> Liquidity
export async function getPoolData(ammMinter: Address, version = 1.2) {
    let command = version == 1.1 ? "get_jetton_data" : "get_pool_data";
    let res = await client.callGetMethod(ammMinter, command, []);

    const totalSupply = hexToBn(res.stack[0][1]);
    const mintable = res.stack[1][1] as string;
    const jettonWalletAddressBytes = res.stack[2][1].bytes as string;
    const tonReserves = hexToBn(res.stack[3][1]);
    const tokenReserves = hexToBn(res.stack[4][1]);
    const admin = res.stack[5][1].bytes as string;
    return {
        totalSupply,
        jettonWalletAddress: bytesToAddress(jettonWalletAddressBytes),
        //  adminAddress: bytesToAddress(admin),
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
        if (uri.length == 2) {
            throw "onchain data";
        }

        let metadataRes = await fetch(uri.replace("ipfs://", "https://ipfs.io/ipfs/"));
        metadata = await metadataRes.json();
    } catch (e) {
        metadata = parseJettonOnchainMetadata(cell.beginParse()).metadata;
    }

    let image: string | undefined;

    return {
        owner,
        totalSupply,
        decimals: 9, // override by metadata
        ...metadata,
    };
}

export const getLiquidityAmount = async (srcToken: string, destToken: string, srcAmount: BN | null, destAmount: BN | null): Promise<BN> => {
    const tokenObjects: any = await getToken(client, srcToken !== "ton" ? srcToken : destToken, getOwner());
    const lpTokenData = await getPoolData(tokenObjects.ammMinter, tokenObjects.ammVersion);

    const tokenReserves = lpTokenData.tokenReserves;
    const tonReserves = lpTokenData.tonReserves;
    if (tokenReserves.toString() === "0" && tonReserves.toString() === "0") {
        return new BN(0);
    }

    console.log(`tokenReserves: ${fromDecimals(tokenReserves, tokenObjects.decimals)} tonReserves: ${fromDecimals(tonReserves, 9)}`);

    if (srcToken === "ton") {
        if (srcAmount != null) {
            return new BN(srcAmount).mul(tokenReserves).div(tonReserves);
        } else if (destAmount != null) {
            return toDecimals(destAmount, tokenObjects.decimals).mul(tonReserves).div(tokenReserves);
        }
    } else {
        if (srcAmount != null) {
            return new BN(srcAmount).mul(tokenReserves).div(tonReserves);
        } else if (destAmount != null) {
            return new BN(destAmount).mul(tonReserves).div(tokenReserves);
        }
    }
    return new BN(0);
};

export const getTokenDollarValue = async (tokenName: string, amount: string): Promise<string> => {
    let ratio = new BN(1);
    const token = Pools()[tokenName];
    const cgPrice = await fetchPrice();

    let price = new BN(cgPrice);
    if (tokenName == "ton") {
        return (cgPrice * Number(amount)).toFixed(2);
    }

    const tokenAmmMinter = token.ammMinter;
    if (!tokenAmmMinter) {
        throw new Error("Amm minter missing");
    }
    const lpTokenData = await getPoolData(Address.parse(tokenAmmMinter), token.ammVersion);
    const tokenReserves = lpTokenData.tokenReserves;
    const tonReserves = lpTokenData.tonReserves;
    let nominator = toDecimals(tonReserves, token.decimals * 2);
    ratio = nominator.div(tokenReserves);
    price = new BN(cgPrice * 1e9).mul(ratio);

    const tonPriceWithAmount = price.mul(new BN(amount.replace(".", "")));
    console.log("tonPriceWithAmount =>", fromDecimals(tonPriceWithAmount, token.decimals));

    return fromDecimals(tonPriceWithAmount, token.decimals * 2 + 18);
};

let disabledTokenCache: { [index: string]: number } = {};

export const fetchDisabledTokensPrice = async (name: string) => {
    if (disabledTokenCache[name]) {
        return disabledTokenCache[name].toFixed();
    }
    const coinsResponse = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`
    );

    const result = await coinsResponse.json();
    let usd = result[name].usd;
    disabledTokenCache[name] = usd;
    return usd.toFixed(2);
};

let tonPrice = 0;
let cgPromise: Promise<Response> | null;

async function fetchPrice() {
    console.log("cgPromise", cgPromise);

    if (cgPromise) {
        await new Promise(async (resolve) => {
            await cgPromise;
            setTimeout(resolve, 20);
        });
    }

    if (tonPrice) {
        return tonPrice;
    }
    cgPromise = fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`
    );
    let coinsResponse = await cgPromise;
    const result = await coinsResponse.json();
    tonPrice = parseFloat(result["the-open-network"].usd);
    setTimeout(() => (tonPrice = 0), 60 * 3 * 1000);
    return tonPrice;
}

export const generateSellLink = async (token: string, tokenAmount: string, tonAmount: string) => {
    const tokenData = await getToken(client, token, getOwner());
    let transfer = DexActions.transferOverload(
        Address.parse(tokenData.ammMinter!!),
        toDecimals(tokenAmount, tokenData.decimals),
        getOwner(), // owner wallet should get jetton-wallet excess messages + tons
        toNano(GAS_FEE.FORWARD_TON),
        OPS.SWAP_TOKEN,
        toNano(tonAmount).mul(new BN(995)).div(new BN(1000))
    );
    const boc64 = transfer.toBoc().toString("base64");
    const value = toNano(GAS_FEE.SWAP);
    return sendTransaction(tokenData.jettonWallet, value, boc64);
};

export const generateBuyLink = async (token: string, tonAmount: string, tokenAmount: string) => {
    // 0.5% slippage
    //TODO add slippage explicit
    const tokenObjects = await getToken(client, token, getOwner());
    let transfer = await DexActions.swapTon(toNano(tonAmount), toDecimals(tokenAmount, tokenObjects.decimals).mul(new BN(995)).div(new BN(1000)));
    const boc64 = transfer.toBoc().toString("base64");
    const value = toNano(tonAmount).add(toNano(GAS_FEE.SWAP));
    return sendTransaction(Address.parse(tokenObjects.ammMinter!!), value, boc64);
};

export const generateAddLiquidityLink = async (token: string, tonAmount: string, tokenAmount: string) => {
    const tokenData = await getToken(client, token, getOwner());
    const slippage = new BN(5);
    const transferAndLiq = await DexActions.addLiquidity(
        Address.parse(tokenData.ammMinter!!),
        toDecimals(tokenAmount, tokenData.decimals),
        getOwner(), // owner wallet should get jetton-wallet excess messages + tons
        toNano(tonAmount).add(toNano(GAS_FEE.FORWARD_TON)),
        slippage,
        toNano(tonAmount) // TODO dust issue
    );
    const boc64 = transferAndLiq.toBoc().toString("base64");
    const value = toNano(tonAmount).add(toNano(GAS_FEE.ADD_LIQUIDITY));
    return sendTransaction(tokenData.jettonWallet, value, boc64);
};

export const generateRemoveLiquidityLink = async (token: string, tonAmount: number | string) => {
    const tokenData = await getToken(client, token, getOwner());
    const jettonData = await getPoolData(Address.parse(tokenData.ammMinter!!));

    let shareToRemove = toNano(tonAmount).mul(jettonData.totalSupply).div(jettonData.tonReserves);

    const userLpBalance = (await getLPTokenBalance(token)).balance;
    // round up 98 and above to use the max lp
    // if (shareToRemove.mul(new BN(100)).div(userLpBalance).gte(new BN(98))) {
    //     shareToRemove = userLpBalance;
    // }

    const removeLiquidity = await DexActions.removeLiquidity(shareToRemove, getOwner());
    const boc64 = removeLiquidity.toBoc().toString("base64");
    const tokenObjects: any = await getToken(client, token, getOwner());
    const value = toNano(GAS_FEE.REMOVE_LIQUIDITY);
    return sendTransaction(tokenObjects.lpWallet, value, boc64);
};

function sendTransaction(to: Address, value: BN, boc64: string, stateInit = null) {
    return {
        to: to.toFriendly({ bounceable: true }),
        value: value.toString(),
        timeout: 5 * 60 * 1000,
        //stateInit,
        payload: boc64,
    };
}

export async function waitForSeqno(wallet: Wallet) {
    const seqnoBefore = await wallet.getSeqNo();

    return async () => {
        for (let attempt = 0; attempt < 20; attempt++) {
            await delay(3000);
            let seqnoAfter;

            try {
                seqnoAfter = await wallet.getSeqNo();
            } catch (error) {}

            if (seqnoAfter && seqnoAfter > seqnoBefore) return;
        }
        throw new Error(BASE_ERROR_MESSAGE);
    };
}

export function waitForContractDeploy(contractAddress: string) {
    return async () => {
        for (let attempt = 0; attempt < 20; attempt++) {
            await delay(3000);
            let isDeployed;

            try {
                isDeployed = await isContractDeployed(contractAddress);
            } catch (error) {}

            if (isDeployed) return;
        }
        throw new Error(BASE_ERROR_MESSAGE);
    };
}

function readString(cell: Cell) {
    let str = "";
    let slice = cell.beginParse();
    let len = slice.readUint(10);
    return slice.readBuffer(len.toNumber()).toString();
}

function readString2(cell: Cell) {
    let str = "";
    return cellToString;
}

function b64ToCell(b64: string) {
    return Cell.fromBoc(Buffer.from(b64, "base64"))[0];
}
