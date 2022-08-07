import BN from "bn.js";
import {
  Address,
  Cell,
  contractAddress,
  toNano,
  TonClient,
  beginDict,
  beginCell,
  StateInit,
  Slice,
} from "ton";
import { GAS_FEE, _getJettonBalance, getTokenData } from ".";
import { DexActions } from "./dex";
import { Sha256 } from "@aws-crypto/sha256-js";
import { walletService } from "services/wallets/WalletService";
import { TransactionRequest } from "services/wallets/types";
import axios from "axios";

const POOL_INIT_COST = 0.15;
const SNAKE_PREFIX = 0x00;
const ONCHAIN_CONTENT_PREFIX = 0x00;
const OFFCHAIN_CONTENT_PREFIX = 0x01;

export type JettonMetaDataKeys =
  | "name"
  | "description"
  | "image"
  | "symbol"
  | "decimals";
const sha256 = (str: string) => {
  const sha = new Sha256();
  sha.update(str);
  return Buffer.from(sha.digestSync());
};

const jettonOnChainMetadataSpec: {
  [key in JettonMetaDataKeys]: "utf8" | "ascii" | undefined;
} = {
  name: "utf8",
  description: "utf8",
  image: "ascii",
  symbol: "utf8",
  decimals: "utf8",
};

let rpcUrl = "https://mainnet.tonhubapi.com/jsonRPC";

const ammCode = `B5EE9C7241022401000579000114FF00F4A413F4BCF2C80B0102016202030202CB040502012020210201200607020162191A02012008090201200E0F03B7D19916380492F81F068698180B8D8492F81F07D207D2018FD0018B8EB90FD0018FD001801E98FE99FF8031141083DEECBEF5D718111600CF18111410839B1684E5D7181189999C00D7C22896382D8095D4A6A187D8270184207F97840A0B0C00496BB51343E80007E187E90007E18BE80007E18FE80007E193E90007E1975007E19B50C3E19E01D43234FA00FA40304443F843F8412659A984F844F8411027A984F828F847265970542013541403C85004FA0258CF1601CF16CCC922C8CB0112F400F400CB00C9F9007074C8CB02CA07CBFFC9D05003C705F2E04A5334F00A542330F00CF84358A1F863F84401A1F864DB3C1F01A06C12FA00FA0030F8445210BCF2D258F844C000F2D259F8428D0860000000000000000000000000000000000000000000000000000000000000000004C705F2D25A5314BCF2D25B50457F5530F00DDB3C1F01AC6C12FA00FA40D30031F8428D0860000000000000000000000000000000000000000000000000000000000000000004C705C000F84226C705C000B093F2C25CDED31F21C01698314566441403F012E035C018E3025F060D0170F8428D0860000000000000000000000000000000000000000000000000000000000000000004C705F2D25A03FA00305045705530F00DDB3C1F020120101102012012130047420C103923071E07021925CBB8E125CA0AB005300A824BC9231A5946C12A401E2E86C21800294708018C8CB055003CF1601FA02CB6AC98040FB0080201201415020120171800771C608403E29FA97232C7C572CFD63E8088B3C59633C59C3E8084B2C0725C5C1D20063232C17E10B3C594017E808532DA04F2C004B2C033325CFEC02001A509303FE4BE10E4BE113889703FE4BE1124BE10F89515C8A08057533B50F614826E54A0AF2C63840C0D40B03FE50C4CBC02A51000FC0338B801303FE384C408D7C0FE10C8E87E18FE1116283E19007C02B8C36016005EF84325A0F863F84426A1F864048208989680A023AA00A014A1705003AA00A08209C9C380A05220BCF2E25D4033F00C001114897C029408FC032000752040FA3E1130002614C86A3C02006A4123854C3E1054882A3E10EA413E1054882A3E112A412D8238BE1116283E193E10D6283E18FE1048683E18600201201B1C02F7406D31FFA003026C00025C000B122B1C263966C315044F00EE022AA008209312D00A08208989680A05250A15210BC21B1821005F5E100B9966C315044F00EE070F843C200926C22E30DC001925F06E05205F00FF8428D0860000000000000000000000000000000000000000000000000000000000000000004C70581D1E002708B0803CB8978870800870802C3CB897C06A612000CF1C208405E351467232C7C532CFD63E8088F3C588F3C588BE8084B2C0327E0A3E11C4091C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF2741DE0063232C15633C59400FE8084B2DAF333325C7EC02000DAF844F8432959F010F843F8442459F010806425A152408064A98480645006A152A08064A9845226BB5216BB15B19C10245F045470435385F00E718E305320A15295A120821005F5E100BC9B333303AA0028544730F00C8E125B3321821005F5E100BC945252F00A9131E2E201E2011E9301F8629131E203A14330F011DB3C1F003CF847F846C8F841FA02F842CF16F843FA02F844FA02F845CF16CCCCC9ED540027BEEA6014081F2D42901D400C081F4542C50548240202712223006BADBCF8037C147C23B82A1009AA0A01E428027D012C678B00E78B666491646580897A007A00658064FC80383A6465816503E5FFE4E8400027AF16F8037C20BFFC217C21FC227C22FC237C23C03792D3F1`;
const ammJettonWalletCode = `B5EE9C72410211010002D6000114FF00F4A413F4BCF2C80B0102016202030202CC0405001BA0F605DA89A1F401F481F481A8610201D40607020148080900C90CC8B1C02497C0F8341CB5C874C0005C6C3CB8B1B4C0005C6C24D6FC02F83E903E900C7E800C5C75C87E800C7E800C00F4C7C8608403E29FA96EA54C5408FC023808608405E351466EA54C5408FC02780060841657C1EF2EA51408FC02B817C12103FCBC2000113E910C1C2EBCB853600201200A0B0201200F1001F700F4CFFE803E90087C007B51343E803E903E90350C144DA8548AB1C17CB8B04A30BFFCB8B0950D109C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF274013E903D010C7E801DE0063232C1540233C59C3E8085F2DAC4F31C608405E351467232C7C6A00C02E70CBB51343E803E903E90350C01B4CFFE80145468017E903E903E800260822625A02848638D9486E806A860841CD8B4273232C7D49432CFD4013E809633C59401F3C5B25C60063232C149B3C594027E808632DA85F3325C7EC0041165440A8E57C1388975C2C070C00970802C24CC0CCCF8C340E00D0E0082CB3F5008FA0223CF1601CF1621FA0217CB005003CF16C95004CC07AA0014A08209C9C380A014BCF2E2C504C98040FB004013C85004FA0258CF1601CF16CCC9ED540052820898968072FB028210D53276DB708010C8CB055008CF165006FA0216CB6A14CB1F14CB3FC972FB00001EC85004FA0258CF1601CF16CCC9ED5400DB3B51343E803E903E90350C01F4CFFE803E900C145468549271C17CB8B049F0BFFCB8B0816A8020824C4B402805AF3CB8B0E0841EF765F7B232C7C572CFD400FE8088B3C58073C5B25C60043232C14933C59C3E80B2DAB33260103EC01004F214013E809633C58073C5B3327B55200081200835C87B51343E803E903E90350C0134C7C8608405E351466E80A0841EF765F7AE84AC7CB8B174CFCC7E800C04E81408F214013E809633C58073C5B3327B552058FD8ACF`;

