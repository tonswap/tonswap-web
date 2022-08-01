import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import LogoWithText from "../LogoWithText";
import { useStyles } from "./style";
import { ROUTES } from "router/routes";
import { ActionButton } from "components/ActionButton";
import { styled } from "@mui/system";
import { COMING_SOON, isDebug } from "consts";
import Socials from "components/Socials";
import useNavigateWithParams from "hooks/useNavigateWithParams";

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

  const classes = useStyles();
  const navigate = useNavigateWithParams();

  const onCreatePool = () => {
    hide();
    navigate(ROUTES.createPool);
  };

  const onManageLiquidity = () => {
    hide();
    navigate(`${ROUTES.manageLiquidity.navigateToTokens}`);
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
            customClassName={isDebug() ? '' : "coming-soon"}
            onClick={onManageLiquidity}
          >
           
           Manage Liquidity
            <small>{COMING_SOON}</small>
          </ActionButton>
          <ActionButton customClassName={isDebug() ? '' :  "coming-soon"} onClick={onCreatePool}>
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
