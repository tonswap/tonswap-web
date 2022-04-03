import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Button from "@mui/material/Button";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useMemo } from "react";
interface Props {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  text: string;
}

function TransitionRight(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function Notification({ open, autoHideDuration = 5000, onClose, text }: Props) {
  const action = useMemo(
    () => (
      <Button sx={{ color: "white" }} size="small" onClick={onClose}>
        <CloseIcon />
      </Button>
    ),
      // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const theme = useTheme();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={TransitionRight}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      
      dir=""
    >
      <SnackbarContent
        sx={{ background: theme.palette.primary.main, maxWidth:'600px', display:'flex' }}
        action={action}
        message={<Typography sx={{ color: "white", flex: 1 }}>{text}</Typography>}
      />
    </Snackbar>
  );
}

export default Notification;
