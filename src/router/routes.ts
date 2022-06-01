const ROUTES = {
    connect: "/",
    tokens: "/select-token",
    login: '/login',
    actions: {
        sell: "/sell/:id",
        buy: "/buy/:id",
        addLiquidity: "/add-liquidity/:id",
        removeLiquidity: "/remove-liquidity/:id",
    },
};

export { ROUTES };
