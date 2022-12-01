import React, { useMemo } from "react";
import { GAS_FEE } from "services/api";
import { PoolInfo } from "services/api/addresses";
import { ActionType } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { fromNano } from "ton";
import { fromDecimals, toNanoSafe } from "utils";

function useValidation(actionType: ActionType, gasFee: GAS_FEE, srcToken: PoolInfo, destToken: PoolInfo) {
    const { totalBalances, srcTokenAmount, destTokenAmount, txPending } = useTokenOperationsStore();

    return useMemo(() => {
        let maxAmount = totalBalances.srcBalance;

        const disabled = !srcTokenAmount || srcTokenAmount === "0" || !destTokenAmount || destTokenAmount === "0" || txPending;

        const fee = Number(gasFee + 0.01).toFixed(2);
        let insufficientFunds = false;
        if (actionType === ActionType.BUY) {
            const maxAmountTemp = toNanoSafe(totalBalances.srcBalance, srcToken.decimals).sub(toNanoSafe(fee));
            maxAmount = fromDecimals(maxAmountTemp, 9);
            insufficientFunds = toNanoSafe(srcTokenAmount, srcToken.decimals).gt(maxAmountTemp);
        }
        if (actionType === ActionType.SELL) {
            insufficientFunds = toNanoSafe(srcTokenAmount, srcToken.decimals).gt(toNanoSafe(totalBalances.srcBalance, srcToken.decimals));
        }
        if (actionType === ActionType.ADD_LIQUIDITY) {
            const maxAmountTemp = toNanoSafe(totalBalances.srcBalance, srcToken.decimals).sub(toNanoSafe(fee));
            maxAmount = fromDecimals(maxAmountTemp, srcToken.decimals);
            const srcError = toNanoSafe(srcTokenAmount, srcToken.decimals).gt(maxAmountTemp);

            const destError = toNanoSafe(destTokenAmount, destToken.decimals).gt(toNanoSafe(totalBalances.destBalance, destToken.decimals));
            insufficientFunds = srcError || destError;
        }

        if (actionType === ActionType.REMOVE_LIQUIDITY) {
            const srcError = toNanoSafe(srcTokenAmount, srcToken.decimals).gt(toNanoSafe(totalBalances.destBalance, destToken.decimals));

            const destError = toNanoSafe(destTokenAmount, destToken.decimals).gt(toNanoSafe(totalBalances.destBalance, destToken.decimals));
            insufficientFunds = srcError || destError;
        }

        return {
            insufficientFunds: disabled ? false : insufficientFunds,
            disabled,
            maxAmount,
        };
    }, [srcToken, srcTokenAmount, gasFee, totalBalances, destTokenAmount, actionType]);
}

export default useValidation;
