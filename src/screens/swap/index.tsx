import SlidingMenu from "components/SlidingMenu";
import useEffectOnce from "hooks/useEffectOnce";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { Tokens } from "screens/components/Tokens";
import gaAnalytics from "services/analytics/ga/ga";
import { PoolInfo } from "services/api/addresses";
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
  const { onOperationTypeChange } = useApplicationActions();
  const { t } = useTranslation();
  const navigate = useNavigateWithParams();
  const params = useParams();
  const action = getActionFromParams(params);

  useEffectOnce(() => {
    onOperationTypeChange(OperationType.SWAP);
  });

  const menuItems = useMemo(
    () =>
      selectedToken
        ? [
          {
            text: `${t('buy')}`,
            method: () => {
              gaAnalytics.goToBuy()

              toggleSellToBuy();
            },
          },
          {
            text: `${t('sell')}`,
            method: () => {
              gaAnalytics.goToSell()
              toggleBuyToSell()
            },
          },
        ]
        : [],
    [navigate, selectedToken]
  );

  const onTokenSelect = useCallback(
    (token: PoolInfo) => {
      navigate(ROUTES.swap.navigateToBuy.replace(":id", token.tokenMinter));
      gaAnalytics.selectTokenToTrade(token.displayName)
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
              title={t('jettons-available')}
            />
          }
        />
      </Routes>
    </>
  );
}

export default SwapScreen;
