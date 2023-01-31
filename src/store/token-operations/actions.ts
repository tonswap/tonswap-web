import { createAsyncThunk } from '@reduxjs/toolkit'
import { fromDecimals } from "utils";
import { SendTransactionResponse } from '@tonconnect/sdk'

export const getAmounts = createAsyncThunk<
    // Return type of the payload creator
    { srcBalance: string; destBalance: string },
    () => Promise<[any, any]>
>("token-operations/getAmounts", async (getBalances) => {
    const [srcTokenBalance, destTokenBalance] = await getBalances();

    const srcBalance = typeof srcTokenBalance == "object" ? parseFloat(fromDecimals(srcTokenBalance.balance, srcTokenBalance.decimals)) : srcTokenBalance;
    const destBalance = typeof destTokenBalance == "object" ? parseFloat(fromDecimals(destTokenBalance.balance, destTokenBalance.decimals)) : destTokenBalance;
    return {
        srcBalance: srcBalance,
        destBalance: destBalance,
    };
});

export const onSendTransaction = createAsyncThunk<
    // Return type of the payload creator
    any,
    () => Promise<void>
>("token-operations/sendTransaction", async (txMethod) => {
    await txMethod();
});

export const onSendTonConnectTransaction = createAsyncThunk<
  any, () => Promise<SendTransactionResponse>
  >("token-operations/sendTonConnectTransaction", async (res) => {
      await res()
})