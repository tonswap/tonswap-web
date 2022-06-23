import { Box, Typography } from "@mui/material";
import { PoolInfo } from "services/api/addresses";
import { useStyles } from "./styles";

interface Props {
  amount: number;
  token?: PoolInfo;
}

function TokenReward({ amount, token }: Props) {
  const classes = useStyles();



  return (
    <Box style={{ background: token?.color || "" }} className={classes.tokenRewardBox}>
      <Typography component='p'>Earned Reward:</Typography>
      <Typography component='p'>
        <strong>{amount.toFixed(7)} {token?.displayName}</strong>
      </Typography>
    </Box>
  );
}

export default TokenReward;
