import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";
import { Adapters } from "services/wallets/types";
import { useWalletStore } from "store/wallet/hooks";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  children?: ReactNode;
}

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
});

function FullPageLoader({ open, children }: Props) {
  const { adapterId } = useWalletStore();
  const { t } = useTranslation();
  // const showReminderInLoader = !isMobile && adapterId === Adapters.TON_HUB;

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(5px) ",
      }}
      open={open}
    >
      <StyledContainer>
        <CircularProgress color="inherit" />
        {children}
        {/*{showReminderInLoader && (*/}
        {/*  <Typography>*/}
        {/*    {t('check-tonhub')}*/}
        {/*  </Typography>*/}
        {/*)}*/}
      </StyledContainer>
    </Backdrop>
  );
}

export default FullPageLoader;
