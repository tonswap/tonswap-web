import { Address, Cell, toNano, TonClient, fromNano } from "ton";
import { hexToBn } from "utils";
import { DexActions } from "./dex";
import { Token } from "types";
import { bytesToAddress, bytesToBase64, getToken } from "./addresses";
import BN from "bn.js";
import { OPS } from "./ops";

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

enum GAS_FEE {
    SWAP = 0.2,
    FORWARD_TON = 0.05,
    ADD_LIQUIDITY = 0.2,
    REMOVE_LIQUIDITY = 0.2,
}

const sleep = (milliseconds: number) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
};

const callWithRetry = async (address: Address, method: string, params: any) => {
    try {
        return await client.callGetMethod(address, method, params);
    } catch (ignore) {
        await sleep(500);
        return client.callGetMethod(address, method, params);
    }
};

export const getTokenBalance = async (token: Token) => {
    const tokenData = await getToken(client, token.name, getOwner());
    //sending jetton master, + owner wallet will resolve to jetton wallet and fetch the balance
    return _getTokenBalance(tokenData.tokenMinter);
};

export const getLPTokenBalance = async (token: string) => {
    const tokenData = await getToken(client, token, getOwner());
    return _getJettonBalance(tokenData.lpWallet, tokenData.ammMinter);
};

export const getTokensOfLPBalances = async (token: string) => {
    const tokenObjects = await getToken(client, token, getOwner());
    const [jettonData, lpBalance] = await Promise.all([getJettonData(tokenObjects.ammMinter), getLPTokenBalance(token)]);
    if (lpBalance.balance.toString() === "0") {
        return [fromNano("0"), fromNano("0")];
    }
    const tonSide2 = lpBalance.balance.mul(jettonData.tonReserves).div(jettonData.totalSupply);
    const tokenSide2 = lpBalance.balance.mul(jettonData.tokenReserves).div(jettonData.totalSupply);

    return [fromNano(tonSide2), fromNano(tokenSide2)];
};

// TODO: Remove later
(window as any).getLPTokenBalance = getLPTokenBalance;
(window as any).getData = getJettonData;

const parseNumber = (num: any, units: number = 9, decimalPoints: number = 4): number => {
    if (num.toString().length <= 9) {
        return parseFloat(parseFloat("0." + num.toString().padStart(units).replaceAll(" ", "0")).toFixed(decimalPoints));
    } else {
        return parseFloat(parseFloat(num.div(new BN(10 ** units)).toString() + "." + num.mod(new BN(10 ** units)).toString()).toFixed(decimalPoints));
    }
};

