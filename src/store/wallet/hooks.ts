import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Adapters } from "services/wallets/types";
import { walletService } from "services/wallets/WalletService";
import { RootState } from "store/store";
import { awaitWalletReadiness, resetWallet, setConnecting, setSession, updateWallet } from "./actions";

export const useWalletStore = () => {
    return useSelector((state: RootState) => state.wallet);
};

export const useWalletActions = (): {
    createWalletSession: (adapterId: Adapters) => void;
    restoreSession: () => void;
    resetWallet: () => void;
} => {
    const dispatch = useDispatch<any>();

    const createWalletSession = useCallback(
        async (adapterId: Adapters) => {
            const session: string | {} = await walletService.createSession(adapterId);
            dispatch(setSession(session));
            dispatch(awaitWalletReadiness({ adapterId, session }));
            return session;
        },
        [dispatch]
    );

    const reset = useCallback(async () => {
        dispatch(resetWallet());
    }, [dispatch]);

    const restoreSession = useCallback(() => {
        const adapterId = localStorage.getItem("wallet:adapter-id");
        const session = localStorage.getItem("wallet:session");

        if (!adapterId || !session) {
            dispatch(setConnecting(false));
            return;
        }
        if (adapterId == Adapters.TON_KEEPER) {
            const wallet = {
                address: JSON.parse(session).address,
                publicKey: "",
                walletVersion: "4",
            };
            dispatch(updateWallet({ wallet, adapterId: Adapters.TON_KEEPER }));
            return;
        }

        dispatch(setSession(session));
        dispatch(
            awaitWalletReadiness({
                adapterId: adapterId as Adapters,
                session: JSON.parse(session),
            })
        );
    }, [dispatch]);

    return { createWalletSession, restoreSession, resetWallet: reset };
};
