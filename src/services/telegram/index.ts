const provider = (window as any).Telegram.WebApp;

console.log(provider);


provider.MainButton.show()

const setButtonText = (text: string) => {
  provider.MainButton.setText(text);
};

const setButtonColor = (color: string) => {
  provider.MainButton.color = color;
};

const enableButton = (text?: string) => {
  provider.MainButton.enable();
  provider.MainButton.color  = '#2481cc'

  if (text) {
    setButtonText(text);
  }
};

const disableButton = (text?: string) => {
  provider.MainButton.disable();
  provider.MainButton.color = '#B8B8B8'
  if (text) {
    setButtonText(text);
  }
};

const addClickEventToButton = (event: () => void) => {
  provider.MainButton.onClick(event);
};



const telegramWebApp = {
  setButtonText,
  setButtonColor,
  disableButton,
  enableButton,
  addClickEventToButton,
  provider
};

export { telegramWebApp };
