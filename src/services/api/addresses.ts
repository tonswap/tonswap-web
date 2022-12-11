import { Cell, TonClient, Address } from "ton";
import Ton from "assets/images/tokens/ton.svg";

import DinoKorn from "assets/images/tokens/DinoKorn.png";
import KittyKorn from "assets/images/tokens/KittyKorn.png";
import Btc from "assets/images/tokens/btc1.svg";
import Eth from "assets/images/tokens/eth1.svg";
import Uni from "assets/images/tokens/uni1.svg";
import Usdc from "assets/images/tokens/usdc.svg";

import { localStorageTokensToObject } from "utils";

export type PoolInfo = {
    ammMinter: string;
    tokenMinter: string;
    image?: string;
    displayName: string;
    color: string;
    name: string;
    isCustom?: boolean;
    isDisabled?: boolean;
    decimals: number;
    ammVersion?: number;
};

export type PoolInfoRaw = {
    ammMinter?: string;
    tokenMinter?: string;
    image: string;
    displayName: string;
    color: string;
    name: string;
};

export const MainNetPoolsRoot: { [key: string]: PoolInfo } = {
    "EQC61IQRl0_la95t27xhIpjxZt32vl1QQVF2UgTNuvD18W-4": {
        ammMinter: "EQDnLbES4CER47LYR45Ti0cw4ScvPUJ3HShtH9FbIFGDACkj",
        tokenMinter: "EQC61IQRl0_la95t27xhIpjxZt32vl1QQVF2UgTNuvD18W-4",
        image: "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/usdc.png",
        displayName: "oUSDC",
        color: "#3EAAB1",
        name: "Orbit Bridge TON USD Coin",
        decimals: 6,
    },
    "EQAW42HutyDem98Be1f27PoXobghh81umTQ-cGgaKVmRLS7-": {
        ammMinter: "EQDXAi23o05pbnxMGIQVFDrZt6fdPeRZlMQ0sPPm0tpEju5I",
        tokenMinter: "EQAW42HutyDem98Be1f27PoXobghh81umTQ-cGgaKVmRLS7-",
        image: "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/eth.png",
        displayName: "oETH",
        color: "#3EAAB1",
        name: "Orbit Bridge TON Ethereum",
        decimals: 18,
    },
        "EQANasbzD5wdVx0qikebkchrH64zNgsB38oC9PVu7rG16qNB": {
        ammMinter: "EQA0b9fTX2eVTV8QfdyGlGUO6uTc2wWOs-7IsxqmU2FuOvvC",
        tokenMinter: "EQANasbzD5wdVx0qikebkchrH64zNgsB38oC9PVu7rG16qNB",
        image: "https://raw.githubusercontent.com/orbit-chain/bridge-token-image/main/ton/wbtc.png",
        displayName: "oWBTC",
        color: "#3EAAB1",
        name: "Orbit Bridge TON WBTC",
        decimals: 8,
    },
    "EQDCJL0iQHofcBBvFBHdVG233Ri2V4kCNFgfRT-gqAd3Oc86": {
        ammMinter: "EQCiC_tXfU9p5oACQY0naMZi0tZz-1oeKdB1mh3KjvpogFgB",
        tokenMinter: "EQDCJL0iQHofcBBvFBHdVG233Ri2V4kCNFgfRT-gqAd3Oc86",
        image: "https://media.fanz.ee/images/91ee938a92934656a01131c569b377b6.png",
        displayName: "FNZ",
        color: "#CCAAFF",
        name: "Fanzee Token",
        isCustom: true,
        decimals: 9,
    },
    "EQCcLAW537KnRg_aSPrnQJoyYjOZkzqYp6FVmRUvN1crSazV": {
        ammMinter: "EQB8Fmy0fbDNyEP_j0lZLbJqbEORgyWLEmJPJWMNbPy-vS_7",
        tokenMinter: "EQCcLAW537KnRg_aSPrnQJoyYjOZkzqYp6FVmRUvN1crSazV",
        image: "https://bafkreie6ydxbcmq7xqalyxvqo6tq4fo7ecycv5jy2dwafn2yhelcubjaeq.ipfs.nftstorage.link/",
        displayName: "AMBR",
        color: "#F8BD58",
        name: "Ambra",
        isCustom: true,
        decimals: 9,
    },
    "EQC4cCygTZPKIP9cCsWx7DW5i5MQPOsEcfKkKwBZKkRCCfaW": {
        name: "Wrapped Solana",
        ammMinter: "EQCIKZlDpIfc5l9mJOZj2xOeS2Ckfrm6OAcdJCUpM9T__MW6",
        tokenMinter: "EQC4cCygTZPKIP9cCsWx7DW5i5MQPOsEcfKkKwBZKkRCCfaW",
        displayName: "WSOL",
        image: "https://bafkreiadj3ntztd44xhntqu26kyubn2rihu24if7qncp4npn3pvwacl5wi.ipfs.nftstorage.link/",
        color: "#2fa4b0",
        decimals: 9,
    },
    "EQALr-K836vMmF5gOBzYmEHlS29-iG6AGsmHFzzgpMiy9ERi": {
        name: "Wrapped NEAR",
        ammMinter: "EQBJ4iUkm55hxNtLkG4gtLxQ2Mcvsne3u-OINdg0uFguK_wY",
        tokenMinter: "EQALr-K836vMmF5gOBzYmEHlS29-iG6AGsmHFzzgpMiy9ERi",
        displayName: "WNEAR",
        image: "https://bafkreifbyn4o56paustubq4v77ql62swvayr6ey3reiqrsveneauq2pfvy.ipfs.nftstorage.link/",
        color: "#515151",
        decimals: 9,
    },
    "EQAalp4hV8Ygl2lGxkVomZdsqY7McpqV6WBzm6GT8ziCXs_L": {
        name: "TonTake",
        ammMinter: "EQABNXuJt9Z-2v6bVeBrCl2tH15uT3M0WTGAKv3Lw5zCQsKu",
        tokenMinter: "EQAalp4hV8Ygl2lGxkVomZdsqY7McpqV6WBzm6GT8ziCXs_L",
        displayName: "TAKE",
        ammVersion: 1.1,
        image: "https://bafkreiayyylejgct6qme2xmnfy4eug3uc4tefyffrw4y3rhcojpq2colga.ipfs.nftstorage.link/",
        color: "#83ABCD",
        decimals: 9,
    },
    "EQB-ajMyi5-WKIgOHnbOGApfckUGbl6tDk3Qt8PKmb-xLAvp": {
        name: "TonexCoin",
        ammMinter: "EQBLNl0ixeqsDRCGOGEjA9Zsbf7Pjqpjjb0FqBkFjLktXO7E",
        tokenMinter: "EQB-ajMyi5-WKIgOHnbOGApfckUGbl6tDk3Qt8PKmb-xLAvp",
        displayName: "TNX",
        image: "https://bafkreiej6elbgpxhx65ej4swf4vlvrxmgavtv3rafq37q7zp5j42tjpn6y.ipfs.nftstorage.link/",
        color: "#234054",
        decimals: 9,
    },
    "EQD0vdSA_NedR9uvbgN9EikRX-suesDxGeFg69XQMavfLqIw": {
        name: "Huebel Bolt",
        ammMinter: "EQBIzHiopIkaXdXdSZ6Sm57kZV0y_5tZjnGO4fTUsMT0lOUz",
        tokenMinter: "EQD0vdSA_NedR9uvbgN9EikRX-suesDxGeFg69XQMavfLqIw",
        displayName: "BOLT",
        image: "https://bafkreibl2zdu5enctuaygly4xs2zi6z2tqtyaeb5whpnwzjabryitshroa.ipfs.nftstorage.link/",
        color: "#7c7c7c",
        decimals: 9,
    },
};

