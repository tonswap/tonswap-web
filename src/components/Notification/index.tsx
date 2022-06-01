import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import Button from "@mui/material/Button";
import Slide, { SlideProps } from "@mui/material/Slide";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
interface Props {
  open: boolean;
  autoHideDuration?: number;
  onClose: () => void;
  text: string;
  isError?: boolean;
}

function TransitionRight(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function Notification({
  open,
  autoHideDuration = 5000,
  onClose,
  text,
  isError,
}: Props) {
  const theme = useTheme();
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={TransitionRight}
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}

    >
      <SnackbarContent
        sx={{
          background: isError
            ? theme.palette.error.main
            : theme.palette.primary.main,
          maxWidth: "600px",
          display: "flex",
          width: "calc(100% - 140px)",
        }}

        message={
          <Typography sx={{ color: "white"}}>
            {text}
          </Typography>
        }
        action={
          <Button
            sx={{ color: "white", minWidth: '40px' }}
            size="small"
            onClick={onClose}
          >
            <CloseIcon />
          </Button>
        }
      />
    </Snackbar>
  );
}

export default Notification;
