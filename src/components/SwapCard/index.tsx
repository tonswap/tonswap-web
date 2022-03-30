import { Box, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { NumberInput } from "components/NumberInput";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { delay } from "utils";
import { Theme } from "@mui/material/styles";


const useStyles = makeStyles((theme: Theme ) => ({
  root: ({ color }: { color: string }) => ({
    background: color,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 12,
    position: "relative",
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 42,
    paddingBottom: 28,
    "& *": {
      color: "white",
    },
    [theme.breakpoints.up("sm")]: {
     paddingTop: 30,
     paddingBottom:13
    },
  }),
  tokenImage: {
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top: "0%",
  },
  inputBox: {
    width: "100%",
  },
  bottomBox: {
    marginTop: 8,
    "& p": {
      fontSize: 12,
      "& strong": {
        fontWeight: "bold",
      },
    },
  },
}))

interface Props {
  image: string;
  name: string;
  inputAmount: string;
  availableAmount: string;
  color: string;
  onChange: (val: string) => void;
  maxAmount: string;
}

const getUsdAmount = async (value: string) => {
  await delay(200);
  return (Number(value) * 2.5).toLocaleString();
};

function SwapCard({
  image,
  name,
  inputAmount,
  availableAmount,
  color,
  onChange,
  maxAmount
}: Props) {
  const classes = useStyles({ color });
  const [usdAmount, setUsdAmount] = useState("0");

  const debounced = useDebouncedCallback(async (value) => {
    const res = await getUsdAmount(value);
    setUsdAmount(res);
  }, 600);

  useEffect(() => {
    debounced(inputAmount);
  }, [inputAmount]);

  return (
    <Box className={classes.root}>
      <Box className={classes.tokenImage}>
        <img src= {image} />
      </Box>
      <Typography fontSize="14px" marginBottom="4px" fontWeight={500}>
        {name}
      </Typography>

      <Box className={classes.inputBox}>
        <NumberInput
          title="Enter Amount"
          maxAmount={maxAmount}
          value={inputAmount}
          onChange={(val) => onChange(val)}
        />
      </Box>

      <Grid container className={classes.bottomBox}>
        <Grid item xs={6}>
          <Typography component="p">~${usdAmount}</Typography>
        </Grid>
        <Grid item xs={6} justifyContent="flex-end">
          <Typography component="p" textAlign="right">
            <strong>Available:</strong> {availableAmount} {name}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SwapCard;
