import { Box, Typography } from "@mui/material";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { BETA_TEXT, LAYOUT_MAX_WIDTH, TELEGRAM_WEBAPP_PARAM } from "consts";
import { styled } from "@mui/system";
import { getParamsFromUrl } from "utils";
import SelectWallet from "components/SelectWallet";
import { useWalletActions } from "store/wallet/hooks";
import analytics from "services/analytics/ga";
import { AppGrid } from "styles/styles";
import useEffectOnce from "hooks/useEffectOnce";
import { useWebAppResize } from "store/application/hooks";
import { telegramWebApp } from "services/telegram";
import { useEffect } from "react";
analytics.init();

const StyledAppContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  position: "relative",
  paddingBottom: 30,
  maxWidth: LAYOUT_MAX_WIDTH,
  marginLeft: "auto",
  marginRight: "auto",
  flex: 1,
});

const StyledRoutesContainer = styled(AppGrid)({
  flex: 1,
});

const StyledBeta = styled(Box)({
  background: "#FC5F5F",
  width: "100%",
  height: 40,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& p": {
    color: "white",
    fontSize: 14,
  },
});

if (getParamsFromUrl(TELEGRAM_WEBAPP_PARAM)) {
  localStorage.setItem(TELEGRAM_WEBAPP_PARAM, "1");
}

const App = () => {
  const { restoreSession } = useWalletActions();
  useWebAppResize();


  useEffectOnce(() => {
    restoreSession();
  });
  

  return (
    <>
      <StyledBeta>
        <Typography>{BETA_TEXT}</Typography>
      </StyledBeta>
      <StyledAppContainer>
        <Navbar />
        <SelectWallet />
        <StyledRoutesContainer>
          <AppRoutes />
        </StyledRoutesContainer>
      </StyledAppContainer>
    </>
  );
};

export default App;
