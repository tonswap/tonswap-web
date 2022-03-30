import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 520,
    paddingLeft: 26,
    paddingRight: 22,
    paddingTop: 20,
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      width: 330,
    }
  },
  closeBtn: {
    color: theme.palette.primary.main,
  },
  drawerTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  drawerNoTokenBox: {
    textAlign: "center",
    marginTop: "20vh",
    "& button": {
      marginTop: 25,
    },
    "& h3": {
      fontWeight: 500,
      fontSize: 24,
    },
  },
  actions: {
    marginTop: 60,
    width: "100%",
  },
  action: {
    borderBottom: "0.5px solid #DDDDDD",
    cursor: "pointer",
    "& p": {
      transition: "0.2s all",
    },
    "& img": {
      marginRight: 25,
    },
    "&:hover": {
      "& p": {
        color: theme.palette.primary.main,
      },
    },
    "&:last-child": {
      border: "unset",
    },
  },
  selectedToken: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 47,
    paddingBottom: 70
  },
  selectedTokenDetails: {
    marginTop: 43,
    textAlign: "center",
    "& img": {
      width: 63,
      height: 63,
    },
    "& p": {
      fontWeight: 500,
    },
  },
  selectedTokenTitle: {
    fontWeight: 500,
  },
  replace: {
    fontWeight: 400,
    fontSize: 14,
    marginTop: 22,
    color: theme.palette.secondary.main
  },
  connect: {
    position: 'relative',
    top:'80px',
  }
}));

export { useStyles };
