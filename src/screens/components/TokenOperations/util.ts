import BN from "bn.js";
import * as API from "services/api";
import { ActionType } from "services/wallets/types";


const getUsdAmount = async (
  tokenId: string,
  amount: string,
  disabled?: boolean
) => {
  let result;
  try {
    if (disabled) {
      result = await API.fetchDisabledTokensPrice(tokenId);
    } else {
      result = await API.getTokenDollarValue(tokenId, amount);
    }
    
    

    return result;
  } catch (error) {
    console.log(error);

    return "0";
  }
};

const calculateTokens = async (
  tokenName: string,
  isTonToToken: boolean,
  srcAmount: null | BN,
  destAmount: null | BN,
  getAmountsFunc: any
) => {

  if (srcAmount != null) {
    const amount = await getAmountsFunc(
      tokenName,
      isTonToToken,
      srcAmount,
      destAmount != null ? destAmount : null
    );

    return amount;
  } else if (destAmount != null) {
    const amount = await getAmountsFunc(
      tokenName,
      isTonToToken,
      srcAmount,
      destAmount.toString()
    );
    return amount;
  }
};

type Args  = {
  actionType: ActionType,
  tokenName: string;
  destTokenAmount: string;
  srcTokenAmount: string;
}

const createAnalyticsMessage = ({actionType, tokenName, destTokenAmount, srcTokenAmount}: Args) => {
  if (actionType === ActionType.BUY) {
    return `Swapped ${srcTokenAmount} TON for ${destTokenAmount} ${tokenName}`;
  }

  if (actionType === ActionType.SELL) {
    return `Swapped ${srcTokenAmount} ${tokenName} for ${destTokenAmount} TON`;
  }
  if (actionType === ActionType.ADD_LIQUIDITY) {
    return `Added ${srcTokenAmount} TON and ${destTokenAmount} ${tokenName} liquidity`;
  }
  if (actionType === ActionType.REMOVE_LIQUIDITY) {
    return `Removed ${srcTokenAmount} TON and ${destTokenAmount} ${tokenName} liquidity`;
  }
  return ''
}




export { getUsdAmount, calculateTokens, createAnalyticsMessage };
