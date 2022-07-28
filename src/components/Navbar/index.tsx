import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useStyles } from "./styles";
import LogoWithText from "./LogoWithText";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routes";
import { BETA_TEXT, LAYOUT_MAX_WIDTH } from "consts";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react";
import WalletAddress from "./Menu/WalletAddress";
import MenuToggle from "./MenuToggle";
import { isMobile } from "react-device-detect";
import { useWalletStore } from "store/wallet/hooks";
import { styled } from "@mui/system";

const desktopNavbarHeight = "60px";
const mobileNavbarHeight = "60px";
const StyledAppBar = styled(AppBar)({
  top: 0,
  
});

const StyledToolbar = styled(Toolbar)({
  background:'white'
});


export const Navbar = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navbarHeight = isMobile ? mobileNavbarHeight : desktopNavbarHeight;
  const { address } = useWalletStore();

  return (
    <>
      <StyledAppBar
        position="sticky"
        color="transparent"
        sx={{
          boxShadow: "unset",
          maxWidth: LAYOUT_MAX_WIDTH,
        }}
      >
        <StyledToolbar
          style={{
            width: "100%",
            justifyContent: "space-between",
            height: navbarHeight,
            paddingLeft: 0,
            paddingRight: 0,
          }}
        >
      
          <Grid
            container
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Grid item className={classes.leftGrid}>
              <MenuToggle onClick={() => setOpen(true)} />
              <Link className={classes.link} to={address ? ROUTES.tokens : ""}>
                <LogoWithText />
              </Link>
            </Grid>

            <WalletAddress />
          </Grid>
        </StyledToolbar>
        <Menu open={open} hide={() => setOpen(false)} />
      </StyledAppBar>
      
    </>
  );
});
