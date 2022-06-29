import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import ContentLoader from "components/ContentLoader";
import React from "react";

const StyledContainer = styled(Box)({
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    "& .btns": {
        display: "flex",
        justifyContent:'center',
        gap: 20
      },
});

const StyledReserves = styled(Box)({
  width: "100%",
  background: "rgba(0,0,0, 0.05)",
  marginTop: 30,
  padding: 20,
  borderRadius: 10,
  maxWidth: 300,

});

const bgColor = "rgba(0,0,0, 0.08)";

function Loader() {
  return (
    <StyledContainer>
      <ContentLoader
        bgcolor={bgColor}
        style={{ marginBottom: 10 }}
        height={30}
        width="40%"
      />
      <Box className="btns">
        <ContentLoader bgcolor={bgColor} height={40} width={120} borderRadius={2} />
        <ContentLoader bgcolor={bgColor} height={40} width={120}  borderRadius={2} />
      </Box>

      <StyledReserves>
        <ContentLoader bgcolor={bgColor} height={25} width="50%"  style={{ marginBottom: 10 }}  />
        <ContentLoader bgcolor={bgColor} height={25} width="50%" />
      </StyledReserves>
      <ContentLoader bgcolor={bgColor} height={40} width="30%"  style={{ marginTop: 30 }} />
    </StyledContainer>
  );
}

export default Loader;
