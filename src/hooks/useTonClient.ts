import { Client, Config } from "@orbs-network/ton-rpc-gw";
import { useQuery } from "react-query";

export const useTonClient = () => {
  return useQuery(
    ["ton-client"],
    async () => {
      const config: Config = {
        urlVersion: 1,
        network: "mainnet",
        protocol: "toncenter",
      };
      const client = new Client(config);
      await client.init();
      return { client, rpcUrl: client.getNextNodeUrl("jsonRPC") };
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
};
