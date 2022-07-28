import { Box, Fade } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ActionButton } from "components";
import { PoolInfo } from "services/api/addresses";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import DestToken from "./DestToken";
import SrcToken from "./SrcToken";
import useTxPolling from "screens/components/TokenOperations/useTransactionStatus";
import { isTelegramWebApp } from "utils";
import useWebAppResize from "hooks/useWebAppResize";
import { walletService } from "services/wallets/WalletService";
import { telegramWebApp } from "services/telegram";
import useNotification from "hooks/useNotification";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { useWalletStore } from "store/wallet/hooks";
import { useWalletModalToggle } from "store/application/hooks";
import { StyledTokenOperationActions } from "styles/styles";
import Icon from "./Icon";
import gaAnalytics from "services/analytics/ga";
import { ActionCategory, ActionType } from "services/wallets/types";

interface Props {
  srcToken: PoolInfo;
  destToken: PoolInfo;
  submitButtonText: string;
  icon: any;
  getBalances: () => Promise<any>;
  getAmountFunc: any;
  getTxRequest: () => any;
  createSuccessMessage: () => string;
  isInsufficientFunds?: (src: number, dest: number) => boolean;
  refreshAmountsOnActionChange: boolean;
  actionCategory: ActionCategory;
  actionType: ActionType;
}

const TokenOperations = ({
  srcToken,
  destToken,
  submitButtonText,
  icon,
  getBalances,
  getAmountFunc,
  getTxRequest,
  createSuccessMessage,
  isInsufficientFunds,
  refreshAmountsOnActionChange,
  actionCategory,
  actionType
}: Props) => {
  const expanded = useWebAppResize();
  const classes = useStyles({ color: srcToken?.color || "", expanded });
  const [loading, setLoading] = useState(false);
  const [txFinished, setTxFinished] = useState(false);

  const {
    srcTokenAmount,
    destLoading,
    srcLoading,
    destTokenAmount,
    totalBalances,
  } = useTokenOperationsStore();
  const toggleModal = useWalletModalToggle();
  const { address, adapterId, session } = useWalletStore();

  const { onResetAmounts, getTokensBalance, resetTokensBalance } =
    useTokenOperationsActions();

  const { pollTx, cancelPolling } = useTxPolling();
  const successTextRef = useRef("");
  const { showNotification } = useNotification();

  const onPollingFinished = async (fetchBalances?: boolean) => {
    setLoading(false);
    if (fetchBalances) {
      successTextRef.current = createSuccessMessage();
      gaAnalytics.sendEvent(actionCategory, actionType, successTextRef.current);

      showNotification({
        message: <>{successTextRef.current}</>,
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 6000,
      });
      onResetAmounts();
      getTokensBalance(getBalances);
      if (isTelegramWebApp()) {
        setTxFinished(true);
      }
    }
  };

  const insufficientFunds = isInsufficientFunds
    ? isInsufficientFunds(srcTokenAmount, destTokenAmount)
    : srcTokenAmount > totalBalances.srcBalance;

  const isDisabled = !srcTokenAmount || srcLoading || destLoading;

  const onSubmit = async () => {
    setLoading(true);
    const txRequest = await getTxRequest();

    try {
      await walletService.requestTransaction(
        adapterId!!,
        session,
        txRequest,
        () => pollTx(onPollingFinished)
      );
    } catch (error) {
      cancelPolling();
      setLoading(false);
      if (error instanceof Error) {
        showNotification({
          message: <>{error.message}</>,
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 6000,
        });
      }
    }
  };

  useEffect(() => {
    if (address && refreshAmountsOnActionChange) {
      getTokensBalance(getBalances);
    } else if (!address) {
      resetTokensBalance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <StyledTokenOperationActions>
      <Box className={classes.content}>
        <Box
          className={classes.cards}
          style={{ pointerEvents: loading ? "none" : "all" }}
        >
          <SrcToken
            token={srcToken}
            getAmountFunc={getAmountFunc}
            destTokenName={destToken.name}
          />

          <Icon icon={icon} color={srcToken.color} />
          <DestToken
            getAmountFunc={getAmountFunc}
            token={destToken}
            srcTokenName={srcToken.name}
          />
        </Box>

        <Box className={classes.button}>
          {!address ? (
            <ActionButton onClick={toggleModal}>Connect wallet</ActionButton>
          ) : insufficientFunds ? (
            <ActionButton isDisabled onClick={() => {}}>
              <WarningAmberRoundedIcon
                style={{
                  color: "#7D7D7D",
                  top: "-2px",
                  position: "relative",
                }}
              />
              Insufficient funds
            </ActionButton>
          ) : txFinished ? (
            <ActionButton
              isDisabled={false}
              onClick={() => telegramWebApp.close()}
            >
              Done
            </ActionButton>
          ) : (
            <ActionButton
              isLoading={loading}
              isDisabled={isDisabled}
              onClick={onSubmit}
            >
              {submitButtonText}
            </ActionButton>
          )}
        </Box>
      </Box>
    </StyledTokenOperationActions>
  );
};

export default TokenOperations;
