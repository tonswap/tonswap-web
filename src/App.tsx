import { Box, Typography } from "@mui/material";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { BETA_TEXT, LAYOUT_MAX_WIDTH, TELEGRAM_WEBAPP_PARAM } from "consts";
import { styled } from "@mui/system";
import SelectWallet from "components/SelectWallet";
import { useWalletActions } from "store/wallet/hooks";
import { AppGrid } from "styles/styles";
import useEffectOnce from "hooks/useEffectOnce";
import { useWebAppResize } from "store/application/hooks";
import { delay } from "utils";
import { useState } from "react";

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

const App = () => {
  const [appReady, setAppReady] = useState(false)
  const { restoreSession } = useWalletActions();
  useWebAppResize();
  useEffectOnce(() => {
    restoreSession();
  });





useEffectOnce(() => {
  const getInfura = async() => {
    await delay(1000)
    setAppReady(true)
  }
  localStorage.setItem('rpcUrl', "https://mainnet.tonhubapi.com/jsonRPC")
  getInfura()
})
  

  if(!appReady){
    return null
  }

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
