import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import ContentLoader from "components/ContentLoader";
import useUsdValue from "hooks/useUsdValue";
import React from "react";

interface Props {
  name: string;
  value?: string;
  isLoading?: boolean;
}

const StyledContainer = styled(Box)({
    height: '100%'
})


function toFixed(str : string) {
  if(str == '' || str == '0') {
    return '0'
  }
  return parseFloat(str).toFixed(4)
}

function UsdAmount({ name, value, isLoading }: Props) {
  const { loading: usdLoading, usd } = useUsdValue(name, value);

  return (
    <StyledContainer>
      {isLoading || usdLoading ? (
        <ContentLoader width={40} height="15px" borderRadius="4px" />
      ) : (
        <Typography component="p">
          ~$
          {toFixed(usd.toLocaleString())}
        </Typography>
      )}
    </StyledContainer>
  );
}

export default UsdAmount;
