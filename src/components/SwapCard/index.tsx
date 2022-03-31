import { Box, Grid, Typography } from "@mui/material";
import { NumberInput } from "components/NumberInput";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import * as API from "services/api";
import { Token } from "types";
import ContentLoader from "components/ContentLoader";
import { calculateTokens } from "screens/layouts/util";
import { useStyles } from "./styles";

interface Props {
  inputAmount?: number;
  availableAmount: number;
  onChange: (val: string) => void;
  maxAmount: number;
  opositeTokenValue: number;
  opositeTokenName: string;
  getAmountFunc: any;
  srcTokenName: string;
  token: Token;
  balance: number;
  name: string;
  updateStore: (name: string, val: number) => void;
}

const getUsdAmount = async (tokenId: string, amount: number) => {
  try {
    const result = await API.getTokenDollarValue(tokenId, amount);
    return result;
  } catch (error) {
    console.log(error);

    return 0;
  }
};

function SwapCard({
  inputAmount,
  availableAmount,
  onChange,
  maxAmount,
  token,
  opositeTokenValue,
  srcTokenName,
  getAmountFunc,
  opositeTokenName,
  updateStore,
  balance,
  name,
}: Props) {
  const classes = useStyles({ color: token.color });
  const [usdPrice, setUsdPrice] = useState(0);
  const [usdLoading, setusdLoading] = useState(false);
  const [valueLoading, setValueLoading] = useState(false);

  const usdDebounce = useDebouncedCallback(async () => {
   

    const usd = await getUsdAmount(token.name, balance);
    setUsdPrice(usd);
    setusdLoading(false);
  }, 600);

  const destInputDebounce = useDebouncedCallback(async () => {
    if (!opositeTokenValue) {
      return;
    }
    let result: any;

    if (opositeTokenName === srcTokenName) {
      result = await calculateTokens(
        opositeTokenName,
        token.name,
        opositeTokenValue || "0",
        null,
        getAmountFunc
      );
    } else {
      result = await calculateTokens(
        token.name,
        opositeTokenName,
        null,
        opositeTokenValue || "0",
        getAmountFunc
      );
    }
    const usd = await getUsdAmount(token.name, Number(result));
    setUsdPrice(usd);
    setusdLoading(false);
    setValueLoading(false);
    updateStore(name, result);
  }, 600);

  useEffect(() => {
    if (opositeTokenValue) {
      setusdLoading(true);
      setValueLoading(true);
      destInputDebounce();
    } else {
      setusdLoading(false);
      setValueLoading(false);
      setUsdPrice(0);
    }
  }, [opositeTokenValue]);

  const change = async (val: string) => {
    onChange(val);
    updateStore(name, Number(val));
    setusdLoading(true);
    usdDebounce()
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.tokenImage}>
        <img src={token.image} />
      </Box>
      <Typography fontSize="14px" marginBottom="4px" fontWeight={500}>
        {token.displayName}
      </Typography>

      <Box className={classes.inputBox}>
        <NumberInput
          isLoading={valueLoading}
          title="Enter Amount"
          maxAmount={maxAmount}
          value={balance}
          onChange={(val) => change(val)}
        />
      </Box>

      <Grid container className={classes.bottomBox}>
        <Grid item xs={6}>
          {usdLoading ? (
            <ContentLoader width={40} height="15px" borderRadius="4px" />
          ) : (
            <Typography component="p">~${usdPrice.toLocaleString()}</Typography>
          )}
        </Grid>
        <Grid item xs={6} justifyContent="flex-end">
          <Typography component="p" textAlign="right">
            <strong>Available:</strong> {availableAmount.toLocaleString()}{" "}
            {token.displayName}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SwapCard;
