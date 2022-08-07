import { observer } from "mobx-react";
import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";
import { SvgIcon, Typography } from "@mui/material";
import { ReactComponent as Minus } from "assets/images/shared/minus.svg";

import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ActionCategory, ActionType } from "services/wallets/types";
import { useCallback } from "react";



const RemoveLiquidity = () => {
  const { srcTokenAmount, selectedToken } = useTokenOperationsStore();

  const getTxRequest = () => {
    return API.generateRemoveLiquidityLink(
      selectedToken!.tokenMinter,
      srcTokenAmount
    );
  };

  const getBalances = () => {
    return API.getTokensOfLPBalances(selectedToken!!.tokenMinter);
  };

  useTokenFromParams();



  
  if (!selectedToken) {
    return null;
  }

  return (
    <TokenOperations
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
