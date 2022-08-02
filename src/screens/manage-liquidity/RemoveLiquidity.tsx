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
  const { srcTokenAmount, destTokenAmount, selectedToken } = useTokenOperationsStore();

  const getTxRequest = () => {
    if (selectedToken) {
      return API.generateRemoveLiquidityLink(
        selectedToken?.tokenMinter,
        srcTokenAmount
      );
    }
  };

  const getBalances = () => {
    return API.getTokensOfLPBalances(selectedToken!!.name);
  };

  const createSuccessMessage = `Successfully removed ${srcTokenAmount} TON and ${destTokenAmount} ${selectedToken?.displayName} liquidity`
  useTokenFromParams();


  const getNotification =  useCallback(
    () => (
      <>
        <Typography className="title">Purchase Confirmation</Typography>
        <Typography className="row">
          {selectedToken?.displayName} purchased: {destTokenAmount}
        </Typography>
        <Typography className="row">TON Paid: {srcTokenAmount}</Typography>
      </>
    ),
    [selectedToken, srcTokenAmount, destTokenAmount]
  );

  
  if (!selectedToken) {
    return null;
  }

  return (
    <TokenOperations
      successMessage={createSuccessMessage}
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
      getNotification={getNotification}
    />
  );
}


export default RemoveLiquidity
