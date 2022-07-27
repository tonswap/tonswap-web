import { makeStyles } from "@mui/styles";

import { Theme } from "@mui/material/styles";

interface StyleProps{
  expanded: boolean;
  color?: string;
}

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
    marginTop: 10,
    width:'100%',
    [theme.breakpoints.down('sm')]: {
    }
  },

}));

export { useStyles };
