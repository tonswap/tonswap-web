import { makeStyles } from "@mui/styles";

import { Theme } from "@mui/material/styles";





const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    width:'100%',
   
  },
  cards: {
   
  },
  button: {
    marginTop: 'auto',
    width:'100%',
    marginBottom: 30,
    [theme.breakpoints.down('sm')]: {
    }
  },

}));

export { useStyles };
