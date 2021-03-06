import SwapCard from "components/SwapCard";
import React, { useRef, useState } from "react";
import { calculateTokens } from "screens/layouts/util";
import { fromNano } from "ton";
import { PoolInfo } from "services/api/addresses";
import { useDebouncedCallback } from "use-debounce";
import { useTokenOperationsStore } from "./Context";
import { getUsdAmount } from "./util";

interface Props {
  token: PoolInfo;
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
    destAvailableAmountLoading,
  } = useTokenOperationsStore();
  const [usdLoading, setUsdLoading] = useState(false);
  const balanceRef = useRef(0);
  const debounce = useDebouncedCallback(async () => {
    if (!balanceRef.current) {
      return;
    }
    let result = 0;
    const jetton = srcTokenName === 'ton' ? token.name : srcTokenName;
    try {
      result = await calculateTokens(
        jetton,
        srcTokenName !== 'ton',
        null,
        balanceRef.current || "0",
        getAmountFunc
      );

      const usdAmounts = await Promise.all([
        getUsdAmount(token.name, balanceRef.current),
        getUsdAmount(srcTokenName, Number(fromNano(result))),
      ]);

      if (!balanceRef.current) {
        return;
      }

      setDestUsdPrice(usdAmounts[0]);
      setSrcUsdPrice(usdAmounts[1]);
    } catch (error) {
      console.log(error);
    } finally {
      if (!balanceRef.current) {
        return;
      }
      console.log({result:fromNano(result)}, result);
      
      setUsdLoading(false);
      setSrcLoading(false);
      if(result === 0) { 
        return
      } else {
        setsrcTokenAmount(result/1e9);
      }

    }
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
      availableAmountLoading={destAvailableAmountLoading}
    />
  );
}

export default DestToken;
