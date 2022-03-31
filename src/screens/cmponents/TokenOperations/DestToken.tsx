import SwapCard from "components/SwapCard";
import React, { useRef, useState } from "react";
import { calculateTokens } from "screens/layouts/util";
import { Token } from "types";
import { useDebouncedCallback } from "use-debounce";
import { useTokenOperationsStore } from "./Context";
import { getUsdAmount } from "./util";

interface Props {
  token: Token;
  srcTokenName: string;
  getAmountFunc: any;
}

function DestToken({ token, srcTokenName, getAmountFunc }: Props) {
  const {
    setdestTokenAmount,
    destTokenAmount,
    totalBalances,
    setsrcTokenAmount,
    destLoading,
    setSrcLoading,
    setSrcUsdPrice,
    setDestUsdPrice,
    destUsdPrice,
    destAvailableAmountLoading
  } = useTokenOperationsStore();
  const [usdLoading, setUsdLoading] = useState(false);
  const balanceRef = useRef(0);
  const debounce = useDebouncedCallback(async () => {
    if (!balanceRef.current) {
      return;
    }
    const result = await calculateTokens(
      srcTokenName,
      token.name,
      null,
      balanceRef.current || "0",
      getAmountFunc
    );
    const usdAmounts = await Promise.all([
      getUsdAmount(token.name, balanceRef.current),
      getUsdAmount(srcTokenName, Number(result)),
    ]);

    if (!balanceRef.current) {
      return;
    }

    setDestUsdPrice(usdAmounts[0]);
    setSrcUsdPrice(usdAmounts[1]);
    setUsdLoading(false);
    setSrcLoading(false);
    setsrcTokenAmount(result);
  }, 600);

  const onChange = (value: string) => {
    setdestTokenAmount(Number(value));
    balanceRef.current = Number(value);
    if (!value) {
      setSrcLoading(false);
      setsrcTokenAmount(0);
      setDestUsdPrice(0);
      setSrcUsdPrice(0);
      setUsdLoading(false);
    } else {
      setSrcLoading(true);
      setUsdLoading(true);
      debounce();
    }
  };

  return (
    <SwapCard
      isLoading={destLoading}
      usdPrice={destUsdPrice}
      usdLoading={usdLoading}
      onChange={onChange}
      inputAmount={destTokenAmount}
      token={token}
      availableAmount={totalBalances.destBalance}
      maxAmount={totalBalances.destBalance}
      availableAmountLoading = {destAvailableAmountLoading}
    />
  );
}

export default DestToken;
