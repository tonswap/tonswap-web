import { Box } from "@mui/material";
import {
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { ActionButton, Popup } from "components";
import { PoolInfo } from "services/api/addresses";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import DestToken from "./DestToken";
import SrcToken from "./SrcToken";
import useWebAppResize from "hooks/useWebAppResize";
import { walletService } from "services/wallets/WalletService";
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
import { client, GAS_FEE, waitForSeqno } from "services/api";
import { Address } from "ton";
import useMaxAmount from "hooks/useMaxAmount";

interface Props {
  srcToken: PoolInfo;
  destToken: PoolInfo;
  submitButtonText: string;
  icon: any;
  getBalances: () => Promise<any>;
  getAmountFunc: any;
  getTxRequest: () => any;
  isInsufficientFunds?: (src: string, dest: string) => boolean;
  refreshAmountsOnActionChange: boolean;
  actionCategory: ActionCategory;
  actionType: ActionType;
  gasFee: GAS_FEE;
  successMessage: string;
  getNotification: () => ReactElement;
}

const TokenOperations = ({
  srcToken,
  destToken,
  submitButtonText,
  icon,
  getBalances,
  getAmountFunc,
  getTxRequest,
  isInsufficientFunds,
  refreshAmountsOnActionChange,
  actionCategory,
  actionType,
  gasFee,
  getNotification,
  successMessage
}: Props) => {
  const expanded = useWebAppResize();
  const classes = useStyles({ color: srcToken?.color || "", expanded });
  const [loading, setLoading] = useState(false);
  const [txSuccess, setTxSuccess] = useState(false);
  const txSuccessRef = useRef<ReactElement>(getNotification())

  const { srcTokenAmount, destLoading, srcLoading, destTokenAmount } =
    useTokenOperationsStore();
  const toggleModal = useWalletModalToggle();
  const { address, adapterId, session } = useWalletStore();
  const { maxAmount, maxAmountError } = useMaxAmount(gasFee, srcToken);

  const { onResetAmounts, getTokensBalance, resetTokensBalance } =
    useTokenOperationsActions();
  const { showNotification } = useNotification();

  const insufficientFunds = isInsufficientFunds
    ? isInsufficientFunds(srcTokenAmount, destTokenAmount)
    : maxAmountError;

  const isDisabled = !srcTokenAmount || srcLoading || destLoading;

  const onSubmit = async () => {
    setLoading(true);
    const txRequest = await getTxRequest();

    const waiter = await waitForSeqno(
      client.openWalletFromAddress({
        source: Address.parse(address!!),
      })
    );
    try {
      await walletService.requestTransaction(adapterId!!, session, txRequest);
      await waiter();
      gaAnalytics.sendEvent(actionCategory, actionType, successMessage);
      txSuccessRef.current = getNotification();
      setTxSuccess(true);
      onResetAmounts();
      getTokensBalance(getBalances);
    } catch (error) {
      if (error instanceof Error) {
        showNotification({
          message: <>{error.message}</>,
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "center" },
          autoHideDuration: 60000,
        });
      }
    } finally {
      setLoading(false);
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
      <Popup open={txSuccess} onClose={() => setTxSuccess(false)} maxWidth={400}>
        {txSuccessRef.current}
      </Popup>
      <Box className={classes.content}>
        <Box
          className={classes.cards}
          style={{ pointerEvents: loading ? "none" : "all" }}
        >
          <SrcToken
            token={srcToken}
            getAmountFunc={getAmountFunc}
            destTokenName={destToken.tokenMinter}
            maxAmount={maxAmount}
          />

          <Icon icon={icon} color={destToken.color} />
          <DestToken
            getAmountFunc={getAmountFunc}
            token={destToken}
            srcTokenName={srcToken.tokenMinter}
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
