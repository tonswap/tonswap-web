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
import { useWalletModalToggle } from "store/application/hooks";
import WalletImg from "assets/images/shared/wallet.svg";
import gaAnalytics from "services/analytics/ga/ga";
import { useTranslation } from "react-i18next";
import { isMobile } from "react-device-detect";
import SelectLanguage from "./SelectLanguage";
import { isTelegramWebApp } from "utils";
import { disconnectTC } from 'services/wallets/adapters/TonConnectAdapter'

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
  borderRadius: 12,
  width: "100%",
  padding: "5px 0px",
  "& p": {
    fontSize: 13,
  },
});

const StyledContainer = styled(Grid)({
  position: "relative",
  alignItems: "baseline"
});

const WalletAddress = observer(() => {
  const { t } = useTranslation();
  const { resetWallet } = useWalletActions();
  const toggleModal = useWalletModalToggle();
  const { address } = useWalletStore();
  const [showDisconnect, setShowDisconnect] = useState(false);
  const isMobileTelegram = isMobile || isTelegramWebApp();

  const onDisconnect = () => {
    resetWallet();
    disconnectTC();
    setShowDisconnect(false);
    gaAnalytics.disconnect();
  };

  const onConnect = () => {
    toggleModal();
    gaAnalytics.connect();
  };

  return (
    <StyledContainer item display="flex" gap="30px">
      {!isMobileTelegram && <SelectLanguage />}
      {address ? (
        <StyledConnectedChip>
          <img alt="wallet" className="icon" src={WalletAddressImg} />
          <Tooltip placement="bottom" title={address}>
            <p className="address">{address}</p>
          </Tooltip>
          <IconButton
            className="toggle"
            onClick={() => setShowDisconnect(!showDisconnect)}
          >
            <ArrowDropDownIcon style={{ color: "#50A7EA" }} />
          </IconButton>
        </StyledConnectedChip>
      ) : (
        <StyledConnectChip onClick={onConnect}>
          <img className="icon" src={WalletImg} />
          <Typography className="address">{t("connect-wallet")}</Typography>
        </StyledConnectChip>
      )}
      {showDisconnect && (
        <ClickAwayListener onClickAway={() => setShowDisconnect(false)}>
          <StyledIconButton onClick={onDisconnect}>
            <PowerSettingsNewIcon style={{ width: 18 }} />
            <Typography>{t("disconnect")}</Typography>
          </StyledIconButton>
        </ClickAwayListener>
      )}
    </StyledContainer>
  );
});

export default WalletAddress;
