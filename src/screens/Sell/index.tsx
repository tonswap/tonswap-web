import { ton } from "tokens";
import { observer } from "mobx-react";

import { useStore } from "store";
import Icon from "assets/images/shared/sell.svg";
import { TokenLayout } from "../layouts/TokenLayout";
import { ReactComponent as Arrow } from "assets/images/shared/arrow.svg";
import { SvgIcon } from "@mui/material";
import TokenOperations from "screens/cmponents/TokenOperations";
import * as API from "services/api";
import {
  TokenOperationsStore,
  useTokenOperationsStore,
} from "screens/cmponents/TokenOperations/Context";

export const SellScreen = () => {
  return (
    <TokenOperationsStore>
      <Sell />
    </TokenOperationsStore>
  );
};

const Sell = observer(() => {
  const store = useStore();
  const {
    srcTokenAmount,
    destTokenAmount,
  } = useTokenOperationsStore();

  const getTxRequest = () => {
    if (store.selectedToken) {
      return API.generateSellLink(
        store.selectedToken.name,
        srcTokenAmount,
        destTokenAmount
      );
    }
  };

  const getBalances = () => {
    return Promise.all([
      API.getTokenBalance(store.selectedToken!!),
      API.getTonBalance(),
    ]);
  };


  const createSuccessMessage = () => {
    return  `Successfully swapped ${srcTokenAmount} ${store.selectedToken?.displayName} for ${destTokenAmount} TON`
  }

  return (
    <TokenLayout
      title={`Swap ${store.selectedToken?.displayName} to TON`}
      titleImage={Icon}
    >
      {store.selectedToken && (
        <TokenOperations
          createSuccessMessage={createSuccessMessage}
          icon={<SvgIcon component={Arrow} viewBox="0 0 13 22" />}
          getTxRequest={getTxRequest}
          getAmountFunc={API.getAmountsOut}
          getBalances={getBalances}
          srcToken={store.selectedToken}
          destToken={ton}
          submitButtonText={`Sell ${store.selectedToken?.displayName}`}
        />
      )}
    </TokenLayout>
  );
});
