let webapp: any;
try {
  webapp = (window as any).Telegram.WebApp;
} catch(e){
  
}



const isInFrame = () =>{
  return (window as any).Telegram.WebView.isIframe
}

const telegramWebApp = {
  webapp,
  isInFrame
};

export { telegramWebApp };
