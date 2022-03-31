import {Address, Cell} from "ton";
import BN from "bn.js";
import {addressToSlice264} from "utils";

const TRC20_TRANSFER = 1;
const TRC20_TRANSFER_RECIPT = 536870913;
const CLAIM_REWARDS = 4;
const REMOVE_LIQUIDITY = 6;
const SWAP_IN = 7;
const SWAP_OUT_SUB_OP = 8;
const ADD_LIQUIDITY_SUB_OP = 2;
type UPDATE_ACTIONS = '9' | '10';  //UPDATE_TOKEN OR UPDATE_PROTOCOL

export class DexActions {

    static async initData() {
        let messageBody = new Cell();
        messageBody.bits.writeUint(101, 32) // op
        messageBody.bits.writeUint(1, 64) // query_id
        return messageBody;
    }

    static async transferAndAddLiquidity(to: Address, tokenAmount: BN, slippage: number) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(TRC20_TRANSFER, 32) // action
        messageBody.bits.writeUint(0, 64) // query-id
        const to264 = addressToSlice264(to);
        messageBody.bits.writeUint(to264, 264);
        messageBody.bits.writeCoins(tokenAmount); // sent amount
        messageBody.bits.writeUint(ADD_LIQUIDITY_SUB_OP, 8); // sub-op
        messageBody.bits.writeUint(slippage, 64) // slippage


        return messageBody;
    }

    static async transfer(to: Address, tokenAmount: BN) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(TRC20_TRANSFER, 32) // action
        messageBody.bits.writeUint(0, 64) // query-id
        const to264 = addressToSlice264(to);
        messageBody.bits.writeUint(to264, 264);

        messageBody.bits.writeCoins(tokenAmount); // sent amount
        return messageBody;
    }

    // static async transferLong(to: Address, tokenAmount: BN) {
    //     let messageBody = new Cell();
    //     messageBody.bits.writeUint(TRC20_TRANSFER, 32) // action
    //     messageBody.bits.writeUint(0, 64) // query-id
    //     messageBody.bits.writeAddress(to);
    //     messageBody.bits.writeCoins(tokenAmount); // sent amount
    //     return messageBody;
    // }


    static async addLiquidity(tokenContract: Address, tokenSender: Address, tokenAmount: BN, slippage: number) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(TRC20_TRANSFER_RECIPT, 32) // action
        messageBody.bits.writeUint(1, 64) // query-id
        const to264 = addressToSlice264(tokenSender);
        messageBody.bits.writeUint(to264, 264);
        messageBody.bits.writeCoins(tokenAmount); // sent amount
        messageBody.bits.writeUint(ADD_LIQUIDITY_SUB_OP, 8); // sub-op
        messageBody.bits.writeUint(slippage, 64) // slippage
        return messageBody;
    }



    static async removeLiquidity(lpAmount: BN) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(REMOVE_LIQUIDITY, 32) // op
        messageBody.bits.writeUint(1, 64) // query_id
        messageBody.bits.writeCoins(lpAmount);
        return messageBody;
    }

    // Swap TON->TRC20
    static async swapIn(minAmountOut: BN) {

        let messageBody = new Cell();
        messageBody.bits.writeUint(SWAP_IN, 32) // action
        messageBody.bits.writeUint(1, 64) // query-id
        messageBody.bits.writeCoins(minAmountOut); // min amount out
        return messageBody;
    }

    // Swap Out TRC20 -> TON
    static async swapOut(trcSender: Address, tokenAmount: BN, minAmountOut: BN) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(TRC20_TRANSFER_RECIPT, 32) // action
        messageBody.bits.writeUint(1, 64) // query-id
        const to264 = addressToSlice264(trcSender);
        messageBody.bits.writeUint(to264, 264);
        messageBody.bits.writeCoins(tokenAmount); // sent amount
        messageBody.bits.writeUint(SWAP_OUT_SUB_OP, 8); // sub-op
        messageBody.bits.writeCoins(minAmountOut); // min amount out
        return messageBody;
    }
    // Swap Out TRC20 -> TON
    static async transferAndSwapOut(to :Address, tokenAmount: BN, slippage: BN) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(TRC20_TRANSFER, 32) // action
        messageBody.bits.writeUint(0, 64) // query-id
        const to264 = addressToSlice264(to);
        messageBody.bits.writeUint(to264, 264);
        messageBody.bits.writeCoins(tokenAmount); // sent amount
        messageBody.bits.writeUint(SWAP_OUT_SUB_OP, 8); // sub-op
        messageBody.bits.writeUint(slippage, 64) // slippage
        return messageBody;
    }

    static async claimRewards() {
        let messageBody = new Cell();
        messageBody.bits.writeUint(CLAIM_REWARDS, 32) // action
        messageBody.bits.writeUint(1, 64) // query-id
        return  messageBody;
    }

    static async updateAdminData(op: UPDATE_ACTIONS, allocPoints: BN) {
        let messageBody = new Cell();
        messageBody.bits.writeUint( new BN(op), 32) // action
        messageBody.bits.writeUint(1, 64) // query-id
        messageBody.bits.writeCoins(allocPoints);
        return messageBody;
    }

    static async mx() {
        let messageBody = new Cell();
        messageBody.bits.writeUint( new BN(5), 32) // action
        messageBody.bits.writeUint( new BN(0), 64) // query_id
        return messageBody;
    }
}


