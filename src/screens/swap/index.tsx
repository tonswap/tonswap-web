import SlidingMenu from "components/SlidingMenu";
import { useMemo } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { Tokens } from "screens/components/Tokens";
import { useTokenOperationsActions } from "store/token-operations/hooks";
import { useTokensStore } from "store/tokens/hooks";
import { StyledTokenOperation } from "styles/styles";
import { getActionFromParams } from "utils";
import Buy from "./Buy";
import Sell from "./Sell";


function SwapScreen() {
  const { selectedToken } = useTokensStore();
  const { toggleBuyToSell, toggleSellToBuy } = useTokenOperationsActions();
  const navigate = useNavigate();
  const params = useParams();
  const action = getActionFromParams(params);

  const menuItems = useMemo(
    () =>
      selectedToken
        ? [
            {
              text: "Buy",
              method: toggleSellToBuy,
            },
            {
              text: "Sell",
              method: toggleBuyToSell,
            },
          ]
        : [],
    [navigate, selectedToken]
  );

  const onTokenSelect = (tokenName: string) => {
    navigate(ROUTES.swap.navigateToBuy.replace(":id", tokenName));
  };

  return (
    <StyledTokenOperation>
      {selectedToken && <SlidingMenu items={menuItems} action={action} />}

      <Routes>
        <Route path={ROUTES.swap.buy} element={<Buy />} />
        <Route path={ROUTES.swap.sell} element={<Sell />} />
        <Route
          path={ROUTES.swap.tokens}
          element={
            <Tokens
              onTokenSelect={onTokenSelect}
              title="Select a token to trade"
            />
          }
        />
      </Routes>
    </StyledTokenOperation>
  );
}

export { SwapScreen };
