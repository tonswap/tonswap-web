import { useCallback } from "react";
import gaAnalytics from "services/analytics/ga/ga";
import { ActionCategory, ActionType } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";

function useTxAnalytics(
  actionCategory: ActionCategory,
  actionType: ActionType
) {
  const { srcTokenAmount, destTokenAmount, selectedToken } =
    useTokenOperationsStore();

  const sendMessage = useCallback(() => {
    let message = "";
    if (actionType === ActionType.BUY) {
      message = `Swapped ${srcTokenAmount} TON for ${destTokenAmount} ${selectedToken?.name}`;
    }

    if (actionType === ActionType.SELL) {
      message = `Swapped ${srcTokenAmount} ${selectedToken?.name} for ${destTokenAmount} TON`;
    }
    if (actionType === ActionType.ADD_LIQUIDITY) {
      message = `Added ${srcTokenAmount} TON and ${destTokenAmount} ${selectedToken?.name} liquidity`;
    }
    if (actionType === ActionType.REMOVE_LIQUIDITY) {
      message = `Removed ${srcTokenAmount} TON and ${destTokenAmount} ${selectedToken?.name} liquidity`;
    }

    if (!message) {
      return;
    }

    console.log(message);

    return gaAnalytics.sendEvent(actionCategory, actionType, message);
  }, [
    actionCategory,
    actionType,
    srcTokenAmount,
    destTokenAmount,
    selectedToken,
  ]);

  return sendMessage;
}

export default useTxAnalytics;
