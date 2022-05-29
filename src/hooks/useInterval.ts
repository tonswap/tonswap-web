import { useCallback, useEffect, useRef } from "react";

function useInterval(delay?: number) {
  const intervalRef = useRef<any>();

  const startInterval = (func: () => void) => {
    intervalRef.current = setInterval(() => {
      func();
    }, delay || 1000);
  };

  const stopInterval = useCallback(() => {
    clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    return () => {
      stopInterval();
    };
  }, [stopInterval]);

  return { startInterval, stopInterval };
}

export default useInterval;
