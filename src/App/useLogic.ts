import { LOCAL_STORAGE_ADDRESS } from "consts";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";

function useLogic() {
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    const address = localStorage.getItem(LOCAL_STORAGE_ADDRESS);
    
    if (address) {
      store.setAddress(address);
    } else {
      navigate(ROUTES.connect);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useLogic;
