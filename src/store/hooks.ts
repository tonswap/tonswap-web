import useNotification from "hooks/useNotification";
import { useCallback } from "react";

export const useStoreHooks = () : {
    handleAsyncFunction: (method: () => Promise<void>) => Promise<void>
} => {
  const { showNotification } = useNotification();

  const handleAsyncFunction = useCallback(
    async (method: () => Promise<void>) => {
      try {
        await method();
      } catch (error) {
        if (error instanceof Error) {
          showNotification({
            message: error.message,
            variant: "error",
          });
        }
      }
    },
    [showNotification]
  );

  return {handleAsyncFunction}
};
