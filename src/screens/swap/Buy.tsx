import * as API from "services/api";
import TokenOperations from "screens/components/TokenOperations";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import { ton } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ActionCategory, ActionType } from "services/wallets/types";
import gaAnalytics from "services/analytics/ga/ga";
import { useTranslation } from "react-i18next";
import { Typography } from '@mui/material'

const Buy = () => {
  const { srcTokenAmount, destTokenAmount, selectedToken } =
    useTokenOperationsStore();
  const { totalBalances } = useTokenOperationsStore();
  const { t } = useTranslation()

  const getTxRequest = async () => {
    gaAnalytics.buyTransaction()
    return API.generateBuyLink(
      selectedToken!!.tokenMinter,
      srcTokenAmount,
      destTokenAmount
    );
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
    <>
    <TokenOperations
      icon={<SouthRoundedIcon />}
      getTxRequest={getTxRequest}
      getAmountFunc={API.getAmountsOut}
      getBalances={getBalances}
      srcToken={ton}
      destToken={selectedToken}
      submitButtonText={t('buy', { token: `${selectedToken?.displayName}` })}
      refreshAmountsOnActionChange={
        !totalBalances.destBalance && !totalBalances.srcBalance
      }
      actionCategory={ActionCategory.SWAP}
      actionType={ActionType.BUY}
      gasFee={API.GAS_FEE.SWAP}
    />
      <Typography align='center' fontSize={15}>{t('risks-understanding')}</Typography>
      </>
  );
};

export default Buy;
