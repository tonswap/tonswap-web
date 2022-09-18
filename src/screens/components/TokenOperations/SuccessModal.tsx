import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Popup } from "components";
import { ReactNode, useCallback } from "react";
import { ActionType } from "services/wallets/types";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import SuccessIcon from "assets/images/shared/success.svg";
import BigNumberDisplay from "components/BigNumberDisplay";
import { useTranslation } from "react-i18next";
interface Props {
  actionType: ActionType;
}

function SuccessModal({ actionType }: Props) {
  const { txConfirmation, txSuccess } = useTokenOperationsStore();
  const { closeSuccessModal } = useTokenOperationsActions();
  const { t } = useTranslation()

  const createComponent = useCallback(() => {
    switch (actionType) {
      case ActionType.BUY:
        return (
          <Container title={t('purchase-confirmation')}>
            <Box className="row">
              <Typography>{t('token-purchased', { token: txConfirmation.tokenName })}</Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.destTokenAmount} />
              </Typography>
            </Box>
            <Box className="row">
              <Typography>{t('ton-paid')}</Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.srcTokenAmount} />
              </Typography>
            </Box>
          </Container>
        );
      case ActionType.SELL:
        return (
          <Container title={t('purchase-confirmation')}>
            <Box className="row">
              <Typography>{t('token-received', { token: txConfirmation.tokenName })}</Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.srcTokenAmount} />{" "}
              </Typography>
            </Box>
            <Box className="row">
              <Typography>{t('ton-received')}</Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.destTokenAmount} />
              </Typography>
            </Box>
          </Container>
        );
      case ActionType.REMOVE_LIQUIDITY:
        return (
          <Container title={t('liquidity-removed')}>
            <Box className="row">
              <Typography>
                {t('ton-removed-pool')}
              </Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.srcTokenAmount} />
              </Typography>
            </Box>
            <Box className="row">
              <Typography>{t('token-removed-pool', { token: txConfirmation.tokenName })}
              </Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.destTokenAmount} />
              </Typography>
            </Box>
          </Container>
        );
      case ActionType.ADD_LIQUIDITY:
        return (
          <Container title={t('liquidity-added')}>
            <Box className="row">
              <Typography>
                {t('ton-added-pool')}
              </Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.srcTokenAmount} />
              </Typography>
            </Box>
            <Box className="row">
              <Typography>{t('token-added-pool', { token: txConfirmation.tokenName })}
              </Typography>
              <Typography>
                <BigNumberDisplay value={txConfirmation.destTokenAmount} />
              </Typography>
            </Box>
          </Container>
        );

      default:
        return <></>;
    }
  }, [actionType, txConfirmation]);

  return (
    <Popup open={txSuccess} onClose={closeSuccessModal} maxWidth={400}>
      {createComponent()}
    </Popup>
  );
}

export default SuccessModal;

interface ContainerProps {
  children: ReactNode;
  title: string;
}

function Container({ children, title }: ContainerProps) {
  return (
    <StyledContainer>
      <StyledHeader>
        <img src={SuccessIcon} className="icon" />
        <Typography>{title}</Typography>
      </StyledHeader>
      <StyledChildren>{children}</StyledChildren>
    </StyledContainer>
  );
}

const StyledHeader = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 22,
  flexDirection: "column",
  "& p": {
    fontSize: 19,
    fontWeight: 500,
  },
  "& .icon": {
    width: 45,
    height: 45,
    objectFit: "contain",
  },
});

const StyledChildren = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 13,
  width: "100%",
});

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 19,
  alignItems: "center",
  width: "100%",

  "& *": {
    color: "black",
  },


  "& .row": {
    display: "flex",
    gap: 40,
    background: "#EEEEEE",
    borderRadius: 12,
    minHeight: 49,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    "& p": {
      fontSize: 14,
    },
  },
});
