import styled from "@emotion/styled";
import { Box, Button } from "@mui/material";
import Title from "../Title";
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  onSelect: () => void;
  open: boolean;
  href?: string;
  adapterName?: string;
  onClose: () => void;
}

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});


const StyledLink = styled.a({
  width:'100%',
  height:'100%',
  display: 'flex',
  alignItems:'center',
  justifyContent:'center',
  textDecoration:'none'
})

function Connect({open, href, adapterName = "", onClose }: Props) {
  if (!open) {
    return null;
  }

  return (
    <StyledContainer>
      <Box marginBottom="20px">
        <Title onClose={onClose} text={`Connect with ${adapterName} `} />
      </Box>
      <Button variant="contained">
        {href ? <StyledLink href={href}>Connect</StyledLink> : <CircularProgress />}
      </Button>
    </StyledContainer>
  );
}

export default Connect;
