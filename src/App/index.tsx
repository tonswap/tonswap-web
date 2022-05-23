import { observer } from "mobx-react-lite";
import useLogic from "./useLogic";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { LAYOUT_MAX_WIDTH } from "consts";
import { telegramWebApp } from "services/telegram";
import useWebAppResize from "hooks/useWebAppResize";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    position: "relative",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: 30,
    maxWidth: LAYOUT_MAX_WIDTH,
    marginLeft: "auto",
    marginRight: "auto",
    flex: 1,
  },

  routes: {
    background: "#FAFAFA",
    borderRadius: 20,
    maxHeight: "calc(100vh - 130px)",
    width: "100%",
    overflow: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      background: "transparent",
      flex: 1,
      maxHeight: "unset",
      borderRadius: 0,
    },
  },
}));

const App = observer(() => {
  const classes = useStyles();
  useLogic();

  return (
    <Box className={classes.app}>
      <Navbar />
      <Box className={classes.routes}>
        <AppRoutes />
      </Box>
    </Box>
  );
});

export default App;
