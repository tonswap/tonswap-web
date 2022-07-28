import { observer } from "mobx-react-lite";
import { Box, Typography } from "@mui/material";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { BETA_TEXT, LAYOUT_MAX_WIDTH, TELEGRAM_WEBAPP_PARAM } from "consts";
import { styled } from "@mui/system";
import { getParamsFromUrl } from "utils";
import SelectWallet from "components/SelectWallet";
import { useWalletActions, useWalletStore } from "store/wallet/hooks";
import { useEffect, useRef } from "react";
import Socials from "components/Socials";
import AppLoader from "components/AppLoader";
import analytics from "services/analytics/ga";
analytics.init();

const StyledAppContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  position: "relative",
  paddingLeft: "15px",
  paddingRight: "15px",
  paddingBottom: 30,
  maxWidth: LAYOUT_MAX_WIDTH,
  marginLeft: "auto",
  marginRight: "auto",
  flex: 1,
  // height: "100vh",
});

const StyledRoutesContainer = styled(Box)(({ theme }) => ({
  borderRadius: 20,
  flex:1,
  width: "100%",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    background: "transparent",
    maxHeight: "unset",
    borderRadius: 0,
  },
}));

const StyledBeta = styled(Box)({
  background: "#FC5F5F",
  width: "100%",
  height: 40,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  "& p": {
    color: "white",
    fontSize: 14
  },
});

if (getParamsFromUrl(TELEGRAM_WEBAPP_PARAM)) {
  localStorage.setItem(TELEGRAM_WEBAPP_PARAM, "1");
}

const App = observer(() => {
  const { restoreSession } = useWalletActions();
  const { connectng } = useWalletStore();
  const restoreSessionRef = useRef(false);

  useEffect(() => {
    if (!restoreSessionRef.current) {
      restoreSession();
      restoreSessionRef.current = true;
    }
  }, []);



  // if (connectng) {
  //   return <AppLoader />;
  // }

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
});

export default App;
