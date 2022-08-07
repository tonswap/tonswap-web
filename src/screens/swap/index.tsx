import SlidingMenu from "components/SlidingMenu";
import useEffectOnce from "hooks/useEffectOnce";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import { useCallback, useMemo } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { Tokens } from "screens/components/Tokens";
import { useApplicationActions } from "store/application/hooks";
import { OperationType } from "store/application/reducer";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import { getActionFromParams } from "utils";
import Buy from "./Buy";
import Sell from "./Sell";

function SwapScreen() {
  const { selectedToken } = useTokenOperationsStore();
  const { toggleBuyToSell, toggleSellToBuy } = useTokenOperationsActions();
  const {onOperationTypeChange} = useApplicationActions()
  const navigate = useNavigateWithParams();
  const params = useParams();
  const action = getActionFromParams(params);

  useEffectOnce(() => {
    onOperationTypeChange(OperationType.SWAP)
  })



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

  const onTokenSelect = useCallback(
    (tokenId: string) => {
      navigate(ROUTES.swap.navigateToBuy.replace(":id", tokenId));
    },
    [navigate]
  );
  return (
    <>
      {selectedToken && (
        <SlidingMenu
          symbol={selectedToken.displayName}
          items={menuItems}
          action={action}
        />
      )}

      <Routes>
        <Route path={ROUTES.swap.buy} element={<Buy />} />
        <Route path={ROUTES.swap.sell} element={<Sell />} />
        <Route
          path={ROUTES.swap.tokens}
          element={
            <Tokens
              onTokenSelect={onTokenSelect}
              title="Jettons available for trade"
            />
          }
        />
      </Routes>
    </>
  );
}

export default SwapScreen
