import { Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { ReactNode } from "react";

const useStyles = makeStyles({
  root: {
    height: 50,
    width: "100%",
  },
  content: {
    display: "flex",
    alignItems: "center",
    fontSize: 17,
    fontWeight: 700,
    width: "100%",
    justifyContent: "center",
    letterSpacing: "-0.4px",
    gap: 10,
  },
});

type Props = {
  children: string | ReactNode;
  isLoading?: boolean;
  customClassName?: string;
  onClick: () => void;
  isDisabled?: boolean;
};

export function ActionButton({
  children,
  isLoading,
  customClassName = "",
  onClick,
  isDisabled,
}: Props) {
  const classes = useStyles();
  const className = clsx(classes.root, customClassName);

  return (
    <LoadingButton
      disabled={isDisabled}
      onClick={onClick}
      className={className}
      loading={isLoading}
      variant="contained"
      color='primary'
      sx={{ boxShadow: "unset", borderRadius: "8px"}}
    >
      <Box style={{color: isDisabled ? '#7D7D7D' : ''}} className={classes.content}>{children}</Box>
    </LoadingButton>
  );
}
