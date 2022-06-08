import { useEffect } from "react";

interface Props {
  onFocus: () => void;
  onBlur: () => void;
}

function useWindowVisibility({ onFocus, onBlur }: Props) {
  useEffect(() => {
    const func = () => {
      if (document.visibilityState === "visible") {
        onFocus();
      } else {
        onBlur();
      }
    };
    document.addEventListener("visibilitychange", func);

    return () => {
      document.removeEventListener("visibilitychange", func);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export default useWindowVisibility;
