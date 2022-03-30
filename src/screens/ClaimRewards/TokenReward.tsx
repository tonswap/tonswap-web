import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Token } from "types";
import { tokens } from "data";
import { useStyles } from "./styles";

interface Props {
  amount: number;
  tokenId: string;
}

function TokenReward({ amount, tokenId }: Props) {
  const classes = useStyles();

  const [token, setToken] = useState<Token | undefined>(undefined);

  useEffect(() => {
    const result = tokens.find((t) => t.id === tokenId);
    setToken(result);
  }, [tokenId]);

  return (
    <Box style={{ background: token?.color || "" }} className={classes.tokenRewardBox}>
      <Typography component='p'>Earned Reward:</Typography>
      <Typography component='p'>
        <strong>{amount.toLocaleString()} {token?.name}</strong>
      </Typography>
    </Box>
  );
}

export default TokenReward;
