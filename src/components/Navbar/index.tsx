import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useState } from "react";
import { useStyles } from "./styles";
import LogoWithText from "./LogoWithText";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routes";
import { LAYOUT_MAX_WIDTH } from "consts";
import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import WalletAddress from "./Menu/WalletAddress";
import MenuToggle from "./MenuToggle";
import { isMobile } from "react-device-detect";
import { useWalletStore } from "store/wallet/hooks";
import { styled } from "@mui/system";
import { AppGrid } from "styles/styles";
import { useTokensStore } from "store/tokens/hooks";

const navbarHeight = "60px";
const StyledAppBar = styled(AppBar)({
  top: 0,
});

const StyledWrapper = styled(AppGrid)({});

const StyledToolbar = styled(Toolbar)({
  background: "white",
});

export const Navbar = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
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
          <StyledWrapper>
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
                <LogoWithText />
              </Grid>

              <WalletAddress />
            </Grid>
          </StyledWrapper>
        </StyledToolbar>
        <Menu open={open} hide={() => setOpen(false)} />
      </StyledAppBar>
    </>
  );
});
