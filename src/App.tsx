import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { ADDRESS_PARAM, LAYOUT_MAX_WIDTH, LOCAL_STORAGE_ADDRESS } from "consts";
import useQuery from "hooks/useQuery";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";
import { TonhubConnector } from "connectors/ton-hub";


TonhubConnector.initSession()

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
  const store = useStore();
  const navigate = useNavigate();

  let query = useQuery();

  useEffect(() => {
    const localStorageAddress = localStorage.getItem(LOCAL_STORAGE_ADDRESS);
    const queryAddress = query.get(ADDRESS_PARAM);
    const address = queryAddress || localStorageAddress;

    if (address) {
      store.setAddress(address);
    } else {
      navigate(ROUTES.connect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
   
  }, []);

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
