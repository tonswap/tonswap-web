import * as API from "services/api";
import TokenOperations from "screens/components/TokenOperations";
import SouthRoundedIcon from '@mui/icons-material/SouthRounded';
import { ton } from "services/api/addresses";
import {
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { useTokensStore } from "store/tokens/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";

const Buy = () => {

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
      icon={<SouthRoundedIcon />}
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
