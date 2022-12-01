import { styled } from '@mui/styles';
import { Box } from "@mui/material";
import QR from "./QR";
import AdaptersList from "../AdaptersList";
import { useState } from "react";
import { Adapters } from "services/wallets/types";
import { adapters } from "services/wallets/config";
import { useWalletActions, useWalletStore } from 'store/wallet/hooks';

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: 'relative',
  overflow: 'hidden',
  width: 'fit-content'
});

interface Props {
  closeModal: () => void;
}

const DesktopFlow = ({ closeModal }: Props) => {
  const { resetWallet, createWalletSession } = useWalletActions();
  const [ adapter, setAdapter ] = useState<Adapters>(Adapters.TON_HUB);
  const { sessionLink } = useWalletStore()
  const [showQr, setShowQr] = useState(false);

  const onSelect = (adapter: Adapters) => {
    resetWallet();
    setAdapter(adapter);
    createWalletSession(adapter);
    if (adapter === Adapters.TON_HUB) {
      setShowQr(true);
    }
    if (adapter === Adapters.TON_KEEPER) {
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
      
      <QR open={showQr} adapter={adapter} link={sessionLink} onClose={cancel} />
    </StyledContainer>
  );
}

export default DesktopFlow;
