import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ActionButton } from "components";
import { Token } from "types";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import { TokenOperationsStore, useTokenOperationsStore } from "./Context";
import DestToken from "./DestToken";
import SrcToken from "./SrcToken";
import useInterval from "hooks/useInterval";
import * as API from "services/api";
import Notification from "components/Notification";
import useTxPolling from "hooks/useTransactionStatus";

interface Props {
  srcToken: Token;
  destToken: Token;
  submitButtonText: string;
  disableButton: boolean;
  icon: any;
  getBalances: () => Promise<any>;
  getAmountFunc: any;
  onSubmit: () => void;
}

function TokenOperations({
  srcToken,
  destToken,
  submitButtonText,
  icon,
  getBalances,
  getAmountFunc,
  onSubmit,
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
  } = useTokenOperationsStore();

  const onTxFinished = async () => {
    await updateBalances();
    clearAmounts();
  };

  const { txSuccess, pollTx, closeSuccess } = useTxPolling(onTxFinished);

  const submitted = async () => {
    onSubmit();
    pollTx();
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
  }, []);

  return (
    <Box className={classes.content}>
      <Notification
        text="Swap Success!"
        open={txSuccess}
        onClose={closeSuccess}
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
            <WarningAmberRoundedIcon style={{ color: "white" }} /> Insufficient
            funds
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
