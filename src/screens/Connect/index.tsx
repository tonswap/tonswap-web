import { Typography, useMediaQuery } from "@mui/material";
import Box from "@mui/material/Box";
import TonLogo from "assets/images/shared/ton-logo.svg";
import HeroImg from "assets/images/connect/hero.png";
import { ActionButton } from "components";
import { useState } from "react";
import { useStyles } from "./styles";
import { useNavigate } from "react-router-dom";
import { useStore } from "store";
import { observer } from "mobx-react";
import { ROUTES } from "router/routes";
import { useTheme } from "@mui/material/styles";
import ConnectWallet from "components/ConnectWallet";

export const ConnectScreen = observer(() => {
  const classes = useStyles();
  const store = useStore();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  return (
    <Box className={classes.root}>
      <Box className={classes.topContainer}>
        {isMobile && <img className={classes.logo} src={TonLogo} />}
        <Typography component="h2">
          <strong>Welcome to</strong>
        </Typography>
        <Typography component="h2">
          <strong>Ton</strong>swap
        </Typography>
      </Box>

      <img className={classes.hero} src={HeroImg} />
      <Box className={classes.bottomBox}>
        {store.address ? (
          <ActionButton onClick={() => navigate(ROUTES.tokens)}>
            Select tokens to trade
          </ActionButton>
        ) : (
          <>
            <Typography variant="subtitle1" component="h6">
              Start by
            </Typography>
            <ConnectWallet text="Connecting to your wallet" />
          </>
        )}
      </Box>
    </Box>
  );
});
