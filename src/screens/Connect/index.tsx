import { Fade, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TonLogo from "assets/images/shared/ton-logo.svg";
import HeroImg from "assets/images/connect/hero.png";
import { ActionButton } from "components";
import { useStyles } from "./styles";
import ConnectModal from "screens/Connect/SelectWallet";
import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useStore } from "store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { getParamsFromUrl } from "utils";
import { telegramWebApp } from "services/telegram";
import { DESTINATION_PATH, TELEGRAM_WEBAPP_PARAM } from "consts";
import { isMobile } from "react-device-detect";
import useWebAppResize from "hooks/useWebAppResize";

export const ConnectScreen = observer(() => {
  const store = useStore();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const [hideMainButton, setHideMainButton] = useState(false);
  const navigate = useNavigate();
  const expanded = useWebAppResize()
  const classes = useStyles({expanded});

  useEffect(() => {
    const destinationPath = localStorage.getItem(DESTINATION_PATH);

    if (!destinationPath) {
      return;
    }

    const search = destinationPath.split("?")[1];
    if (!search) {
      return;
    }

    const isTelegramWebapp = getParamsFromUrl(TELEGRAM_WEBAPP_PARAM, search);
    const action = () => setShowConnectModal(true);
    if (isTelegramWebapp) {
      telegramWebApp.addClickEventToButton(action);
      telegramWebApp.setButtonText("Connect Wallet");
      setHideMainButton(true);
    }
    return () => {
      telegramWebApp.removeClickEventFromButton(action);
    };
  }, []);

  useEffect(() => {
    if (!store.address) {
      return;
    }
    const destinationPath = localStorage.getItem(DESTINATION_PATH);
    if (destinationPath) {
      navigate(destinationPath);
      localStorage.removeItem(DESTINATION_PATH);
    } else {
      navigate(ROUTES.tokens);
    }
  }, [store.address, navigate]);

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
            <ActionButton onClick={() => setShowConnectModal(true)}>
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
