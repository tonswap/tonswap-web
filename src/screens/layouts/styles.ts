import { makeStyles } from "@mui/styles";

import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: 20,
    alignItems:'center',

  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width:'100%',
   
  },
  cards: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: 30
    }
  },
  button: {
    marginTop: 30,
    width:'100%',
    [theme.breakpoints.down('sm')]: {
      marginTop:'auto'
    }
  },
  svg: (props: { color?: string }) => ({
   
    marginTop: 15,
    marginBottom: 40,
    textAlign:'center',
    "& svg": {
      "& path": {
        fill: props.color,
      },
    },
  }),
}));

export { useStyles };
