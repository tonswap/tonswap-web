import SwapCard from "components/SwapCard";
import { useRef, useState } from "react";
import { calculateTokens } from "screens/layouts/util";
import { Token } from "types";
import { useDebouncedCallback } from "use-debounce";
import { useTokenOperationsStore } from "./Context";
import { getUsdAmount } from "./util";

interface Props {
  token: Token;
  destTokenName: string;
  getAmountFunc: any;
}

const SrcToken = ({ token, getAmountFunc, destTokenName }: Props) => {
  const {
    setsrcTokenAmount,
    srcTokenAmount,
    totalBalances,
    setdestTokenAmount,
    setDestLoading,
    srcLoading,
    setSrcUsdPrice,
    setDestUsdPrice,
    srcUsdPrice,
    srcAvailableAmountLoading,
  } = useTokenOperationsStore();
  const [usdLoading, setUsdLoading] = useState(false);
  const balanceRef = useRef(0);
  const debounce = useDebouncedCallback(async () => {
    if (!balanceRef.current) {
      return;
    }
    let result = 0;
    try {
      result = await calculateTokens(
        token.name,
        destTokenName,
        balanceRef.current || "0",
        null,
        getAmountFunc
      );

      const usdAmounts = await Promise.all([
        getUsdAmount(token.name, balanceRef.current),
        getUsdAmount(destTokenName, Number(result)),
      ]);

      if (!balanceRef.current) {
        return;
      }
      setSrcUsdPrice(usdAmounts[0]);
      setDestUsdPrice(usdAmounts[1]);
    } catch (error) {
      console.log(error);
    } finally {
      if (!balanceRef.current) {
        return;
      }
      setUsdLoading(false);
      setDestLoading(false);
      setdestTokenAmount(result);
    }
  }, 600);

  const onChange = (value: string) => {
    setsrcTokenAmount(Number(value));
    balanceRef.current = Number(value);

    if (!value || Number(value) === 0) {
      setdestTokenAmount(0);
      setDestUsdPrice(0);
      setSrcUsdPrice(0);
      setDestLoading(false);
      setUsdLoading(false);
    } else {
      setDestLoading(true);
      setUsdLoading(true);
      debounce();
    }
  };

  return (
    <SwapCard
      usdPrice={srcUsdPrice}
      usdLoading={usdLoading}
      isLoading={srcLoading}
      onChange={onChange}
      inputAmount={srcTokenAmount}
      availableAmount={totalBalances.srcBalance}
      maxAmount={totalBalances.srcBalance}
      token={token}
      availableAmountLoading={srcAvailableAmountLoading}
    />
  );
};

export default SrcToken;
