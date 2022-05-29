import { useEffect } from "react";
import { telegramWebApp } from "services/telegram";

interface Props {
  onSubmit: () => void;
  submitButtonText: string;
  insufficientFunds: boolean;
  isDisabled: boolean;
  loading: boolean;
}

function useTelegramWebAppButton({
  onSubmit,
  submitButtonText,
  insufficientFunds,
  isDisabled,
  loading
}: Props) {

  useEffect(() => {
    telegramWebApp.addClickEventToButton(onSubmit);
    telegramWebApp.setButtonText(submitButtonText);
  }, [submitButtonText, onSubmit]);

  useEffect(() => {
    if (insufficientFunds) {
      telegramWebApp.disableButton("Insufficient funds");
    } else {
      telegramWebApp.enableButton(submitButtonText);
    }
  }, [insufficientFunds, submitButtonText]);

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
