import { Box, Grid, Typography } from "@mui/material";
import { NumberInput } from "components/NumberInput";
import { PoolInfo } from "services/api/addresses";
import ContentLoader from "components/ContentLoader";
import { useStyles } from "./styles";
import useWebAppResize from "hooks/useWebAppResize";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { ton } from "tokens";
import useUsdValue from "hooks/useUsdValue";

interface Props {
  inputAmount?: number;
  availableAmount: number;
  onChange: (val: string) => void;
  maxAmount: number;
  token: PoolInfo;
  isLoading?: boolean;
  availableAmountLoading: boolean;
}

function SwapCard({
  inputAmount,
  availableAmount,
  onChange,
  maxAmount,
  token,
  isLoading,
  availableAmountLoading,
}: Props) {
  const expanded = useWebAppResize();
  const classes = useStyles({ color: token.color, expanded });
  const navigate = useNavigate();
  const {loading: usdLoading, usd} = useUsdValue(token.name, inputAmount )
  
  const onAvatarClick = () => {
    if (token.name !== ton.name) {
      navigate(ROUTES.tokens);
    }
  };

  return (
    <Box className={classes.root}>
      <div
        className={classes.tokenImage}
        onClick={onAvatarClick}
      >
        {token.image && <img src={token.image} alt="token" />}
      </div>
      <Typography fontSize="14px" marginBottom="4px" fontWeight={500}>
        {token.displayName}
      </Typography>

      <Box className={classes.inputBox}>
        <NumberInput
          isLoading={isLoading}
          title="Enter Amount"
          maxAmount={maxAmount}
          value={inputAmount}
          onChange={(val) => onChange(val)}
        />
      </Box>

      <Grid container className={classes.bottomBox}>
        <Grid item xs={6}>
          {isLoading || usdLoading ? (
            <ContentLoader width={40} height="15px" borderRadius="4px" />
          ) : (
            <Typography component="p">~${usd}</Typography>
          )}
        </Grid>
        <Grid item xs={6} justifyContent="flex-end">
          {availableAmountLoading ? (
            <ContentLoader
              width={40}
              height="18px"
              borderRadius="4px"
              style={{ marginLeft: "auto", marginRight: "5px" }}
            />
          ) : (
            <Typography component="p" textAlign="right">
              <strong>Available:</strong>{" "}
              {availableAmount.toLocaleString("en-US", {
                maximumFractionDigits: 4,
              })}{" "}
              {token.displayName}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}

export default SwapCard;
