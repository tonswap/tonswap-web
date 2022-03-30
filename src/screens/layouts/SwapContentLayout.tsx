import { Box, SvgIcon } from "@mui/material";
import SwapCard from "components/SwapCard";
import { useState } from "react";
import { ActionButton } from "components";
import { Token } from "types";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import { useStyles } from "./styles";
import Grow from '@mui/material/Grow';

interface Props {
  firstCard?: Token;
  secondCard?: Token;
  submitButtonText: string;
  submit: (val: any) => void;
  disableButton: boolean;
  icon: any;
}

export function SwapContentLayout({
  firstCard,
  secondCard,
  submitButtonText,
  submit,
  disableButton,
  icon,
}: Props) {
  const classes = useStyles({ color: firstCard?.color || "" });
  const [firstCardValue, setFirstCardValue] = useState("");
  const [secondCardValue, setSecondCardValue] = useState("");

  const onFirstCardChange = (value: string) => {
    setFirstCardValue(value);
    const cardValue = Number(value) * 2 || "";
    setSecondCardValue(cardValue.toString());
  };

  const onSecondCardChange = (value: string) => {
    setSecondCardValue(value);
    const cardValue = Number(value) / 2 || "";
    setFirstCardValue(cardValue.toString());
  };

  const onSubmit = () => {
    submit({
      from: firstCard?.id!!,
      to: secondCard?.id!!,
      amount: firstCardValue,
    });
  };

  if (!firstCard || !secondCard) {
    return null;
  }

  return (
    <Box className={classes.content}>
      <Box className={classes.cards}>
        <SwapCard
          onChange={onFirstCardChange}
          color={firstCard.color}
          inputAmount={firstCardValue}
          image={firstCard.image}
          name={firstCard.name}
          availableAmount="23443"
          maxAmount={"10"}
        />

        <Box className={classes.svg}>{icon}</Box>

        <SwapCard
          onChange={onSecondCardChange}
          color={secondCard.color}
          inputAmount={secondCardValue}
          image={secondCard.image}
          name={secondCard.name}
          availableAmount="23443"
          maxAmount={"10"}
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
