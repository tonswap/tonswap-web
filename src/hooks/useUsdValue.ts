import { useEffect, useRef, useState } from "react";
import { getUsdAmount } from "screens/components/TokenOperations/util";

function useUsdValue(name: string, value?: string, debounce?: number) {
  const [usd, setUsd] = useState("0");
  const [loading, setLoading] = useState(false);
  const debounceMilliseconds = debounce && debounce > 0 ? debounce : 300;
  const timeoutRef = useRef<any>();

  useEffect(() => {
    clearTimeout(timeoutRef.current);

    if (!value || value === "0") {
      setLoading(false);
      setUsd("0");
      return;
    }
    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      (async () => {
        try {
          const result = await getUsdAmount(name, value);
          setUsd(result);
        } catch (error) {
        } finally {
          setLoading(false);
        }
      })();
    }, debounceMilliseconds);
  }, [name, value, debounceMilliseconds]);

  return { usd, loading };
}

export default useUsdValue;
