import { useStore } from "store";
import { observer } from "mobx-react";
import Icon from "assets/images/shared/remove-liquidity.svg";
import { TokenLayout } from "../layouts/TokenLayout";
import TokenOperations from "screens/cmponents/TokenOperations";
import * as API from "services/api";
import { SvgIcon } from "@mui/material";
import { ReactComponent as Minus } from "assets/images/shared/minus.svg";
import {
  TokenOperationsStore,
  useTokenOperationsStore,
} from "screens/cmponents/TokenOperations/Context";
import { ton } from "services/api/addresses";

export const RemoveLiquidityScreen = () => {
  return (
    <TokenOperationsStore>
      <RemoveLiquidity />
    </TokenOperationsStore>
  );
};

const RemoveLiquidity = observer(() => {
  const store = useStore();
  const {
    srcTokenAmount,
    destTokenAmount
  } = useTokenOperationsStore();

  const getTxRequest = () => {
    if (store.selectedToken) {
      return API.generateRemoveLiquidityLink(
        store.selectedToken?.name,
        srcTokenAmount
      );
    }
  };

  const getBalances = () => {
    return API.getTokensOfLPBalances(store.selectedToken!!.name);
  };


  const createSuccessMessage = () => {
    return `Successfully removed ${srcTokenAmount} TON and ${destTokenAmount} ${store.selectedToken?.displayName} liquidity`
  }

  return (
    <TokenLayout title="Remove Liquidity" titleImage={Icon}>
      {store.selectedToken && (
        <TokenOperations
          createSuccessMessage={createSuccessMessage}
          icon={<SvgIcon component={Minus} viewBox="0 0 13 22" />}
          getTxRequest={getTxRequest}
          getAmountFunc={API.getLiquidityAmount}
          getBalances={getBalances}
          srcToken={ton}
          destToken={store.selectedToken}
          submitButtonText={`Remove TON/${store.selectedToken?.displayName} liquidity`}
        />
      )}
    </TokenLayout>
  );
});
