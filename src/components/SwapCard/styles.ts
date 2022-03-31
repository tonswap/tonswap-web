import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";


const useStyles = makeStyles((theme: Theme) => ({
  root: ({ color }: { color: string }) => ({
    background: color,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 12,
    position: "relative",
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 42,
    paddingBottom: 28,
    "& *": {
      color: "white",
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: 30,
      paddingBottom: 13,
    },
  }),
  tokenImage: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top: "0%",
  },
  inputBox: {
    width: "100%",
  },
  bottomBox: {
    marginTop: 8,
    "& p": {
      fontSize: 12,
      "& strong": {
        fontWeight: "bold",
      },
    },
  },
}));

export {useStyles}