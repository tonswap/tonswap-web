import { ton } from "services/api/addresses";
import TokenOperations from "screens/components/TokenOperations";
import * as API from "services/api";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ActionCategory, ActionType } from "services/wallets/types";
import BN from "bn.js";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useEffect, useState } from "react";
import { Address } from "ton";
import MainLoader from "components/MainLoader";
import gaAnalytics from "services/analytics/ga/ga";
import { useTranslation } from "react-i18next";
import { fromDecimals } from 'utils'
import { usePoolInfo } from 'hooks/usePoolInfo'

const AddLiquidity = () => {
  const { srcTokenAmount, destTokenAmount, selectedToken } =
    useTokenOperationsStore();
  const [haveReserves, setHaveReserves] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation()
  const {fetchPoolData} = usePoolInfo()

  const getTxRequest = () => {
    gaAnalytics.addLiquidityTransaction()
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

  useEffect(() => {
    if (selectedToken) {
      const getTokenReserves = async () => {
        try {
          const res = await API.getPoolData(
            Address.parse(selectedToken.ammMinter!!), selectedToken.ammVersion
          );
          const tokenReserves = fromDecimals(res.tokenReserves, selectedToken?.decimals);
          const tonReserves = fromDecimals(res.tonReserves, 9);
          if (!res.tokenReserves.isZero() && !res.tonReserves.isZero()) {
            setHaveReserves(true)
          }
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      };
      getTokenReserves();
    }
  }, [selectedToken]);

  const getBalances = () => {
    return Promise.all([
      API.getTonBalance(),
      API.getTokenBalance(selectedToken!!),
    ]);
  };

  useTokenFromParams();

  if (!selectedToken || isLoading) {
    return <MainLoader />;
  }

  return (
    <TokenOperations
      icon={<AddRoundedIcon />}
      getAmountFunc={getAmountOut}
      getBalances={getBalances}
      srcToken={ton}
      getTxRequest={getTxRequest}
      destToken={selectedToken}
      submitButtonText={t('add-ton-liquidity', { token: selectedToken?.displayName })}
      refreshAmountsOnActionChange={true}
      actionCategory={ActionCategory.MANAGE_LIQUIDITY}
      actionType={ActionType.ADD_LIQUIDITY}
      gasFee={API.GAS_FEE.ADD_LIQUIDITY}
      disableInputDependency={!haveReserves}
      onSuccess={fetchPoolData}
    />
  );
};

export default AddLiquidity;
