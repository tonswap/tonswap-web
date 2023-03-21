import { Box, styled } from '@mui/material'
import { useEffect, useState } from 'react'
import { ActionButton, Popup } from 'components'
import { PoolInfo } from 'services/api/addresses'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { useStyles } from './styles'
import DestToken from './DestToken'
import SrcToken from './SrcToken'
import { walletService } from 'services/wallets/WalletService'
import { useTokenOperationsActions, useTokenOperationsStore } from 'store/token-operations/hooks'
import { useWalletStore } from 'store/wallet/hooks'
import { useIsExpandedView, useWalletModalToggle } from 'store/application/hooks'
import { StyledTokenOperationActions } from 'styles/styles'
import Icon from './Icon'
import { ActionCategory, ActionType, Adapters } from 'services/wallets/types'
import { client, GAS_FEE, waitForSeqno } from 'services/api'
import { Address } from 'ton'
import SuccessModal from './SuccessModal'
import useValidation from './useValidation'
import TxError from './TxError'
import useTxAnalytics from './useTxAnalytics'
import gaAnalytics from 'services/analytics/ga/ga'
import { useTranslation } from 'react-i18next'
import TxLoader from './TxLoader'
import { isMobile } from 'react-device-detect'
import { QRCode } from 'react-qrcode-logo'

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
  onSuccess?: any
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
  onSuccess
}: Props) => {
  const expanded = useIsExpandedView();
  const classes = useStyles({ color: srcToken?.color || "", expanded });
  const [showTxLoader, setShowTxLoader] = useState<boolean>(false);
  const [keeperTransactionLink, setKeeperTransactionLink] = useState("");

  const { txPending, srcTokenAmount } = useTokenOperationsStore();
  const toggleModal = useWalletModalToggle();
  const { address, adapterId, session } = useWalletStore();

  const sendAnalyticsEvent = useTxAnalytics(actionCategory, actionType)

  const { insufficientFunds, disabled, maxAmount } = useValidation(
    actionType,
    gasFee,
    srcToken,
    destToken
  );
  const {
    onResetAmounts,
    getTokensBalance,
    resetTokensBalance,
    sendTransaction,
  } = useTokenOperationsActions();
  const { t } = useTranslation();




  const onSubmit = () => {
    if ( adapterId === Adapters.TON_HUB && isMobile) {
      setShowTxLoader(true)
    } else {
      submitTransaction()
    }
  };

  const submitTransaction = async () => {
    const tx = async () => {
      const txRequest = await getTxRequest();
      const waiter = await waitForSeqno(
        client.openWalletFromAddress({
          source: Address.parse(address!!),
        })
      );
      let deepLinkUrl = await walletService.requestTransaction(adapterId!!, session, txRequest);
      if (typeof deepLinkUrl == "string") {
        if (isMobile) {
          window.location.href = deepLinkUrl;
        } else {
          setKeeperTransactionLink(deepLinkUrl);
        }
      }
      await waiter();
       setTimeout(() => {
         onSuccess?.()
       },7000)
      setKeeperTransactionLink("");
      sendAnalyticsEvent()
      onResetAmounts();
      getTokensBalance(getBalances);
    };

    sendTransaction(tx);
  }

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

  const closeTransactionLoader = () => {
    setShowTxLoader(false);
    setKeeperTransactionLink("");
  }
  function onClose() {
    setKeeperTransactionLink("")
  }

  function qrCodeComponent() {
    
    const el = (
      <Popup open={true} onClose={onClose}>
        <StyledContainer>
          <p>Please Scan using the QR code using TonKeeper</p>
          < QRCode logoOpacity={0.5} ecLevel={"H"} size={250} value={keeperTransactionLink} />
        </StyledContainer>
      </Popup>
    );
    return keeperTransactionLink && !isMobile ? el : null;
  }
  

  return (
    <StyledTokenOperationActions>
      <TxError />
      <TxLoader
        open={showTxLoader}
        adapterId={adapterId}
        close={closeTransactionLoader}
        confirm={submitTransaction}
      />
      {qrCodeComponent()}
      
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
            srcDecimals={srcToken.decimals}
            destDecimals={destToken.decimals}
          />

          <Icon icon={icon} color={destToken.color} />
          <DestToken
            getAmountFunc={getAmountFunc}
            token={destToken}
            srcTokenName={srcToken.tokenMinter}
            disableInputDependency={disableInputDependency}
            srcTokenAmount={srcTokenAmount}
            actionType={actionType}
            srcDecimals={srcToken.decimals}
            destDecimals={destToken.decimals}
          />
        </Box>

        <Box className={classes.button}>
          {!address ? (
            <ActionButton onClick={onConnect}>{t('connect-wallet')}</ActionButton>
          ) : insufficientFunds ? (
            <ActionButton
              isDisabled={disabled || insufficientFunds}
              onClick={() => { }}
            >
              <WarningAmberRoundedIcon
                style={{
                  color: "#7D7D7D",
                  top: "-2px",
                  position: "relative",
                }}
              />
              {t('insufficient-funds')}
            </ActionButton>
          ) : (
            <ActionButton
              isLoading={showTxLoader || txPending}
              isDisabled={disabled || insufficientFunds || actionType === ActionType.ADD_LIQUIDITY}
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


const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: 'relative',
  overflow: 'hidden',
  width: 'fit-content'
});