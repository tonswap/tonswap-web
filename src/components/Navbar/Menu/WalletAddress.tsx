import {
  ClickAwayListener,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import WalletAddressImg from "assets/images/shared/wallet-address.svg";
import { observer } from "mobx-react-lite";
import { styled } from "@mui/styles";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Tooltip from "components/Tooltip";
import theme from "theme";
import { useState } from "react";
import { Box } from "@mui/system";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const StyledChip = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  border: `1px solid ${theme.palette.primary.main}!important`,
  height: 35,
  paddingLeft: 10,
  borderRadius: 20,
  background: "transparent!important",
  color: theme.palette.primary.main,
  maxWidth: 185,
  gap: 7,
  paddingRight: 30,
  "& .icon": {
    width: 20,
    height: 20,
  },
  "& .address": {
    flex: 1,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontSize: 12,
    paddingRight:10,
  },
  "& .toggle": {
    position: "absolute",
    right: 0,
  },
  [theme.breakpoints.down('sm')]:{
    maxWidth:'unset',
    width: '100%',
    marginTop: 20
  }
});

const StyledIconButton = styled("button")({
  cursor:'pointer',
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
  const store = {} as any
  const [showDisconnect, setShowDisconnect] = useState(false);

  return store.address ? (
    <StyledContainer item display="flex" gap="10px">
      <StyledChip>
        <img alt="wallet" className="icon" src={WalletAddressImg} />
        <Tooltip placement="bottom" title={store.address}>
          <Typography className="address">{store.address}</Typography>
        </Tooltip>
        <IconButton
          className="toggle"
          onClick={() => setShowDisconnect(!showDisconnect)}
        >
          <ArrowDropDownIcon style={{ color: "#50A7EA" }} />
        </IconButton>
      </StyledChip>

      {showDisconnect && (
        <ClickAwayListener onClickAway={() => setShowDisconnect(false)}>
          <StyledIconButton onClick={store.disconnect}>
            <PowerSettingsNewIcon style={{ width: 18 }} />
            <Typography>Disconnect</Typography>
          </StyledIconButton>
        </ClickAwayListener>
      )}
    </StyledContainer>
  ) : null;
});

export default WalletAddress;
