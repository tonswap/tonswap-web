import { useCallback, useEffect, useRef, useState } from "react";
import * as API from "services/api";
import { useStore } from "store";
import useInterval from "./useInterval";

const pollTriesLimit = 30;

function useTxPolling(onPollingFinished: (value?: boolean) => Promise<void>) {
  const store = useStore();
  const [txSuccess, setTxSuccess] = useState(false);
  const { startInterval, stopInterval } = useInterval();

  const seqnoRef = useRef<string>("");
  const pollTries = useRef(0);

  const getSeqno = useCallback(async () => {
    const result = await API.getSeqno(store.address);
    return result.stack[0][1];
  }, [store.address]);

  const pollInterval = async () => {
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

  const pollTx = async () => {
    stopInterval();
    // get current seqno
    seqnoRef.current = await getSeqno();

    startInterval(pollInterval);
  };

  const closeSuccess = () => {
    setTxSuccess(false);
  };

  useEffect(() => {
    return () => {
      stopInterval();
    };
  }, []);

  return { pollTx, closeSuccess, txSuccess };
}

export default useTxPolling;
