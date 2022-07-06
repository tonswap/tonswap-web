import { Box } from "@mui/material";
import { styled } from "@mui/styles";

export const StyledContainer = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingBottom: "100px",
    paddingTop: 50,
    width: "100%",
    "& .screen-title": {
      marginBottom: 30,
    },
  });