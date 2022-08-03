import {styled} from '@mui/styles';
import { Box, IconButton, Typography } from "@mui/material";

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

interface Props {
  text: string;
}

function Title({ text }: Props) {

  
  return (
    <StyledContainer>
      <Typography style={{whiteSpace: 'nowrap', paddingRight:'20px', fontWeight:'500', fontSize:'18px'}}>{text}</Typography>
    </StyledContainer>
  );
}

export default Title;
