import { observer } from "mobx-react";
import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";
import { SvgIcon } from "@mui/material";
import { ReactComponent as Minus } from "assets/images/shared/minus.svg";

import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { useTokensStore } from "store/tokens/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ActionCategory, ActionType } from "services/wallets/types";



const RemoveLiquidity = () => {
  const { selectedToken } = useTokensStore();
  const { srcTokenAmount, destTokenAmount } = useTokenOperationsStore();

  const getTxRequest = () => {
    if (selectedToken) {
      return API.generateRemoveLiquidityLink(
        selectedToken?.name,
        srcTokenAmount
      );
    }
  };

  const getBalances = () => {
    return API.getTokensOfLPBalances(selectedToken!!.name);
  };

  const createSuccessMessage = () => {
    return `Successfully removed ${srcTokenAmount} TON and ${destTokenAmount} ${selectedToken?.displayName} liquidity`;
  };

  useTokenFromParams();

  if (!selectedToken) {
    return null;
  }

  return (
    <TokenOperations
      createSuccessMessage={createSuccessMessage}
      icon={<SvgIcon component={Minus} viewBox="0 0 13 22" />}
      getTxRequest={getTxRequest}
      getAmountFunc={API.getLiquidityAmount}
      getBalances={getBalances}
      srcToken={ton}
      destToken={selectedToken}
      submitButtonText={`Remove TON/${selectedToken?.displayName} liquidity`}
      refreshAmountsOnActionChange={true}
      actionCategory={ActionCategory.MANAGE_LIQUIDITY}
      actionType ={ActionType.REMOVE_LIQUIDITY}
      gasFee = {API.GAS_FEE.REMOVE_LIQUIDITY}

    />
  );
}


export default RemoveLiquidity
