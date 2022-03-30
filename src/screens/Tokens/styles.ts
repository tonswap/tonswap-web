import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    paddingTop: 65,
    width:'100%',
    [theme.breakpoints.down('sm')]: {
      paddingTop: 0
    }
  },
  lists: {
    paddingTop: 30,
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 130
    }
  },
  list: {},
  token: {
    overflow: "hidden",
    position: "relative",
    transition: "0.2s all",
    background: "#F1F1F1",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    height: 147,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    "& img": {
      width: 63,
      height: 63,
    },
    "& p": {
      fontSize: 14,
      fontWeight: 500,
      marginTop: 12,
    },
  },
  menu: {
    borderRadius: "10px",
    padding: 15,
    transition: "0.1s all",
  },
}));

export { useStyles };
