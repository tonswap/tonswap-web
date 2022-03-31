import { ton } from "data";
import { observer } from "mobx-react";

import { useStore } from "store";
import Icon from "assets/images/shared/sell.svg";
import { SwapLayout } from "../layouts/SwapLayout";
import { ReactComponent as Arrow } from "assets/images/shared/arrow.svg";
import { SvgIcon } from "@mui/material";

export const SellScreen = observer(() => {
  const store = useStore();
  const submit = (res: any) => {
    console.log(res);
  };

  return (
    <SwapLayout
      title={`Swap ${store.selectedToken?.name} to TON`}
      titleImage={Icon}
    >
      {/* <SwapContentLayout
        icon={<SvgIcon component={Arrow} viewBox="0 0 13 22" />}
        disableButton={true}
        submit={submit}
        firstCard={store.selectedToken}
        secondCard={ton}
        submitButtonText={`Sell ${store.selectedToken?.name}`}
      /> */}
    </SwapLayout>
  );
});

