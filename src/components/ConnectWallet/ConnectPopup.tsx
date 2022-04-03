import { Box, IconButton, Typography } from "@mui/material";
import { ActionButton, Popup } from "components";
import { useState } from "react";
import { useStore } from "store";
import AddressInput from "../../screens/Connect/AddressInput";
import { useStyles } from "./style";
import LogoWithText from "components/Navbar/LogoWithText";
import CloseIcon from "@mui/icons-material/Close";
import QR from "./Qr";
var Buffer = require('buffer/').Buffer  // note: the trailing slash is important!
global.Buffer = Buffer;


interface Props {
  open: boolean;
  onClose: () => void;
  onConnected?: () => void;
}



const isValidAddress = (address: string) =>{
  if(!address){
    return false
  }
  // return TonWeb.utils.Address.isValid(address)
  return true
}

function WalletPopup({ onClose, open, onConnected }: Props) {
  const classes = useStyles();
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const store = useStore();

  const onSubmit = () => {
    if (!address) {
      setError("Please insert wallet address");
    } else {
      store.setAddress(address);
      onConnected?.();
      onClose();
    }
  };

  return (
    <Popup open={open}>
      <Box className={classes.popup}>
        <Box className={classes.popupNavbar}>
          <LogoWithText />
          <IconButton
            onClick={onClose}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ padding: 0, marginLeft: 0 }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </Box>
        <Box className={classes.popupGrid}>
          <Typography component="h2">Tap to scan your wallet</Typography>
          <QR setAddress={setAddress} />
          <Typography component="h3">OR</Typography>
          <Typography component="h3">Enter your wallet address</Typography>
          <Box className={classes.inputBox}>
            <AddressInput
              onFocus={() => setError("")}
              error={error}
              value={address}
              onChange={setAddress}
            />
          </Box>
          <ActionButton isDisabled={!isValidAddress(address)} onClick={onSubmit}>
            Done
          </ActionButton>
        </Box>
      </Box>
    </Popup>
  );
}

export default WalletPopup;
