import { ROUTES } from "router/routes";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import useLogic from "./useLogic";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import useMobile from "hooks/useMobile";
import { LAYOUT_MAX_WIDTH } from "consts";

const useStyles = makeStyles((theme: Theme) => ({
  app: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "100vh",
    position: "relative",
    paddingLeft: "20px",
    paddingRight: "20px",
    paddingBottom: 30,
    maxWidth: LAYOUT_MAX_WIDTH,
    marginLeft: 'auto',
    marginRight:'auto'
  },
  navbar: {
    height: 50,
  },
  routes: {
    background: "#FAFAFA",
    borderRadius: 20,
    maxHeight: "60%",
    width: "100%",
    overflow: "auto",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      background: "transparent",
      borderRadius: 0,
  },
  },
}));

const hideNavbar = (isMobile: boolean, pathname: string) => {
  if (isMobile && pathname.indexOf(ROUTES.connect) > -1) {
    return true;
  }
  return false;
};

const App = observer(() => {
  const isMobile = useMobile();
  const classes = useStyles();
  const location = useLocation();
  useLogic();

  return (
    <Box className={classes.app}>
      {!hideNavbar(isMobile, location.pathname) && <Navbar />}
      <Box className={classes.routes}>
        <AppRoutes />
      </Box>
    </Box>
  );
});

export default App;