const zeroAddress = Address.parse(
  "EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"
);

/* eslint no-eval: 0 */
const client = new TonClient({
  endpoint: rpcUrl,
});

const META_DATA_DEFUALT = {
  description: "LP Pool",
  //  decimals: "9",
  image: "https://www.linkpicture.com/q/download_183.png",
};

export async function poolStateInit(jettonMinter: Address, workchain: number) {
 // const jettonData = await getTokenData(jettonMinter);
  let metadata = {
      name: `LP-${jettonMinter.toFriendly()}`,
      ...META_DATA_DEFUALT,
  };
  const { codeCell, initDataCell } = buildStateInit(metadata);
  const futureAddress = await contractAddress({
    workchain,
    initialData: initDataCell,
    initialCode: codeCell,
  });
  const isDeployed = await client.isContractDeployed(futureAddress);
  return {
    isDeployed,
    futureAddress,
    initDataCell,
    codeCell,
  };
}

export async function deployPool(
  jettonMinter: Address,
  poolData = {},
  workchain = 0
) {
  //:TransactionRequest {
  const { futureAddress, initDataCell, codeCell } = await poolStateInit(
    jettonMinter,
    workchain
  );

  // if (await client.isContractDeployed(futureAddress)) {
  //     return {
  //         to: futureAddress.toFriendly(),
  //         value: toNano(POOL_INIT_COST).toString(),
  //         timeout: 5 * 60 * 1000,
  //         stateInit: new StateInit({ data: initDataCell, code: codeCell }),
  //         payload: "",
  //         error: "contract is already deployed"
  //     }
  // }
  return {
    to: futureAddress.toFriendly(),
    value: toNano(POOL_INIT_COST).toString(),
    timeout: 5 * 60 * 1000,
    stateInit: new StateInit({ data: initDataCell, code: codeCell }),
    payload: "",
    error: "",
  };
}

function buildStateInit(contentData: { [s: string]: string }) {
  const contentCell = buildJettonOnchainMetadata(contentData);
  const dataCell = new Cell();
  dataCell.bits.writeCoins(0); // total-supply
  dataCell.bits.writeAddress(zeroAddress); // token_wallet_address starts as null
  dataCell.bits.writeCoins(0); // ton-reserves
  dataCell.bits.writeCoins(0); // token-reserves
  dataCell.bits.writeAddress(Address.parse("EQAxZiaJf80xadJw4qvFN5WkNACXAP56Wa00svHTf4iAjpqy"));  // TODO (admin client side is quite dangerous)
  dataCell.refs.push(contentCell); // meta-data
  dataCell.refs.push(Cell.fromBoc(ammJettonWalletCode)[0]); // wallet-code
  return {
    initDataCell: dataCell,
    codeCell: Cell.fromBoc(ammCode)[0],
  };
}

