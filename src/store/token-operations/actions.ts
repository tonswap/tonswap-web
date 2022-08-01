import { createAsyncThunk } from "@reduxjs/toolkit";
import { fromNano } from "ton";

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


