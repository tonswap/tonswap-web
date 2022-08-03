import React, { useMemo } from "react";
import { GAS_FEE } from "services/api";
import { PoolInfo } from "services/api/addresses";
import { ActionType } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { fromNano } from "ton";
import { toNanoSafe } from "utils";

function useValidation(
  actionType: ActionType,
  gasFee: GAS_FEE,
  srcToken: PoolInfo
) {
  const { totalBalances, srcTokenAmount, destTokenAmount, txPending } =
    useTokenOperationsStore();


  return useMemo(() => {
    let maxAmount = totalBalances.srcBalance;

    const disabled =
      !srcTokenAmount ||
      srcTokenAmount === "0" ||
      !destTokenAmount ||
      destTokenAmount === "0" ||
      txPending;

    const fee = Number(gasFee + 0.01).toFixed(2);

    let insufficientFunds = false;

    if (actionType === ActionType.BUY) {
      const maxAmountTemp = toNanoSafe(totalBalances.srcBalance).sub(
        toNanoSafe(fee)
      );
      maxAmount = fromNano(maxAmountTemp);
      insufficientFunds = toNanoSafe(srcTokenAmount).gt(maxAmountTemp);
    }
    if (actionType === ActionType.SELL) {
      insufficientFunds = toNanoSafe(srcTokenAmount).gt(
        toNanoSafe(totalBalances.srcBalance)
      );
    }
    if (actionType === ActionType.ADD_LIQUIDITY) {
      const maxAmountTemp = toNanoSafe(totalBalances.srcBalance).sub(
        toNanoSafe(fee)
      );
      maxAmount = fromNano(maxAmountTemp);
      const srcError = toNanoSafe(srcTokenAmount).gt(maxAmountTemp);

      const destError = toNanoSafe(destTokenAmount).gt(
        toNanoSafe(totalBalances.destBalance)
      );
      insufficientFunds = srcError || destError;
    }

    if (actionType === ActionType.REMOVE_LIQUIDITY) {
    }    

    return {
      insufficientFunds: disabled ? false : insufficientFunds,
      disabled,
      maxAmount,
    };
  }, [
    srcToken,
    srcTokenAmount,
    gasFee,
    totalBalances,
    destTokenAmount,
    actionType,
  ]);
}

export default useValidation;
