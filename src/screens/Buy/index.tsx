import { ton } from "tokens";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import Icon from "assets/images/shared/buy.svg";
import { TokenLayout } from "../layouts/TokenLayout";
import { ReactComponent as Arrow } from "assets/images/shared/arrow.svg";
import { SvgIcon } from "@mui/material";
import * as API from "services/api";
import TokenOperations from "screens/cmponents/TokenOperations";

import {
  TokenOperationsStore,
  useTokenOperationsStore,
} from "screens/cmponents/TokenOperations/Context";

export const BuyScreen = () => {
  return (
    <TokenOperationsStore>
      <Buy />
    </TokenOperationsStore>
  );
};

const Buy = observer(() => {
  const store = useStore();

  const { srcTokenAmount, destTokenAmount } =
    useTokenOperationsStore();

  const onSubmit = () => {
    if (store.selectedToken) {
      API.generateBuyLink(
        store.selectedToken.name,
        srcTokenAmount,
        destTokenAmount
      );
    }
  };


  const getBalances = () => {
    return Promise.all([
      API.getTonBalance(),
      API.getTokenBalance(store.selectedToken!!),
    ]);
  };

  return (
    <TokenLayout
      title={`Swap TON to ${store.selectedToken?.name}`}
      titleImage={Icon}
    >
      {store.selectedToken && (
        <TokenOperations
          icon={<SvgIcon component={Arrow} viewBox="0 0 13 22" />}
          disableButton={false}
          onSubmit={onSubmit}
          getAmountFunc={API.getAmountsOut}
          getBalances={getBalances}
          srcToken={ton}
          destToken={store.selectedToken}
          submitButtonText={`Buy ${store.selectedToken?.displayName}`}
        />
      )}
    </TokenLayout>
  );
});
