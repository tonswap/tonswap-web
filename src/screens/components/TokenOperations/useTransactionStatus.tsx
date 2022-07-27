import useWindowVisibility from "hooks/useWindowFocus";
import { useCallback, useEffect, useRef, useState } from "react";
import * as API from "services/api";
import { useWalletStore } from "store/wallet/hooks";
import useInterval from "../../../hooks/useInterval";

const pollTriesLimit = 40;

function useTxPolling() {
  const { startInterval, stopInterval } = useInterval();
  const seqnoRef = useRef<string>("");
  const pollTries = useRef(0);
  const isInProgressRef = useRef(false);
  const onFinishMethodRef = useRef<any>();
  const {address} = useWalletStore()

  const getSeqno = useCallback(async () => {
    const result = await API.getSeqno(address!!);
    return result.stack[0][1];
  }, [address]);

  const pollInterval = async (
    onPollingFinished: (value?: boolean) => Promise<void>
  ) => {
    const result = await getSeqno();

    //seqno didnt moved forawed, canceling polling

    if (pollTries.current >= pollTriesLimit) {
      stopPolling();
      onPollingFinished();
      isInProgressRef.current = false;
    }
    //seqno moved forward, tx success
    else if (result !== seqnoRef.current) {
      isInProgressRef.current = false;
      stopPolling();
      onPollingFinished(true);
    }
    pollTries.current++;
  };

  const pollTx = async (
    onPollingFinished: (value?: boolean) => Promise<void>,
    seqno?: string
  ) => {
    onFinishMethodRef.current = onPollingFinished;
    stopInterval();
    pollTries.current = 0;
    // get current seqno
    seqnoRef.current = seqno || (await getSeqno());
    isInProgressRef.current = true;
    startInterval(() => pollInterval(onPollingFinished));
  };

  const stopPolling = () => {
    pollTries.current = 0;
    stopInterval();
  };

  useEffect(() => {
    return () => {
      stopInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBlur = () => {
    stopPolling();
  };

  const onFocus = () => {
    if (isInProgressRef.current) {
      pollTx(onFinishMethodRef.current, seqnoRef.current);
    }
  };

  useWindowVisibility({ onFocus, onBlur });

  return { pollTx, cancelPolling: stopPolling };
}

export default useTxPolling;
