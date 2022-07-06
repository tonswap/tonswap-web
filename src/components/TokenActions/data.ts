import Sell from "assets/images/shared/sell.svg";
import AddLiquidityImg from "assets/images/shared/add-liqudity.svg";
import RemoveLiquidityImg from "assets/images/shared/remove-liquidity.svg";
import Buy from "assets/images/shared/buy.svg";
import { NavigateFunction } from "react-router-dom";
import { PoolInfo } from "services/api/addresses";
import { ROUTES } from "router/routes";
import { Address } from "ton";

const createTokenActions = (navigate: NavigateFunction, token?: PoolInfo) => {
    if (!token) {
        token = {
            displayName: "",
            name: "tkn",
            image: "",
            color: "",
        };
    }

    const id = token!!.name;

    return [
        {
            icon: Buy,
            activeIcon: "",
            title: `Buy ${token.displayName}`,
            func: () => navigate(ROUTES.actions.buy.replace(":id", id)),
            id: "buy",
        },
        {
            icon: Sell,
            activeIcon: "",
            title: `Sell ${token.displayName}`,
            func: () => navigate(ROUTES.actions.sell.replace(":id", id)),
            id: "sell",
        },
        {
            icon: AddLiquidityImg,
            activeIcon: "",
            title: "Add Liquidity",
            func: () => navigate(ROUTES.actions.addLiquidity.replace(":id", id)),
            id: "add-liquidity",
        },
        {
            icon: RemoveLiquidityImg,
            activeIcon: "",
            title: "Remove Liquidity",
            func: () => navigate(ROUTES.actions.removeLiquidity.replace(":id", id)),
            id: "remve-liquidity",
        },
        {
            icon: Buy,
            activeIcon: "",
            title: "Pool info",
            func: () => token && token.ammMinter && navigate(`${ROUTES.pool.base}/${Address.normalize(token.ammMinter)}`),
            id: "token-page",
        },
    ];
};

export { createTokenActions };
