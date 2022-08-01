import SlidingMenu from "components/SlidingMenu";
import useEffectOnce from "hooks/useEffectOnce";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import { useMemo } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { Tokens } from "screens/components/Tokens";
import { useTokenOperationsActions } from "store/token-operations/hooks";
import { OperationType } from "store/token-operations/reducer";
import { useTokensStore } from "store/tokens/hooks";
import { StyledTokenOperation } from "styles/styles";
import { getActionFromParams } from "utils";
import AddLiquidity from "./AddLiquidity";
import RemoveLiquidity from "./RemoveLiquidity";


function ManageLiquidityScreen() {
  const { selectedToken } = useTokensStore();
  const {onOperationTypeChange} = useTokenOperationsActions()
  const navigate = useNavigateWithParams()
  const params = useParams();
  const action = getActionFromParams(params);


  useEffectOnce(() => {
    onOperationTypeChange(OperationType.MANAGE_LIQUIDITY)
  })

  const menuItems = useMemo(
    () =>
      selectedToken
        ? [
            {
              text: "Add liquidity",
              method: () =>
                navigate(
                  ROUTES.manageLiquidity.navigateToAddLiquidity.replace(
                    ":id",
                    selectedToken?.name
                  )
                ),
            },
            {
              text: "Remove liquidity",
              method: () =>
                navigate(
                  ROUTES.manageLiquidity.navigateToRemoveLiquidity.replace(
                    ":id",
                    selectedToken?.name
                  )
                ),
            },
          ]
        : [],
    [navigate, selectedToken]
  );

  const onTokenSelect = (tokenName: string) => {
    navigate(
      ROUTES.manageLiquidity.navigateToAddLiquidity.replace(":id", tokenName)
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
              title="Select a token to manage liquidity"
            />
          }
        />
      </Routes>
    </StyledTokenOperation>
  );
}

export { ManageLiquidityScreen };
