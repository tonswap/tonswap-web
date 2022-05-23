import React, { useEffect } from "react";
import { telegramWebApp } from "services/telegram";

interface Props {
  onSubmit: () => void;
  submitButtonText: string;
  insufficientFunds: boolean;
  isDisabled: boolean;
}

function useTelegramWebAppButton({
  onSubmit,
  submitButtonText,
  insufficientFunds,
  isDisabled,
}: Props) {
  useEffect(() => {
    telegramWebApp.addClickEventToButton(onSubmit);
    telegramWebApp.setButtonText(submitButtonText);
  }, []);

  useEffect(() => {
    if (insufficientFunds) {
      telegramWebApp.disableButton("Insufficient funds");
    } else {
      telegramWebApp.enableButton(submitButtonText);
    }
  }, [insufficientFunds]);

  useEffect(() => {
    if (isDisabled) {
      telegramWebApp.disableButton();
    } else {
      telegramWebApp.enableButton();
    }
  }, [isDisabled]);
}

export default useTelegramWebAppButton;
