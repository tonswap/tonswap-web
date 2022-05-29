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
import { delay, isTelegramWebApp } from "utils";
import { fromNano } from "ton";
import useTelegramWebAppButton from "hooks/useTelegramWebAppButton";
import useWebAppResize from "hooks/useWebAppResize";
import { walletService } from "services/wallets/WalletService";
import { useStore } from "store";
import { observer } from "mobx-react";

interface Props {
  srcToken: Token;
  destToken: Token;
  submitButtonText: string;
  disableButton: boolean;
  icon: any;
  getBalances: () => Promise<any>;
  getAmountFunc: any;
  getTxRequest: () => any;
  successText: string;
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
    successText,
  }: Props) => {
    const expanded = useWebAppResize();
    const store = useStore();
    const classes = useStyles({ color: srcToken?.color || "", expanded });
    const [loading, setLoading] = useState(false);

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
    const { txSuccess, pollTx, closeSuccess, cancelPolling } = useTxPolling();
    const ref = useRef<any>(null)

    const onPollingFinished = async (fetchBalances?: boolean) => {
      setLoading(false);
      if (fetchBalances) {
        createAmountsCopyForSnackbar();
        await updateBalances();
        clearAmounts();
      }
    };
    const insufficientFunds = srcTokenAmount > totalBalances.srcBalance;
    const isDisabled = !srcTokenAmount || srcLoading || destLoading;

    const submitted = async () => {
      setLoading(true);
      const txRequest = await getTxRequest();
      
      if (!txRequest) {
        setLoading(false);
      } else {
        try {
          await walletService.requestTransaction(
            store.adapterId!!,
            store.session,
            txRequest
          );
          pollTx(onPollingFinished);
        } catch (error) {
          cancelPolling();
          setLoading(false);
        }
      }
    };

    useTelegramWebAppButton({
      submitted,
      submitButtonText,
      insufficientFunds,
      isDisabled,
      loading,
    });

    const onCloseSuccessSnackbar = async () => {
      closeSuccess();
      await delay(1000);
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
      <Fade in>
      
        <Box className={classes.content}>
          <Notification
            text={successText}
            open={txSuccess}
            onClose={onCloseSuccessSnackbar}
          />
          <Box className={classes.cards} style={{pointerEvents: loading ? 'none' : 'all'}}>
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
                  onClick={submitted}
                >
                  {submitButtonText}
                </ActionButton>
              )}
            </Box>
          )}
        </Box>
      </Fade>
    );
  }
);

export default TokenOperations;
