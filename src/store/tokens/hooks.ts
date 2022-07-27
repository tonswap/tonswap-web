import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PoolInfo } from "services/api/addresses";
import { RootState } from "store/store";
import { addToken, setSelectedToken } from "./reducer";

export function useTokensStore() {
  const data = useSelector((state: RootState) => state.tokens);

  return data;
}

export const useTokensActions = (): {
  addToken: (token: PoolInfo) => void;
  selectToken: (name?: string) => void;
} => {
  const dispatch = useDispatch();
  const { tokens } = useTokensStore();

  const add = useCallback(
    (token: PoolInfo) => {
      dispatch(addToken(token));
    },
    [dispatch]
  );

  const selectToken = useCallback(
    (tokenName?: string) => {
      const token = tokens.find((t) => t.name === tokenName);
      dispatch(setSelectedToken(token));
   
    },
    [dispatch, tokens]
  );

  return { addToken: add, selectToken };
};
