import {styled} from '@mui/styles';
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { adapters } from "services/wallets/config";
import { Adapter, Adapters } from "services/wallets/types";
import AdaptersList from "../AdaptersList";
import Connect from "./Connect";
import { useWalletActions, useWalletStore } from 'store/wallet/hooks';

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "white",
  position: "relative",
});

interface Props {
  closeModal: () => void;
}

const MobileFlow = observer(({ closeModal }: Props) => {
  const {sessionLink} = useWalletStore()
  const {createWalletSession, resetWallet} = useWalletActions()
  const [selectedAdapter, setSelectedAdapter] = useState<Adapter | undefined>();
  const filteredAdapters = useMemo(
    () => adapters.filter((m) => m.mobileCompatible),
    []
  );

  const onSelect = (adapter: Adapters) => {
    createWalletSession(adapter);
    setSelectedAdapter(adapters.find((m) => m.type === adapter));
  };

  const onConnectClose = async () => {
    setSelectedAdapter(undefined);
    resetWallet();
  };

  return (
    <StyledContainer>
      <AdaptersList
        adapters={filteredAdapters}
        onClose={closeModal}
        open={!selectedAdapter}
        select={onSelect}
      />
      <Connect
        href={sessionLink}
        open={!!selectedAdapter}
        adapterName={selectedAdapter?.name}
        onSelect={closeModal}
        onClose={onConnectClose}
      />
    </StyledContainer>
  );
});

export default MobileFlow;
