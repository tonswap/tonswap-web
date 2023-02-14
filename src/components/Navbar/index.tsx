import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useEffect, useState } from "react";
import { useStyles } from "./styles";
import LogoWithText from "./LogoWithText";
import Menu from "./Menu";
import { FOUND_JETTON, LAYOUT_MAX_WIDTH } from 'consts'
import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import WalletAddress from "./Menu/WalletAddress";
import MenuToggle from "./MenuToggle";
import { Box, styled } from '@mui/system'
import { AppGrid } from "styles/styles";
import { isTelegramWebApp } from "utils";
import { useTranslation } from "react-i18next";
import gaAnalytics from "services/analytics/ga/ga";

const navbarHeight = "60px";
const StyledAppBar = styled(AppBar)({
  top: 0,
});

const StyledWrapper = styled(AppGrid)({});

// const StyledToolbar = styled(Toolbar)(({transparent} : {transparent: boolean}) => ({
//   background: transparent ? "rgba(0,0,0,0)" : 'white'
// }))
const StyledToolbar = styled(Toolbar)({
  background: "white",
});

export const Navbar = observer(() => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { i18n } = useTranslation();


  const onMenuToggleClick = () => {
    setOpen(true);
    gaAnalytics.openMenu()
  };

  const onDetectLanguage = () => {
    gaAnalytics.onLanguageSelect(i18n.language)
  }

  useEffect(() => {
    onDetectLanguage();
  }, [])

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
          // transparent={!!window.localStorage.getItem(FOUND_JETTON)}
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
                <MenuToggle onClick={onMenuToggleClick} />
                {!isTelegramWebApp() && <LogoWithText />}
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
