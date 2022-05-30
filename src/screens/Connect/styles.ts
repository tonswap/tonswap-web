import { makeStyles } from "@mui/styles";

import { Theme } from "@mui/material/styles";

interface Props {
  expanded: boolean;
}

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
    marginLeft: "auto",
    marginRight: "auto",
    paddingBottom: 100,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 15,
      flex: 1,
      paddingBottom: 0,
      justifyContent: "flex-start",
    },
  },
  hero: {
    transition: "0.2s all",
    width: 230,
    height: 230,
    [theme.breakpoints.down("sm")]: {
      width: ({ expanded }: Props) => !expanded ? 130 : 200,
      height: ({ expanded }: Props) => !expanded ? 130 : 200,
    },
  },
  topContainer: {
    marginBottom: 48,
    "& h2": {
      fontSize: ({ expanded }: Props) => !expanded ?  '23px'  :  "33px",
      lineHeight: ({ expanded }: Props) => !expanded ?  '16px' : "30px",
      fontWeight: 400,
      transition: "0.2s all",
      "&:first-of-type": {
        marginBottom: 16,
      },
      "& strong": {
        fontWeight: 700,
      },
    },
  },
  logo: {
    transition: "0.2s all",
    marginBottom: 27,
    width: ({ expanded }: Props) => !expanded ? 60 : 88,
    height: ({ expanded }: Props) => !expanded ? 60 : 88,
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
    marginLeft: "auto",
    marginRight: "auto",
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
