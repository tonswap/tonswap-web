import { useEffect, useState } from "react";
import { telegramWebApp } from "services/telegram";
import { isTelegramWebApp } from "utils";

function useWebAppResize() {
  const [expanded, setExpanded] = useState(true);


  useEffect(() => {


    const onChange = () => {
      setExpanded(telegramWebApp.provider.isExpanded);
    }
    if (isTelegramWebApp()) {
      setExpanded(telegramWebApp.provider.isExpanded);
      telegramWebApp.provider.onEvent("viewportChanged", onChange);
    }

    return () => {
      telegramWebApp.provider.offEvent("viewportChanged", onChange);
    };
  }, []);

  return expanded ;
}

export default useWebAppResize;
