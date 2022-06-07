import { ton } from "tokens";
import { Box, SvgIcon } from "@mui/material";
import { useStore } from "store";
import { observer } from "mobx-react";
import Icon from "assets/images/shared/add-liqudity.svg";
import { TokenLayout } from "../layouts/TokenLayout";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import TokenOperations from "screens/cmponents/TokenOperations";
import * as API from "services/api";
import { ReactComponent as Plus } from "assets/images/shared/plus.svg";

import {
  TokenOperationsStore,
  useTokenOperationsStore,
} from "screens/cmponents/TokenOperations/Context";

const useStyles = makeStyles((theme: Theme) => ({
  subTitle: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    "& img": {
      marginRight: 10,
      position: "relative",
      top: 2,
    },
    "& p": {
      fontSize: 18,
      fontWeight: 700,
      "& strong": {
        fontSize: 22,
        color: "#E42473",
      },
    },
  },
}));

export const AddLiquidityScreen = () => {
  return (
    <TokenOperationsStore>
      <AddLiquidity />
    </TokenOperationsStore>
  );
};

const AddLiquidity = observer(() => {
  const classes = useStyles();
  const store = useStore();
  const { srcTokenAmount, destTokenAmount, totalBalances } =
    useTokenOperationsStore();

  const getTxRequest = () => {
    if (store.selectedToken) {
      return API.generateAddLiquidityLink(
        store.selectedToken?.name,
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

  const createSuccessMessage = () => {
    return `Successfully added ${srcTokenAmount} TON and ${destTokenAmount} ${store.selectedToken?.displayName} liquidity`;
  };

  const isInsufficientFunds = (src: number, dest: number) => {
    if (!src || !dest) {
      return false;
    }
    if (src > totalBalances.srcBalance || dest > totalBalances.destBalance) {
      return true;
    }
    return false;
  };

  return (
    <TokenLayout
      title="Add Liquidity and earn"
      subTitle={<Box className={classes.subTitle}></Box>}
      titleImage={Icon}
    >
      {store.selectedToken && (
        <TokenOperations
          createSuccessMessage={createSuccessMessage}
          icon={<SvgIcon component={Plus} viewBox="0 0 13 22" />}
          getAmountFunc={API.getLiquidityAmount}
          getBalances={getBalances}
          srcToken={ton}
          getTxRequest={getTxRequest}
          destToken={store.selectedToken}
          submitButtonText={`Add TON/${store.selectedToken?.displayName} liquidity`}
          isInsufficientFunds={isInsufficientFunds}
        />
      )}
    </TokenLayout>
  );
});
