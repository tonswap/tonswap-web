import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";
import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ActionCategory, ActionType } from "services/wallets/types";
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import gaAnalytics from "services/analytics/ga/ga";


const RemoveLiquidity = () => {
  const { srcTokenAmount, selectedToken } = useTokenOperationsStore();

  const getTxRequest = () => {
    gaAnalytics.removeLiquidityTransaction()

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
      icon={<RemoveRoundedIcon />}
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
