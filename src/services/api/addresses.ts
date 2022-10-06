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
    "EQDw8mvCaC1-kZaJK2aFFl5zuHXoXI2UkTCcVTbBSeqk9EYC": {
        name: "KittyCoin for TonSwap tests",
        ammMinter: "EQCSjnLz6xxsbWKmV_iePAbo3edduyXrzpq7hzyEgKNZcZdm",
        tokenMinter: "EQDw8mvCaC1-kZaJK2aFFl5zuHXoXI2UkTCcVTbBSeqk9EYC",
        displayName: "KIT",
        image: KittyKorn,
        color: "#390075",
    },
    "EQDH9-eeozoEMtbxSMSL3Ogrjw0nlKTTw0q1KwySJPn2-YmB": {
        name: "DinoCoin for TonSwap tests",
        ammMinter: "EQAG57v8WL4U188JmkFJZd5VIbqoFfwx3trefJbfJ5pD1JAP",
        tokenMinter: "EQDH9-eeozoEMtbxSMSL3Ogrjw0nlKTTw0q1KwySJPn2-YmB",
        displayName: "DINO",
        image: DinoKorn,
        color: "#0E9D26",
    },
    EQC4cCygTZPKIP9cCsWx7DW5i5MQPOsEcfKkKwBZKkRCCfaW: {
        name: "Wrapped Solana",
        ammMinter: "EQCIKZlDpIfc5l9mJOZj2xOeS2Ckfrm6OAcdJCUpM9T__MW6",
        tokenMinter: "EQC4cCygTZPKIP9cCsWx7DW5i5MQPOsEcfKkKwBZKkRCCfaW",
        displayName: "WSOL",
        image: "https://bafkreiadj3ntztd44xhntqu26kyubn2rihu24if7qncp4npn3pvwacl5wi.ipfs.nftstorage.link/",
        color: "#2fa4b0",
    },
    "EQALr-K836vMmF5gOBzYmEHlS29-iG6AGsmHFzzgpMiy9ERi": {
        name: "Wrapped NEAR",
        ammMinter: "EQBJ4iUkm55hxNtLkG4gtLxQ2Mcvsne3u-OINdg0uFguK_wY",
        tokenMinter: "EQALr-K836vMmF5gOBzYmEHlS29-iG6AGsmHFzzgpMiy9ERi",
        displayName: "WNEAR",
        image: "https://bafkreifbyn4o56paustubq4v77ql62swvayr6ey3reiqrsveneauq2pfvy.ipfs.nftstorage.link/",
        color: "#515151",
    },
    "EQD0vdSA_NedR9uvbgN9EikRX-suesDxGeFg69XQMavfLqIw": {
        name: "Huebel Bolt",
        ammMinter: "EQDaawC8QbsAidBa88rB8Ng4ZqtHxYYXY9fCF3DKoJanOi32",
        tokenMinter: "EQD0vdSA_NedR9uvbgN9EikRX-suesDxGeFg69XQMavfLqIw",
        displayName: "BOLT",
        image: "https://bafkreibl2zdu5enctuaygly4xs2zi6z2tqtyaeb5whpnwzjabryitshroa.ipfs.nftstorage.link/",
        color: "#7c7c7c",
    },
    EQBiJ8dSbp3_YAb_KuC64zCrFqQTsFbUee5tbzr5el_HEDGE: {
        name: "Hedge coin",
        ammMinter: "EQB90pO1r7oIGfEI2f3hlzdm3yfn0yVPvuAvGvhnKqdIcoam",
        tokenMinter: "EQBiJ8dSbp3_YAb_KuC64zCrFqQTsFbUee5tbzr5el_HEDGE",
        displayName: "HEDGE",
        image: "https://bafkreibwhv6xa4aykvxzkjqlhcgswm2lnwlw6w6iabo32ded4blxxodhze.ipfs.nftstorage.link/",
        color: "#8A6E53",
    },
    "USD Stable Coin": {
        name: "USD Stable Coin",
        displayName: "USDC",
        image: Usdc,
        color: "#055fa6",
        isDisabled: true,
        tokenMinter: "usd-coin",
        ammMinter: "usd-coin",
    },
    "Wrapped Bitcoin on TON": {
        name: "Wrapped Bitcoin on TON",
        displayName: "WBTC",
        image: Btc,
        color: "#E17E06",
        isDisabled: true,
        tokenMinter: "bitcoin",
        ammMinter: "bitcoin",
    },
    "Wrapped Ether on TON": {
        name: "Wrapped Ether on TON",
        displayName: "ETH",
        image: Eth,
        color: "#5f73c2",
        isDisabled: true,
        tokenMinter: "ethereum",
        ammMinter: "ethereum",
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
