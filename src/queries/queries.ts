import { getHttpEndpoint } from "@orbs-network/ton-gateway";
import { TON_RPC_NAME } from "consts";
import { useQuery } from "react-query";

export const useTonClient = () => {
  return useQuery(
    ["tonClient"],
    async () => {
    const url =  await getHttpEndpoint();
      localStorage.setItem(TON_RPC_NAME, url);
      return url;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
};
