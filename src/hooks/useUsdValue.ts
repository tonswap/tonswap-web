import { useEffect, useState } from "react";
import { getUsdAmount } from "screens/components/TokenOperations/util";
import useDebounce from "./useDebounce";

function useUsdValue(name: string, value?: number, debounce?: number) {
  const [usd, setUsd] = useState(0);
  const [loading, setLoading] = useState(false);
  const debounceMilliseconds = debounce && debounce > 0 ? debounce : 300;
  const debouncedValue = useDebounce(value, debounceMilliseconds);

  useEffect(() => {
    console.log(value);

    if (value) {
      setLoading(true);
    } else {
      setUsd(0);
      setLoading(false);
    }
  }, [value]);

  useEffect(() => {
    if (!debouncedValue) {
      setLoading(false);
      return;
    }
    (async () => {
      const result = await getUsdAmount(name, debouncedValue);
      setUsd(result);
      setLoading(false);
    })();
  }, [name, debouncedValue]);
  return { usd, loading };
}

export default useUsdValue;
