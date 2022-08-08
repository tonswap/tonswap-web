import { CircularProgress } from "@mui/material";
import { styled, Box } from "@mui/system";
import React from "react";

function MainLoader() {
  return (
    <StyledContainer>
      <CircularProgress />
    </StyledContainer>
  );
}

export default MainLoader;

const StyledContainer = styled(Box)({
  width: "100%",
  height: "100vh",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  paddingTop: '17vh'
});
