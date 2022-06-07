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
import { isMobile } from "react-device-detect";
import useWebAppResize from "hooks/useWebAppResize";

export const ConnectScreen = observer(() => {
  const store = useStore();
  const [showConnectModal, setShowConnectModal] = useState(false);
  const navigate = useNavigate();
  const expanded = useWebAppResize();
  const classes = useStyles({ expanded });

  useEffect(() => {
    if (store.address) {
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

          <ActionButton onClick={() => setShowConnectModal(true)}>
            Connecting to your wallet
          </ActionButton>
        </Box>
        <ConnectModal
          expanded={expanded}
          open={showConnectModal}
          onClose={() => setShowConnectModal(false)}
        />
      </Box>
    </Fade>
  );
});
