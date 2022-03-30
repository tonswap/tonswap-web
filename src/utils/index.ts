import { Token } from "types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const splitToGroups = (arr: any, size: number) => {
  const arrayOfArrays = [];
  for (let i = 0; i < arr.length; i += size) {
    arrayOfArrays.push(arr.slice(i, i + size));
  }
  return arrayOfArrays;
};

const getToken = (tokens: Token[], tokenId: string) => {
  return tokens.find((t) => t.id === tokenId);
};

const getIsSelectedTokenMobile = (group: Token[], selected?: string) => {
  return group.find((g) => g.id === selected);
};

export { delay, splitToGroups, getToken, getIsSelectedTokenMobile };