export let MainNetPools = (): { [key: string]: PoolInfo } => {
    return { ...MainNetPoolsRoot, ...localStorageTokensToObject() };
};

export const ton: PoolInfo = {
    isCustom: false,
    image: Ton,
    displayName: "TON",
    name: "ton",
    color: "#1490CD",
    ammMinter: "ton",
    tokenMinter: "ton",
    decimals: 9,
};

let isTestNet = true;
export const Pools = () => {
    return MainNetPools();
};

const tokenCache: { [key: string]: Address } = {};

export function addToken(key: string, pool: PoolInfo) {
    const pools = Pools();
    pools[key] = pool;
}

async function fetchAndCache(fn: Promise<Address>, cacheKey: string) {
    console.log("fetch and cache");

    const res = await fn;
    tokenCache[cacheKey] = res;
    return res;
}

export async function getToken(client: TonClient, token: string, owner: Address) {
    const jettonWalletKey = `${token}:jettonWallet:${owner}`;

    const jettonWallet = tokenCache[jettonWalletKey] || (await fetchAndCache(resolveJettonWallet(client, owner, Address.parse(Pools()[token].tokenMinter!!)), jettonWalletKey));
    const lpWalletKey = `${token}:lpWallet`;
    const lpWallet = tokenCache[lpWalletKey] || (await fetchAndCache(resolveJettonWallet(client, owner, Address.parse(Pools()[token].ammMinter!!)), lpWalletKey));

    return {
        ...Pools()[token],
        jettonWallet,
        lpWallet,
    };
}

