import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import BigNumberDisplay from "components/BigNumberDisplay";
import ContentLoader from "components/ContentLoader";
import useUsdValue from "hooks/useUsdValue";
import { useTranslation } from "react-i18next";
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
  custom?: boolean
}

const ListToken = ({ token, onSelect, custom }: Props) => {
  const classes = useStyles();
  let { loading, usd } = useUsdValue(
    token.tokenMinter!,
    "1",
    0,
    token.isDisabled
  );
  const { t } = useTranslation()

  return (
    <StyledToken
      color={token.color}
      onClick={token.isDisabled ? () => { } : onSelect}
      className={classes.token}
      style={{
        cursor: token.isDisabled ? "" : "pointer",
        opacity: token.isDisabled ? 0.4 : 1,
        position: 'relative',
      }}
    >
      {custom && <Box sx={{position: 'absolute',
        width: '92%', paddingRight: 13,
        height: 46, border: '1px solid grey', borderRadius: 1.5}}></Box>}
      {token.image && <StyledImage src={token.image} alt="token" />}
      <StyledTokenTexts>
        <Typography className="symbol">
          {token.displayName} {token.isDisabled ? t('coming-soon') : ""}
        </Typography>
        <Typography className="name">{token.name}</Typography>
      </StyledTokenTexts>
      <StyledUsdValue>
        {loading ? (
          <ContentLoader borderRadius="8px" width={40} height={20} />
        ) : (
          <Typography>
            <BigNumberDisplay prefix="$" value={usd} decimalScale={6} />
          </Typography>
        )}
      </StyledUsdValue>
    </StyledToken>
  );
};
export default ListToken;
