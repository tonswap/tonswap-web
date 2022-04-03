import { Box, Typography } from "@mui/material";
import { ActionButton, Popup } from "components";
import { makeStyles } from "@mui/styles";
import { Token } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FFFFFF",
    border: "1px solid #B4B4B4",
    padding: "10px 33px 30px 33px",
    borderRadius: 12,
    maxWidth: 380,
    width:'100%',
    marginLeft:'auto',
    marginRight:'auto',
    textAlign:'center'
  },
  header: {
    borderBottom: '0.5px solid #9E9E9E',
    paddingBottom: 5,
    marginBottom: 15
  },
  button: {
    marginTop: 30
  }
}));

interface Props {
  open: boolean;
  onClose: () => void;
  token?: Token;
}
const IncativeToken = ({ onClose, open, token }: Props) => {
  const classes = useStyles();
  return (
    <Popup
      blur={false}
      backgroundColor="rgba(0, 0, 0, 0.2)"
      open={open}
      onClose={onClose}
    >
      <Box className={classes.root}>
        <Box className={classes.header}>
        <Typography component="h3" fontSize='50px' fontWeight='700'>⚠️</Typography>
        </Box>
        <Typography component="p" fontSize='16px' fontWeight={500}>  
          <strong>{token?.displayName}</strong> will be available soon
        </Typography>
        <Box className={classes.button}><ActionButton onClick={onClose}>Close</ActionButton></Box>
      </Box>
    </Popup>
  );
};

export default IncativeToken;
