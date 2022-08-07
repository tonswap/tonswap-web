import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telegramWebApp } from "services/telegram";
import { RootState } from "store/store";
import {
  ApplicationModal,
  OperationType,
  setExpandedView,
  setOpenModal,
  setOperationType,
  State,
} from "./reducer";

export function useApplicationStore(): State {
  const data = useSelector((state: RootState) => state.application);

  return data;
}

export const useIsExpandedView = () => {
  const {isExpandedView} =  useApplicationStore()
  return isExpandedView
}

export function useModalOpen(modal: ApplicationModal): boolean {
  const { openModal } = useApplicationStore();
  return openModal === modal;
}

export function useToggleModal(modal: ApplicationModal): () => void {
  const open = useModalOpen(modal);

  const dispatch = useDispatch();
  return useCallback(
    () => dispatch(setOpenModal(open ? null : modal)),
    [dispatch, modal, open]
  );
}

export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}

export function useShowWalletModal() {
  return useModalOpen(ApplicationModal.WALLET);
}

export function useWebAppResize() {
  const dispatch = useDispatch();

  useEffect(() => {
    
    const onChange = () => {
      dispatch(setExpandedView(telegramWebApp.webapp.isExpanded));
    };
    dispatch(setExpandedView(telegramWebApp.webapp.isExpanded));
    telegramWebApp.webapp.onEvent("viewportChanged", onChange);

    return () => {
      telegramWebApp.webapp.offEvent("viewportChanged", onChange);
    };
  }, []);
}



export const useApplicationActions = (): {
  onOperationTypeChange: (value: OperationType) => void;
} => {

  const dispatch = useDispatch()
  const onOperationTypeChange = useCallback(
    (value: OperationType) => {      
      dispatch(setOperationType(value));
    },
    [dispatch]
  );

  return {onOperationTypeChange}
}