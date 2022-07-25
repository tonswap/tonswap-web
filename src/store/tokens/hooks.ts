import { useSelector } from "react-redux"
import { AppState } from "store"

function useStore() {
    return useSelector((state: AppState) => state.tokens);
  }
  

export function useTokens() {
    return useStore().tokens
  }