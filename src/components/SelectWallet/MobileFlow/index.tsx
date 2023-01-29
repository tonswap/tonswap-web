import { styled } from "@mui/styles";
import { Box } from "@mui/material";
import { observer } from "mobx-react-lite";
import AdaptersList from "../AdaptersList";
import { useWalletSelect } from 'store/wallet/hooks'

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
  const {selectWallet, session, adapter: selectedAdapter} = useWalletSelect()

  const openDeepLink = () => {
    if (session) {
      window.location.href = session;
    }
  }

  if (session) {

    return (<StyledContainer style={{ width: "100%", display:"flex" }}>
      <AdaptersList
        adapterLoading={selectedAdapter ? selectedAdapter.type : undefined}
        adapters={selectedAdapter ? [selectedAdapter] : []}
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
        adapterLoading={selectedAdapter ? selectedAdapter.type : undefined}
        adapters={selectedAdapter ? [selectedAdapter] : []}
        onClose={closeModal}
        open={true}
        select={selectWallet}
        isLoading={false}
      />
    </StyledContainer>
  );
});

export default MobileFlow;
