import SwapCard from "components/SwapCard/index";
import { useEffect, useRef } from "react";
import { PoolInfo } from "services/api/addresses";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { InInput } from "store/token-operations/reducer";
import { useWalletStore } from "store/wallet/hooks";
import { useDebouncedCallback } from "use-debounce";
import { fromDecimals, toDecimals } from "utils";
import { calculateTokens } from "./util";

interface Props {
  token: PoolInfo;
  destTokenName: string;
  getAmountFunc: any;
  maxAmount: string;
  disableInputDependency?: boolean;
  srcDecimals: number;
      destDecimals: number
}

const SrcToken = ({
  token,
  getAmountFunc,
  destTokenName,
  maxAmount,
  disableInputDependency,
  srcDecimals,
        destDecimals,
}: Props) => {
  const {
    srcTokenAmount,
    totalBalances,
    srcLoading,
    srcAvailableAmountLoading,
    inInput,
    txSuccess
  } = useTokenOperationsStore();

  const { address } = useWalletStore();
  const {
    updateDestTokenAmount,
    updateSrcTokenAmount,
    updateDestTokenLoading,
    onInputChange
  } = useTokenOperationsActions();

  const balanceRef = useRef("");
  const debounce = useDebouncedCallback(async () => {
    if (!balanceRef.current) {
      return;
    }
    let result = 0;
    const jetton = token.name === "ton" ? destTokenName : token.tokenMinter;
    try {
      console.log('-->',balanceRef.current, srcDecimals, destDecimals);
      
      result = await calculateTokens(
        jetton,
        token.name !== "ton",
        toDecimals(balanceRef.current || "0", srcDecimals),
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
        updateDestTokenAmount(fromDecimals(result, destDecimals));
      }
    }
  }, 600);

  const onChange = (value: string) => {
    updateSrcTokenAmount(value);
    if(disableInputDependency){
      return 
    }
    onInputChange(InInput.SOURCE)
    balanceRef.current = value;

    if (!value || Number(value) === 0) {
      updateDestTokenAmount("");
      updateDestTokenLoading(false);
    } else {
      updateDestTokenLoading(true);
      debounce();
    }
  };

  useEffect(() => {
    if (srcTokenAmount && inInput === InInput.SOURCE) {
       onChange(srcTokenAmount);
    }
  }, []);

  useEffect(() => {
    if(txSuccess) {
      updateSrcTokenAmount('');
      updateDestTokenAmount('');
    }
  }, [txSuccess])

  return (
    <SwapCard
        onMaxAmount={() => onChange(maxAmount)}
        isLoading={srcLoading}
        onChange={onChange}
        inputAmount={srcTokenAmount}
        balance={totalBalances.srcBalance}
        token={token}
        balanceLoading={srcAvailableAmountLoading}
        showMax={srcTokenAmount !== maxAmount && !!address}
      />
  );
};

export default SrcToken;
