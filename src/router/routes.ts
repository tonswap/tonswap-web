const ROUTES = {
    connect: "/",
    tokens: "/select-token",
    connected: "/*",
    actions: {
        sell: "/sell/:id",
        buy: "/buy/:id",
        addLiquidity: "/add-liquidity/:id",
        removeLiquidity: "/remove-liquidity/:id",
    },
};

export { ROUTES };
