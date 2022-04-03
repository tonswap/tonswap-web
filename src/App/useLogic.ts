import { LOCAL_STORAGE_ADDRESS } from "consts";
import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

function useLogic() {
  const store = useStore();
  const navigate = useNavigate();
  let query = useQuery();

  useEffect(() => {
    const localStorageAddress = localStorage.getItem(LOCAL_STORAGE_ADDRESS);

    const queryAddress = query.get("address");
    const address = queryAddress || localStorageAddress;

    if (address) {
      store.setAddress(address);
    } else {
      navigate(ROUTES.connect);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useLogic;
