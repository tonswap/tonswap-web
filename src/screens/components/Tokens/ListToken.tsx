import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import BigNumberDisplay from "components/BigNumberDisplay";
import ContentLoader from "components/ContentLoader";
import { COMING_SOON } from "consts";
import useUsdValue from "hooks/useUsdValue";
import { PoolInfo } from "services/api/addresses";
import {
  StyledImage,
  StyledToken,
  StyledTokenTexts,
  StyledUsdValue,
  useStyles,
} from "./styles";

interface Props {
  token: PoolInfo;
  onSelect: () => void;
}

const ListToken = ({ token, onSelect }: Props) => {
  const classes = useStyles();
  const { loading, usd } = useUsdValue(
    token.tokenMinter!,
    "1",
    0,
    token.isDisabled
  );

  return (
    <StyledToken
      color={token.color}
      onClick={token.isDisabled ? () => {} : onSelect}
      className={classes.token}
      style={{
        cursor: token.isDisabled ? "" : "pointer",
        opacity: token.isDisabled ? 0.4 : 1,
      }}
    >
      {token.image && <StyledImage src={token.image} alt="token" />}
      <StyledTokenTexts>
        <Typography className="symbol">
          {token.displayName} {token.isDisabled ? COMING_SOON : ""}
        </Typography>
        <Typography className="name">{token.name}</Typography>
      </StyledTokenTexts>
      <StyledUsdValue>
        {loading ? (
          <ContentLoader borderRadius="8px" width={40} height={20} />
        ) : (
          <Typography>
            <BigNumberDisplay prefix="$" value={usd} decimalScale={7} />
          </Typography>
        )}
      </StyledUsdValue>
    </StyledToken>
  );
};
export default ListToken;
