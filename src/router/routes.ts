const ROUTES = {
  tokens: "/",
  createPool: "/create-pool",
  pool: {
    base: "/pool",
    id: "/pool/:id",
  },
  swap: {
    base: "swap",
    tokens: '/tokens',
    navigateToTokens: '/swap/tokens',
    sell: "/sell/:id",
    buy: "/buy/:id",
    navigateToBuy: '/swap/buy/:id',
    navigateToSell: '/swap/sell/:id'
  },
  manageLiquidity: {
    tokens: '/tokens',
    navigateToTokens: '/manage-liquiduty/tokens',
    base: "manage-liquiduty",
    addLiquidity: "/add-liquidity/:id",
    removeLiquidity: "/remove-liquidity/:id",
    navigateToAddLiquidity: "/manage-liquiduty/add-liquidity/:id",
    navigateToRemoveLiquidity: "/manage-liquiduty/remove-liquidity/:id",
  },
};

export { ROUTES };
