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
import { ton } from "services/api/addresses";


export const BuyScreen = () => {
  return (
    <TokenOperationsStore>
      <Buy />
    </TokenOperationsStore>
  );
};

const Buy = observer(() => {
  const store = useStore();

  const {
    srcTokenAmount,
    destTokenAmount
  } = useTokenOperationsStore();

  const getTxRequest = async () => {
      return API.generateBuyLink(
        store.selectedToken!!.name,
        srcTokenAmount,
        destTokenAmount
      );
    
  };

  const getBalances = () => {
    return Promise.all([
      API.getTonBalance(),
      API.getTokenBalance(store.selectedToken!!),
    ]);
  };

const createSuccessMessage = () => {
  return `Successfully swapped ${srcTokenAmount} TON for ${destTokenAmount} ${store.selectedToken?.displayName}`
}


  return (
    <TokenLayout
      title={`Swap TON to ${store.selectedToken?.displayName}`}
      titleImage={Icon}
    >
      {store.selectedToken && (
        <TokenOperations
          createSuccessMessage={createSuccessMessage}
          icon={<SvgIcon component={Arrow} viewBox="0 0 13 22" />}
          getTxRequest={getTxRequest}
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
