import useNotification from "hooks/useNotification";
import React, { useEffect } from "react";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";

function useTxError() {
  const { showNotification } = useNotification();
  const { txError } = useTokenOperationsStore();
  const { hideTxError } = useTokenOperationsActions();
  useEffect(() => {
    if (txError) {
      showNotification({
        message: <>{txError}</>,
        variant: "error",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 20000,
        onClose: hideTxError,
      });
    }
  }, [txError]);
}

export default useTxError;
