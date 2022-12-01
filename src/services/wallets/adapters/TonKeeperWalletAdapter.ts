import axios from "axios";
import { Address, Cell, ConfigStore } from "ton";

import { TransactionRequest, Wallet, WalletAdapter } from "../types";

const TONHUB_TIMEOUT = 5 * 60 * 1000;

type TonKeeperSession = {
    id: string;
    seed: string;
    link: string;
    wallet?: string;
};

type TonKeeperState = {
    state: string;
    id: string;
    walletAddress: Address;
    data: any;
};

type TonKeeperCreatedSession = {
    wallet: string;
    id: string;
};

const TON_KEEPER_BACKEND = process.env.KEEPER_BACKEND || "connect.tonswap.org";

function generateCustomId() {
    return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, "");
}

export class TonKeeperWalletAdapter implements WalletAdapter<TonKeeperSession> {
    POLLING_INTERVAL = 3000;
    userId = "";
    polling?: Promise<TonKeeperState>;

    createSession(): Promise<TonKeeperSession> {
        this.userId = generateCustomId();
        this.polling = new Promise((resolve: Function) => {
            this.poll(resolve);
        });
        //app.tonkeeper.com/ton-login/powerful-fjord-07072.herokuapp.com/authRequest/11j0zb042agfxy

        return Promise.resolve({
            link: `https://app.tonkeeper.com/ton-login/${TON_KEEPER_BACKEND}/authRequest/${this.userId}`,
            seed: this.userId,
            id: this.userId,
        });
    }

    async poll(resolve: Function) {
        // if (!this.polling) {
        //     return;
        // }
        let res = await axios.get(`https://${TON_KEEPER_BACKEND}/get-session/${this.userId}`);
        const data = res.data;
        if (Object.keys(res.data).length == 0) {
            setTimeout(() => {
                this.poll(resolve);
            }, this.POLLING_INTERVAL);
        } else {
            this.polling = undefined;
            const state = Object.keys(data).length > 0 ? "success" : "na";
            resolve({
                state,
                data,
            });
        }
    }

    async stopPolling() {
        this.polling = undefined;
    }

    async awaitReadiness(session?: any): Promise<Wallet> {
        // if (session) {
        //     return {
        //         address: session.address,
        //         publicKey: "_x_",
        //         walletVersion: "v4",
        //     };
        // }
        const result = await this.polling;
        if (!result || result.state == "na") {
            throw new Error("Connection was cancelled.");
        }

        if (result.state === "revoked") {
            throw new Error("Connection was cancelled.");
        }

        if (result.state === "expired") {
            throw new Error("Connection was not confirmed.");
        }
        console.log(result);
        //@ts-ignore
        let wallet = result.data.wallet;

        return {
            address: result.data?.response.payload[0].address,
            publicKey: "_x_",
            walletVersion: "v4",
        };
    }

    getWallet(session: TonKeeperSession): Promise<Wallet> {
        return this.awaitReadiness();
    }

    async requestTransaction(session: TonKeeperSession, request: TransactionRequest): Promise<string> {
        // @ts-ignore
        let b64InitCell = "";

        let url = `https://app.tonkeeper.com/transfer/${request.to}?amount=${request.value}&bin=${encodeURIComponent(request.payload)}`;

        if (request.stateInit) {
            let statInitCell = new Cell();
            request.stateInit.writeTo(statInitCell);
            b64InitCell = statInitCell.toBoc().toString("base64");
            url = `${url}&init=${b64InitCell}`;
        }
        return url;
    }

    isAvailable(): boolean {
        return true;
    }
}
