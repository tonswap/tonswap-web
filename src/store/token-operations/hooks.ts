import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "router/routes";
import { RootState } from "store/store";
import {
  OperationType,
  resetAmounts,
  resetBalances,
  resetState,
  setDestLoading,
  setDestTokenAmount,
  setOperationType,
  setSrcLoading,
  setSrcTokenAmount,
  toggleAction,
} from "./reducer";

import { getAmounts } from "./actions";
import { useTokensStore } from "store/tokens/hooks";
import useNavigateWithParams from "hooks/useNavigateWithParams";

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
} => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigateWithParams()
  const { selectedToken } = useTokensStore();
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
    navigate(ROUTES.swap.navigateToSell.replace(":id", selectedToken.name));
    dispatch(toggleAction());
  }, [dispatch, selectedToken, navigate]);

  const toggleSellToBuy = useCallback(() => {
    if (!selectedToken) {
      return;
    }
    navigate(ROUTES.swap.navigateToBuy.replace(":id", selectedToken.name));
    dispatch(toggleAction());
  }, [dispatch, selectedToken, navigate]);

  const onOperationTypeChange = useCallback(
    (value: OperationType) => {
      dispatch(setOperationType(value));
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
    onOperationTypeChange
  };
};
