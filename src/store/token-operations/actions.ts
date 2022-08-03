import { createAsyncThunk } from "@reduxjs/toolkit";
import gaAnalytics from "services/analytics/ga";
import { client, waitForSeqno } from "services/api";
import { TransactionRequest } from "services/wallets/types";
import { walletService } from "services/wallets/WalletService";
import { RootState } from "store/store";
import { Address, fromNano } from "ton";

export const getAmounts = createAsyncThunk<
  // Return type of the payload creator
  { srcBalance: string; destBalance: string },
  () => Promise<[any, any]>
>("token-operations/getAmounts", async (getBalances) => {
  const [srcTokenBalance, destTokenBalance] = await getBalances();

  const srcBalance =
    typeof srcTokenBalance == "object"
      ? parseFloat(fromNano(srcTokenBalance.balance))
      : srcTokenBalance;
  const destBalance =
    typeof destTokenBalance == "object"
      ? parseFloat(fromNano(destTokenBalance.balance))
      : destTokenBalance;
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
