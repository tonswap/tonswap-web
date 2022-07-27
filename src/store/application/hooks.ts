import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { ApplicationModal, setAction, setOpenModal, State } from "./reducer";

export function useApplicationStore(): State {
  const data = useSelector((state: RootState) => state.application);

  return data;
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


// export const useApplicationActions = () => {
//   const dispatch = useDispatch()

//   const selectAction = useCallback(
//     (action: string) => {
//       dispatch(setAction(action))
//     },
//     [dispatch],
//   )
  

// }


export function useWalletModalToggle(): () => void {
  return useToggleModal(ApplicationModal.WALLET);
}


export function useShowWalletModal() {
  return useModalOpen(ApplicationModal.WALLET);
}