import { Box, styled } from "@mui/system";

export const StyledTokenOperation = styled(Box)(({theme}) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: 30,
  flex:1,
  width:'100%',
  [theme.breakpoints.down('sm')]: {
    paddingTop: 20,
  }
}));



export const StyledTokenOperationActions = styled(Box)({
   width:'100%',
   paddingTop: 50,
   maxWidth: 380
  });