import { Fade, Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import TonLogo from "assets/images/shared/ton-logo.svg";
import HeroImg from "assets/images/connect/hero.png";
import { ActionButton } from "components";
import { useStyles } from "./styles";
import { useTheme } from "@mui/material/styles";
import ConnectModal from "screens/Connect/SelectWallet";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "store";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { getParamsFromUrl, isTelegramWebApp } from "utils";
import { telegramWebApp } from "services/telegram";
import { DESTINATION_PATH, TELEGRAM_WEBAPP_PARAM } from "consts";
import { Adapters } from "services/wallets/types";
import { isMobile } from "react-device-detect";

export const ConnectScreen = observer(() => {
  const classes = useStyles();
  const theme = useTheme();
  const store = useStore();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [hideMainButton, setHideMainButton] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const destinationPath = localStorage.getItem(DESTINATION_PATH);

    if (!destinationPath) {
      return;
    }

    const search = destinationPath.split("?")[1];
    if (!search) {
      return;
    }

    const query = getParamsFromUrl(TELEGRAM_WEBAPP_PARAM, search);
    const action = () => setShowConnectModal(true);
    if (query) {
      telegramWebApp.addClickEventToButton(action);
      telegramWebApp.setButtonText("Connect Wallet");
      setHideMainButton(true);
    }
    return () => {
      telegramWebApp.removeClickEventFromButton(action);
    };
  }, []);

  useEffect(() => {
    if (store.address) {
      navigate(ROUTES.tokens);
    }
  }, [store.address]);

  const onConnect = () => {
  

    setShowConnectModal(true);
  };

  return (
    <Fade in>
      <Box className={classes.root}>
        <Box className={classes.topContainer}>
          {isMobile && (
            <img className={classes.logo} src={TonLogo} alt="logo" />
          )}
          <Typography component="h2">
            <strong>Welcome to</strong>
          </Typography>
          <Typography component="h2">
            <strong>Ton</strong>swap
          </Typography>
        </Box>

        <img className={classes.hero} src={HeroImg} alt="hero" />
        <Box className={classes.bottomBox}>
          <Typography variant="subtitle1" component="h6">
            Start by
          </Typography>
          {!hideMainButton && (
            <ActionButton onClick={onConnect}>
              Connecting to your wallet
            </ActionButton>
          )}
        </Box>
        <ConnectModal
          open={showConnectModal}
          onClose={() => setShowConnectModal(false)}
        />
      </Box>
    </Fade>
  );
});
