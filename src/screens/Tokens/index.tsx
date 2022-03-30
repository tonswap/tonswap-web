import { Box, useMediaQuery } from "@mui/material";
import { Title } from "components";
import { useStyles } from "./styles";
import Mobile from "./Mobile";
import theme from "theme";
import Desktop from "./Desktop";
import Fade from "@mui/material/Fade";

export const Tokens = () => {
  const classes = useStyles();

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Fade in>
      <Box className={classes.root}>
        <Title>Select a token to trade</Title>
        <Box className={classes.lists}>
          {isMobile ? <Mobile /> : <Desktop />}
        </Box>
      </Box>
    </Fade>
  );
};
