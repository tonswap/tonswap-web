const provider = (window as any).Telegram.WebApp;


const setButtonText = (text?: string) => {
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


const activate = () => {
provider.MainButton.show()
provider.MainButton.enable()
}

const addClickEventToButton = (event: () => void) => {
  provider.MainButton.onClick(event);
};
const removeClickEventFromButton = (event: () => void) => {
  provider.MainButton.offClick(event);
};




const activateButtonLoader = () => {
  provider.MainButton.showProgress()
};

const disableButtonLoader = () => {
  provider.MainButton.hideProgress()
};

const telegramWebApp = {
  setButtonText,
  setButtonColor,
  disableButton,
  enableButton,
  addClickEventToButton,
  provider,
  activateButtonLoader,
  disableButtonLoader,
  removeClickEventFromButton,
  activate
};

export { telegramWebApp };
