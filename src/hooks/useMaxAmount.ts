import { useMemo } from "react";
import { GAS_FEE } from "services/api";
import { PoolInfo } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { fromNano, toNano } from "ton";

function useMaxAmount(gasFee: GAS_FEE, srcToken: PoolInfo) {
  const { srcTokenAmount, totalBalances, selectedToken } = useTokenOperationsStore();

  

  return useMemo(() => {
    if (!totalBalances.srcBalance || totalBalances.srcBalance === "0") {
      return {
        maxAmount: "0",
        maxAmountError: false,
      };
    }
    let srcBalance = totalBalances.srcBalance.length > 18 ? totalBalances.srcBalance.substring(0, 18): totalBalances.srcBalance
    if (srcToken.name !== "ton") {


      return {
        maxAmount: totalBalances.srcBalance,
        maxAmountError: toNano(srcTokenAmount || "0").gt(
          toNano( srcBalance )
        ),
      };
    }

    const maxAmount = toNano(srcBalance);

    return {
      maxAmount: fromNano(maxAmount),
      maxAmountError: toNano(srcTokenAmount || "0").gt(maxAmount),
    };
  }, [selectedToken, srcToken, srcTokenAmount, gasFee, totalBalances]);
}

export default useMaxAmount;
