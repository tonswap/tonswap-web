let webapp: any;
try {
  webapp = (window as any).Telegram.WebApp;
} catch(e){
  
}


 



const telegramWebApp = {
  webapp,
};

export { telegramWebApp };
