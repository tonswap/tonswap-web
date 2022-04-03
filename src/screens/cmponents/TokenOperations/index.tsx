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
import { delay } from "utils";

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
  const classes = useStyles({ color: srcToken?.color || "" });
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

  const { txSuccess, pollTx, closeSuccess } = useTxPolling(onTxFinished);

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
    setTotalBalances({
      srcBalance: srcTokenBalance,
      destBalance: destTokenBalance,
    });
    setDestAvailableAmountLoading(false);
    setSrcAvailableAmountLoading(false);
  };

  const insufficientFunds = srcTokenAmount > totalBalances.srcBalance;

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

      <Box className={classes.button}>
        {insufficientFunds ? (
          <ActionButton isDisabled onClick={() => {}}>
            <WarningAmberRoundedIcon
              style={{ color: "#7D7D7D", top: "-2px", position: "relative" }}
            />{" "}
            Insufficient funds
          </ActionButton>
        ) : (
          <ActionButton
            isDisabled={!srcTokenAmount || srcLoading || destLoading}
            onClick={submitted}
          >
            {submitButtonText}
          </ActionButton>
        )}
      </Box>
    </Box>
  );
}

export default TokenOperations;
