import { ton } from "tokens";
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
    destTokenAmountCopy,
    srcTokenAmountCopy,
  } = useTokenOperationsStore();

  const onSubmit = () => {
    if (store.selectedToken) {
      API.generateRemoveLiquidityLink(
        store.selectedToken?.name,
        srcTokenAmount
      );
    }
  };

  const getBalances = () => {
    return API.getTokensOfLPBalances(store.selectedToken!!.name);
  };

  return (
    <TokenLayout title="Remove Liquidity" titleImage={Icon}>
      {store.selectedToken && (
        <TokenOperations
          successText={`Successfully removed ${srcTokenAmountCopy} TON and ${destTokenAmountCopy} ${store.selectedToken.displayName} liquidity`}
          icon={<SvgIcon component={Minus} viewBox="0 0 13 22" />}
          disableButton={false}
          onSubmit={onSubmit}
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
