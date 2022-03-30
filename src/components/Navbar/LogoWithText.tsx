import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStyles } from "./styles";
import TonLogo from "assets/images/shared/ton-logo.svg";


interface  Props{
  onClick?: () => void;
}

const LogoWithText = ({onClick}:Props ) => {
  const classes = useStyles();
  return (
    <Box onClick={onClick} className={classes.logoBox}>
      <img className={classes.logo} src={TonLogo} alt="" />
      <Typography>
        <strong>Ton</strong>Swap
      </Typography>
    </Box>
  );
};

export default LogoWithText;
