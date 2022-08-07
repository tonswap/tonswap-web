import { ton } from "services/api/addresses";
import { SvgIcon } from "@mui/material";
import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";
import { ReactComponent as Plus } from "assets/images/shared/plus.svg";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ActionCategory, ActionType } from "services/wallets/types";
import BN from "bn.js";
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const AddLiquidity = () => {
  const { srcTokenAmount, destTokenAmount, selectedToken } =
    useTokenOperationsStore();

  const getTxRequest = () => {
    if (selectedToken) {
      return API.generateAddLiquidityLink(
        selectedToken?.tokenMinter,
        srcTokenAmount,
        destTokenAmount
      );
    }
  };

  const getAmountOut = async (
    srcToken: string,
    destToken: string,
    srcAmount: BN | null,
    destAmount: BN | null
  ) => {
    if (!selectedToken?.name) {
      return;
    }
    let data = await API.getPoolInfo(selectedToken?.tokenMinter);
    console.log({ data });

    if (
      data.tokenReserves.toString() == "0" &&
      data.tonReserves.toString() == "0"
    ) {
      return 0;
    }

    let res = await API.getLiquidityAmount(
      srcToken,
      destToken,
      srcAmount,
      destAmount
    );
    return res;
  };

  const getBalances = () => {
    return Promise.all([
      API.getTonBalance(),
      API.getTokenBalance(selectedToken!!),
    ]);
  };

  useTokenFromParams();

  if (!selectedToken) {
    return null;
  }

  return (
    <TokenOperations
      icon={<AddRoundedIcon />}
      getAmountFunc={getAmountOut}
      getBalances={getBalances}
      srcToken={ton}
      getTxRequest={getTxRequest}
      destToken={selectedToken}
      submitButtonText={`Add TON/${selectedToken?.displayName} liquidity`}
      refreshAmountsOnActionChange={true}
      actionCategory={ActionCategory.MANAGE_LIQUIDITY}
      actionType={ActionType.ADD_LIQUIDITY}
      gasFee={API.GAS_FEE.ADD_LIQUIDITY}
    />
  );
};

export default AddLiquidity;
