import { tokens } from "data";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "store";
import { getToken } from "utils";

function useTokenFromParams() {
  const { id } = useParams();
  const store = useStore();

  useEffect(() => {
    if (id) {
      store.setToken(getToken(tokens, id));
    }
  }, [id]);
}

export default useTokenFromParams;
