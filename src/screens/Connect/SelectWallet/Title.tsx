import styled from "@emotion/styled";
import { Box, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useTheme } from "@mui/material/styles";

const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

interface Props {
  text: string;
  onClose: () => void;
}

function Title({ text, onClose }: Props) {

  
  const theme = useTheme();
  return (
    <StyledContainer>
      <Typography style={{whiteSpace: 'nowrap', paddingRight:'20px'}}>{text}</Typography>
      <IconButton  color="primary" onClick={onClose}>
        <CloseRoundedIcon style={{ color: theme.palette.primary.main }} />
      </IconButton>
    </StyledContainer>
  );
}

export default Title;