function getOwner() {
    return Address.parse(localStorage.getItem("address") as string);
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

export async function _getJettonBalance(jettonWallet: Address, minterAddress: Address) {
    try {
        console.log(`fetching wallet_data from jettonWallet ${jettonWallet.toFriendly()}`);

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
        return {
            balance: new BN(0),
            walletOwner: getOwner(),
            jettonMaster: minterAddress,
        };
    }
}

const _getTokenBalance = async (minterAddress: Address) => {
    let cell = new Cell();
    cell.bits.writeAddress(getOwner());
    const b64data = bytesToBase64(await cell.toBoc({ idx: false }));
    const jettonWallet = await callWithRetry(minterAddress, "get_wallet_address", [["tvm.Slice", b64data]]);

    let jettonWalletAddress = bytesToAddress(jettonWallet.stack[0][1].bytes);
    return _getJettonBalance(jettonWalletAddress, minterAddress);
    // jettonWalletAddress = Address.parse("kQBaIvo07zP5git3cfVmImayYzTfhKT3L2wZmE2qBIVbaCXv");
};

export const getTonBalance = async () => {
    const address = localStorage.getItem("address") as string;
    const balance = await client.getBalance(Address.parse(address));

    return parseNumber(new BN(balance));
};

async function getAmountOut(minterAddress: Address, amountIn: BN, reserveIn: BN, reserveOut: BN) {
    console.log(`fromNano(amountIn), fromNano(reserveIn), fromNano(reserveOut)`);
    console.log(fromNano(amountIn), fromNano(reserveIn), fromNano(reserveOut));

    let res = await client.callGetMethod(minterAddress, "get_amount_out", [
        ["num", amountIn.toString()],
        ["num", reserveIn.toString()],
        ["num", reserveOut.toString()],
    ]);

    return hexToBn(res.stack[0][1]).toString();
}

export const getAmountsOut = async (token: string, isSourceToken: boolean, srcAmount: number | null, destAmount: number | null) => {
    const tokenAmm = (await getToken(client, token, getOwner())).ammMinter;
    const tokenData = await getJettonData(tokenAmm);

    if (srcAmount) {
        // TODO
        const amountIn = toNano(srcAmount);
        if (isSourceToken) {
            return getAmountOut(tokenAmm, new BN(amountIn), new BN(tokenData.tokenReserves), new BN(tokenData.tonReserves));
        } else {
            return getAmountOut(tokenAmm, new BN(amountIn), new BN(tokenData.tonReserves), new BN(tokenData.tokenReserves));
        }
    } else {
        // TODO
        const amountIn = toNano(destAmount || 0);
        if (isSourceToken) {
            return getAmountOut(tokenAmm, new BN(amountIn), new BN(tokenData.tokenReserves), new BN(tokenData.tonReserves));
        } else {
            return getAmountOut(tokenAmm, new BN(amountIn), new BN(tokenData.tonReserves), new BN(tokenData.tokenReserves));
        }
    }
};

async function getJettonData(ammMinter: Address) {
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

export const getLiquidityAmount = async (srcToken: string, destToken: string, srcAmount: number | null, destAmount: number | null): Promise<number> => {
    const tokenObjects: any = await getToken(client, srcToken !== "ton" ? srcToken : destToken, getOwner());
    const lpTokenData = await getJettonData(tokenObjects.ammMinter);

    const tokenReserves = lpTokenData.tokenReserves;
    const tonReserves = lpTokenData.tonReserves;

    console.log(`tokenReserves: ${fromNano(tokenReserves)} tonReserves: ${fromNano(tonReserves)}`);

    // return muldiv(amount_a, reserve_b, reserve_a);

    if (srcToken === "ton") {
        if (srcAmount != null) {
            return new BN(srcAmount * 1e9).mul(tokenReserves).div(tonReserves).toNumber();
        } else if (destAmount != null) {
            return new BN(destAmount * 1e9).mul(tonReserves).div(tokenReserves).toNumber();
        }
    } else {
        if (srcAmount != null) {
            return new BN(srcAmount * 1e9).mul(tokenReserves).div(tonReserves).toNumber();
        } else if (destAmount != null) {
            return new BN(destAmount * 1e9).mul(tonReserves).div(tokenReserves).toNumber();
        }
    }
    return 0;
};

export const getTokenDollarValue = async (token: string, amount: number): Promise<number> => {
    let ratio = 1;

    if (token !== "ton") {
        const tokenData = await getToken(client, token, getOwner());
        const lpTokenData = await getJettonData(tokenData.ammMinter);

        const tokenReserves = lpTokenData.tokenReserves;
        const tonReserves = lpTokenData.tonReserves;

        ratio = tonReserves.mul(new BN(1e9)).div(tokenReserves).toNumber() / 1e9;
    }

    const cgPrice = await fetchPrice();
    const tonPriceWithAmount = cgPrice * amount;

    return parseFloat((tonPriceWithAmount * ratio).toFixed(4));
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

export const generateSellLink = async (token: string, tokenAmount: number, minAmountOut: number) => {
    const tokenData = await getToken(client, token, getOwner());

    let transfer = DexActions.transferOverload(tokenData.ammMinter, toNano(tokenAmount), tokenData.ammMinter, toNano(GAS_FEE.FORWARD_TON), OPS.SWAP_TOKEN, toNano(minAmountOut));
    const boc64 = transfer.toBoc().toString("base64");

    const provider = (window as any).ton;
    const value = toNano(GAS_FEE.SWAP);
    if (provider) {
        provider.send("ton_sendTransaction", [
            {
                to: tokenData.jettonWallet.toFriendly(),
                value: toNano(GAS_FEE.SWAP).toString(), // 10000 :
                data: boc64,
                dataType: "boc",
            },
        ]);
    } else {
        const deeplinkTransfer = `https://tonhub.com/transfer/${tokenData.jettonWallet.toFriendly()}?amount=${value}&bin=${boc64}`;

        return (window.location.href = deeplinkTransfer);
    }
};

export const generateBuyLink = async (token: string, tonAmount: number, tokenAmount: number) => {
    // 0.5% slippage
    //TODO add slippage explicit
    console.log(`tonAmount:${tonAmount} expecting tokens: ${tokenAmount}`);

    let transfer = await DexActions.swapTon(new BN(Math.floor(tonAmount * 1e9)), new BN(Math.floor(tokenAmount * 0.995 * 1e9)));
    const boc64 = transfer.toBoc().toString("base64");
    const tokenObjects = await getToken(client, token, getOwner());

    const provider = (window as any).ton;
    const value = toNano(tonAmount).add(toNano(GAS_FEE.SWAP));
    if (provider) {
        provider.send("ton_sendTransaction", [
            {
                to: tokenObjects.ammMinter.toFriendly(),
                value: value.toString(),
                data: boc64,
                dataType: "boc",
            },
        ]);
    } else {
        const deeplinkTransfer = `https://tonhub.com/transfer/${tokenObjects.ammMinter.toFriendly()}?amount=${value}&bin=${boc64}`;
        return (window.location.href = deeplinkTransfer);
    }
};

export const generateAddLiquidityLink = async (token: string, tonAmount: number, tokenAmount: number) => {
    const tokenData = await getToken(client, token, getOwner());

    const slippage = new BN(5);
    const transferAndLiq = await DexActions.addLiquidity(tokenData.ammMinter, toNano(tokenAmount), tokenData.ammMinter, toNano(tonAmount + GAS_FEE.FORWARD_TON), slippage, toNano(tonAmount));
    const boc64 = transferAndLiq.toBoc().toString("base64");

    const provider = (window as any).ton;
    const value = toNano(tonAmount).add(toNano(GAS_FEE.ADD_LIQUIDITY * 2));

    if (provider) {
        provider.send("ton_sendTransaction", [
            {
                to: tokenData.jettonWallet.toFriendly(),
                value: value.toString(),
                data: boc64,
                dataType: "boc",
            },
        ]);
    } else {
        const deeplink = `https://tonhub.com/transfer/${tokenData.jettonWallet.toFriendly()}?amount=${value}&bin=${boc64}`;

        return (window.location.href = deeplink);
    }
};

export const generateRemoveLiquidityLink = async (token: string, tonAmount: number | string) => {
    try {
        const tokenData = await getToken(client, token, getOwner());
        const jettonData = await getJettonData(tokenData.ammMinter);

        let shareToRemove = toNano(tonAmount).mul(jettonData.totalSupply).div(jettonData.tonReserves);
        console.log(`lpAmount2: ${shareToRemove.toString()}`);
        const transferAndLiq = await DexActions.removeLiquidity(shareToRemove, getOwner());

        const boc64 = transferAndLiq.toBoc().toString("base64");

        const tokenObjects: any = await getToken(client, token, getOwner());
        const provider = (window as any).ton;
        const value = toNano(GAS_FEE.REMOVE_LIQUIDITY);
        if (provider) {
            provider.send("ton_sendTransaction", [
                {
                    to: tokenObjects.lpWallet.toFriendly(),
                    value: value.toString(),
                    data: boc64,
                    dataType: "boc",
                },
            ]);
        } else {
            const deeplink = `https://tonhub.com/transfer/${tokenObjects.amm.toFriendly()}?amount=${value}&text=${boc64}`;
            return (window.location.href = deeplink);
        }
    } catch (error: any) {}
};
