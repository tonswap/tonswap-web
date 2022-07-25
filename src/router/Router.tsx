import { Routes, Route } from "react-router-dom";
import { CreatePool, PoolScreen, Swap } from "screens";

import { ROUTES } from "./routes";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path={ROUTES.swap} element={<Swap />} />
        <Route path={ROUTES.createPool} element={<CreatePool />} />
        <Route path={ROUTES.pool.id} element={<PoolScreen />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
