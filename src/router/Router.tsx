import { Routes, Route, Navigate } from "react-router-dom";
import {
  CreatePool,
  ManageLiquidityScreen,
  PoolScreen,
  SwapScreen
} from "screens";

import { ROUTES } from "./routes";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={`${ROUTES.swap.base}/*`} element={<SwapScreen />} />
        <Route path={`${ROUTES.manageLiquidity.base}/*`} element={<ManageLiquidityScreen />} />
        <Route path={ROUTES.createPool} element={<CreatePool />} />
        <Route path={ROUTES.pool.id} element={<PoolScreen />} />
       <Route
        path="*"
        element={<Navigate to={ROUTES.swap.navigateToTokens} replace />}
    />
      </Routes>
    </>
  );
}

export default AppRoutes;
