import { styled } from "@mui/styles";
import { Box, Link } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useRef, useState } from "react";
import { adapters } from "services/wallets/config";
import { Adapters } from "services/wallets/types";
import AdaptersList from "../AdaptersList";
import { useWalletActions, useWalletStore } from "store/wallet/hooks";

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
  const { sessionLink } = useWalletStore();
  const { createWalletSession } = useWalletActions();
  const [selectedAdapter, setSelectedAdapter] = useState<
    Adapters | undefined
  >();
  const ref = useRef<any>();
  const filteredAdapters = useMemo(
    () => adapters.filter((m) => m.mobileCompatible),
    []
  );

  const onSelect = (adapter: Adapters) => {
    if(sessionLink){
      window.location.href = sessionLink
    }
   
    // createWalletSession(adapter);
    // setSelectedAdapter(adapters.find((m) => m.type === adapter)?.type);
  };

  useEffect(() => {
    createWalletSession(Adapters.TON_HUB);
  }, []);


  return (
    <StyledContainer style={{ width: "100%" }}>
      <AdaptersList
        adapterLoading={selectedAdapter}
        adapters={filteredAdapters}
        onClose={closeModal}
        open={true}
        select={onSelect}
        isLoading={!sessionLink}
      />
    </StyledContainer>
  );
});

export default MobileFlow;
