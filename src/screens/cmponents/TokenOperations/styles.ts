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
      marginTop: (props: StyleProps) => props.expanded ? 'auto' : 0,
    }
  },
  svg:{
    marginTop: (props: StyleProps) => props.expanded ? 15 : 3,
    marginBottom: (props: StyleProps) => props.expanded ? 40 : 16,
    transform: (props: StyleProps) => props.expanded ? 'scale(1)' :  'scale(0.6)',
    textAlign:'center',
    "& svg": {
      "& path": {
        fill: (props: StyleProps) => props.color,
      },
    },
  }
}));

export { useStyles };
