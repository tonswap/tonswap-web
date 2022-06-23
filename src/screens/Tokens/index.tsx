import { Box, Button, useMediaQuery } from "@mui/material";
import { ActionButton, Title } from "components";
import { useStyles } from "./styles";
import Mobile from "./Mobile";
import theme from "theme";
import Desktop from "./Desktop";
import Fade from "@mui/material/Fade";
import { useStore } from "store";
import { ROUTES } from "router/routes";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCustomTokenPopup from "./AddCustomTokenPopup";


export const Tokens = () => {
  const classes = useStyles();
  const store = useStore();
  const [addTokenModal, setAddTokenModal] = useState(false)

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    store.setToken(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fade in>
      <Box className={classes.root}>
        <AddCustomTokenPopup open={addTokenModal} onClose = {() => setAddTokenModal(false)} />
        <Title>Select a token to trade</Title>
        <Box className={classes.lists}>
          {isMobile ? <Mobile 
          onAddToken = {() => setAddTokenModal(true)}
          /> : <Desktop onAddToken = {() => setAddTokenModal(true)} />}
        </Box>
        
        <Button style={{"marginTop": "20px"}} onClick={()=> {}}>
          Add Token
        </Button>
      <br />
        <Button style={{"marginTop": "20px"}} onClick={()=> {}}>
          <Link to={ROUTES.createPool}>Create Pool</Link>
        </Button>
      </Box>
    </Fade>
  );
};
