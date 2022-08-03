import { Box } from "@mui/material";
import { useEffect } from "react";
import { ActionButton, Popup } from "components";
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
import gaAnalytics from "services/analytics/ga";
import { ActionCategory, ActionType } from "services/wallets/types";
import { client, GAS_FEE, waitForSeqno } from "services/api";
import { Address } from "ton";
import useMaxAmount from "hooks/useMaxAmount";
import SuccessModal from "./SuccessModal";
import useTxError from "./useTxError";
import useTxSuccessMessage from "./useTxSuccessMessage";

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
}: Props) => {
  const expanded = useIsExpandedView();
  const classes = useStyles({ color: srcToken?.color || "", expanded });

  const {
    srcTokenAmount,
    destLoading,
    srcLoading,
    destTokenAmount,
    txPending,
  } = useTokenOperationsStore();
  const toggleModal = useWalletModalToggle();
  const { address, adapterId, session } = useWalletStore();
  const { maxAmount, maxAmountError } = useMaxAmount(gasFee, srcToken);
  useTxError();
  const successMessage = useTxSuccessMessage(actionType);

  const {
    onResetAmounts,
    getTokensBalance,
    resetTokensBalance,
    sendTransaction,
  } = useTokenOperationsActions();

  const insufficientFunds = isInsufficientFunds
    ? isInsufficientFunds(srcTokenAmount, destTokenAmount)
    : maxAmountError;

  const isDisabled = !srcTokenAmount || srcLoading || destLoading;

  const onSubmit = async () => {
    const tx = async () => {
      const txRequest = await getTxRequest();
      const waiter = await waitForSeqno(
        client.openWalletFromAddress({
          source: Address.parse(address!!),
        })
      );
      await walletService.requestTransaction(adapterId!!, session, txRequest);
      await waiter();
      gaAnalytics.sendEvent(actionCategory, actionType, successMessage);
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

  return (
    <StyledTokenOperationActions>
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
              isLoading={txPending}
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
