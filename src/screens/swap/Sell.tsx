import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";

import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { useTokensStore } from "store/tokens/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { ActionCategory, ActionType } from "services/wallets/types";

const Sell = () => {
  const { srcTokenAmount, destTokenAmount } = useTokenOperationsStore();
  const { selectedToken } = useTokensStore();
  const { totalBalances } = useTokenOperationsStore();

  const getTxRequest = () => {
    if (selectedToken) {
      return API.generateSellLink(
        selectedToken.name,
        srcTokenAmount,
        destTokenAmount
      );
    }
  };

  const getBalances = () => {
    return Promise.all([
      API.getTokenBalance(selectedToken!!),
      API.getTonBalance(),
    ]);
  };

  const createSuccessMessage = () => {
    return `Successfully swapped ${srcTokenAmount} ${selectedToken?.displayName} for ${destTokenAmount} TON`;
  };

  useTokenFromParams();

  if (!selectedToken) {
    return null;
  }

  return (
    <TokenOperations
      createSuccessMessage={createSuccessMessage}
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
    />
  );
};

export default Sell;
