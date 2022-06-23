import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Typography } from "@mui/material";

const StyledContainer = styled(Box)({
  width: "100%",
  height: "100%",
  borderRadius: 12,
  borderSpacing: "20px",
  borderStyle: "dashed",
  borderWidth: "1px",
  borderColor: "rgba(0,0,0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent:'center',
  cursor:'pointer'
});

const StyledText = styled(Typography)({
    marginTop: 20,
    fontWeight: 500,
    fontSize: 14
})
interface Props{
    onClick: () => void;
}

function AddCustomTokenButton({onClick}: Props) {
  return (
    <StyledContainer onClick={onClick}>
      <AddIcon style={{fontSize: 30}} />
      <StyledText>Add Token</StyledText>
    </StyledContainer>
  );
}

export default AddCustomTokenButton;
