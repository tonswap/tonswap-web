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
  
  const filteredAdapters = useMemo(
    () => adapters.filter((m) => m.mobileCompatible),
    []
  );

  const onSelect = async (adapter: Adapters) => {
   
    await createWalletSession(adapter);
    setSelectedAdapter(adapters.find((m) => m.type === adapter)?.type);
  };

  const openDeepLink = () => {
    if (sessionLink) {
      window.location.href = sessionLink;
    }
  }

  const createSessions = async () => {
    // const tonhub = await createWalletSession(Adapters.TON_HUB)
    // const tonkeeper = await createWalletSession(Adapters.TON_KEEPER) 
  }

  useEffect(() => {

   // createSessions()
  }, []);
  if (sessionLink && selectedAdapter) {

    const currentAdapter =  filteredAdapters.filter((a) => a.type == selectedAdapter )
    return (<StyledContainer style={{ width: "100%", display:"flex" }}>
      <AdaptersList
        adapterLoading={selectedAdapter}
        adapters={currentAdapter}
        onClose={closeModal}
        open={true}
        select={openDeepLink}
        isLoading={false}
        title={"Click to connect"}
      />
    </StyledContainer>)
  }

  return (
    <StyledContainer style={{ width: "100%" }}>
      <AdaptersList
        adapterLoading={selectedAdapter}
        adapters={filteredAdapters}
        onClose={closeModal}
        open={true}
        select={onSelect}
        isLoading={false}
      />
    </StyledContainer>
  );
});

export default MobileFlow;
