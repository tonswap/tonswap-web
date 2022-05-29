import { useEffect, useState } from "react";
import { telegramWebApp } from "services/telegram";
import { isTelegramWebApp } from "utils";

function useWebAppResize() {
  const [expanded, setExpanded] = useState(true);


  useEffect(() => {
    if (isTelegramWebApp()) {
      setExpanded(telegramWebApp.provider.isExpanded);
      telegramWebApp.provider.onEvent("viewportChanged", async () => {
        
        setExpanded(telegramWebApp.provider.isExpanded);
      });
    }

    return () => {
      telegramWebApp.provider.offEvent("viewportChanged", () => {
        setExpanded(telegramWebApp.provider.isExpanded);
      });
    };
  }, []);

  return expanded ;
}

export default useWebAppResize;
