import { Token } from "types";
//https://github.com/tonwhales/ton-nft/blob/main/packages/utils/parseActionsList.ts
import BN from "bn.js";
import { Address, Cell, RawCurrencyCollection, RawMessage, Slice } from "ton";
var Buffer = require("buffer/").Buffer; // note: the trailing slash is important!
global.Buffer = Buffer;

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const splitToGroups = (arr: any, size: number) => {
  const arrayOfArrays = [];
  for (let i = 0; i < arr.length; i += size) {
    arrayOfArrays.push(arr.slice(i, i + size));
  }
  return arrayOfArrays;
};

const getToken = (tokens: Token[], tokenId: string) => {
  return tokens.find((t) => t.name === tokenId);
};

const getIsSelectedTokenMobile = (group: Token[], selected?: string) => {
  return group.find((g) => g.name === selected);
};

export const customToFixed = (num: number, padding?: number) => {
  try {
    var re = new RegExp(
      "^-?\\d+(?:.\\d{0," +
        (Number(padding) === 0 ? -1 : padding ? padding : 2) +
        "})?"
    );
    return num
      .toString()
      .match(re)!![0]
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  } catch (error) {
    return '0';
  }
};

export type SendMsgOutAction = {
  type: "send_msg";
  message: RawMessage;
  mode: number;
};
export type ReserveCurrencyAction = {
  type: "reserve_currency";
  mode: number;
  currency: RawCurrencyCollection;
};
export type UnknownOutAction = { type: "unknown" };
const decimals = new BN("1000000000");

export type OutAction =
  | SendMsgOutAction
  | ReserveCurrencyAction
  | UnknownOutAction;

export function parseTrc20Transfer(msgBody: Cell) {
  let slice = msgBody.beginParse();
  var op = slice.readUint(32);
  var query = slice.readUint(64);
  var to = sliceToAddress(slice);
  var grams = slice.readCoins();
  console.log("parseTrc20Transfer amount", grams.toString(10));
  console.log("parseTrc20Transfer", to);
  return {
    op: op.toString(10),
    query: query.toString(10),
    to: to,
    amount: grams,
    // amount: fees
  };
}

export function parseTrc20TransferRecipt(msgBody: Cell) {
  let slice = msgBody.beginParse();
  var op = slice.readUint(32);
  var query = slice.readUint(64);
  var to = sliceToAddress(slice);

  var grams = slice.readCoins();
  console.log("parseTrc20Transfer amount", grams.toString(10));
  console.log("parseTrc20Transfer", to);
  return {
    op: op.toString(10),
    query: query.toString(10),
    to: to,
    amount: grams,
    // amount: fees
  };
}

export function toUnixTime(timeInMS: number) {
  return Math.round(timeInMS / 1000);
}

export function sliceToString(s: Slice) {
  let data = s.readRemaining();
  return data.buffer.slice(0, Math.ceil(data.cursor / 8)).toString();
}

export function cellToString(s: Cell) {
  let data = s.beginParse().readRemaining();
  return data.buffer.slice(0, Math.ceil(data.cursor / 8)).toString();
}

export function base64StrToCell(str: string): Cell[] {
  let buf = Buffer.from(str, "base64");
  return Cell.fromBoc(buf);
}

export function addressToSlice264(a: Address) {
  let c = new Cell();
  c.bits.writeAddress(a);
  const s = c.beginParse();
  // const _anyCast = s.readUint(3);
  const addr = s.readUint(264);
  return addr;
}

export function sliceToAddress267(s: Slice) {
  // const _anyCast = new BN(s.readUint(3)); //ignore anycast bits
  return sliceToAddress(s);
}

export function sliceToAddress(s: Slice) {
  // const wc = new BN(s.readUint(8));
  // const addr = s.readUint(256);
  // const address = new Address(wc.toNumber(), addr.toBuffer());
  return "address";
}

export function toDecimals(num: number) {
  return new BN(num).mul(decimals);
}

export function fromDecimals(num: BN) {
  return num.div(decimals).toString(10);
}

export function stripBoc(bocStr: string) {
  //console.log(`parsing boc ${bocStr}`);
  return bocStr.substr(2, bocStr.length - 4);
}

export { delay, splitToGroups, getToken, getIsSelectedTokenMobile };
