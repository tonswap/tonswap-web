import { IconButton, SwipeableDrawer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Box, styled } from "@mui/system";
import useWebAppResize from "hooks/useWebAppResize";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
export interface Props {
  open: boolean;
  onClose?: () => void;
  children: ReactNode;
  backgroundColor?: string;
  blur?: boolean;
  className?: string;
  maxWidth?: number;
}

const StyledDrawer = styled(Box)(({ expanded }: { expanded: boolean }) => ({
  padding: 15,
  minHeight: expanded ? 300 : 550,
}));

export function Popup({
  open,
  onClose,
  children,
  backgroundColor = "rgba(48, 48, 48, 0.8)",
  blur = true,
  className = "",
  maxWidth,
}: Props) {
  const expanded = useWebAppResize();

  return isMobile ? (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose ? onClose : () => {}}
      onOpen={() => {}}
      disableSwipeToOpen={false}
      ModalProps={{
        keepMounted: false,
      }}
    >
      <StyledDrawer expanded={expanded}>{children}</StyledDrawer>
    </SwipeableDrawer>
  ) : (
    <Dialog
      className={`${className} ${blur && "popup-filter"}`}
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{
       
      }}
      BackdropProps={{
        style: {
          backgroundColor,
        },
      }}
    >
      <StyledClose>
        <CloseRoundedIcon style={{ color: "white" }} />
      </StyledClose>
      <StyledDialogContent maxWidth={maxWidth}>{children}</StyledDialogContent>
    </Dialog>
  );
}

const StyledClose = styled(IconButton)({
  position: "absolute",
  top: 120,
  right: 120,
  width: 40,
  height: 40,
  background: "white",
});

const StyledDialogContent = styled(Box)({
  padding: 15,
  position: "relative",
});
