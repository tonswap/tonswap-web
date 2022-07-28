import { makeStyles } from "@mui/styles";
import {Theme } from "@mui/material";
import { styled , Box} from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    flex:1,
    display:'flex',
    flexDirection:'column',
    width: 400,
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
    [theme.breakpoints.down('sm')]: {
      marginTop: 25,
    }
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
    paddingBottom: 20,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 20,
    }
  },
  selectedTokenDetails: {
    marginTop: 35,
    textAlign: "center",
    "& img": {
      width: 63,
      height: 63,
    },
    "& p": {
      fontWeight: 500,
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: 15,
    }
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



export const StyledChip = styled(Box)(({theme}) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: 35,

  borderRadius:12,
  color: theme.palette.primary.main,
  maxWidth: 185,
  gap: 7,
  [theme.breakpoints.down("sm")]: {
    maxWidth: 145,

  },
  "p": {
    fontSize: 12,
  },
  "& .icon": {
    width: 20,
    height: 20,
  },
  
}))



export const StyledConnectChip = styled(StyledChip)(({theme}) => ({
 
  border: `1px solid ${theme.palette.primary.main}!important`,
  paddingLeft: 14,
  paddingRight: 20,
  cursor:'pointer',
  "p": {
    color:theme.palette.primary.main,
    fontWeight: 600,
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: 12,
    paddingLeft: 10,
    paddingRight: 15,
  }
}))

export const StyledConnectedChip = styled(StyledChip)(({theme}) => ({
  border: `1px solid ${theme.palette.primary.main}!important`,
  background: "transparent!important",
  paddingLeft: 10,
  paddingRight: 30,
  [theme.breakpoints.down("sm")]: {
    paddingRight: 20,
  },
 
  "& .address": {
    flex: 1,
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    maxWidth: 100,
    
    paddingRight: 10,
    [theme.breakpoints.down("sm")]: {
      maxWidth: 70,
    },
  },
  "& .toggle": {
    position: "absolute",
    right: 0,
  },
}))

export { useStyles };
