import React, { useRef, useState } from "react";
import * as API from "services/api";
import useInterval from "./useInterval";

function useTxPolling(onTxFinished: () => Promise<void>) {
  const [txSuccess, setTxSuccess] = useState(false);
  const { startInterval, stopInterval } = useInterval();

  const tonBalance = useRef<number>(0);

  const getTon = async () => {
    return API.getTonBalance();
  };

  const pollInterval = async () => {
    const result = await getTon();

    if (result !== tonBalance.current) {
      stopInterval();
      await onTxFinished();
      setTxSuccess(true);
    }
  };

  const pollTx = async () => {
    const res = await getTon();
    tonBalance.current = res;
    startInterval(pollInterval);
  };

  return { pollTx, closeSuccess: () => setTxSuccess(false), txSuccess };
}

export default useTxPolling;
