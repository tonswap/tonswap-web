import ReactGA from "react-ga4";




const sendEvent = (
  category: string,
  action: string,
  label: string
) => {
  if (!ReactGA.isInitialized) {
    return;
  }
  try {
    ReactGA.event({
      category,
      action,
      label,
    });
  } catch (error) {
    console.log(error);
  }
};

const init = () => {
  try {
    ReactGA.initialize(process.env.REACT_APP_GA!!);
    console.log(process.env.REACT_APP_GA);
    
    ReactGA.send(window.location.pathname + window.location.search);
  } catch (error) {}
};

const gaAnalytics = {
  sendEvent,
  init,
};

export default gaAnalytics;
