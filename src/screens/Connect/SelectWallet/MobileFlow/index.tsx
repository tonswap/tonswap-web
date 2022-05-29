import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { adapters } from "services/wallets/config";
import { Adapter, Adapters } from "services/wallets/types";
import { useStore } from "store";
import AdaptersList from "../AdaptersList";
import Connect from "./Connect";

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
  const store = useStore();
  const [selectedAdapter, setSelectedAdapter] = useState<Adapter | undefined>();
  const filteredAdapters = useMemo(
    () => adapters.filter((m) => m.mobileCompatible),
    []
  );

  const onSelect = (adapter: Adapters) => {
    store.createWalletSession(adapter);
    setSelectedAdapter(adapters.find((m) => m.type === adapter));
  };

  const onConnectClose = async () => {
    setSelectedAdapter(undefined);
    store.reset();
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
        href={store.sessionLink}
        open={!!selectedAdapter}
        adapterName={selectedAdapter?.text}
        onSelect={closeModal}
        onClose={onConnectClose}
      />
    </StyledContainer>
  );
});

export default MobileFlow;
