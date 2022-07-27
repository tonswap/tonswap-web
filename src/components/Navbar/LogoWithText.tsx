import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useStyles } from "./styles";
import TonLogo from "assets/images/shared/ton-logo.svg";
import { styled } from "@mui/system";



const StyledText = styled(Typography)(({theme}) => ({
  fontSize: 18,
  "span": {
      color:'#50A7EA'
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 15,
  },
}))

interface  Props{
  onClick?: () => void;
}

const LogoWithText = ({onClick}:Props ) => {
  const classes = useStyles();
  return (
    <Box onClick={onClick} className={classes.logoBox}>
      <img className={classes.logo} src={TonLogo} alt="" />
      <StyledText>
        <strong>Ton</strong>Swap
        <span> Beta</span>
      </StyledText>
    </Box>
  );
};

export default LogoWithText;
