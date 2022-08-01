import SwapCard from "components/SwapCard/index";
import { useEffect, useRef } from "react";
import { PoolInfo } from "services/api/addresses";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { fromNano, toNano } from "ton";
import { useDebouncedCallback } from "use-debounce";
import { calculateTokens } from "./util";

interface Props {
  token: PoolInfo;
  destTokenName: string;
  getAmountFunc: any;
}

const SrcToken = ({ token, getAmountFunc, destTokenName }: Props) => {
  const {
    srcTokenAmount,
    totalBalances,
    srcLoading,
    srcAvailableAmountLoading,
  } = useTokenOperationsStore();

  const {
    updateDestTokenAmount,
    updateSrcTokenAmount,
    updateDestTokenLoading,
  } = useTokenOperationsActions();

  const balanceRef = useRef('');
  const debounce = useDebouncedCallback(async () => {
    if (!balanceRef.current) {
      return;
    }
    let result = 0;
    const jetton = token.name === "ton" ? destTokenName : token.name;
    try {
      result = await calculateTokens(
        jetton,
        token.name !== "ton",
        toNano(balanceRef.current || "0"),
        null,
        getAmountFunc
      );

      if (!balanceRef.current) {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      if (!balanceRef.current) {
        return;
      }
      updateDestTokenLoading(false);
      // TODO ...

      if (result === 0) {
        return;
      } else {
        updateDestTokenAmount(fromNano(result));
      }
    }
  }, 600);

  const onChange = (value: string) => {
    updateSrcTokenAmount(value);
    balanceRef.current = value;

    if (!value || Number(value) === 0) {
      updateDestTokenAmount('');
      updateDestTokenLoading(false);
    } else {
      updateDestTokenLoading(true);
      debounce();
    }
  };

  useEffect(() => {
    if (srcTokenAmount) {
      console.log(srcTokenAmount);

      onChange(srcTokenAmount.toString());
    }
  }, []);

  return (
    <SwapCard
      isSource={true}
      isLoading={srcLoading}
      onChange={onChange}
      inputAmount={srcTokenAmount}
      availableAmount={totalBalances.srcBalance}
      token={token}
      availableAmountLoading={srcAvailableAmountLoading}
    />
  );
};

export default SrcToken;
