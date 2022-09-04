import { Box } from "@mui/material";
import { ButtonWrapper } from "components";
import { useEffect, useState } from "react";
import { ActionButton } from "components";
import { PoolInfo } from "services/api/addresses";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import DestToken from "./DestToken";
import SrcToken from "./SrcToken";
import { walletService } from "services/wallets/WalletService";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { useWalletStore } from "store/wallet/hooks";
import {
  useIsExpandedView,
  useWalletModalToggle,
} from "store/application/hooks";
import { StyledTokenOperationActions } from "styles/styles";
import Icon from "./Icon";
import { ActionCategory, ActionType } from "services/wallets/types";
import { client, GAS_FEE, waitForSeqno } from "services/api";
import { Address } from "ton";
import SuccessModal from "./SuccessModal";
import useValidation from "./useValidation";
import TxError from "./TxError";
import useTxAnalytics from "./useTxAnalytics";
import gaAnalytics from "services/analytics/ga/ga";
<<<<<<< HEAD
import { useTranslation } from "react-i18next";
=======
import TxLoader from "./TxLoader";
>>>>>>> cbcbccd76677b284ffd0cf3fb4c6755fbe4c1a2a

interface Props {
  srcToken: PoolInfo;
  destToken: PoolInfo;
  submitButtonText: string;
  icon: any;
  getBalances: () => Promise<any>;
  getAmountFunc: any;
  getTxRequest: () => any;
  refreshAmountsOnActionChange: boolean;
  actionCategory: ActionCategory;
  actionType: ActionType;
  gasFee: GAS_FEE;
  disableInputDependency?: boolean;
}

const TokenOperations = ({
  srcToken,
  destToken,
  submitButtonText,
  icon,
  getBalances,
  getAmountFunc,
  getTxRequest,
  refreshAmountsOnActionChange,
  actionCategory,
  actionType,
  gasFee,
  disableInputDependency,
}: Props) => {
  const expanded = useIsExpandedView();
  const classes = useStyles({ color: srcToken?.color || "", expanded });
  const [showTxLoader, setShowTxLoader] = useState<boolean>(false);

  const { txPending, srcTokenAmount } = useTokenOperationsStore();
  const toggleModal = useWalletModalToggle();
  const { address, adapterId, session } = useWalletStore();

  const sendAnalyticsEvent = useTxAnalytics(actionCategory, actionType)


  const { insufficientFunds, disabled, maxAmount } = useValidation(
    actionType,
    gasFee,
    srcToken
  );
  const {
    onResetAmounts,
    getTokensBalance,
    resetTokensBalance,
    sendTransaction,
  } = useTokenOperationsActions();
  const { t } = useTranslation();


  const onSubmit = async () => {
    setShowTxLoader(true)
    const tx = async () => {
      const txRequest = await getTxRequest();
      const waiter = await waitForSeqno(
        client.openWalletFromAddress({
          source: Address.parse(address!!),
        })
      );
      await walletService.requestTransaction(adapterId!!, session, txRequest);
      await waiter();

      sendAnalyticsEvent()
      onResetAmounts();
      getTokensBalance(getBalances);
    };

    sendTransaction(tx);
  };

  useEffect(() => {
    if (address && refreshAmountsOnActionChange) {
      getTokensBalance(getBalances);
    } else if (!address) {
      resetTokensBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);


  const onConnect = () => {
    toggleModal()
    gaAnalytics.connect()
  }


  return (
<<<<<<< HEAD
    <StyledTokenOperationActions
      style={{ pointerEvents: txPending ? 'none' : 'all' }}
    >
=======
    <StyledTokenOperationActions>
>>>>>>> cbcbccd76677b284ffd0cf3fb4c6755fbe4c1a2a
        <TxError />
        <TxLoader open={showTxLoader} adapterId={adapterId} cancel={() => setShowTxLoader(false)} />
        <SuccessModal actionType={actionType} />
        <Box className={classes.content}>
          <Box
            className={classes.cards}
            style={{ pointerEvents: txPending ? "none" : "all" }}
          >
            <SrcToken
              token={srcToken}
              getAmountFunc={getAmountFunc}
              destTokenName={destToken.tokenMinter}
              maxAmount={maxAmount}
              disableInputDependency={disableInputDependency}
            />

            <Icon icon={icon} color={destToken.color} />
            <DestToken
              getAmountFunc={getAmountFunc}
              token={destToken}
              srcTokenName={srcToken.tokenMinter}
              disableInputDependency={disableInputDependency}
              srcTokenAmount={srcTokenAmount}
              actionType={actionType}
            />
          </Box>

          <Box className={classes.button}>
            {!address ? (
              <ButtonWrapper onClick={onConnect} text={t('connect-wallet')} />
            ) : insufficientFunds ? (
              <ButtonWrapper
                isDisabled={disabled || insufficientFunds}
                onClick={() => { }}
<<<<<<< HEAD
                text={t('insufficient-funds')}
                image={<WarningAmberRoundedIcon
=======
            >
              <WarningAmberRoundedIcon
>>>>>>> cbcbccd76677b284ffd0cf3fb4c6755fbe4c1a2a
                  style={{
                    color: "#7D7D7D",
                    top: "-2px",
                    position: "relative",
                  }}
                />}
              />
            ) : (
<<<<<<< HEAD
              <ButtonWrapper
                isLoading={txPending}
=======
            <ActionButton
              isLoading={showTxLoader}
>>>>>>> cbcbccd76677b284ffd0cf3fb4c6755fbe4c1a2a
                isDisabled={disabled || insufficientFunds}
                onClick={onSubmit}
                text={submitButtonText}
              />
            )}
          </Box>
        </Box>
      </StyledTokenOperationActions>
      );
};

      export default TokenOperations;
