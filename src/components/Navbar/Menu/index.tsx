import { IconButton } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import LogoWithText from "../LogoWithText";
import { useStyles } from "./style";
import NoToken from "./NoToken";
import SelectedToken from "./SelectedToken";
import { useStore } from "store";
import ConnectWallet from "components/ConnectWallet";
import { useCallback, useMemo } from "react";

interface Props {
  open: boolean;
  hide: () => void;
}

function Menu({ open, hide }: Props) {
  const classes = useStyles();
  const store = useStore();

  const getMenuContent = useCallback(() => {
    if (!store.address) {
      return <Box className={classes.connect}><ConnectWallet onConnected={hide} text="Connect wallet" /></Box>;
    } else if (store.selectedToken) {
      return <SelectedToken hideMenu={hide} token={store.selectedToken} />;
    }
    return <NoToken hideMenu={hide} />;
  }, [store.address, store.selectedToken]);

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
        {getMenuContent()}
      </Box>
    </Drawer>
  );
}

export default Menu;
