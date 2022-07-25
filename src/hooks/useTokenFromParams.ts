import { useEffect } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { getToken } from "utils";

function useTokenFromParams() {
  const  params = useParams();
  const {id} = params
  const store = {} as any
  const navigate = useNavigate();    

  useEffect(() => {
    if (id) {
      const token = getToken(store.tokens, id);
      if (token) {
        store.setToken(token);
      } else {
        navigate(ROUTES.tokens);
      }
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);
}

export default useTokenFromParams;
