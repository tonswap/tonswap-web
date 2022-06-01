import { DESTINATION_PATH, TELEGRAM_WEBAPP_PARAM, TEST_MODE } from "consts";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";
import { getParamsFromUrl } from "utils";

function useAuth() {
  const navigate = useNavigate();
  const store = useStore();
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== "/" && location.pathname !== ROUTES.login) {
      localStorage.setItem(
        DESTINATION_PATH,
        location.pathname + location.search
      );
    }
    const hasAccess = localStorage.getItem(TEST_MODE);

    if(getParamsFromUrl(TELEGRAM_WEBAPP_PARAM)){
      localStorage.setItem(TELEGRAM_WEBAPP_PARAM, '1')
    }
    if (!hasAccess) {
      navigate(ROUTES.login);
      return;
    }
    if (!store.address) {
      navigate(ROUTES.connect);
      return;
    }


    const destinationPath = localStorage.getItem(DESTINATION_PATH);
    if (destinationPath) {
      localStorage.removeItem(DESTINATION_PATH);
      navigate(destinationPath);
     
    }
  }, [store.address, navigate, store.isConnecting, location.pathname, location.search]);
}

export default useAuth;
