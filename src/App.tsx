import { Box } from "@mui/material";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { LAYOUT_MAX_WIDTH } from "consts";
import { styled } from "@mui/system";
import SelectWallet from "components/SelectWallet";
import { useWalletActions, useWalletStore } from 'store/wallet/hooks'
import { AppGrid } from "styles/styles";
import { useWebAppResize } from "store/application/hooks";
import './services/i18next/i18n';
import { useEffect } from 'react'
import { TonClient } from 'ton'
import { setClienT } from 'services/api'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTonConnectWallets } from 'store/wallet/actions'
import { RootState } from 'store/store'

const StyledAppContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  position: "relative",
  paddingBottom: 30,
  maxWidth: LAYOUT_MAX_WIDTH,
  marginLeft: "auto",
  marginRight: "auto",
  flex: 1,
});

const StyledRoutesContainer = styled(AppGrid)({
  flex: 1,
});

const App = () => {
  const { restoreSession, restoreAdapter } = useWalletActions();
  const { adapterId } = useWalletStore();
  const wallets = useSelector((state: RootState) => state.wallet.allWallets)
  const dispatch = useDispatch<any>()
  useWebAppResize();

  useEffect(() => {
    (async () => {
      const _client = new TonClient({
        endpoint: "https://mainnet.tonhubapi.com/jsonRPC",
      });
      setClienT(_client)
    })();
    dispatch(fetchTonConnectWallets())
    restoreSession();
  }, [])

  useEffect(() => {
    !!wallets?.length && restoreAdapter(adapterId!)
  }, [wallets])

  return (
    <>
      <StyledAppContainer>
        <Navbar />
        <SelectWallet />
        <StyledRoutesContainer>
          <AppRoutes />
        </StyledRoutesContainer>
      </StyledAppContainer>
    </>
  );
};

export default App;