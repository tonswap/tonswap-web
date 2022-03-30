import { Box } from "@mui/material";
import { Popup } from "components";
import { makeStyles } from "@mui/styles";
import { Token } from "types";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#FFFFFF",
    border: "1px solid #B4B4B4",
    padding: "12px 20px",
    borderRadius: 12,
   
  },
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
        {token?.name} will be available soon
      </Box>
    </Popup>
  );
};

export default IncativeToken;
