import useNavigateWithParams from "hooks/useNavigateWithParams";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "router/routes";
import {
  getTokenBalanceByMinter,
  getTokenData,
  waitForContractDeploy,
} from "services/api";
import { PoolInfo } from "services/api/addresses";
import { deployPool, poolStateInit } from "services/api/deploy-pool";
import { walletService } from "services/wallets/WalletService";
import { useStoreHooks } from "store/hooks";
import { RootState } from "store/store";
import { addToken } from "store/tokens/reducer";
import { useWalletStore } from "store/wallet/hooks";
import { Address, fromNano } from "ton";
import { getRandomColor } from "utils";
import { resetState, setJettonAddress, setTokenData, State } from "./reducer";

export function useCreatePoolStore(): State {
  const data = useSelector((state: RootState) => state.createPool);
  return data;
}

export const useCreatePoolActions = (): {
  onSubmit: (jAddress: string) => Promise<void>;
  deployPoolTx: () => Promise<void>;
  clearStore: () => void;
} => {
  const dispatch = useDispatch();
  const navigate = useNavigateWithParams();
  const { handleAsyncFunction } = useStoreHooks();
  const { adapterId, session } = useWalletStore();
  const { jettonAddress, tokenData } = useCreatePoolStore();


  const clearStore = useCallback(
    () => {
      dispatch(resetState())
    },
    [dispatch],
  )
  

  const onSubmit = useCallback(
    async (jAddress: string) => {
      const method = async () => {
        if (!jAddress) {
          throw new Error("Address required");
        }

        try {
          Address.parse(jAddress);
        } catch (error) {
          throw new Error("Invalid address");
        }
        const address = Address.parse(jAddress);
        const jettonData = await getTokenData(address);

        const { futureAddress, isDeployed } = await poolStateInit(address, 0);

        if (isDeployed) {
          const token: PoolInfo = {
            name: jettonData.name,
            ammMinter: futureAddress.toFriendly(),
            tokenMinter: jAddress,
            color: getRandomColor(),
            displayName: jettonData.name.toUpperCase(),
            image: jettonData.image,
            isCustom: true,
          };

          dispatch(addToken(token));
          const route = `${ROUTES.manageLiquidity.navigateToAddLiquidity.replace(
            ":id",
            jAddress
          )}`;
          console.log(route);
          navigate(route);
        } else {
          const jd = await getTokenBalanceByMinter(address);
          let balance = fromNano(jd.balance);
          const token = {
            balance,
            name: jettonData.name,
            image: jettonData.image,
            symbol: jettonData.symbol
          };
          dispatch(setTokenData(token));
        }
        dispatch(setJettonAddress(jAddress));
      };

      return handleAsyncFunction(method);
    },
    [handleAsyncFunction, dispatch, navigate]
  );

  const deployPoolTx = useCallback(async () => {
    const method = async () => {
      if (!jettonAddress) {
        throw new Error("Jetton address missing");
      }
      if (!tokenData) {
        throw new Error("Jetton data missing");
      }

      try {
        Address.parse(jettonAddress);
      } catch (error) {
        throw new Error("Invalid address");
      }

      const tx = await deployPool(Address.parse(jettonAddress));

      if (!tx) {
        throw new Error("Transaction error");
      }

      if (!tx || tx.error) {
        throw new Error(tx.error);
      }
      const awaiter = waitForContractDeploy(tx.to);

      await walletService.requestTransaction(adapterId!!, session, tx);
      await awaiter();

      const token: PoolInfo = {
        name: tokenData.name,
        ammMinter: tx.to,
        tokenMinter: jettonAddress,
        color: getRandomColor(),
        displayName: tokenData.symbol.toUpperCase(),
        image: tokenData.image,
        isCustom: true,
      };
      dispatch(addToken(token));

      navigate(
        `${ROUTES.manageLiquidity.navigateToAddLiquidity.replace(
          ":id",
          jettonAddress
        )}`
      );
    };
    return handleAsyncFunction(method);
  }, [
    dispatch,
    tokenData,
    handleAsyncFunction,
    jettonAddress,
    adapterId,
    navigate,
    session,
  ]);

  return { onSubmit, deployPoolTx, clearStore };
};
