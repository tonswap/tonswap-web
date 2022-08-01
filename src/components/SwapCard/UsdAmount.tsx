import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import BigNumberDisplay from "components/BigNumberDisplay";
import ContentLoader from "components/ContentLoader";
import useUsdValue from "hooks/useUsdValue";

interface Props {
  name: string;
  value?: string;
  isLoading?: boolean;
}

const StyledContainer = styled(Box)({
    height: '100%'
})


function UsdAmount({ name, value, isLoading }: Props) {
  const { loading: usdLoading, usd } = useUsdValue(name, value);

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
