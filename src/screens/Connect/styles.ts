import { makeStyles } from "@mui/styles";

import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingTop: 100,
    maxWidth: 400,
    marginLeft:'auto',
    marginRight:'auto',
    paddingBottom: 100,
    [theme.breakpoints.down('sm')]:{
      paddingTop: 15,
     flex:1,
     paddingBottom: 0
    }
  },
  hero: {
    width: 230,
    height: 230,
    [theme.breakpoints.down('sm')]:{
      width: 200,
      height: 200,
    }
  },
  topContainer: {
    marginBottom:48,
    "& h2": {
      fontSize: "33px",
      lineHeight: "30px",
      fontWeight: 400,

      "&:first-of-type": {
        marginBottom: 16,
      },
      "& strong": {
        fontWeight: 700,
      },
    },
  },
  logo: {
    width: 88,
    height: 88,
    marginBottom: 27,
  },
  bottomBox: {
    marginTop: 42,
    width: "100%",
    "& h6": {
      marginBottom: 10,
    },
  },
  popup: {
    textAlign: "center",
    width: "100%",
    maxWidth: 360,
    marginLeft:'auto',
    marginRight:'auto',
    "& h2": {
      fontSize: 23,
      fontWeight: 600,
    },
    "& h3": {
      fontSize: 18,
      "&:nth-of-type(1)": {
        marginBottom: 10,
      },
    },
    "& *": {
      color: "white",
    },
  },

}));

export { useStyles };
