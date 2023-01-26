import { styled } from '@mui/styles'
import { Box } from '@mui/material'
import QR from './QR'
import AdaptersList from '../AdaptersList'
import { useState } from 'react'
import { Adapters } from 'services/wallets/types'
import { adapters } from 'services/wallets/config'
import { useWalletActions, useWalletStore } from 'store/wallet/hooks'
import { connect } from 'services/wallets/adapters/TonConnectAdapter'
import { updateWallet } from 'store/wallet/actions'
import { useDispatch } from 'react-redux'

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: 'relative',
  overflow: 'hidden',
  width: 'fit-content'
});

interface Props {
  closeModal: () => void;
}

const DesktopFlow = ({ closeModal }: Props) => {
  const { resetWallet, createWalletSession } = useWalletActions();
  const [ adapter, setAdapter ] = useState<Adapters>(Adapters.TON_HUB);
  const { sessionLink } = useWalletStore()
  const [showQr, setShowQr] = useState(false);
  const [link ,setLink] = useState<string>('');
  const dispatch = useDispatch()

  const onSelect = async (adapter: Adapters, supportsTonConnect?: boolean) => {
    if(adapter === Adapters.OPENMASK) {
      const provider = window.ton
      //@ts-ignore
      if(provider?.isOpenMask) {
        const accounts = await provider.send("ton_requestAccounts");
        const wallet = {address: accounts[0] }
        dispatch(updateWallet({ wallet, adapterId: Adapters.TON_KEEPER }));
      } else {
        console.log('OpenMask is not installed!')
      }

    } else if(supportsTonConnect) {
      try {
        const wallet = await connect(null, {
          manifestUrl: "https://tonverifier.live/tonconnect-manifest.json",
          onSessionLinkReady: (val: string) => {
            setLink(val)
            setShowQr(true)
          },
        })
        dispatch(updateWallet({ wallet, adapterId: Adapters.TON_KEEPER }));
      } catch (error) {
        console.log(error)
      }
    } else {
      resetWallet();
      setAdapter(adapter);
      createWalletSession(adapter);
      if (adapter === Adapters.TON_HUB) {
        setShowQr(true);
      }
    }
  };

  const cancel = () => {
    setShowQr(false);
    resetWallet();
  };

  return (
    <StyledContainer>
      <AdaptersList
        adapters={adapters}
        onClose={closeModal}
        open={!showQr}
        select={onSelect}
      />
      
      <QR open={showQr} adapter={adapter} link={link || sessionLink} onClose={cancel} />
    </StyledContainer>
  );
}

export default DesktopFlow;
