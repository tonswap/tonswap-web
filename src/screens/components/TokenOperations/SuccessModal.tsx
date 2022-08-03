import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { Popup } from "components";
import { ReactNode, useCallback } from "react";
import { ActionType } from "services/wallets/types";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { useTokenOperationsActions, useTokenOperationsStore } from "store/token-operations/hooks";

interface Props {
  actionType: ActionType;
}

function SuccessModal({ actionType }: Props) {
    const {txConfirmation, txSuccess} = useTokenOperationsStore()
    const {closeSuccessModal} = useTokenOperationsActions()

  const createComponent = useCallback(() => {
    switch (actionType) {
      case ActionType.BUY:
        return (
          <Container title="Purchase Confirmation">
            <Box className="row">
              <Typography>{txConfirmation.tokenName} purchased:</Typography>
              <Typography>{txConfirmation.destTokenAmount}</Typography>
            </Box>
            <Box className="row">
              <Typography>TON Paid: </Typography>
              <Typography>{txConfirmation.srcTokenAmount}</Typography>
            </Box>
          </Container>
        );
      case ActionType.SELL:
        return (
          <Container title="Purchase Confirmation">
            <Box className="row">
              <Typography>{txConfirmation.tokenName} Sold:</Typography>
              <Typography>{txConfirmation.srcTokenAmount}</Typography>
            </Box>
            <Box className="row">
              <Typography>TON Received: </Typography>
              <Typography>{txConfirmation.destTokenAmount}</Typography>
            </Box>
          </Container>
        );
      case ActionType.REMOVE_LIQUIDITY:
        return (
          <Container title="Purchase Confirmation">
            <Box className="row">
              <Typography>SHIBA purchased:</Typography>
              <Typography>0.74</Typography>
            </Box>
            <Box className="row">
              <Typography>TON Paid: </Typography>
              <Typography>20</Typography>
            </Box>
          </Container>
        );
      case ActionType.ADD_LIQUIDITY:
        return (
          <Container title="Purchase Confirmation">
            <Box className="row">
              <Typography>SHIBA purchased:</Typography>
              <Typography>0.74</Typography>
            </Box>
            <Box className="row">
              <Typography>TON Paid: </Typography>
              <Typography>20</Typography>
            </Box>
          </Container>
        );

      default:
       return <></>
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
        <CheckCircleRoundedIcon />
        <Typography>{title}</Typography>
        </StyledHeader>
        <StyledChildren>{children}</StyledChildren>
      </StyledContainer>
    );
  }


  const StyledHeader  = styled(Box)({
    display:'flex',
    alignItems:'center',
    gap:10,
    flexDirection:'column',
    "& p": {
      fontSize: 20
    },
    "& .MuiSvgIcon-root": {
      color: "#21C004",
      width: 30,
      height:30,
      "& *": {
        color: "#21C004",
      },
    },
  })
  
  const StyledChildren = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: 3,
  });
  
  const StyledContainer = styled(Box)({
    display: "flex",
    flexDirection:'column',
    gap: 10,
    alignItems:'center',
  
  
    "& *": {
      color: "black",
    },
    "& .title": {
      fontWeight: 500,
      fontSize: 15,
    },
    "& p": {
      fontSize: 14,
    },
    "& .row": {
      display:'flex',
      gap: 20
    },
  });