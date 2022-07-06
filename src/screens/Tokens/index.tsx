import { Box, Button, useMediaQuery } from "@mui/material";
import { ActionButton, Title } from "components";
import { useStyles } from "./styles";
import Mobile from "./Mobile";
import theme from "theme";
import Desktop from "./Desktop";
import Fade from "@mui/material/Fade";
import { useStore } from "store";
import { ROUTES } from "router/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import AddCustomToken from "./AddCustomToken";
import { styled } from "@mui/styles";

const StyledCreatePool = styled(Box)({
  maxWidth: 300,
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 50,
});

export const Tokens = () => {
  const classes = useStyles();
  const store = useStore();
  const [addTokenModal, setAddTokenModal] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  useEffect(() => {
    store.setToken(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onClick = () => {
    navigate(ROUTES.createPool);
  };

  return (
    <Fade in>
      <Box className={classes.root}>
        <AddCustomToken
          open={addTokenModal}
          onClose={() => setAddTokenModal(false)}
        />
        <Title>Select a token to trade</Title>
        <Box className={classes.lists}>
          {isMobile ? (
            <Mobile onAddToken={() => setAddTokenModal(true)} />
          ) : (
            <Desktop onAddToken={() => setAddTokenModal(true)} />
          )}
        </Box>
        <StyledCreatePool>
          <ActionButton onClick={onClick}>Create Pool</ActionButton>
        </StyledCreatePool>
      </Box>
    </Fade>
  );
};
