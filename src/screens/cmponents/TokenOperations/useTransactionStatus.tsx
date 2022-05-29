import { useCallback, useEffect, useRef, useState } from "react";
import * as API from "services/api";
import { useStore } from "store";
import useInterval from "../../../hooks/useInterval";

const pollTriesLimit = 30;

function useTxPolling() {
  const store = useStore();
  const [txSuccess, setTxSuccess] = useState(false);
  const { startInterval, stopInterval } = useInterval(1000);

  const seqnoRef = useRef<string>("");
  const pollTries = useRef(0);

  const getSeqno = useCallback(async () => {
    const result = await API.getSeqno(store.address!!);
    return result.stack[0][1];
  }, [store.address]);

  const pollInterval = async (onPollingFinished: (value?: boolean) => Promise<void>) => {
    const result = await getSeqno();

    //seqno didnt moved forawed, canceling polling
    if (pollTries.current >= pollTriesLimit) {
      stopInterval();
      onPollingFinished();
    }
    //seqno moved forward, tx success
    else if (result !== seqnoRef.current) {
      stopInterval();
      await onPollingFinished(true);
      setTxSuccess(true);
    }
    pollTries.current++;
  };

  const pollTx = async (onPollingFinished: (value?: boolean) => Promise<void>) => {
    stopInterval();
    // get current seqno
    seqnoRef.current = await getSeqno();

    startInterval(() => pollInterval(onPollingFinished));
  };

  const closeSuccess = () => {
    setTxSuccess(false);
  };


  const cancelPolling = () => {
    pollTries.current = 0
    stopInterval()
  }

  useEffect(() => {
    return () => {
      stopInterval();
    };
  }, []);

  return { pollTx, closeSuccess, txSuccess, cancelPolling };
}

export default useTxPolling;
