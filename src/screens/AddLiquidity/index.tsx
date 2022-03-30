import { ton } from "data";

import { Box, SvgIcon, Typography } from "@mui/material";
import { useStore } from "store";
import { observer } from "mobx-react";
import Icon from "assets/images/shared/add-liqudity.svg";
import { SwapLayout } from "../layouts/SwapLayout";
import { SwapContentLayout } from "../layouts/SwapContentLayout";
import { ReactComponent as Plus } from "assets/images/shared/plus.svg";
import Shout from "assets/images/shared/shout.svg";
import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";


const useStyles = makeStyles((theme: Theme) => ({
    subTitle: {
      alignItems:'center',
      justifyContent:'center',
      display: 'flex',
      "& img": {
        marginRight: 10,
        position:'relative',
        top: 2
      },
      "& p": {
        fontSize: 18,
        fontWeight: 700,
        "& strong" :{
          fontSize: 22,
          color: '#E42473'
        }
      }
    }
}))

export const AddLiquidityScreen = observer(() => {
  const classes = useStyles()
  const store = useStore();

  const submit = (res: any) => {
    console.log(res);
  };

  return (
    <SwapLayout
      title="Add Liquidity and earn"
      subTitle={
        <Box className={classes.subTitle}>
          <img src={Shout} />
          <Typography>and earn <strong>88%</strong> APR</Typography>
        </Box>
      }
      titleImage={Icon}
    >
      <SwapContentLayout
        icon={<SvgIcon component={Plus} viewBox="0 0 12 14" />}
        disableButton={true}
        submit={submit}
        firstCard={store.selectedToken}
        secondCard={ton}
        submitButtonText={`Add ${store.selectedToken?.name} & TON liquidity`}
      />
    </SwapLayout>
  );
});

