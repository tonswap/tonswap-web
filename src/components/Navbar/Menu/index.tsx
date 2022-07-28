import { IconButton, Typography, useMediaQuery } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import LogoWithText from "../LogoWithText";
import { useStyles } from "./style";
import WalletAddress from "./WalletAddress";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { ActionButton } from "components/ActionButton";
import { useTokensStore } from "store/tokens/hooks";
import { styled } from "@mui/system";
import { COMING_SOON } from "consts";
import Socials from "components/Socials";

const StyledActions = styled(Box)({
  display: "flex",
  marginTop: 40,
  flexDirection: "column",
  gap: 20,

  ".coming-soon": {
    pointerEvents: "none",
    background: "lightgray",
      height: 'unset',
    
      "& .base-button-content": {
        display:'flex',
        flexDirection:'column!important',
        gap:0,
        "& small": {
          fontSize: 13,
          position:'relative',
          top: '-4px'
        }
      }
     
  },
});


const StyledSocials = styled(Box)({
  marginTop:'auto',
  marginBottom: 30,
    "& .socials": {
      justifyContent:'center',
     
    }
})

interface Props {
  open: boolean;
  hide: () => void;
}

function Menu({ open, hide }: Props) {
  const matches = useMediaQuery("(max-width:600px)");

  const classes = useStyles();
  const navigate = useNavigate();

  const onCreatePool = () => {
    hide();
    navigate(ROUTES.createPool);
  };

  const onManageLiquidity = () => {
    hide();
    navigate(ROUTES.manageLiquidity.navigateToTokens);
  };

  const onSwapClick = () => {
    hide();
    navigate(ROUTES.swap.navigateToTokens);
  };

  return (
    <Drawer anchor="left" open={open} onClose={hide}>
      <Box className={classes.drawer}>
        <Box className={classes.drawerTop}>
          <LogoWithText />
          <IconButton
            onClick={hide}
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
          <ActionButton onClick={onSwapClick}>Trade</ActionButton>
          <ActionButton
            customClassName="coming-soon"
            onClick={onManageLiquidity}
          >
           
           Manage Liquidity
            <small>{COMING_SOON}</small>
          </ActionButton>
          <ActionButton customClassName="coming-soon" onClick={onCreatePool}>
            Create New Pool 
            <small>{COMING_SOON}</small>
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
