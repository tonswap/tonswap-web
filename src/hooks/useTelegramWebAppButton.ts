import React, { useEffect } from "react";
import { telegramWebApp } from "services/telegram";

interface Props {
  submitted: () => void;
  submitButtonText: string;
  insufficientFunds: boolean;
  isDisabled: boolean;
  loading: boolean;
}

function useTelegramWebAppButton({
  submitted,
  submitButtonText,
  insufficientFunds,
  isDisabled,
  loading
}: Props) {
  useEffect(() => {
    telegramWebApp.addClickEventToButton(submitted);
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


    useEffect(() => {
    if (loading) {
      telegramWebApp.activateButtonLoader();
    } else {
      telegramWebApp.disableButtonLoader();
    }
  }, [loading]);


}

export default useTelegramWebAppButton;
