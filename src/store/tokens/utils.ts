import { MainNetPools, PoolInfo } from "services/api/addresses";

export function poolInfoStringify(pools: PoolInfo[]) {
    let list = pools.map((pi) => {
      return {
        ammMinter: pi.ammMinter,
        tokenMinter: pi.tokenMinter,
        image: pi.image,
        displayName: pi.displayName,
        color: pi.color,
        name: pi.name,
        isCustom: true,
      };
    });
  
    return JSON.stringify(list);
  }

  export const getTokens = (): PoolInfo[] => {
    const pools = MainNetPools();
    const result = Object.keys(pools).map((key) => {
      return {
        ...pools[key],
        name: pools[key].name,

      };
    });
    
    return result;
    // }
  };



