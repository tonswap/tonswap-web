import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ActionButton } from "components/ActionButton";
import { ROUTES } from "router/routes";
import { useNavigate } from "react-router-dom";
import { delay } from "utils";
import { useStyles } from "./style";

interface Props {
  hideMenu: () => void;
}

const NoToken = ({ hideMenu }: Props) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const onClick =  () => {
    hideMenu();
    navigate(ROUTES.tokens);
  };

  return (
    <Box className={classes.drawerNoTokenBox}>
      <Typography component="h3"> No Token Selected</Typography>
      <ActionButton onClick={onClick}>Select Token</ActionButton>
    </Box>
  );
};

export default NoToken;
