import { styled } from "@mui/styles";
import DesktopFlow from "./DesktopFlow";
import MobileFlow from "./MobileFlow";
import { isMobile } from "react-device-detect";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useWalletStore } from "store/wallet/hooks";
import {
  useShowWalletModal,
  useWalletModalToggle,
} from "store/application/hooks";
import { Popup } from "components/Popup";

const StyledModal = styled(Popup)({});

const SelectWallet = observer(() => {
  const { address } = useWalletStore();
  const open = useShowWalletModal();
  const toggleModal = useWalletModalToggle();

  const onClose = () => {
    toggleModal();
  };

  useEffect(() => {
    if (address && open) {
      toggleModal();
    }
  }, [address]);

  return isMobile ? (
    <StyledModal open={open} onClose={onClose}>
      <MobileFlow closeModal={onClose} />
    </StyledModal>
  ) : (
    <StyledModal open={open} onClose={onClose} maxWidth={500}>
      <DesktopFlow closeModal={onClose} />
    </StyledModal>
  );
});

export default SelectWallet;
