import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { useTokenOperationsActions } from "store/token-operations/hooks";
import { useTokensActions } from "store/tokens/hooks";
import useNavigateWithParams from "./useNavigateWithParams";

function useTokenFromParams() {
  const params = useParams();
  const { id } = params;
  const { getTokenById } = useTokensActions();
  const { selectToken } = useTokenOperationsActions();
  const navigate = useNavigateWithParams();

  useEffect(() => {
    if (id) {
      const token = getTokenById(id);
      if(!token){
        navigate(ROUTES.swap.navigateToTokens)
      }else{
        selectToken(token);

      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);
}

export default useTokenFromParams;
