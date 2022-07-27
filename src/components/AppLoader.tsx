import { Box, styled } from "@mui/system";
import React from "react";

import Logo from "assets/images/shared/ton-logo.svg";
import { Fade } from "@mui/material";

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  img: {
    width: 100,
    height: 100,
  },
});

function AppLoader() {
  return (
    <Fade in timeout={200}>
      <StyledContainer>
        <img src={Logo} />
      </StyledContainer>
    </Fade>
  );
}

export default AppLoader;