function base64ToCellCode(b64: string) {
  return Cell.fromBoc(Buffer.from(b64, "base64"))[0];
}

function writeString(cell: Cell, str: string) {
  for (let i = 0; i < str.length; i++) {
    cell.bits.writeUint8(str.charCodeAt(i));
  }
}

export function buildJettonOnchainMetadata(data: {
  [s: string]: string | undefined;
}): Cell {
  const KEYLEN = 256;
  const dict = beginDict(KEYLEN);

  Object.entries(data).forEach(([k, v]: [string, string | undefined]) => {
    if (!jettonOnChainMetadataSpec[k as JettonMetaDataKeys])
      throw new Error(`Unsupported onchain key: ${k}`);
    if (v === undefined || v === "") return;

    let bufferToStore = Buffer.from(
      v,
      jettonOnChainMetadataSpec[k as JettonMetaDataKeys]
    );

    const CELL_MAX_SIZE_BYTES = Math.floor(1023 / 8) - 1; // 1 snake prefix

    const rootCell = new Cell();
    let currentCell = rootCell;

    while (bufferToStore.length > 0) {
      currentCell.bits.writeUint8(SNAKE_PREFIX);
      currentCell.bits.writeBuffer(bufferToStore.slice(0, CELL_MAX_SIZE_BYTES));
      bufferToStore = bufferToStore.slice(CELL_MAX_SIZE_BYTES);
      if (bufferToStore.length > 0) {
        let newCell = new Cell();
        currentCell.refs.push(newCell);
        currentCell = newCell;
      }
    }

    dict.storeRef(sha256(k), rootCell);
  });

  return beginCell()
    .storeInt(ONCHAIN_CONTENT_PREFIX, 8)
    .storeDict(dict.endDict())
    .endCell();
}

export type persistenceType =
  | "onchain"
  | "offchain_private_domain"
  | "offchain_ipfs";

export async function readJettonMetadata(contentCell: Cell): Promise<{
  persistenceType: persistenceType;
  metadata: { [s in JettonMetaDataKeys]?: string };
  isJettonDeployerFaultyOnChainData?: boolean;
}> {
  const contentSlice = contentCell.beginParse();

  switch (contentSlice.readUint(8).toNumber()) {
    case ONCHAIN_CONTENT_PREFIX:
      return {
        persistenceType: "onchain",
        ...parseJettonOnchainMetadata(contentSlice),
      };
    case OFFCHAIN_CONTENT_PREFIX:
      const { metadata, isIpfs } = await parseJettonOffchainMetadata(
        contentSlice
      );
      return {
        persistenceType: isIpfs ? "offchain_ipfs" : "offchain_private_domain",
        metadata,
      };
    default:
      throw new Error("Unexpected jetton metadata content prefix");
  }
}

async function parseJettonOffchainMetadata(contentSlice: Slice): Promise<{
  metadata: { [s in JettonMetaDataKeys]?: string };
  isIpfs: boolean;
}> {
  const jsonURI = contentSlice.readRemainingBytes().toString("ascii");
  return {
    metadata: (await axios.get(jsonURI)).data,
    isIpfs: /(^|\/)ipfs[.:]/.test(jsonURI),
  };
}

export function parseJettonOnchainMetadata(contentSlice: Slice): {
  metadata: { [s in JettonMetaDataKeys]?: string };
  isJettonDeployerFaultyOnChainData: boolean;
} {
  // Note that this relies on what is (perhaps) an internal implementation detail:
  // "ton" library dict parser converts: key (provided as buffer) => BN(base10)
  // and upon parsing, it reads it back to a BN(base10)
  // tl;dr if we want to read the map back to a JSON with string keys, we have to convert BN(10) back to hex
  const toKey = (str: string) => new BN(str, "hex").toString(10);
  const KEYLEN = 256;

  let isJettonDeployerFaultyOnChainData = false;

  const dict = contentSlice.readDict(KEYLEN, (s) => {
    let buffer = Buffer.from("");

    const sliceToVal = (s: Slice, v: Buffer) => {
      s.toCell().beginParse();
      if (s.readUint(8).toNumber() !== SNAKE_PREFIX)
        throw new Error("Only snake format is supported");

      v = Buffer.concat([v, s.readRemainingBytes()]);
      if (s.remainingRefs === 1) {
        v = sliceToVal(s.readRef(), v);
      }

      return v;
    };

    if (s.remainingRefs === 0) {
      isJettonDeployerFaultyOnChainData = true;
      return sliceToVal(s, buffer);
    }

    return sliceToVal(s.readRef(), buffer);
  });

  const res: { [s in JettonMetaDataKeys]?: string } = {};

  Object.keys(jettonOnChainMetadataSpec).forEach((k) => {
    const val = dict
      .get(toKey(sha256(k).toString("hex")))
      ?.toString(jettonOnChainMetadataSpec[k as JettonMetaDataKeys]);
    if (val) res[k as JettonMetaDataKeys] = val;
  });

  return {
    metadata: res,
    isJettonDeployerFaultyOnChainData,
  };
}
