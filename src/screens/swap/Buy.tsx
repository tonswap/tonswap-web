import { ReactComponent as Arrow } from "assets/images/shared/arrow.svg";
import { SvgIcon } from "@mui/material";
import * as API from "services/api";
import TokenOperations from "screens/components/TokenOperations";

import { ton } from "services/api/addresses";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { useTokensStore } from "store/tokens/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";

const Buy = () => {
  console.log("test");

  const { selectedToken } = useTokensStore();
  const { srcTokenAmount, destTokenAmount } = useTokenOperationsStore();
  const {totalBalances} = useTokenOperationsStore()

  const getTxRequest = async () => {
    return API.generateBuyLink(
      selectedToken!!.name,
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

  const createSuccessMessage = () => {
    return `Successfully swapped ${srcTokenAmount} TON for ${destTokenAmount} ${selectedToken?.displayName}`;
  };

  useTokenFromParams();

  if (!selectedToken) {
    return null;
  }

  return (
    
    <TokenOperations
      createSuccessMessage={createSuccessMessage}
      icon={<SvgIcon component={Arrow} viewBox="0 0 13 22" />}
      getTxRequest={getTxRequest}
      getAmountFunc={API.getAmountsOut}
      getBalances={getBalances}
      srcToken={ton}
      destToken={selectedToken}
      submitButtonText={`Buy ${selectedToken?.displayName}`}
      refreshAmountsOnActionChange={!totalBalances.destBalance && !totalBalances.srcBalance}
    />
  );
};

export default Buy;
