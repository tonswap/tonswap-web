import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

export const StyledTokenOperation = styled(Box)(({theme}) => ({
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  paddingTop: 30,
  width:'100%',
  position:'relative',
  [theme.breakpoints.down('sm')]: {
    paddingTop: 20,
  }
}));



export const StyledTokenOperationActions = styled(Box)({
   width:'100%',
   paddingTop: 35,
   maxWidth: 380,
   display:'flex',
   flexDirection:'column',
   marginLeft:'auto',
   marginRight:'auto',
  });


export const AppGrid = styled(Box)({
  paddingLeft: 15,
  paddingRight: 15,
  width: "100%",

})