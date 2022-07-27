import { ClickAwayListener, Grid, IconButton, Typography } from "@mui/material";
import WalletAddressImg from "assets/images/shared/wallet-address.svg";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Tooltip from "components/Tooltip";
import theme from "theme";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { StyledConnectedChip, StyledConnectChip } from "./style";
import { useWalletActions, useWalletStore } from "store/wallet/hooks";
import { useToggleModal, useWalletModalToggle } from "store/application/hooks";


const StyledIconButton = styled("button")({
  cursor: "pointer",
  color: `${theme.palette.primary.main}!important`,
  filter: "drop-shadow(rgba(0, 0, 0, 0.1) 0px 4px 4px)",
  background: "white",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  gap: 10,
  justifyContent: "center",
  top: "calc(100% + 10px)",
  borderRadius: 20,
  width: "100%",
  padding: "5px 0px",
  "& p": {
    fontSize: 13,
  },
});

const StyledContainer = styled(Grid)({
  position: "relative",
});

const WalletAddress = observer(() => {
  const {resetWallet} = useWalletActions()
  const toggleModal = useWalletModalToggle()
  const {address} = useWalletStore()
  const [showDisconnect, setShowDisconnect] = useState(false);


  const onDisconnect = () => {
    resetWallet()
    setShowDisconnect(false)
  }

  return (
    <StyledContainer item display="flex" gap="10px">
      {address ? (
        <StyledConnectedChip>
          <img alt="wallet" className="icon" src={WalletAddressImg} />
          <Tooltip placement="bottom" title={address}>
            <Typography className="address">{address}</Typography>
          </Tooltip>
          <IconButton
            className="toggle"
            onClick={() => setShowDisconnect(!showDisconnect)}
          >
            <ArrowDropDownIcon style={{ color: "#50A7EA" }} />
          </IconButton>
        </StyledConnectedChip>
      ) : (
        <StyledConnectChip onClick={toggleModal}>
          <Typography className="address">Connect wallet</Typography>
        </StyledConnectChip>
      )}
      {showDisconnect && (
        <ClickAwayListener onClickAway={() => setShowDisconnect(false)}>
          <StyledIconButton onClick={onDisconnect}>
            <PowerSettingsNewIcon style={{ width: 18 }} />
            <Typography>Disconnect</Typography>
          </StyledIconButton>
        </ClickAwayListener>
      )}
    </StyledContainer>
  );
});

export default WalletAddress;
