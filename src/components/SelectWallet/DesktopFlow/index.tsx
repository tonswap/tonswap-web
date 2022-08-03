import {styled} from '@mui/styles';
import { Box } from "@mui/material";
import QR from "./QR";
import AdaptersList from "../AdaptersList";
import { useState } from "react";
import { Adapters } from "services/wallets/types";
import { observer } from "mobx-react-lite";
import { adapters } from "services/wallets/config";
import { useWalletActions, useWalletStore } from 'store/wallet/hooks';

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "white",
  maxWidth: 400,
  margin: 'auto',
  position:'relative',
  borderRadius: 12,
  overflow:'hidden',
  padding: 15,
  width:'fit-content'
});

interface Props {
  closeModal: () => void;
}

const DesktopFlow = observer(({ closeModal }: Props) => {
  const {resetWallet, createWalletSession} = useWalletActions()
  const {sessionLink} = useWalletStore()
  const [showQr, setShowQr] = useState(false);

  const onSelect = (adapter: Adapters) => {
    resetWallet();
    createWalletSession(adapter);
    if (adapter === Adapters.TON_HUB) {
      setShowQr(true);
    }
  };

  const cancel = () => {
    setShowQr(false);
    resetWallet();
  };

  return (
    <StyledContainer>
      <AdaptersList
        adapters={adapters}
        onClose={closeModal}
        open={!showQr}
        select={onSelect}
      />
      <QR open={showQr} link={sessionLink} onClose={cancel} />
    </StyledContainer>
  );
});

export default DesktopFlow;
