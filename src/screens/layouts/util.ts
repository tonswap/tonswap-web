const calculateTokens = async (tokenName: string, isTonToToken: boolean, srcAmount: number | null | string, destAmount: number | null | string, getAmountsFunc: any) => {
    if (srcAmount != null) {
        const amount = await getAmountsFunc(tokenName, isTonToToken, parseFloat(srcAmount.toString()), destAmount != null ? parseFloat(destAmount.toString()) : null);

        return amount;
    } else if (destAmount != null) {
        const amount = await getAmountsFunc(tokenName, isTonToToken, srcAmount, parseFloat(destAmount.toString()));
        return amount;
    }
};

export { calculateTokens };
