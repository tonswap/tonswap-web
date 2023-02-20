import { IconButton, SwipeableDrawer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Box, styled } from "@mui/system";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";
import { useIsExpandedView } from "store/application/hooks";
import CloseImg from "assets/images/shared/close.svg";

export interface Props {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  backgroundColor?: string;
  blur?: boolean;
  className?: string;
  maxWidth?: number;
  minWidth?: number;
}

const StyledDrawer = styled(Box)(({ expanded }: { expanded: boolean }) => ({
  padding: "28px",
  minHeight: expanded ? "65vh" : "73vh",
  position: "relative",
}));

export function Popup({
  open,
  onClose,
  children,
  backgroundColor = "rgba(48, 48, 48, 0.8)",
  blur = true,
  className = "",
  maxWidth,
  minWidth
}: Props) {
  const expanded = useIsExpandedView();
  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose ? onClose : () => {}}
      onOpen={() => {}}
      PaperProps={{
        style: {
          borderRadius: "15px 15px 0px 0px",
        },
      }}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <StyledDrawer expanded={expanded}>
        {typeof onClose !== 'undefined' && <StyledClose onClick={onClose} style={{ top: 14, right: 14 }}>
          <img src={CloseImg} />
        </StyledClose>}
        {children}
      </StyledDrawer>
    </SwipeableDrawer>
  ) : (
    <Dialog
      className={`${className} ${blur && "popup-filter"}`}
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          width: "100%",
          height: "100%",
          maxWidth: "unset",
          background: "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor,
        },
      }}
    >
      <StyledDialogContent maxWidth={maxWidth} minWidth={minWidth}>
        {typeof onClose !== 'undefined' &&<StyledClose onClick={onClose} style={{ top: -50, right: -40 }}>
          <img src={CloseImg} />
        </StyledClose>}
        <StyledChildren>{children}</StyledChildren>
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledClose = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  padding: 0,
  zIndex: 10,
  "& img": {
    width: 40,
    height: 40,
  },
}));

export const StyledDialogContent = styled(Box)(
  ({ maxWidth, minWidth }: { maxWidth?: number, minWidth?: number }) => ({
    padding: "30px 15px 30px 15px",
    position: "relative",
    background: "white",
    maxWidth,
    width: "fit-content",
    borderRadius: 12,
    minWidth
  })
);

const StyledChildren = styled(Box)({});
