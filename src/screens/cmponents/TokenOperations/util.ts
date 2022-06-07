import * as API from 'services/api'

const getUsdAmount = async (tokenId: string, amount: number) => {
    try {
      const result = await API.getTokenDollarValue(tokenId, amount);

      return result;
    } catch (error) {
      console.log(error);
  
      return 0;
    }
  };
  

  export {getUsdAmount}