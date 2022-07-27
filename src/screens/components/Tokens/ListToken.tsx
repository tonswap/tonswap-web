import { Typography } from "@mui/material";
import ContentLoader from "components/ContentLoader";
import useUsdValue from "hooks/useUsdValue";
import { PoolInfo } from "services/api/addresses";
import { StyledImage, StyledToken, StyledUsdValue, useStyles } from "./styles";

interface Props {
  token: PoolInfo;
  onSelect: () => void;
}

const ListToken = ({ token, onSelect }: Props) => {
  const classes = useStyles();
  const { loading, usd } = useUsdValue(token.name, 1);

  return (
    <StyledToken
      color={token.color}
      onClick={onSelect}
      className={classes.token}
    >
      {token.image && <StyledImage src={token.image} alt="token" />}
      <Typography>{token.displayName}</Typography>
      <StyledUsdValue>
        {loading ? (
          <ContentLoader borderRadius="8px" width={40} height={20} />
        ) : (
          <Typography>{`$${parseFloat(usd.toFixed(3))}`}</Typography>
        )}
      </StyledUsdValue>
    </StyledToken>
  );
};
export default ListToken;
