import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "router/routes";
import { RootState } from "store/store";
import {
  onSuccessModalClose,
  OperationType,
  resetAmounts,
  resetBalances,
  resetState,
  setDestLoading,
  setDestTokenAmount,
  setOperationType,
  setSelectedToken,
  setSrcLoading,
  setSrcTokenAmount,
  setTxError,
  toggleAction,
} from "./reducer";

import { getAmounts, onSendTransaction } from "./actions";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import { PoolInfo } from "services/api/addresses";

export const useTokenOperationsStore = () => {
  return useSelector((state: RootState) => state.tokenOperations);
};

export const useTokenOperationsActions = (): {
  onResetAmounts: () => void;
  updateSrcTokenAmount: (value: string) => void;
  updateDestTokenAmount: (value: string) => void;
  getTokensBalance: (value: () => Promise<[any, any]>) => void;
  resetTokensBalance: () => void;
  updateDestTokenLoading: (val: boolean) => void;
  updateSrcTokenLoading: (val: boolean) => void;
  toggleBuyToSell: () => void;
  toggleSellToBuy: () => void;
  clearStore: () => void;
  onOperationTypeChange: (value: OperationType) => void;
  selectToken: (token?: PoolInfo) => void;
  sendTransaction: (txMethod: () =>  Promise<void>) => void;
  hideTxError: () => void;
  closeSuccessModal: () => void;
} => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigateWithParams();
  const { selectedToken } = useTokenOperationsStore();

  const closeSuccessModal = useCallback(() => {
    dispatch(onSuccessModalClose());
  }, [dispatch]);

  const hideTxError = useCallback(() => {
    dispatch(setTxError(undefined));
  }, [dispatch]);

  const onResetAmounts = useCallback(() => {
    dispatch(resetAmounts());
  }, [dispatch]);

  const updateSrcTokenAmount = useCallback(
    (value: string) => {
      dispatch(setSrcTokenAmount(value));
    },
    [dispatch]
  );

  const updateDestTokenAmount = useCallback(
    (value: string) => {
      dispatch(setDestTokenAmount(value));
    },
    [dispatch]
  );

  const updateDestTokenLoading = useCallback(
    (value: boolean) => {
      dispatch(setDestLoading(value));
    },
    [dispatch]
  );

  const updateSrcTokenLoading = useCallback(
    (value: boolean) => {
      dispatch(setSrcLoading(value));
    },
    [dispatch]
  );

  const getTokensBalance = useCallback(
    (method: () => Promise<[any, any]>) => {
      dispatch(getAmounts(method));
    },
    [dispatch]
  );

  const resetTokensBalance = useCallback(() => {
    dispatch(resetBalances());
  }, [dispatch]);

  const clearStore = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  const toggleBuyToSell = useCallback(() => {
    if (!selectedToken) {
      return;
    }
    navigate(
      ROUTES.swap.navigateToSell.replace(":id", selectedToken.tokenMinter)
    );
    dispatch(toggleAction());
  }, [dispatch, selectedToken, navigate]);

  const toggleSellToBuy = useCallback(() => {
    if (!selectedToken) {
      return;
    }
    navigate(
      ROUTES.swap.navigateToBuy.replace(":id", selectedToken.tokenMinter)
    );
    dispatch(toggleAction());
  }, [dispatch, selectedToken, navigate]);

  const onOperationTypeChange = useCallback(
    (value: OperationType) => {
      dispatch(setOperationType(value));
    },
    [dispatch]
  );

  const sendTransaction = useCallback(
    (
      txMethod: () => Promise<void>,
    ) => {
       dispatch(onSendTransaction(txMethod));
    },
    [dispatch]
  );

  const selectToken = useCallback(
    (token?: PoolInfo) => {
      dispatch(setSelectedToken(token));
    },
    [dispatch]
  );

  return {
    onResetAmounts,
    updateSrcTokenAmount,
    updateDestTokenAmount,
    getTokensBalance,
    resetTokensBalance,
    updateDestTokenLoading,
    updateSrcTokenLoading,
    toggleBuyToSell,
    toggleSellToBuy,
    clearStore,
    onOperationTypeChange,
    selectToken,
    sendTransaction,
    hideTxError,
    closeSuccessModal
  };
};
