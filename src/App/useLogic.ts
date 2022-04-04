import { LOCAL_STORAGE_ADDRESS } from "consts";
import useQuery from "hooks/useQuery";
import { useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";


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
