import { IconButton, SwipeableDrawer } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import { Box, styled } from "@mui/system";
import { ReactNode } from "react";
import { isMobile } from "react-device-detect";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useIsExpandedView } from "store/application/hooks";
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
  minHeight: expanded ? '45vh' : '60vh',
  position:'relative'
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
  const expanded = useIsExpandedView();

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
      <StyledDrawer expanded={expanded}>
      <StyledClose onClick={onClose}>
          <CloseRoundedIcon />
        </StyledClose>
        {children}</StyledDrawer>
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
          background:'transparent',
          display:'flex',
          alignItems:'center',
          justifyContent:'center'
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor,
        },
      }}
    >
      <StyledDialogContent maxWidth={maxWidth}>
        <StyledClose onClick={onClose}>
          <CloseRoundedIcon />
        </StyledClose>
        <StyledChildren>{children}</StyledChildren>
      </StyledDialogContent>
    </Dialog>
  );
}

const StyledClose = styled(IconButton)(({theme}) => ({
  position: "absolute",
  top: 10,
  right: 10,
  "& .MuiSvgIcon-root": {
    color: theme.palette.primary.main,
    width: 30,
    height: 30
  }
}));

const StyledDialogContent = styled(Box)(({maxWidth}: {maxWidth?: number}) => ({
  padding: '30px 15px 30px 15px',
  position: "relative",
  background:'white',
  maxWidth: maxWidth,
  width: '100%',
  borderRadius: 12
}));

const StyledChildren = styled(Box)({});
