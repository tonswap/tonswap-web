import Modal from "@mui/material/Modal";
import { styled } from "@mui/styles";
import { Paper } from "@mui/material";
import DesktopFlow from "./DesktopFlow";
import MobileFlow from "./MobileFlow";
import { isMobile } from "react-device-detect";
import useWebAppResize from "hooks/useWebAppResize";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWalletStore } from "store/wallet/hooks";
import { useShowWalletModal, useWalletModalToggle } from "store/application/hooks";

const StyledModal = styled(Modal)({});

const StyledContainer = styled(Paper)(
  ({ expanded }: { expanded: boolean }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    padding: "20px",
    background: "white",
    top: expanded ? "50%" : "30%",
    transform: "translate(-50%, -50%)",
    left: "50%",
    transition: "0.2s all",
  })
);

const SelectWallet = observer(() => {
  const {address} = useWalletStore()
  const open = useShowWalletModal()
  const toggleModal = useWalletModalToggle()
  const expanded = useWebAppResize();

  const onClose = () => {
    toggleModal()
  }


  useEffect(() => {
    if(address && open){
      toggleModal()
    }
  }, [address])
  


  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledContainer expanded={expanded} sx={{ width: "auto" }}>
        {isMobile ? (
          <MobileFlow closeModal={onClose} />
        ) : (
          <DesktopFlow closeModal={onClose} />
        )}
      </StyledContainer>
    </StyledModal>
  );
});

export default SelectWallet;
