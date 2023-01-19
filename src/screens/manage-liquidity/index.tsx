import SlidingMenu from "components/SlidingMenu";
import useEffectOnce from "hooks/useEffectOnce";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import { useCallback, useMemo } from 'react'
import { useTranslation } from "react-i18next";
import { Route, Routes, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { Tokens } from "screens/components/Tokens";
import gaAnalytics from "services/analytics/ga/ga";
import { PoolInfo } from "services/api/addresses";
import { useApplicationActions } from "store/application/hooks";
import { OperationType } from "store/application/reducer";
import { useTokenOperationsActions, useTokenOperationsStore } from 'store/token-operations/hooks'
import { StyledTokenOperation } from "styles/styles";
import { getActionFromParams } from "utils";
import AddLiquidity from "./AddLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";


function ManageLiquidityScreen() {
  const { selectedToken } = useTokenOperationsStore();
  const navigate = useNavigateWithParams()
  const params = useParams();
  const action = getActionFromParams(params);
  const { onOperationTypeChange } = useApplicationActions()
  const { t } = useTranslation()
  const {toggleRemoveLiquidity, toggleAddLiquidity} = useTokenOperationsActions()

  useEffectOnce(() => {
    onOperationTypeChange(OperationType.MANAGE_LIQUIDITY)
  })
  const menuItems = useMemo(
    () =>
      selectedToken
        ? [
          {
            text: 'add-liquidity',
            method: () => {
              gaAnalytics.goToAddLiquidity()
              toggleAddLiquidity()
            }
          },
          {
            text: 'remove-liquidity',
            method: () => {
              gaAnalytics.goToRemoveLiquidity()
              toggleRemoveLiquidity()
            }
          },
        ]
        : [],
    [navigate, selectedToken]
  );

  const onTokenSelect = useCallback(
    (token: PoolInfo) => {
      navigate(ROUTES.manageLiquidity.navigateToAddLiquidity.replace(":id", token.tokenMinter));
      gaAnalytics.selectTokenToTrade(token.displayName)
    },
    [navigate]
  );

  return (
    <StyledTokenOperation>
      {selectedToken && <SlidingMenu items={menuItems} action={action} />}

      <Routes>
        <Route
          path={ROUTES.manageLiquidity.addLiquidity}
          element={<AddLiquidity />}
        />
        <Route
          path={ROUTES.manageLiquidity.removeLiquidity}
          element={<RemoveLiquidity />}
        />
        <Route
          path={ROUTES.manageLiquidity.tokens}
          element={
            <Tokens
              onTokenSelect={onTokenSelect}
              title={t('select-token-liquidity')}
            />
          }
        />
      </Routes>
    </StyledTokenOperation>
  );
}

export default ManageLiquidityScreen

