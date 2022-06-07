import Modal from "@mui/material/Modal";
import {styled} from '@mui/styles';
import { Paper } from "@mui/material";
import DesktopFlow from "./DesktopFlow";
import MobileFlow from "./MobileFlow";
import { isMobile } from "react-device-detect";

interface Props {
  open: boolean;
  onClose: () => void;
  expanded: boolean;
}

const StyledModal = styled(Modal)({

})

const StyledContainer = styled(Paper)(({expanded}: {expanded: boolean}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  padding: "20px",
  background: "white",
  top:expanded ?  '50%' : '30%',
  transform: 'translate(-50%, -50%)',
  left:'50%',
  transition: '0.2s all'
}));

const ConnectModal = ({ open, onClose, expanded }: Props) => {
  return (
    <StyledModal  open={open} onClose={onClose}>
      <StyledContainer expanded={expanded} sx={{ width: "auto" }}>
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
