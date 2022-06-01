import { DESTINATION_PATH, TEST_MODE } from "consts";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";

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
    if (!hasAccess) {
      navigate(ROUTES.login);
      return;
    }
    if (!store.address) {
      navigate(`${ROUTES.connect}${window.location.search}`);
      return;
    }
    const destinationPath = localStorage.getItem(DESTINATION_PATH);
    if (destinationPath) {
      localStorage.removeItem(DESTINATION_PATH);
      navigate(destinationPath);
     
    }
  }, [store.address, navigate, store.isConnecting]);
}

export default useAuth;
