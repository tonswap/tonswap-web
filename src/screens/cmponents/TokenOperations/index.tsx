import { Box, Fade } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ActionButton } from "components";
import { Token } from "types";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import { useTokenOperationsStore } from "./Context";
import DestToken from "./DestToken";
import SrcToken from "./SrcToken";
import Notification from "components/Notification";
import useTxPolling from "screens/cmponents/TokenOperations/useTransactionStatus";
import { delay } from "utils";
import { fromNano } from "ton";
import useWebAppResize from "hooks/useWebAppResize";
import { walletService } from "services/wallets/WalletService";
import { useStore } from "store";
import { observer } from "mobx-react";

interface Props {
  srcToken: Token;
  destToken: Token;
  submitButtonText: string;
  icon: any;
  getBalances: () => Promise<any>;
  getAmountFunc: any;
  getTxRequest: () => any;
  createSuccessMessage: () => string;
  isInsufficientFunds?: (src: number, dest: number) => boolean;
}

const TokenOperations = observer(
  ({
    srcToken,
    destToken,
    submitButtonText,
    icon,
    getBalances,
    getAmountFunc,
    getTxRequest,
    createSuccessMessage,
    isInsufficientFunds,
  }: Props) => {
    const expanded = useWebAppResize();
    const store = useStore();
    const classes = useStyles({ color: srcToken?.color || "", expanded });
    const [loading, setLoading] = useState(false);
    const [txError, setTxError] = useState<string | null>(null);

    const {
      setTotalBalances,
      setDestAvailableAmountLoading,
      setSrcAvailableAmountLoading,
      srcTokenAmount,
      destLoading,
      srcLoading,
      destTokenAmount,
      resetAmounts,
      totalBalances,
    } = useTokenOperationsStore();

    const { txSuccess, pollTx, closeSuccess, cancelPolling } = useTxPolling();
    const successTextRef = useRef("");

    const onPollingFinished = async (fetchBalances?: boolean) => {
      setLoading(false);
      if (fetchBalances) {
        successTextRef.current = createSuccessMessage();
        resetAmounts();
        updateBalances();
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
          store.adapterId!!,
          store.session,
          txRequest,
          () => pollTx(onPollingFinished)
        );
      } catch (error) {
        cancelPolling();
        setLoading(false);
        if (error instanceof Error) {
          setTxError(error.message);
        }
      }
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

    const onCloseSuccessSnackbar = async () => {
      closeSuccess();
      await delay(500);
      successTextRef.current = "";
    };

    const onCloseError = () => {
      setTxError(null);
    };

    return (
      <Fade in>
        <Box className={classes.content}>
          <Notification
            text={successTextRef.current}
            open={txSuccess}
            onClose={onCloseSuccessSnackbar}
          />

          <Notification
            text={txError || ""}
            open={!!txError}
            onClose={onCloseError}
            isError
          />

          <Box
            className={classes.cards}
            style={{ pointerEvents: loading ? "none" : "all" }}
          >
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
                  style={{
                    color: "#7D7D7D",
                    top: "-2px",
                    position: "relative",
                  }}
                />
                Insufficient funds
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
      </Fade>
    );
  }
);

export default TokenOperations;
