import { Routes, Route } from "react-router-dom";
import {
  ConnectScreen,
  Tokens,
  BuyScreen,
  SellScreen,
  RemoveLiquidityScreen,
  AddLiquidityScreen,
  CreatePool,
  PoolScreen
} from "screens";

import { ROUTES } from "./routes";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.connect} element={<ConnectScreen />} />
        <Route path={ROUTES.tokens} element={<Tokens />} />
        <Route path={ROUTES.actions.buy} element={<BuyScreen />} />
        <Route path={ROUTES.actions.sell} element={<SellScreen />} />
        <Route path={ROUTES.createPool} element={<CreatePool />} />
        <Route path={ROUTES.pool.id} element={<PoolScreen />} />
        <Route
          path={ROUTES.actions.removeLiquidity}
          element={<RemoveLiquidityScreen />}
        />
        <Route
          path={ROUTES.actions.addLiquidity}
          element={<AddLiquidityScreen />}
        />
        <Route path="*" element={<Tokens />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
