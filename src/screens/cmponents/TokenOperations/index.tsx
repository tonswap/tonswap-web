import { Box } from "@mui/material";
import { useEffect } from "react";
import { ActionButton } from "components";
import { Token } from "types";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import { useTokenOperationsStore } from "./Context";
import DestToken from "./DestToken";
import SrcToken from "./SrcToken";
import Notification from "components/Notification";
import useTxPolling from "hooks/useTransactionStatus";
import { delay, isTelegramWebApp } from "utils";
import { fromNano } from "ton";
import useTelegramWebAppButton from "hooks/useTelegramWebAppButton";
import useWebAppResize from "hooks/useWebAppResize";

interface Props {
  srcToken: Token;
  destToken: Token;
  submitButtonText: string;
  disableButton: boolean;
  icon: any;
  getBalances: () => Promise<any>;
  getAmountFunc: any;
  onSubmit: () => void;
  successText: string;
}

function TokenOperations({
  srcToken,
  destToken,
  submitButtonText,
  icon,
  getBalances,
  getAmountFunc,
  onSubmit,
  successText,
}: Props) {
  const expanded = useWebAppResize()
  const classes = useStyles({ color: srcToken?.color || "", expanded });
  const {
    setTotalBalances,
    setDestAvailableAmountLoading,
    setSrcAvailableAmountLoading,
    srcTokenAmount,
    totalBalances,
    destLoading,
    srcLoading,
    clearAmounts,
    createAmountsCopyForSnackbar,
    clearAmountsCopyForSnackbar,
  } = useTokenOperationsStore();

  const onTxFinished = async () => {
    createAmountsCopyForSnackbar();
    await updateBalances();
    clearAmounts();
  };
  const insufficientFunds = srcTokenAmount > totalBalances.srcBalance;
  const isDisabled = !srcTokenAmount || srcLoading || destLoading;

  const { txSuccess, pollTx, closeSuccess } = useTxPolling(onTxFinished);
  useTelegramWebAppButton({
    onSubmit,
    submitButtonText,
    insufficientFunds,
    isDisabled,
  });

  const submitted = async () => {
    onSubmit();
    pollTx();
  };

  const onCloseSuccessSnackbar = async () => {
    closeSuccess();
    await delay(500);
    clearAmountsCopyForSnackbar();
  };

  const updateBalances = async () => {
    const [srcTokenBalance, destTokenBalance] = await getBalances();
    const srcBalance =
      typeof srcTokenBalance == "object"
        ? parseFloat(fromNano(srcTokenBalance.balance))
        : srcTokenBalance;
    const destBalance =
      typeof destTokenBalance == "object"
        ? parseFloat(fromNano(destTokenBalance.balance))
        : destTokenBalance;
    setTotalBalances({
      srcBalance: srcBalance,
      destBalance: destBalance,
    });
    setDestAvailableAmountLoading(false);
    setSrcAvailableAmountLoading(false);
  };

  useEffect(() => {
    updateBalances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box className={classes.content}>
      <Notification
        text={successText}
        open={txSuccess}
        onClose={onCloseSuccessSnackbar}
      />
      <Box className={classes.cards}>
        <SrcToken
          token={srcToken}
          getAmountFunc={getAmountFunc}
          destTokenName={destToken.name}
        />

        <Box className={classes.svg}>{icon}</Box>

        <DestToken
          getAmountFunc={getAmountFunc}
          token={destToken}
          srcTokenName={srcToken.name}
        />
      </Box>

      {!isTelegramWebApp() && (
        <Box className={classes.button}>
          {insufficientFunds ? (
            <ActionButton isDisabled onClick={() => {}}>
              <WarningAmberRoundedIcon
                style={{ color: "#7D7D7D", top: "-2px", position: "relative" }}
              />{" "}
              Insufficient funds
            </ActionButton>
          ) : (
            <ActionButton isDisabled={isDisabled} onClick={submitted}>
              {submitButtonText}
            </ActionButton>
          )}
        </Box>
      )}
    </Box>
  );
}

export default TokenOperations;
