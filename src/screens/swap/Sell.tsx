import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";

import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { ActionCategory, ActionType } from "services/wallets/types";
import { useCallback, useMemo } from "react";
import { Typography } from "@mui/material";

const Sell = () => {
  const { srcTokenAmount, destTokenAmount, selectedToken } = useTokenOperationsStore();
  const { totalBalances } = useTokenOperationsStore();

  const getTxRequest = () => {
    return API.generateSellLink(
      selectedToken!.tokenMinter,
      srcTokenAmount,
      destTokenAmount
    )
  };

  const getBalances = () => {
    return Promise.all([
      API.getTokenBalance(selectedToken!!),
      API.getTonBalance(),
    ]);
  };

  const successMessage = useMemo(
    () =>
      `Successfully swapped ${srcTokenAmount} ${selectedToken?.displayName} for ${destTokenAmount} TON`,
    [srcTokenAmount, selectedToken, destTokenAmount]
  );

  const getNotification =   useCallback(
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

  useTokenFromParams();

  if (!selectedToken) {
    return null;
  }

 

  return (
    <TokenOperations
      successMessage={successMessage}
      icon={<SouthRoundedIcon />}
      getTxRequest={getTxRequest}
      getAmountFunc={API.getAmountsOut}
      getBalances={getBalances}
      srcToken={selectedToken}
      destToken={ton}
      submitButtonText={`Sell ${selectedToken?.displayName}`}
      refreshAmountsOnActionChange={
        !totalBalances.destBalance && !totalBalances.srcBalance
      }
      actionCategory={ActionCategory.SWAP}
      actionType={ActionType.SELL}
      gasFee={API.GAS_FEE.SWAP}
      getNotification={getNotification}
    />
  );
};

export default Sell;
