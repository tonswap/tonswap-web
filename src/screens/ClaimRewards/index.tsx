import { Box, Typography } from "@mui/material";
import { ActionButton } from "components";
import MedalImage from "assets/images/claim-rewards/medal.svg";
import TokenReward from "./TokenReward";
import { useStyles } from "./styles";
import Icon from "assets/images/shared/claim-rewards.svg";
import { TokenLayout } from "../layouts/TokenLayout";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import { useEffect, useRef, useState } from "react";
import useTxPolling from "screens/cmponents/TokenOperations/useTransactionStatus";
import Notification from "components/Notification";
import { delay } from "utils";

export const ClaimRewardsScreen = observer(() => {
  const classes = useStyles();
  const store = useStore();
  const getBalanceFired = useRef(false);
  const [isLoading, setIsLoading] = useState(false);
  const [reward, setReward] = useState(0);
  const [rewardCopyForSnackbar, setRewardCopyForSnackbar] = useState(0)
  const { txSuccess, pollTx, closeSuccess } = useTxPolling();

  const onTxFinished = async () => {
    // const tokenBalance = await API.getRewards(store.selectedToken!!.name);
    // setReward(tokenBalance);
  };


  const onSubmit = () => {

    if (store.selectedToken) {
     // API.generateClaimRewards(store.selectedToken.name);
      pollTx(onTxFinished);
    }
  };


  const onCloseSnackbar = async() => {
    closeSuccess()
    await delay(500)
    setRewardCopyForSnackbar(0)
  }

  const getBalance = async (tokenName: string) => {
    if (getBalanceFired.current) {
      return;
    }

    setIsLoading(true);
    const tokenBalance = 0; // await API.getRewards(tokenName);
    setReward(tokenBalance);
    setRewardCopyForSnackbar(tokenBalance)
    setIsLoading(false);
  };

  useEffect(() => {
    if (store.selectedToken) {
      getBalance(store.selectedToken.name);
      getBalanceFired.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.selectedToken?.name]);

  return (
    <TokenLayout title="Claim earned rewards" titleImage={Icon}>
      <img className={classes.medal} src={MedalImage} alt="medal" />
      <Box className={classes.infoText}>
        <Typography component="p">
          Claim rewards {store.selectedToken?.displayName}
        </Typography>
      </Box>
      <TokenReward token={store.selectedToken} amount={reward} />
      <Box className={classes.button}>
        <ActionButton
          onClick={onSubmit}
          isDisabled={Number(reward) === 0 || isLoading}
        >
          Claim Rewards
        </ActionButton>
      </Box>
      <Notification
        text={`Successfully claimed ${rewardCopyForSnackbar} ${store.selectedToken?.displayName} reward`}
        open={txSuccess}
        onClose={onCloseSnackbar}
      />
    </TokenLayout>
  );
});
