import React, { useMemo } from "react";
import { ActionType } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";

function useTxSuccessMessage(actionType: ActionType) {
  const { txConfirmation } = useTokenOperationsStore();

  const { srcTokenAmount, destTokenAmount, tokenName } = txConfirmation;

  return useMemo(() => {
    if (actionType === ActionType.BUY) {
      return `Successfully swapped ${srcTokenAmount} TON for ${destTokenAmount} ${tokenName}`;
    }

    if (actionType === ActionType.SELL) {
      return `Successfully swapped ${srcTokenAmount} ${tokenName} for ${destTokenAmount} TON`;
    }
    if (actionType === ActionType.ADD_LIQUIDITY) {
      return `Successfully added ${srcTokenAmount} TON and ${destTokenAmount} ${tokenName} liquidity`;
    }
    if (actionType === ActionType.REMOVE_LIQUIDITY) {
      return `Successfully removed ${srcTokenAmount} TON and ${destTokenAmount} ${tokenName} liquidity`;
    }
    return "";
  }, [actionType, txConfirmation]);
}

export default useTxSuccessMessage;
