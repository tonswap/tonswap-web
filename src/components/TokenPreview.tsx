import { Box, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import DefaultTokenIcon from "assets/images/shared/default-token-image.png";

const StyledContainer = styled(Box)({
    display: "flex",
    justifyContent: "flex-start",
    alignItems:'center',
    "& .token-name": {
      fontSize: 14,
      fontWeight: 600,
      marginLeft: 10,
    },
    "& .token-image": {
      width: 20,
      height: 20,
      objectFit: "contain",
    },
});

interface Props {
  image?: string;
  name: string;
}

function TokenPreview({ image, name }: Props) {
  return (
    <StyledContainer>
      <img className="token-image" src={image || DefaultTokenIcon} />
      <Typography className="token-name">{name.toUpperCase()}</Typography>
    </StyledContainer>
  );
}

export default TokenPreview;
