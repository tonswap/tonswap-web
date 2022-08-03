import { Box, styled } from "@mui/system";
import React, { ReactNode } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import { Typography } from "@mui/material";
interface Props {
  children: ReactNode;
  title: string;
}

function TxSuccessNotification({ children, title }: Props) {
  return (
    <StyledContainer>
      <StyledHeader>
      <CheckCircleRoundedIcon />
      <Typography>{title}</Typography>
      </StyledHeader>
      <StyledChildren>{children}</StyledChildren>
    </StyledContainer>
  );
}

export default TxSuccessNotification;


const StyledHeader  = styled(Box)({
  display:'flex',
  alignItems:'center',
  gap:10,
  flexDirection:'column',
  "& p": {
    fontSize: 20
  },
  "& .MuiSvgIcon-root": {
    color: "#21C004",
    width: 30,
    height:30,
    "& *": {
      color: "#21C004",
    },
  },
})

const StyledChildren = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 3,
});

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection:'column',
  gap: 10,
  alignItems:'center',


  "& *": {
    color: "black",
  },
  "& .title": {
    fontWeight: 500,
    fontSize: 15,
  },
  "& p": {
    fontSize: 14,
  },
  "& .row": {
    display:'flex',
    gap: 20
  },
});
