import { ton } from "data";

import { useStore } from "store";
import { observer } from "mobx-react";
import Icon from "assets/images/shared/remove-liquidity.svg";
import { SwapLayout } from "../layouts/SwapLayout";
import { SwapContentLayout } from "../layouts/SwapContentLayout";
import { ReactComponent as Minus } from "assets/images/shared/minus.svg";
import { SvgIcon } from "@mui/material";

export const RemoveLiquidityScreen = observer(() => {
  const store = useStore();

  const submit = (res: any) => {
    console.log(res);
  };

  return (
    <SwapLayout title="Remove Liquidity" titleImage={Icon}>
      <SwapContentLayout
        icon={<SvgIcon component={Minus} viewBox="0 0 12 3" fontSize='small' />}
        disableButton={true}
        submit={submit}
        firstCard={store.selectedToken}
        secondCard={ton}
        submitButtonText={`Remove ${store.selectedToken?.name} & TON liquidity`}
      />
    </SwapLayout>
  );
});

