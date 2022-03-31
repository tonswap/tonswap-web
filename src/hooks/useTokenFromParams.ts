import { tokens } from "tokens";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useStore } from "store";
import { getToken } from "utils";

function useTokenFromParams() {
  const { id } = useParams();
  const store = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const token = getToken(tokens, id);
      if (token) {
        store.setToken(token);
      } else {
        navigate(ROUTES.tokens);
      }
    }
  }, [id]);
}

export default useTokenFromParams;
