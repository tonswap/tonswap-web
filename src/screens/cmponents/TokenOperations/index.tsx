import { Box } from "@mui/material";
import SwapCard from "components/SwapCard";
import { useEffect, useState } from "react";
import { ActionButton } from "components";
import { Token } from "types";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import { TokenOperationsStore } from "./Context";

interface Props {
  srcToken: Token;
  destToken: Token;
  submitButtonText: string;
  submit: (val: any) => void;
  disableButton: boolean;
  icon: any;
  getBalances: () => Promise<[number, number]>;
  getAmountFunc: any;
}

const Wrapper = (props: Props) => {
  return (
    <TokenOperationsStore>
      <TokenOperations {...props} />
    </TokenOperationsStore>
  );
};

function TokenOperations({
  srcToken,
  destToken,
  submitButtonText,
  submit,
  disableButton,
  icon,
  getBalances,
  getAmountFunc,
}: Props) {
  const classes = useStyles({ color: srcToken?.color || "" });
  const [balances, setBalances] = useState({ srcBalance: 0, destBalance: 0 });
  const [balances2, setBalances2] = useState({ srcBalance: 0, destBalance: 0 });
  const [totalBalances, setTotalBalances] = useState({
    srcBalance: 0,
    destBalance: 0,
  });

  useEffect(() => {
    const onLoad = async () => {
      const [srcTokenBalance, destTokenBalance] = await getBalances();

      setTotalBalances({
        srcBalance: srcTokenBalance,
        destBalance: destTokenBalance,
      });
    };
    onLoad();
  }, []);

  const onSubmit = () => {};

  const srcChange = (value: string) => {
    setBalances((prevState) => {
      return {
        ...prevState,
        srcBalance: Number(value),
      };
    });
  };

  const destChange = (value: string) => {
    setBalances((prevState) => {
      return {
        ...prevState,
        destBalance: Number(value),
      };
    });
  };

  const updateStore = (name: string, value: number) => {
    setBalances2((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  console.log(balances2);

  return (
    <Box className={classes.content}>
      <Box className={classes.cards}>
        <SwapCard
          name="srcBalance"
          balance={balances2.srcBalance}
          updateStore={updateStore}
          onChange={srcChange}
          inputAmount={balances.srcBalance}
          availableAmount={totalBalances.srcBalance}
          maxAmount={totalBalances.srcBalance}
          token={srcToken}
          opositeTokenValue={balances.destBalance}
          opositeTokenName={destToken.name}
          srcTokenName={srcToken.name}
          getAmountFunc={getAmountFunc}
        />

        <Box className={classes.svg}>{icon}</Box>

        <SwapCard
          name="destBalance"
          balance={balances2.destBalance}
          updateStore={updateStore}
          onChange={destChange}
          inputAmount={balances.destBalance}
          token={destToken}
          opositeTokenName={srcToken.name}
          availableAmount={totalBalances.destBalance}
          maxAmount={totalBalances.destBalance}
          opositeTokenValue={balances.srcBalance}
          srcTokenName={srcToken.name}
          getAmountFunc={getAmountFunc}
        />
      </Box>

      <Box className={classes.button}>
        {disableButton ? (
          <ActionButton isDisabled onClick={onSubmit}>
            <WarningAmberRoundedIcon style={{ color: "white" }} /> Insufficient
            funds
          </ActionButton>
        ) : (
          <ActionButton onClick={onSubmit}>{submitButtonText}</ActionButton>
        )}
      </Box>
    </Box>
  );
}

export default Wrapper;
