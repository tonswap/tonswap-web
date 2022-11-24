import useNavigateWithParams from "hooks/useNavigateWithParams";
import { useCallback } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "router/routes";
import { getTokenBalanceByMinter, getTokenData, waitForContractDeploy } from "services/api";
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

    const clearStore = useCallback(() => {
        dispatch(resetState());
    }, [dispatch]);

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
                    const route = `${ROUTES.manageLiquidity.navigateToAddLiquidity.replace(":id", jAddress)}`;
                    navigate(route);
                } else {
                    const jd = await getTokenBalanceByMinter(address);
                    let balance = fromNano(jd.balance);
                    const token = {
                        balance,
                        name: jettonData.name,
                        image: jettonData.image,
                        symbol: jettonData.symbol,
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

            const transactionData = await deployPool(Address.parse(jettonAddress));

            if (!transactionData) {
                throw new Error("Transaction error");
            }

            if (!transactionData || transactionData.error) {
                throw new Error(transactionData.error);
            }
            const isContractDeployedYet = waitForContractDeploy(transactionData.to);

            let url = await walletService.requestTransaction(adapterId!!, session, transactionData);
            // ton keeper uses deep links
            if (typeof url == "string") {
                if (isMobile) {
                    window.location.href = url;
                }
            }
            await isContractDeployedYet();

            const token: PoolInfo = {
                name: tokenData.name,
                ammMinter: transactionData.to,
                tokenMinter: jettonAddress,
                color: getRandomColor(),
                displayName: tokenData.symbol.toUpperCase(),
                image: tokenData.image,
                isCustom: true,
            };
            dispatch(addToken(token));

            navigate(`${ROUTES.manageLiquidity.navigateToAddLiquidity.replace(":id", jettonAddress)}`);
        };
        return handleAsyncFunction(method);
    }, [dispatch, tokenData, handleAsyncFunction, jettonAddress, adapterId, navigate, session]);

    return { onSubmit, deployPoolTx, clearStore };
};
