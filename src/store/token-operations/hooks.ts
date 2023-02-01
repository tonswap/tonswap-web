import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "router/routes";
import { RootState } from "store/store";
import {
  InInput,
  onSuccessModalClose,
  resetAmounts,
  resetBalances,
  resetState,
  setDestLoading,
  setDestTokenAmount,
  setInInput,
  setSelectedToken,
  setSrcLoading,
  setSrcTokenAmount,
  setTxError,
  toggleAction,
} from "./reducer";

import { getAmounts, onSendTransaction, onSendTonConnectTransaction, onSetTransactionStatusManually } from './actions'
import useNavigateWithParams from "hooks/useNavigateWithParams";
import { PoolInfo } from "services/api/addresses";
import { SendTransactionResponse } from '@tonconnect/sdk'

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
  toggleAddLiquidity: () => void;
  toggleRemoveLiquidity: () => void;
  clearStore: () => void;
  selectToken: (token?: PoolInfo) => void;
  sendTransaction: (txMethod: () =>  Promise<void>) => void;
  sendTonConnectTransaction: (res: () => Promise<SendTransactionResponse>) => void;
  setTransactionStatus: (status: boolean) => void;
  hideTxError: () => void;
  closeSuccessModal: () => void;
  onInputChange: (inInput :InInput) => void;
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

  const toggleAddLiquidity = useCallback(() => {
    if (!selectedToken) {
      return;
    }
    navigate(
      ROUTES.manageLiquidity.navigateToAddLiquidity.replace(
        ":id",
        selectedToken?.tokenMinter
      )
    )
    dispatch(toggleAction());
  }, [dispatch, selectedToken, navigate]);

  const toggleRemoveLiquidity = useCallback(() => {
    if (!selectedToken) {
      return;
    }
    navigate(
      ROUTES.manageLiquidity.navigateToRemoveLiquidity.replace(
        ":id",
        selectedToken?.tokenMinter
      )
    )
    dispatch(toggleAction());
  }, [dispatch, selectedToken, navigate]);



  const sendTransaction = useCallback(
    (
      txMethod: () => Promise<void>,
    ) => {
       dispatch(onSendTransaction(txMethod));
    },
    [dispatch]
  );

  const sendTonConnectTransaction = useCallback(
    (
      res: () => Promise<SendTransactionResponse>
    ) => {
      dispatch(onSendTonConnectTransaction(res));
    },
    [dispatch]
  );


  const onInputChange = useCallback(
    (inInput: InInput) => {
      dispatch(setInInput(inInput))
    },
    [dispatch],
  )
  

  const selectToken = useCallback(
    (token?: PoolInfo) => {
      dispatch(setSelectedToken(token));
    },
    [dispatch]
  );

  const setTransactionStatus = useCallback(
    (status: boolean) => {
    dispatch(onSetTransactionStatusManually(status))
  },
    [dispatch]
  )

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
    toggleAddLiquidity,
    toggleRemoveLiquidity,
    clearStore,
    selectToken,
    sendTransaction,
    sendTonConnectTransaction,
    hideTxError,
    closeSuccessModal,
    onInputChange,
    setTransactionStatus
  };
};
