import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useStyles } from "./styles";
import LogoWithText from "./LogoWithText";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routes";
import { LAYOUT_MAX_WIDTH } from "consts";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { observer } from "mobx-react";
import WalletAddress from "./Menu/WalletAddress";
import MenuToggle from "./MenuToggle";
import { isMobile } from "react-device-detect";
import { useWalletStore } from "store/wallet/hooks";
import { styled } from "@mui/system";

const desktopNavbarHeight = "60px";
const mobileNavbarHeight = "50px";



const StyledAppBar = styled(AppBar)({

})

export const Navbar = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navbarHeight = isMobile ? mobileNavbarHeight : desktopNavbarHeight;
  const matches = useMediaQuery("(min-width:600px)");
  const {address} = useWalletStore()

  return (
    <>
      <StyledAppBar
        position="fixed"
        color="transparent"
        sx={{
          boxShadow: "unset",
          maxWidth: LAYOUT_MAX_WIDTH,
          left: "50%",
          transform: "translate(-50%)",
        }}
      >
        <Toolbar
          style={{
            width: "100%",
            justifyContent: "space-between",
            height: navbarHeight,
            paddingLeft: 20,
            paddingRight: 20,
          }}
        >
          <Grid
            container
            style={{
              justifyContent: "space-between",
              alignItems: 'center',
              height: "100%",
            }}
          >
            <Grid item className={classes.leftGrid}>
              <MenuToggle
                onClick={() => setOpen(true)}
              />
              <Link
                className={classes.link}
                to={address ? ROUTES.tokens : ""}
              >
                <LogoWithText />
              </Link>
            </Grid>
          
            <WalletAddress />
          </Grid>
        </Toolbar>
        <Menu open={open} hide={() => setOpen(false)} />
      </StyledAppBar>
      <Box
        style={{
          height: navbarHeight,
          width: "100%",
          top: 0,
          background: "white",
          zIndex: 99,
          position: "sticky",
        }}
      ></Box>
    </>
  );
});
