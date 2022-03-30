import { makeStyles,  } from "@mui/styles";

import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  popup: {
    textAlign: "center",
    width: "100%",
    maxWidth: 760,
    marginLeft:'auto',
    marginRight:'auto',
    "& h2": {
      fontSize: 23,
      fontWeight: 600,
    },
    "& h3": {
      fontSize: 18,
      "&:nth-of-type(1)": {
        marginBottom: 10,
      },
    },
    "& *": {
      color: "white",
    },
  },
  "@keyframes myEffect": {
    "0%": {
      transform: "translateY(0%)",
    },
    "100%": {
      transform: "translateY(300%)",
    },
  },
  qrImage: {
    position: "absolute",
    height: "100%",
    objectFit: "contain",
  },
  qrLineImg: {
    animation: `$myEffect 1500ms  infinite  ease alternate`,
    zIndex: 9,
    position: "relative",
    top: 10,
  },
  qr: {
    position: "relative",
    height: 90,
    marginTop: 33,
    marginBottom: 45,
  },
  input: {
    position: 'relative',
    width:'100%'
  },
  inputBox: {
    marginTop: 17,
    marginBottom: 33
  },
  inputError: {
    position: 'absolute',
    left: '0px',
    color: theme.palette.error.main,
    top: `calc(100% )`
  },
  popupNavbar: {
    display: 'flex',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom: 70
  },
  popupGrid: {
    maxWidth:360,
    marginLeft:'auto',
    marginRight:'auto'
  }
}));

export { useStyles };
