import { ton } from "data";

import useTokenFromParams from "hooks/useTokenFromParams";
import { Box, Typography } from "@mui/material";
import { ActionButton, ScreenTitle } from "components";
import MedalImage from "assets/images/claim-rewards/medal.svg";
import TokenReward from "./TokenReward";
import { useStyles } from "./styles";
import Icon from 'assets/images/shared/claim-rewards.svg'
import { SwapLayout } from "../layouts/SwapLayout";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";



export function ClaimRewardsScreen() {
  const classes = useStyles();

  const submit = (res: any) => {
    console.log(res);
  };

  return (
    <SwapLayout title="Claim earned rewards" titleImage={Icon} >
      <img className={classes.medal} src={MedalImage} />
      <Box className={classes.infoText}>
        <Typography component="p">
          Earned rewards for providing <br /> liquidity for TON and FODL
        </Typography>
      </Box>
      <TokenReward tokenId="fodl" amount={1000} />
      <Box className={classes.button}>
        <ActionButton onClick={() => {}}>Claim Rewards</ActionButton>
      </Box>
    </SwapLayout>
  );
}

