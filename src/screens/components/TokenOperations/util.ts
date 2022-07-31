import BN from 'bn.js';
import * as API from 'services/api'

const getUsdAmount = async (tokenId: string, amount: string) => {
    try {
      const result = await API.getTokenDollarValue(tokenId, amount);

      return result;
    } catch (error) {
      console.log(error);
  
      return '0';
    }
  };

  const calculateTokens = async (tokenName: string, isTonToToken: boolean, srcAmount:  null | string, destAmount: null | string, getAmountsFunc: any) => {
    if (srcAmount != null) {
        const amount = await getAmountsFunc(tokenName, isTonToToken, new BN(srcAmount), destAmount != null ? new BN(destAmount) : null);

        return amount;
    } else if (destAmount != null) {
        const amount = await getAmountsFunc(tokenName, isTonToToken, srcAmount, destAmount.toString());
        return amount;
    }
};

  

  export {getUsdAmount, calculateTokens}