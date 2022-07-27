import { IconButton } from "@mui/material";
import { Box, styled } from "@mui/system";

const StyledContainer = styled(Box)({
  display: "flex",
  gap: 20,
  marginTop: "auto",
  ".MuiIconButton-root": {
    background: "#2598D1",
    width: 30,
    height: 30,
  },
});

function Socials() {
  return (
    <StyledContainer>
      <IconButton href="/"></IconButton>
      <IconButton href="/"></IconButton>
      <IconButton href="/"></IconButton>
    </StyledContainer>
  );
}

export default Socials;
