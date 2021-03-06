import { Cell, TonClient, Address } from "ton";
import Ton from "assets/images/tokens/ton.svg";

import Usdt from "assets/images/tokens/usdt.svg";
import Shib from "assets/images/tokens/shiba.svg";
import { localStorageTokensToObject } from "utils";

export type PoolInfo = {
  ammMinter?: Address;
  tokenMinter?: Address;
  image?: string;
  displayName: string;
  color: string;
  name: string;
  isCustom?: boolean
};


export type PoolInfoRaw = {
    ammMinter?: string;
    tokenMinter?: string;
    image: string;
    displayName: string;
    color: string;
    name: string;
  };



const SandBoxPools: { [key: string]: PoolInfo } = {
  luna: {
    name: "luna",
    displayName: "LUNA",
    image: Shib,
    color: "#FFA40A",
    ammMinter: Address.parse(
      "EQBVkqmt206sSMkCr5yUgIHUPjEKnvI4UpHh__QUIbeMRHuH"
    ),
    tokenMinter: Address.parse(
      "EQCDEwcaliIbTcV13eLMfvZ3QAXaIGv9v4mxZbFKYCPRmh8B"
    ),
  },
};

const TestNetPools: { [key: string]: PoolInfo } = {
  shib: {
    name: "shib",
    ammMinter: Address.parse(
      "EQBVkqmt206sSMkCr5yUgIHUPjEKnvI4UpHh__QUIbeMRHuH"
    ),
    displayName: "SHIB",
    image: Shib,
    color: "#FFA40A",
    tokenMinter: Address.parse(
      "EQCDEwcaliIbTcV13eLMfvZ3QAXaIGv9v4mxZbFKYCPRmh8B"
    ),
  },
};

export const MainNetPoolsRoot: { [key: string]: PoolInfo } = {
  shib: {
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
    usdt: {
      name:'usdt',
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
};

export let MainNetPools = (): { [key: string]: PoolInfo } => {
  return { ...MainNetPoolsRoot , ...localStorageTokensToObject() } ;
};

export const ton: PoolInfo = {
    isCustom:false,
  image: Ton,
  displayName: "TON",
  name: "ton",
  color: "#1490CD",
};

let isTestNet = true;
const Pools = () => {
//   isTestNet ? TestNetPools : SandBoxPools;
  if (process.env.NODE_ENV === "production") {
    return MainNetPools();
  }

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

export async function getToken(
  client: TonClient,
  token: string,
  owner: Address
) {
  const jettonWalletKey = `${token}:jettonWallet`;
    
    console.log(Pools()[token].tokenMinter!!);
    
  const jettonWallet =
    tokenCache[jettonWalletKey] ||
    (await fetchAndCache(
      resolveJettonWallet(client, owner, Pools()[token].tokenMinter!!),
      jettonWalletKey
    ));
  const lpWalletKey = `${token}:lpWallet`;
  const lpWallet =
    tokenCache[lpWalletKey] ||
    (await fetchAndCache(
      resolveJettonWallet(client, owner, Pools()[token].ammMinter!!),
      lpWalletKey
    ));

  return {
    ...Pools()[token],
    jettonWallet,
    lpWallet,
  };
}

export async function resolveJettonWallet(
  client: TonClient,
  walletAddress: Address,
  jettonMaster: Address
) {
  let cell = new Cell();
  cell.bits.writeAddress(walletAddress);

  // tonweb style - this way its more optimized for browser
  const b64data = bytesToBase64(await cell.toBoc({ idx: false }));
  let res = await client.callGetMethod(jettonMaster, "get_wallet_address", [
    ["tvm.Slice", b64data],
  ]);

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
