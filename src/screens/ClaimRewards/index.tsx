import { Box, Typography } from "@mui/material";
import { ActionButton } from "components";
import MedalImage from "assets/images/claim-rewards/medal.svg";
import TokenReward from "./TokenReward";
import { useStyles } from "./styles";
import Icon from "assets/images/shared/claim-rewards.svg";
import { TokenLayout } from "../layouts/TokenLayout";
import * as API from "services/api";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import { useEffect, useRef, useState } from "react";
import useTxPolling from "hooks/useTransactionStatus";

export const ClaimRewardsScreen = observer(() => {
  const classes = useStyles();
  const store = useStore();
  const getBalanceFired = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reward, setReward] = useState(0);

const onTxFinished = async () => {
  const tokenBalance = await API.getRewards(store.selectedToken!!.name);
  setReward(tokenBalance);
}

  const { txSuccess, pollTx, closeSuccess } = useTxPolling(onTxFinished);


  const onSubmit = () => {
    if (store.selectedToken) {
      API.generateClaimRewards(store.selectedToken.name);
      pollTx()
    }
  };

  const getBalance = async (tokenName: string) => {
    if (getBalanceFired.current) {
      return;
    }

    setIsLoading(true);
    const tokenBalance = await API.getRewards(tokenName);
    setReward(tokenBalance);
    setIsLoading(false);
  };



  console.log(reward);

  useEffect(() => {
    if (store.selectedToken) {
      getBalance(store.selectedToken.name);
      getBalanceFired.current = true;
    }
  }, [store.selectedToken?.name]);

  return (
    <TokenLayout title="Claim earned rewards" titleImage={Icon}>
      <img className={classes.medal} src={MedalImage} />
      <Box className={classes.infoText}>
        <Typography component="p">
          Claim rewards {store.selectedToken?.displayName}
        </Typography>
      </Box>
      <TokenReward token={store.selectedToken} amount={reward} />
      <Box className={classes.button}>
        <ActionButton
          onClick={onSubmit}
          isDisabled={Number(reward) <= 0 || isLoading}
        >
          Claim Rewards
        </ActionButton>
      </Box>
    </TokenLayout>
  );
});
