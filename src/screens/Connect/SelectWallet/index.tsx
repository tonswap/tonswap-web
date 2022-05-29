import { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Adapters } from "../../../services/wallets/types";
import WalletsList from "./WalletsList";
import QR from "./QR";
import { isMobile } from "react-device-detect";
import { Paper } from "@mui/material";
import { useStore } from "store";
import { observer } from "mobx-react-lite";
import { DESTINATION_PATH } from "consts";
import { useNavigate } from "react-router-dom";
import { walletService } from "services/wallets/WalletService";
import { delay } from "services/wallets/adapters/TonWalletAdapter";

interface Props {
  open: boolean;
  onClose: () => void;
}

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "white",
  position: "relative",
  width: "auto",
});

const ConnectModal = observer(({ open, onClose }: Props) => {
  const store = useStore();
  const [showQr, setShowQr] = useState(false);
  const navigate = useNavigate();

  const selectWallet = (adapterId: Adapters) => {
    store.createWalletSession(adapterId);

    if (isMobile) {
      mobileSelect(adapterId);
    } else if (adapterId === Adapters.TON_HUB) {
      setShowQr(true);
    }
  };

  const mobileSelect =  (adapterId: Adapters) => {
   
       walletService.createSession(adapterId).then((res: any) =>{
        const link = res?.link
          ?.replace("ton-test://", "https://test.tonhub.com/")
          .replace("ton://", "https://tonhub.com/");
        window.open('https://google.com');
       })
       
    
  };

  useEffect(() => {
    if (open) {
      setShowQr(false);
    }
  }, [open]);

  useEffect(() => {
    if (store.wallet) {
      onClose();
      const destinationPath = localStorage.getItem(DESTINATION_PATH);
      if (destinationPath) {
        navigate(destinationPath);
      }
    }
  }, [store.wallet, onClose]);

  const onQrClose = () => {
    setShowQr(false);
    store.reset();
  };

  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledContainer sx={{ width: "auto" }}>
        <WalletsList onClose={onClose} open={!showQr} select={selectWallet} />
        <QR open={showQr} link={store.session?.link} onClose={onQrClose} />
      </StyledContainer>
    </StyledModal>
  );
});

export default ConnectModal;
