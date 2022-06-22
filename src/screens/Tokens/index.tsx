import { Box, Button, useMediaQuery } from "@mui/material";
import { ActionButton, Title } from "components";
import { useStyles } from "./styles";
import Mobile from "./Mobile";
import theme from "theme";
import Desktop from "./Desktop";
import Fade from "@mui/material/Fade";
import { useStore } from "store";
import { useEffect } from "react";
import { ROUTES } from "router/routes";
import { Link } from "react-router-dom";

export const Tokens = () => {
  const classes = useStyles();
  const store = useStore();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    store.setToken(undefined);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fade in>
      <Box className={classes.root}>
        <Title>Select a token to trade</Title>
        <Box className={classes.lists}>
          {isMobile ? <Mobile /> : <Desktop />}
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
