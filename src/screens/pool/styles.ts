import { Box, Typography } from "@mui/material";
import { styled } from "@mui/styles";

export const StyledDetails = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 30,
  });
  
  export const StyledContainer = styled(Box)({
    maxWidth: 550,
    width: "100%",
    paddingTop: 60,
    paddingBottom: 60,
  });
  
  export const StyledPoolTokens = styled(Box)({
    display: "flex",
    alignItems: "center",
    "& img": {
      width: 27,
      height: 27,
      objectFit: "contain",
    },
    "& .pair-name": {
      marginLeft: 10,
      "& p": {
        fontWeight: 600,
        fontSize: 18,
      },
    },
  });
  export const StyledHeader = styled(Box)({
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: 20,
    flexDirection: "column",
  });
  
  export const StyledPoolActions = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    "& .base-button": {
      width: "120px",
      height: "unset",
    },
    "& .base-button-content": {
      fontSize: 13,
    },
  });
  
  export const StyledReserves = styled(Box)({
    width: "100%",
    background: "rgba(0,0,0, 0.05)",
    marginTop: 30,
    padding: 20,
    borderRadius: 10,
    maxWidth: 300,
    "& .reserves-title": {
      fontSize: 14,
      fontWeight: 600,
    },
    "& .flex": {
      display: "flex",
      flexDirection: "column",
      gap: 15,
      paddingTop: 15,
    },
  });
  
  export const StyledTvl = styled(Box)({
    width: "100%",
    textAlign: "center",
    "& .tvl-title": {
      fontSize: 18,
      fontWeight: 600,
      marginBottom: 5,
    },
    "& .tvl-amount": {
      fontSize: 15,
      fontWeight: 500,
    },
  });
  

  export const StyledLockedToken = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    "& .token-name": {
      fontSize: 14,
      fontWeight: 600,
      marginLeft: 10,
    },
    "& .token-image": {
      width: 20,
      height: 20,
      objectFit: "contain",
    },
    "& .token-left": {
      display: "flex",
      alignItems: "center",
    },
    "& .reserve": {
      fontSize: 14,
      fontWeight: 500,
    },
  });


  export const StyledError = styled(Box)({
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:10,
    "& p":{
        fontSize: 20,
        textAlign:'center',
        fontWeight: 600,
    }
  })