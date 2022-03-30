import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: '100%',
    flex:1
  },
  medal: {
    height: 77,
    marginBottom: 23,
  },
  infoText: {
    "& p": {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: "35px",
      textAlign: "center",
    },
  },
  tokenRewardBox: {
    marginTop: 28,
    width: "100%",
    color: "white",
    background: ' #EB4286',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 32,
    paddingBottom: 32,
    borderRadius: 14,
    "& p": {
      fontSize: 20,
      lineHeight: "35px",

      "& strong": {
        fontWeight: 700,
      },
    },
  },
  button: {
    marginTop:  93,
    width:'100%',
    [theme.breakpoints.down("sm")]: {
      marginTop:  'auto'
    }
  },
}));

export { useStyles };
