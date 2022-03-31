import { ton } from "data";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import Icon from "assets/images/shared/buy.svg";
import { SwapLayout } from "../layouts/SwapLayout";
import { ReactComponent as Arrow } from "assets/images/shared/arrow.svg";
import { SvgIcon } from "@mui/material";
import * as API from "services/api";
import TokenOperations from "screens/cmponents/TokenOperations";

export const BuyScreen = observer(() => {
  const store = useStore();
  const submit = (res: any) => {
    console.log(res);
  };

  const getBalances = () => {
    return Promise.all([
      API.getTonBalance(),
      API.getTokenBalance(store.selectedToken!!),
    ]);
  };

  return (
    <SwapLayout
      title={`Swap TON to ${store.selectedToken?.name}`}
      titleImage={Icon}
    >
      {store.selectedToken && (
        <TokenOperations
          icon={<SvgIcon component={Arrow} viewBox="0 0 13 22" />}
          disableButton={false}
          submit={submit}
          getAmountFunc={API.getAmountsOut}
          getBalances={getBalances}
          srcToken={ton}
          destToken={store.selectedToken}
          submitButtonText={`Buy ${store.selectedToken?.name}`}
        />
      )}
    </SwapLayout>
  );
});
