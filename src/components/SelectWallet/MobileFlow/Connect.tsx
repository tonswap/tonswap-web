import {styled} from '@mui/styles';
import { Box } from "@mui/material";
import Title from "../Title";
import { LoadingButton } from '@mui/lab';

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


const StyledLink = styled('a')({
  width:'100%',
  height:'100%',
  display: 'flex',
  alignItems:'center',
  justifyContent:'center',
  textDecoration:'none',
  color:'white',
  fontSize:'16px'
})


const StyledLoadingButton = styled(LoadingButton)({
  height:'35px'
})

function Connect({open, href, adapterName = "", onClose }: Props) {
  if (!open) {
    return null;
  }

  return (
    <StyledContainer>
      <Box marginBottom="20px">
        <Title text={`Connect with ${adapterName} `} />
      </Box>
      <StyledLoadingButton  variant="contained" loading={!href}>
        {href &&  <StyledLink href={href}>Connect</StyledLink>}
      </StyledLoadingButton>
    </StyledContainer>
  );
}

export default Connect;
