import {useTheme } from '@mui/styles';
import { Box } from "@mui/material";
import QRCode from "react-qr-code";
import { QRCode as QrCodeLogo } from "react-qrcode-logo";
import Fade from "@mui/material/Fade";
import CircularProgress from "@mui/material/CircularProgress";
import Title from "../Title";
import { styled } from '@mui/system';
import { Adapter, Adapters } from 'services/wallets/types';

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
  adapter: Adapters
}

function QR({ onClose, link, open, adapter }: Props) {
  const theme = useTheme()
  if (!open) {
    return null;
  }
  let title = '';
  let qrCode = <QRCode style={{ width: "100%", height: "100%" }} value={link!} />;
  if (adapter == Adapters.TON_KEEPER) {
    title = 'Connect Ton Keeper'; 
    qrCode = < QrCodeLogo  size={250} logoImage={"https://tonkeeper.com/assets/logo.svg"} value={link} />
  } else {
    title = 'Connect Ton hub'; 
  }

  return (
    <StyledContainer>
      <Title text={title} />
      <StyledQrBox>
        {link ? (
          <Fade in={true}>
            <Box>
              {qrCode}
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
