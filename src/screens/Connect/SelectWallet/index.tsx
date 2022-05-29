import Modal from "@mui/material/Modal";
import styled from "@emotion/styled";
import { Paper } from "@mui/material";
import DesktopFlow from "./DesktopFlow";
import MobileFlow from "./MobileFlow";
import { isMobile } from "react-device-detect";

interface Props {
  open: boolean;
  onClose: () => void;
}

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledContainer = styled(Paper)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  padding: "20px",
  background: "white",
});

const ConnectModal = ({ open, onClose }: Props) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <StyledContainer sx={{ width: "auto" }}>
        {isMobile ? (
          <MobileFlow closeModal={onClose} />
        ) : (
          <DesktopFlow isModalOpen={open} closeModal={onClose} />
        )}
      </StyledContainer>
    </StyledModal>
  );
};

export default ConnectModal;
