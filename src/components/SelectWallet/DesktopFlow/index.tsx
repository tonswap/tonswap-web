import { styled } from '@mui/styles'
import { Box } from '@mui/material'
import QR from './QR'
import AdaptersList from '../AdaptersList'
import { useWalletSelect } from 'store/wallet/hooks'
import { useSelector } from 'react-redux'
import { RootState } from 'store/store'

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
  const {selectWallet, session, adapter} = useWalletSelect()
  const wallets = useSelector((state: RootState) => state.wallet.allWallets)

  return (
    <StyledContainer>
      <AdaptersList
        adapters={wallets || []}
        onClose={closeModal}
        open={!session}
        select={selectWallet}
      />

      {adapter && session && <QR open={!!session} link={session} title={adapter.name} image={adapter.icon} />}
    </StyledContainer>
  );
}

export default DesktopFlow;
