import { useMemo } from "react";
import { GAS_FEE } from "services/api";
import { PoolInfo } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { fromNano } from "ton";
import { toNanoSafe } from "utils";

function useMaxAmount(gasFee: GAS_FEE, srcToken: PoolInfo) {
    const { srcTokenAmount, totalBalances, selectedToken } = useTokenOperationsStore();
  
    
  
    return useMemo(() => {
      if (!totalBalances.srcBalance || totalBalances.srcBalance === "0") {
        return {
          maxAmount: "0",
          maxAmountError: false,
        };
      }
  
      if (srcToken.name !== "ton") {
        return {
          maxAmount: totalBalances.srcBalance,
          maxAmountError: toNanoSafe(srcTokenAmount).gt(
            toNanoSafe(totalBalances.srcBalance)
          ),
        };
      }

      
      const fee = Number(gasFee + 0.01).toFixed(2)
  
      const maxAmount = toNanoSafe(totalBalances.srcBalance).sub(toNanoSafe(fee));
      
  
      return {
        maxAmount: fromNano(maxAmount),
        maxAmountError: toNanoSafe(srcTokenAmount).gt(maxAmount),
      };
    }, [selectedToken, srcToken, srcTokenAmount, gasFee, totalBalances]);
  }
  
  export default useMaxAmount;