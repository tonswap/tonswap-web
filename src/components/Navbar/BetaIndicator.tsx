import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const StyledBox = styled(Box)(({ theme }) =>  ({
  padding: "3px 10px",
  border: `1px solid ${theme.palette.primary.main}`,
  borderRadius:'7px'
}))

function BetaIndicator() {
  return (
    <StyledBox>
      <Typography color='primary' fontSize='16px' sx={{fontWeight:'500'}}>Beta version</Typography>
    </StyledBox>
  );
}

export default BetaIndicator;
