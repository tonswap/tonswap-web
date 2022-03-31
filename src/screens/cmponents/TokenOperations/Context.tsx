import React, { createContext, useContext, useState } from "react";

interface Balances {
  srcBalance: number;
  destBalance: number;
}

interface IState {
  totalBalances: Balances;
  setTotalBalances: (val: Balances) => void;
}

const Context = createContext<IState>({} as IState);

interface IProps {
  children: React.ReactNode;
}

const TokenOperationsStore = ({ children }: IProps) => {
  const [totalBalances, setTotalBalances] = useState<Balances>({
    srcBalance: 0,
    destBalance: 0,
  });

  const value = {
    totalBalances,
    setTotalBalances,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};
const useTokenOperationsStore = () => useContext(Context);
export { TokenOperationsStore, useTokenOperationsStore };
