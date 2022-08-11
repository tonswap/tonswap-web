import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";

import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { ActionCategory, ActionType } from "services/wallets/types";
import gaAnalytics from "services/analytics/ga/ga";

const Sell = () => {
  const { srcTokenAmount, destTokenAmount, selectedToken } = useTokenOperationsStore();
  const { totalBalances } = useTokenOperationsStore();

  const getTxRequest = () => {
    gaAnalytics.sellTransaction()
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


  useTokenFromParams();

  if (!selectedToken) {
    return null;
  }

 

  return (
    <TokenOperations
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
    />
  );
};

export default Sell;
