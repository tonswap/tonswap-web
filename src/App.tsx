import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import {
  DESTINATION_PATH,
  LAYOUT_MAX_WIDTH,
  TELEGRAM_WEBAPP_PARAM,
} from "consts";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";
import useQuery from "hooks/useQuery";
import { styled } from "@mui/system";
import { isTelegramWebApp } from "utils";
import { telegramWebApp } from "services/telegram";

const StyledAppContainer = styled(Box)({
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
});

const StyledRoutesContainer = styled(Box)(({ theme }) => ({
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
}));

const App = observer(() => {
  const [appReady, setAppReady] = useState(false);
  const store = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQuery();

  useEffect(() => {
    const onLoad = async () => {
      const isAllowed = query.get(TELEGRAM_WEBAPP_PARAM);

      if (!isAllowed && process.env.NODE_ENV === "production") {
        return;
      }
      if (location.pathname !== "/") {
        localStorage.setItem(
          DESTINATION_PATH,
          location.pathname + location.search
        );
      }

      if(isTelegramWebApp()){
        telegramWebApp.activate()
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
    <StyledAppContainer>
      <Navbar />
      <StyledRoutesContainer>
        <AppRoutes />
      </StyledRoutesContainer>
    </StyledAppContainer>
  ) : null;
});

export default App;
