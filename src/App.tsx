import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { DESTINATION_PATH, LAYOUT_MAX_WIDTH } from "consts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";

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
  const [appReady, setAppReady] = useState(false);
  const classes = useStyles();
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation()

  useEffect(() => {
    const onLoad = async () => {
      if(location.pathname !== '/'){
        localStorage.setItem(DESTINATION_PATH, location.pathname+location.search)
      }
  
      try {
        const address = await store.restoreSession();
        store.setAddress(address);
      } catch (error) {
        navigate(ROUTES.connect);
      } finally {
        setAppReady(true);
      }
    };

    onLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return appReady ? (
    <Box className={classes.app}>
      <Navbar />
      <Box className={classes.routes}>
        <AppRoutes />
      </Box>
    </Box>
  ) : null;
});

export default App;
