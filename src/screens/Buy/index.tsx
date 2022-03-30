import { ton } from "data";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import Icon from "assets/images/shared/buy.svg";
import { SwapLayout } from "../layouts/SwapLayout";
import { SwapContentLayout } from "../layouts/SwapContentLayout";
import { ReactComponent as Arrow } from "assets/images/shared/arrow.svg";
import { SvgIcon } from "@mui/material";

export const BuyScreen = observer(() => {
  const store = useStore();

  const submit = (res: any) => {
    console.log(res);
  };

  return (
    <SwapLayout
      title={`Swap TON to ${store.selectedToken?.name}`}
      titleImage={Icon}
    >
      <SwapContentLayout
      icon={<SvgIcon component={Arrow} viewBox="0 0 13 22" />}
        disableButton={false}
        submit={submit}
        firstCard={ton}
        secondCard={store.selectedToken}
        submitButtonText={`Buy ${store.selectedToken?.name}`}
      />
    </SwapLayout>
  );
});

