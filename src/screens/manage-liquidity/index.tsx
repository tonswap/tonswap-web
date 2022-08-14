import SlidingMenu from "components/SlidingMenu";
import useEffectOnce from "hooks/useEffectOnce";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { Tokens } from "screens/components/Tokens";
import gaAnalytics from "services/analytics/ga/ga";
import { PoolInfo } from "services/api/addresses";
import { useApplicationActions } from "store/application/hooks";
import { OperationType } from "store/application/reducer";
import { useTokenOperationsStore } from "store/token-operations/hooks";
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

  useEffectOnce(() => {
    onOperationTypeChange(OperationType.MANAGE_LIQUIDITY)
  })

  const menuItems = useMemo(
    () =>
      selectedToken
        ? [
          {
            text: t('add-liquidity'),
            method: () => {
              gaAnalytics.goToAddLiquidity()
              navigate(
                ROUTES.manageLiquidity.navigateToAddLiquidity.replace(
                  ":id",
                  selectedToken?.tokenMinter
                )
              )
            }

          },
          {
            text: t('remove-liquidity'),
            method: () => {
              gaAnalytics.goToRemoveLiquidity()
              navigate(
                ROUTES.manageLiquidity.navigateToRemoveLiquidity.replace(
                  ":id",
                  selectedToken?.tokenMinter
                )
              )
            }

          },
        ]
        : [],
    [navigate, selectedToken]
  );

  const onTokenSelect = (token: PoolInfo) => {
    gaAnalytics.selectTokenToManageLiquidity(token.displayName)
    navigate(
      ROUTES.manageLiquidity.navigateToAddLiquidity.replace(":id", token.tokenMinter)
    );
  };

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

