import SwapToTonImg from 'assets/images/shared/swap-to-ton.svg';
import AddLiquidityImg from 'assets/images/shared/add-liqudity.svg';
import RemoveLiquidityImg from 'assets/images/shared/remove-liquidity.svg';
import ClaimRewardImg from 'assets/images/shared/claim-reward.svg';
import SwapFromTonImg from 'assets/images/shared/swap-from-ton.svg';

import SwapToTonImgActive from 'assets/images/shared/swap-to-ton.svg';
import AddLiquidityImgActive from 'assets/images/shared/add-liqudity.svg';
import RemoveLiquidityImgActive from 'assets/images/shared/remove-liquidity.svg';
import ClaimRewardImgActive from 'assets/images/shared/claim-reward.svg';
import SwapFromTonImgActive from 'assets/images/shared/swap-from-ton.svg';

import { v4 as uuidv4 } from 'uuid';



const actions = [
    {
      icon: SwapFromTonImg,
      activeIcon: "",
      title: "Buy FODL",
      action: "",
      id: uuidv4()
    },
    {
        icon: SwapToTonImg,
        activeIcon: "",
        title: "Sell FODL",
        action: "",
        id: uuidv4()
      },
      {
        icon: AddLiquidityImg,
        activeIcon: "",
        title: "Add Liquidity",
        action: "",
        id: uuidv4()
      },
      {
        icon: RemoveLiquidityImg,
        activeIcon: "",
        title: "Remove Liquidity",
        action: "",
        id: uuidv4()
      },
      {
        icon: ClaimRewardImg,
        activeIcon: "",
        title: "Claim Rewards",
        action: "",
        id: uuidv4()
      },
  ];


  export {actions}