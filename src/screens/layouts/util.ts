const calculateTokens = async (
  srcTokenName: string,
  destTokenName: string,
  srcAmount: number | null | string,
  destAmount: number | null | string,
  getAmountsFunc: any
) => {
  if (srcAmount != null) {
    const amount = await getAmountsFunc(
      srcTokenName,
      destTokenName,
      parseFloat(srcAmount.toString()),
      destAmount != null ? parseFloat(destAmount.toString()) : null
    );

    return amount;
  } else if (destAmount != null) {
    const amount = await getAmountsFunc(
      srcTokenName,
      destTokenName,
      srcAmount,
      parseFloat(destAmount.toString())
    );
    return amount;
  }
};

export { calculateTokens };
