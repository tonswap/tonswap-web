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
  svg:{
   
    marginTop: (props: StyleProps) => props.color ? 15 : 13,
    marginBottom: (props: StyleProps) => props.color ? 40 : 22,
    textAlign:'center',
    "& svg": {
      "& path": {
        fill: (props: StyleProps) => props.color,
      },
    },
  }
}));

export { useStyles };
