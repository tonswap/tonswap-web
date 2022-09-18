import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import LogoWithText from "../LogoWithText";
import { useStyles } from "./style";
import { ROUTES } from "router/routes";
import { ActionButton } from "components/ActionButton";
import { styled } from "@mui/system";
import { isDebug, SUPPORT } from "consts";
import Socials from "components/Socials";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import gaAnalytics from "services/analytics/ga/ga";
import { useTranslation } from "react-i18next";
import SelectLanguage from "./SelectLanguage";
import { isMobile } from "react-device-detect";
import { isTelegramWebApp } from "utils";

const StyledActions = styled(Box)({
  display: "flex",
  marginTop: 40,
  flexDirection: "column",
  gap: 20,

  ".coming-soon": {
    pointerEvents: "none",
    background: "lightgray",
    height: "unset",

    "& .base-button-content": {
      display: "flex",
      flexDirection: "column!important",
      gap: 0,
      "& small": {
        fontSize: 13,
        position: "relative",
        top: "-4px",
      },
    },
  },
});

const StyledSocials = styled(Box)({
  marginTop: "auto",
  marginBottom: 30,
  "& .socials": {
    justifyContent: "center",
  },
});

interface Props {
  open: boolean;
  hide: () => void;
}

function Menu({ open, hide }: Props) {
  const classes = useStyles();
  const navigate = useNavigateWithParams();
  const { t } = useTranslation();
  const isMobileTelegram = isMobile || isTelegramWebApp();

  const onCreatePool = () => {
    hide();
    navigate(ROUTES.createPool);
  };

  const onManageLiquidity = () => {
    hide();
    gaAnalytics.manageLiquidity();
    navigate(`${ROUTES.manageLiquidity.navigateToTokens}`);
  };

  const onSwapClick = () => {
    hide();
    gaAnalytics.trade();
    navigate(ROUTES.swap.navigateToTokens);
  };

  const onSupport = () => {
    hide();
    gaAnalytics.support();
    window.open(SUPPORT, "_blank");
  };

  const onCloseMenuClick = () => {
    hide();
    gaAnalytics.closeMenu();
  };

  return (
    <Drawer anchor="left" open={open} onClose={hide}>
      <Box className={classes.drawer}>
        <Box className={classes.drawerTop}>
          <LogoWithText />
          {isMobileTelegram && <SelectLanguage />}
          <IconButton
            onClick={onCloseMenuClick}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ padding: 0 }}
          >
            <CloseRoundedIcon fontSize="large" className={classes.closeBtn} />
          </IconButton>
        </Box>

        <StyledActions>
          <ActionButton onClick={onSwapClick}>{t("trade")}</ActionButton>
          <ActionButton
            customClassName={isDebug() ? "" : "coming-soon"}
            onClick={onManageLiquidity}
          >
            Manage Liquidity
            <small>{t("coming-soon")}</small>
          </ActionButton>
          <ActionButton
            customClassName={isDebug() ? "" : "coming-soon"}
            onClick={onCreatePool}
          >
            Create New Pool
            <small>{t("coming-soon")}</small>
          </ActionButton>
          <ActionButton onClick={onSupport}>
            <HelpOutlineRoundedIcon />
            {t("support")}
          </ActionButton>
        </StyledActions>
        <StyledSocials>
          <Socials />
        </StyledSocials>
      </Box>
    </Drawer>
  );
}

export default Menu;
