import useWindowVisibility from "hooks/useWindowFocus";
import { useEffect, useRef } from "react";
import * as API from "services/api";
import useInterval from "./useInterval";

const pollTriesLimit = 40;

interface Props {
  onFinish: () => void;
  onTimeout: () => void;
  contractAddress: string;
}

interface Data extends Props {
  pollTries: number;
  isPollInProgress: boolean;
}

function useContractPolling() {
  const { startInterval, stopInterval } = useInterval();
  const data = useRef({} as Data);

  const pollInterval = async () => {

    const isDeployed = await API.isContractDeployed(
      data.current.contractAddress
    );

    if (isDeployed) {
      data.current.isPollInProgress = false;
      stopPolling();
      data.current.onFinish();
      return 
    }


    if (data.current.pollTries >= pollTriesLimit) {
      stopPolling();
      data.current.onTimeout();
      data.current.isPollInProgress = false;
      return 
    } 
   
    data.current.pollTries++;
  };

  const poll = async ({
    onFinish,
    onTimeout,
    contractAddress,
  }: Props) => {

    data.current = {
      onFinish,
      pollTries: 0,
      isPollInProgress: true,
      contractAddress,
      onTimeout,
    };
    stopInterval();
    startInterval(pollInterval);
  };

  const stopPolling = () => {
    data.current.pollTries = 0;
    stopInterval();
  };

  useEffect(() => {
    return () => {
      stopInterval();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFocus = () => {
    if (data.current.isPollInProgress) {
      startInterval(pollInterval);
    }
  };

  useWindowVisibility({ onFocus, onBlur: stopPolling });

  return { poll, cancelPolling: stopPolling };
}

export default useContractPolling;
