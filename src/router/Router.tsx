import { Box, styled } from "@mui/system";
import { lazy, Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { ROUTES } from "./routes";
import MainLoader from "components/MainLoader";

const CreatePool = lazy(() => import("screens/CreatePool"));
const Swap = lazy(() => import("screens/swap"));
const Pool = lazy(() => import("screens/pool"));
const ManageLiquidity = lazy(() => import("screens/manage-liquidity"));

function AppRoutes() {
  let location = useLocation();

  useEffect(() => {
    (window as any)._mfq.push(["newPageView", location.pathname]);
  }, [location]);

  return (
    <>
      <Suspense fallback={<MainLoader />}>
        <Routes>
          <Route path={`${ROUTES.swap.base}/*`} element={<Swap />} />
          <Route
            path={`${ROUTES.manageLiquidity.base}/*`}
            element={<ManageLiquidity />}
          />
          <Route path={ROUTES.createPool} element={<CreatePool />} />
          <Route path={ROUTES.pool.id} element={<Pool />} />
          <Route
            path="*"
            element={<Navigate to={ROUTES.swap.navigateToTokens} replace />}
          />
        </Routes>
      </Suspense>
    </>
  );
}

export default AppRoutes;
