import { Box, IconButton } from "@mui/material";
import { useState } from "react";
import { QrReader } from "react-qr-reader";
import { useStyles } from "./style";
import CloseIcon from "@mui/icons-material/Close";
import QRImage from "assets/images/connect/qr.svg";
import QRLine from "assets/images/connect/qr-line.svg";
import { Grow, Fade } from "@mui/material";

interface Props {
  setAddress: (val: string) => void;
}

const QR = ({ setAddress }: Props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const onResult = (value: string) => {
    setAddress(value);
    setOpen(false)
  };

  return (
    <div className={classes.qrContainer}>
      <Grow in={open}>
        <Box className={classes.qrWindow}>
          <Box className={classes.qrClose}>
            <IconButton
              onClick={() => setOpen(false)}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              style={{ padding: 0, marginLeft: 0 }}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </Box>
          <QrReader
          videoStyle={{
              objectFit:'cover',
          
          }}
            constraints={{ facingMode: "user" }}
            onResult={(result: any, error: any) => {
              if (!!result) {
                onResult(result?.text);
              }
            }}
          />
        </Box>
      </Grow>
      <Fade in={!open}>
        <div className={classes.qrImages} onClick={() => setOpen(true)}>
          <img src={QRImage} className={classes.qrImage} />
          <img src={QRLine} className={classes.qrLineImg} />
        </div>
      </Fade>
    </div>
  );
};

export default QR;
