import * as API from "services/api";
import TokenOperations from "screens/components/TokenOperations";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { useTokensStore } from "store/tokens/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ActionCategory, ActionType } from "services/wallets/types";
import { Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
import { Box } from "@mui/system";
import TxSuccessNotification from "components/TxSuccessNotification";

const Buy = () => {
  const { srcTokenAmount, destTokenAmount, selectedToken } =
    useTokenOperationsStore();
  const { totalBalances } = useTokenOperationsStore();

  const getTxRequest = async () => {
    return API.generateBuyLink(
      selectedToken!!.tokenMinter,
      srcTokenAmount,
      destTokenAmount
    );
  };

  const getBalances = () => {
    return Promise.all([
      API.getTonBalance(),
      API.getTokenBalance(selectedToken!!),
    ]);
  };

  const successMessage = useMemo(
    () =>
      `Successfully swapped ${srcTokenAmount} TON for ${destTokenAmount} ${selectedToken?.displayName}`,
    [srcTokenAmount, destTokenAmount, selectedToken]
  );

  const getNotification = useCallback(() => {
    return (
      <TxSuccessNotification title="Purchase Confirmation">
        <Box className="row">
          <Typography>SHIBA purchased:</Typography>
          <Typography>0.74</Typography>
        </Box>
        <Box className="row">
          <Typography>TON Paid: </Typography>
          <Typography>20</Typography>
        </Box>
      </TxSuccessNotification>
    );
  }, [srcTokenAmount, destTokenAmount, selectedToken]);

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
      srcToken={ton}
      destToken={selectedToken}
      submitButtonText={`Buy ${selectedToken?.displayName}`}
      refreshAmountsOnActionChange={
        !totalBalances.destBalance && !totalBalances.srcBalance
      }
      actionCategory={ActionCategory.SWAP}
      actionType={ActionType.BUY}
      gasFee={API.GAS_FEE.SWAP}
      getNotification={getNotification}
    />
  );
};

export default Buy;
