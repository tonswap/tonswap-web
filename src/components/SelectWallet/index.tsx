import Modal from "@mui/material/Modal";
import { styled } from "@mui/styles";
import DesktopFlow from "./DesktopFlow";
import MobileFlow from "./MobileFlow";
import { isMobile } from "react-device-detect";
import useWebAppResize from "hooks/useWebAppResize";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWalletStore } from "store/wallet/hooks";
import {
  useShowWalletModal,
  useWalletModalToggle,
} from "store/application/hooks";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { Box } from "@mui/system";

const StyledModal = styled(Modal)({});




const StyledDrawer = styled(Box)({
  padding: 20,
  minHeight: 300
})

const SelectWallet = observer(() => {
  const { address } = useWalletStore();
  const open = useShowWalletModal();
  const toggleModal = useWalletModalToggle();
  const expanded = useWebAppResize();

  const onClose = () => {
    toggleModal();
  };

  useEffect(() => {
    if (address && open) {
      toggleModal();
    }
  }, [address]);

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={toggleModal}
      onOpen={() => {}}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: false,
      }}
    >
     <StyledDrawer>
     <MobileFlow  closeModal={onClose} />
     </StyledDrawer>
    </SwipeableDrawer>
  ) : (
    <StyledModal open={open} onClose={onClose}>
       <DesktopFlow closeModal={onClose} />
    </StyledModal>
  );
});

export default SelectWallet;
