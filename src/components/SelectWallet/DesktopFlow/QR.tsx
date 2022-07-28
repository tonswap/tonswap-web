import {useTheme } from '@mui/styles';
import { Box } from "@mui/material";
import QRCode from "react-qr-code";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import Title from "../Title";
import { styled } from '@mui/system';

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",

  background: "white",
});

const StyledQrBox = styled(Box)({
  width: "260px",
  height: "260px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zoom: 1.1,
  marginTop: 10
});

interface Props {
  onClose: () => void;
  link?: string;
  open: boolean;
}

function QR({ onClose, link, open }: Props) {
  const theme = useTheme()
  if (!open) {
    return null;
  }

  return (
    <StyledContainer>
      <Title onClose={onClose} text="Connect Tonhub" />
      <StyledQrBox>
        {link ? (
          <Fade in={true}>
            <Box>
              <QRCode  style={{ width: "100%", height: "100%" }} value={link} />
            </Box>
          </Fade>
        ) : (
          <CircularProgress style={{color:theme.palette.primary.main}} />
        )}
      </StyledQrBox>
    </StyledContainer>
  );
}

export default QR;
