import { ReactNode, useCallback } from "react";
import { VariantType, useSnackbar, SnackbarOrigin } from "notistack";
import { IconButton, styled } from "@mui/material";
import { Box } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const StyledMessage = styled(Box)({
  "& &": {
    color: "white",
  },
  "& a": {
    color: "white",
  },
});

interface Params {
  message: ReactNode | string;
  variant: VariantType;
  onClose?: () => void;
  autoHideDuration?: number;
  anchorOrigin?: SnackbarOrigin;
  className?: string;
}

function useNotification() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = useCallback(
    ({ message, variant, onClose, autoHideDuration, anchorOrigin, className = '' }: Params) => {
      const key = enqueueSnackbar(<StyledMessage>{message}</StyledMessage>, {
        className,
        anchorOrigin: anchorOrigin,
        variant,
        autoHideDuration: autoHideDuration || 5000,
        onClose,
        onClick: () => closeSnackbar(key),
        action: () => (
          <IconButton>
            <CloseIcon style={{ width: 20, height: 20 }} />
          </IconButton>
        ),
      });
    },
    [closeSnackbar, enqueueSnackbar]
  );

  return { showNotification };
}

export default useNotification;
