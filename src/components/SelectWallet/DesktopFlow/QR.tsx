import {useTheme } from '@mui/styles';
import { Box } from "@mui/material";
import { QRCode as QrCodeLogo } from "react-qrcode-logo";
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
  link?: string;
  open: boolean;
  title?: string
  image?: string
}

function QR({ link, open, title, image }: Props) {
  const theme = useTheme()
  if (!open) {
    return null;
  }

  return (
    <StyledContainer>
      <Title text={`Connect ${title}`} />
      <StyledQrBox>
        {link ? (
          <Fade in={true}>
            <Box>
              <QrCodeLogo size={250} logoImage={image} logoWidth={50} logoHeight={50} value={link} removeQrCodeBehindLogo />
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
