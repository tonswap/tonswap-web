import { useEffect, useRef } from "react";

function useEffectOnce(func: () => void) {
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) {
      return;
    }
    func();
    ref.current = true;
  }, []);
}
export default useEffectOnce;
