import SwapCard from "components/SwapCard";
import { useRef } from "react";
import { PoolInfo } from "services/api/addresses";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
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

  const balanceRef = useRef(0);
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
        balanceRef.current || "0",
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
        updateDestTokenAmount(result / 1e9);
      }
    }
  }, 600);

  const onChange = (value: string) => {
    updateSrcTokenAmount(Number(value));
    balanceRef.current = Number(value);

    if (!value || Number(value) === 0) {
      updateDestTokenAmount(0);
      updateDestTokenLoading(false);
    } else {
      updateDestTokenLoading(true);
      debounce();
    }
  };

  return (
    <SwapCard
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
