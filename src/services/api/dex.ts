import { Address, Cell } from "ton";
import BN from "bn.js";
import { OPS } from "./ops";

export class DexActions {
    static async initData() {
        let messageBody = new Cell();
        messageBody.bits.writeUint(101, 32); // op
        messageBody.bits.writeUint(1, 64); // query_id
        return messageBody;
    }

    static addLiquidity(to: Address, jettonAmount: BN, responseDestination: Address, forwardTonAmount: BN = new BN(0), slippage: BN, tonLiquidity: BN) {
        return DexActions.transferOverload(to, jettonAmount, responseDestination, forwardTonAmount, OPS.ADD_LIQUIDITY, slippage, tonLiquidity);
    }

    static transferOverload(
        to: Address,
        jettonAmount: BN,
        responseDestination: Address,
        forwardTonAmount: BN = new BN(0),
        overloadOp: OPS.ADD_LIQUIDITY | OPS.SWAP_TOKEN,
        overloadValue: BN,
        tonLiquidity?: BN
    ) {
        console.log(`jettonAmount: ${jettonAmount.toString()} forwardTonAmount ${forwardTonAmount.toString()} => minAmount: ${overloadValue}`);

        let messageBody = new Cell();
        messageBody.bits.writeUint(OPS.Transfer, 32); // action
        messageBody.bits.writeUint(1, 64); // query-id
        messageBody.bits.writeCoins(jettonAmount);
        messageBody.bits.writeAddress(to);
        messageBody.bits.writeAddress(responseDestination);
        messageBody.bits.writeBit(false); // null custom_payload
        messageBody.bits.writeCoins(forwardTonAmount);
        messageBody.bits.writeBit(false); // forward_payload in this slice, not separate messageBody
        messageBody.bits.writeUint(new BN(overloadOp), 32);
        if (overloadOp == OPS.ADD_LIQUIDITY && tonLiquidity) {
            messageBody.bits.writeUint(overloadValue, 32); // slippage
            messageBody.bits.writeCoins(tonLiquidity);
        } else if (overloadOp == OPS.SWAP_TOKEN) {
            messageBody.bits.writeCoins(overloadValue); // min amount out
        }
        return messageBody;
    }

    static async transfer(to: Address, jettonAmount: BN) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(OPS.Transfer, 32); // action
        messageBody.bits.writeUint(1, 64); // query-id
        messageBody.bits.writeCoins(jettonAmount);
        messageBody.bits.writeAddress(to);
        messageBody.bits.writeAddress(to);
        messageBody.bits.writeBit(false); // null custom_payload
        messageBody.bits.writeCoins(0);
        return messageBody;
    }

    static removeLiquidity(amount: BN, responseAddress: Address) {
        let messageBody = new Cell();
        messageBody.bits.writeUint(OPS.Burn, 32); // action
        messageBody.bits.writeUint(1, 64); // query-id
        messageBody.bits.writeCoins(amount);
        messageBody.bits.writeAddress(responseAddress);
        return messageBody;
    }

    // Swap TON->TRC20
    static async swapTon(tonToSwap: BN, minAmountOut: BN) {
        console.log(`SwapTon tonToSwap:${tonToSwap.toString()} minAmountOut:${minAmountOut.toString()}`);
        let cell = new Cell();
        cell.bits.writeUint(OPS.SWAP_TON, 32); // action
        cell.bits.writeUint(1, 64); // query-id
        cell.bits.writeCoins(tonToSwap); // swapping amount of tons
        cell.bits.writeCoins(minAmountOut); // minimum received
        return cell;
    }

    // Swap Out TRC20 -> TON
    static async swapToken(to: Address, jettonAmount: BN, responseDestination: Address, forwardTonAmount: BN = new BN(0), minAmountOut: BN) {
        return DexActions.transferOverload(to, jettonAmount, responseDestination, forwardTonAmount, OPS.SWAP_TOKEN, minAmountOut);
    }

    // static async claimRewards() {
    //     let messageBody = new Cell();
    //     messageBody.bits.writeUint(CLAIM_REWARDS, 32); // action
    //     messageBody.bits.writeUint(1, 64); // query-id
    //     return messageBody;
    // }

    // static async updateAdminData(op: UPDATE_ACTIONS, allocPoints: BN) {
    //     let messageBody = new Cell();
    //     messageBody.bits.writeUint(new BN(op), 32); // action
    //     messageBody.bits.writeUint(1, 64); // query-id
    //     messageBody.bits.writeCoins(allocPoints);
    //     return messageBody;
    // }

    static async mx() {
        let messageBody = new Cell();
        messageBody.bits.writeUint(new BN(5), 32); // action
        messageBody.bits.writeUint(new BN(0), 64); // query_id
        return messageBody;
    }
}
