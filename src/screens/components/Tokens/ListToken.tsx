import { Typography } from "@mui/material";
import ContentLoader from "components/ContentLoader";
import { COMING_SOON } from "consts";
import useUsdValue from "hooks/useUsdValue";
import { PoolInfo } from "services/api/addresses";
import { StyledImage, StyledToken, StyledUsdValue, useStyles } from "./styles";

interface Props {
  token: PoolInfo;
  onSelect: () => void;
}

const ListToken = ({ token, onSelect }: Props) => {
  const classes = useStyles();
  const amount = token.isDisabled ? 0 : 1
  const { loading, usd } = useUsdValue(token.name, amount, 0);

  return (
    <StyledToken
      
      color={token.color}
      onClick={token.isDisabled ? () => {} : onSelect}
      className={classes.token}
      style={{cursor: token.isDisabled ? '' : 'pointer'}}
    >
      {token.image && <StyledImage src={token.image} alt="token" />}
      <Typography>{token.displayName} {token.isDisabled ? COMING_SOON : ''}</Typography>
      <StyledUsdValue>
        {token.isDisabled ? 
          null
        : loading ? (
          <ContentLoader borderRadius="8px" width={40} height={20} />
        ) : (
          <Typography>{`$${parseFloat(usd.toFixed(3))}`}</Typography>
        )}
      </StyledUsdValue>
    </StyledToken>
  );
};
export default ListToken;
