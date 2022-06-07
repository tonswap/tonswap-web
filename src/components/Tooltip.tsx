import { Box, ClickAwayListener, Tooltip as MuiTooltip } from "@mui/material";
import { ReactElement, useState } from "react";
import { isMobile } from "react-device-detect";

interface Props {
  children: ReactElement;
  title: string;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
}

export default function Tooltip({
  children,
  title,
  placement = "bottom",
}: Props) {
  const [open, setOpen] = useState(false);
  return !isMobile ? (
    <MuiTooltip   placement={placement} title={title} arrow>
      {children}
    </MuiTooltip>
  ) : (
    <ClickAwayListener  onClickAway={() => setOpen(false)}>
      <div>
        <MuiTooltip
          placement={placement}
          arrow
          PopperProps={{
            disablePortal: true,
          }}
          onClose={() => setOpen(false)}
          open={open}
          disableFocusListener
          disableHoverListener
          
          title={title}
        >
          <Box onClick={() => setOpen(true)}>{children}</Box>
        </MuiTooltip>
      </div>
    </ClickAwayListener>
  );
}
