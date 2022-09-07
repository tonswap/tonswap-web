import { Client, Config } from "@orbs-network/ton-rpc-gw";
import { TON_RPC_NAME } from "consts";
import { useQuery } from "react-query";

export const useTonClient = () => {
  return useQuery(
    ["tonClient"],
    async () => {
      const config: Config = {
        urlVersion: 1,
        network: "mainnet",
        protocol: "toncenter",
      };
      const client = new Client(config);
      await client.init();
      const url = client.getRandNodeUrl("jsonRPC");
      localStorage.setItem(TON_RPC_NAME, url);
      return client;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
};
