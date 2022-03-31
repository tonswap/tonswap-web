const ROUTES = {
  connect: "/connect",
  tokens: "/",
  connected: "/*",
  actions: {
    sell: "/sell/:id",
    buy: "/buy/:id",
    claimRewards: "/claim-rewards/:id",
    addLiquidity: "/add-liquidity/:id",
    removeLiquidity: "/remove-liquidity/:id",
  },
};

export { ROUTES };