export async function resolveJettonWallet(client: TonClient, walletAddress: Address, jettonMaster: Address) {
    let cell = new Cell();
    cell.bits.writeAddress(walletAddress);

    // tonweb style - this way its more optimized for browser
    const b64data = bytesToBase64(await cell.toBoc({ idx: false }));
    let res = await client.callGetMethod(jettonMaster, "get_wallet_address", [["tvm.Slice", b64data]]);

    return bytesToAddress(res.stack[0][1].bytes);
}

export function bytesToAddress(bufferB64: string) {
    const buff = Buffer.from(bufferB64, "base64");
    let c2 = Cell.fromBoc(buff);
    return c2[0].beginParse().readAddress() as Address;
}

const base64abc = (() => {
    const abc = [];
    const A = "A".charCodeAt(0);
    const a = "a".charCodeAt(0);
    const n = "0".charCodeAt(0);
    for (let i = 0; i < 26; ++i) {
        abc.push(String.fromCharCode(A + i));
    }
    for (let i = 0; i < 26; ++i) {
        abc.push(String.fromCharCode(a + i));
    }
    for (let i = 0; i < 10; ++i) {
        abc.push(String.fromCharCode(n + i));
    }
    abc.push("+");
    abc.push("/");
    return abc;
})();

/**
 * @param bytes {Uint8Array}
 * @return {string}
 */
export function bytesToBase64(bytes: any) {
    let result = "";
    let i;
    const l = bytes.length;
    for (i = 2; i < l; i += 3) {
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
        result += base64abc[((bytes[i - 1] & 0x0f) << 2) | (bytes[i] >> 6)];
        result += base64abc[bytes[i] & 0x3f];
    }
    if (i === l + 1) {
        // 1 octet missing
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[(bytes[i - 2] & 0x03) << 4];
        result += "==";
    }
    if (i === l) {
        // 2 octets missing
        result += base64abc[bytes[i - 2] >> 2];
        result += base64abc[((bytes[i - 2] & 0x03) << 4) | (bytes[i - 1] >> 4)];
        result += base64abc[(bytes[i - 1] & 0x0f) << 2];
        result += "=";
    }
    return result;
}

// Deployer : https://sandbox.tonwhales.com/explorer/address/EQBdPuDE6-9QE6c7dZZWbfhsE2jS--EfcwfEvGaWjKeW8vfO
// USDC-Minter : https://sandbox.tonwhales.com/explorer/address/EQCDEwcaliIbTcV13eLMfvZ3QAXaIGv9v4mxZbFKYCPRmh8B
// DeployerUSDC : https://sandbox.tonwhales.com/explorer/address/EQD05JqOhN8IY1FU_RspKhx4o9jn5aLlqJouYMZgpIi6ZlTr
// AMM-Minter : https://sandbox.tonwhales.com/explorer/address/EQDZgM7d4EnRkKYPjc1SU34U6PTv1tDz86ct-H_Js-rntnTB
// LP-Wallet : https://sandbox.tonwhales.com/explorer/address/EQAblUXhaGCFlt4kqxZeLNxPYvsI_MWkpnAWqVIpmRayhw4L
