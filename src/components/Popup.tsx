import Dialog from "@mui/material/Dialog";
import { ReactNode } from "react";
import { makeStyles } from "@mui/styles";

export interface Props {
  open: boolean;
  onClose?: (value: string) => void;
  children: ReactNode;
  backgroundColor?: string;
  blur?: boolean;
}
const useStyles = makeStyles({
  root: {
    height: 50,
    width: "100%",
  },
});

export function Popup({ open, onClose, children, backgroundColor = 'rgba(48, 48, 48, 0.8)', blur=true }: Props) {
  const classes = useStyles();

  return (
    <Dialog
      className={blur ? 'popup-filter' : ''}
      fullWidth
      onClose={onClose}
      open={open}
      BackdropProps={{
        style: {
          backgroundColor,
        },
      }}
    >
      {children}
    </Dialog>
  );
}
