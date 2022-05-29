import {styled} from '@mui/styles';
import { Box } from "@mui/material";
import QR from "./QR";
import AdaptersList from "../AdaptersList";
import { useState } from "react";
import { Adapters } from "services/wallets/types";
import { useStore } from "store";
import { observer } from "mobx-react-lite";
import { adapters } from "services/wallets/config";

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "white",
});

interface Props {
  closeModal: () => void;
  isModalOpen:  boolean;
}

const DesktopFlow = observer(({ closeModal, isModalOpen }: Props) => {
  const store = useStore();
  const [showQr, setShowQr] = useState(false);

  const onSelect = (adapter: Adapters) => {
    store.reset();
    store.createWalletSession(adapter);
    if (adapter === Adapters.TON_HUB) {
      setShowQr(true);
    }
  };

  const cancel = () => {
    setShowQr(false);
    store.reset();
  };


  



  return (
    <StyledContainer>
      <AdaptersList
        adapters={adapters}
        onClose={closeModal}
        open={!showQr}
        select={onSelect}
      />
      <QR open={showQr} link={store.session?.link} onClose={cancel} />
    </StyledContainer>
  );
});

export default DesktopFlow;
