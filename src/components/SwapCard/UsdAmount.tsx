import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import BigNumberDisplay from "components/BigNumberDisplay";
import ContentLoader from "components/ContentLoader";
import useUsdValue from "hooks/useUsdValue";

interface Props {
  tokenId: string;
  value?: string;
  isLoading?: boolean;
}

const StyledContainer = styled(Box)({
    height: '100%'
})


function UsdAmount({ tokenId, value, isLoading }: Props) {
  
  const { loading: usdLoading, usd } = useUsdValue(tokenId, value);

  return (
    <StyledContainer>
      {isLoading || usdLoading ? (
        <ContentLoader width={40} height="15px" borderRadius="4px" />
      ) : (
        <Typography component="p">
          ~$
          <BigNumberDisplay value={usd} decimalScale={5} />
          {/* {toFixed(usd.toLocaleString())} */}
        </Typography>
      )}
    </StyledContainer>
  );
}

export default UsdAmount;
