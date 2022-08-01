import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTokensActions } from "store/tokens/hooks";
import useNavigateWithParams from "./useNavigateWithParams";

function useTokenFromParams() {
  const params = useParams();
  const { id } = params;
  const { selectToken } = useTokensActions();
  const navigate = useNavigateWithParams()

  useEffect(() => {
    if (id) {
      
      selectToken(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, navigate]);
}

export default useTokenFromParams;
