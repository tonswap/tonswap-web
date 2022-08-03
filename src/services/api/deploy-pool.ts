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

const ammCode = `B5EE9C72410221010005BE000114FF00F4A413F4BCF2C80B0102016202030202CB04050201201D1E02012006070201CE18190201200809020120101103DBD19916380492F81F068698180B8D8492F81F07D207D2018FD0018B8EB90FD0018FD001801E98FE99FF6A2687D007D207D007D007D206A6A1814C1083DEECBEF5D718114E00CF18114C10839B1684E5D718108132F83191A1A00C00D02638289D8095D4A6A187D8270184207F97840A0B0C0201580E0F00F8393B05FA00FA4030547135A984547236A984F8285463C170542013541403C85004FA0258CF1601CF16CCC922C8CB0112F400F400CB00C9F9007074C8CB02CA07CBFFC9D0500CC705F2E04A5CF0072510395422B30DF0095035A15027A15035A110564153C85007FA025005CF165003FA0201FA0201CF16CCCCC9ED5400E43906FA00FA00305303BCF2D25823C000F2D259258D0860000000000000000000000000000000000000000000000000000000000000000004C705F2D25A0CAA008209312D00A0107C167F5160106C105C104C034ADAF00A464312C85007FA025005CF165003FA0201FA0201CF16CCCCC9ED5401AC3906FA00FA40D30031268D0860000000000000000000000000000000000000000000000000000000000000000004C705C000537CC705C000B093F2C04CDED31F21C0169A316C633410365531F011E03CC018E3025F0D0D00C6258D0860000000000000000000000000000000000000000000000000000000000000000004C705F2D04B0AFA00300CAA008209312D00A0107C16705160106C105C104C034ADAF00A464312C85007FA025005CF165003FA0201FA0201CF16CCCCC9ED540047083040E48C1C781C0864972EE38497282AC014C02A092F248C69651B04A90078BA1B086000291C20063232C15400F3C5807E80B2DAB260103EC02002012012130201481617007557182100F8A7EA5C8CB1F16CB3F58FA0222CF1658CF1670FA0213CB01C97170748018C8CB055005CF165005FA0213CB6813CB00CB00CCC973FB008020120141500D709F03FE4496449388A303FE4496449B8951E84208057533B50F614836E54F06F2C638557C0CE01703FE58C0CCD163C01E590C4D415BC0278B80D8D81F03FE3871451E8144E2848E084017D7840281CBEC0941DA804E8441150D83C026757C0CCD449285408E800FC01C078A000111489BC01D04D3C026000552040FA08B0002614D52A3C01806A4127CC14D02A08EA4114D06A08EA412D82389410A81410A8148CE81660002708B0803CB8690870800870802C3CB869406A612000CB1C208405E351467232C7C572CFD63E808933C58933C588FE8084F2C0327E0A11011C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF2741DE0063232C15633C59400FE8084B2DAF333325C7EC02003F73B51343E803E903E803E803E9035350C0374C7FE800C0B70000B30002C48AC7098E68DD7C14CCDCC90C4FC02F80A6A8020824C4B402820822625A02814B02854842F086C6084017D78402E668DD7C14CCDCC90C4FC02F81C09B080248C8E78C370006497C37809C1040F1031BC03092271C164CD040DE44E389421A01A1B1C00DC547E56F00D547276F00D806425A152408064A98480645006A15611018064A9845226BB5216BB15B19E10235F03385477B4547D9CF00B718E345320A156105005A120821005F5E100BC9D33330AAA00295448302F59F0098E125B3A21821005F5E100BC9452C2F0079131E2E208E20043800000000000000000000000000000000000000000000000000000000000000000100050A12A1049103559F01010365055441403C85007FA025005CF165003FA0201FA0201CF16CCCCC9ED540027BEEA6014081F2D42901D400C081F4542C50548240202711F200089ADBCF6A2687D007D207D007D007D206A6A183630FC1400B82A1009AA0A01E428027D012C678B00E78B666491646580897A007A00658064FC80383A6465816503E5FFE4E840002BAF16F6A2687D007D207D007D007D206A6A183FAAA840923B5643`;
const ammJettonWalletCode = `B5EE9C72410211010002E0000114FF00F4A413F4BCF2C80B0102016202030202CC0405001BA0F605DA89A1F401F481F481A8610201D40607020148080900C90CC8B1C02497C0F8341CB5C874C0005C6C3CB8B1B4C0005C6C24D6FC02F83E903E900C7E800C5C75C87E800C7E800C00F4C7C8608403E29FA96EA54C5408FC023808608405E351466EA54C5408FC02780060841657C1EF2EA51408FC02B817C12103FCBC2000113E910C1C2EBCB853600201200A0B0201200F1001F700F4CFFE803E90087C007B51343E803E903E90350C144DA8548AB1C17CB8B04A30BFFCB8B0950D109C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF274013E903D010C7E801DE0063232C1540233C59C3E8085F2DAC4F31C608405E351467232C7C6A00C02E70CBB51343E803E903E90350C01B4CFFE80145468017E903E903E8020822625A006A848638D9486E806A860841CD8B4273232C7D49432CFD4013E809633C59401F3C5B25C60063232C149B3C594027E808632DA85F3325C7EC0041165440A8E57C1388975C2C070C00970802C24CC0CCCF8C340E00D0E0092CB3F5008FA0223CF1601CF1621FA0217CB005003CF16C95004CC07AA0014A08208989680AA008208989680A0A014BCF2E2C504C98040FB004013C85004FA0258CF1601CF16CCC9ED540052820898968072FB028210D53276DB708010C8CB055008CF165006FA0216CB6A14CB1F14CB3FC972FB00001EC85004FA0258CF1601CF16CCC9ED5400DF3B51343E803E903E90350C01F4CFFE803E900C145468549271C17CB8B049F0BFFCB8B0816A8020822625A02A802805AF3CB8B0E0841EF765F7B232C7C572CFD400FE8088B3C58073C5B25C60043232C14933C59C3E80B2DAB33260103EC01004F214013E809633C58073C5B3327B55200081200835C87B51343E803E903E90350C0134C7C8608405E351466E80A0841EF765F7AE84AC7CB8B174CFCC7E800C04E81408F214013E809633C58073C5B3327B5520D431B9AE`;

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
