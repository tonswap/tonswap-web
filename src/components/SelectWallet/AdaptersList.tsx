import { styled } from '@mui/styles'
import { Box, Fade, List, ListItem, ListItemButton, Typography } from '@mui/material'
import Title from './Title'
import { Theme } from '@mui/material/styles'
import { Adapter, Adapters } from 'services/wallets/types'
import CircularProgress from '@mui/material/CircularProgress'
import gaAnalytics from 'services/analytics/ga/ga'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'

const StyledList = styled(List)({
  width: '100%',
  gap: '5px',
  display: 'flex',
  flexDirection: 'column',
})

const StyledListItemButton = styled(ListItemButton)({
  paddingLeft: 10,
})

const StyledContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  position: 'relative',
  '& .MuiCircularProgress-root': {
    position: 'absolute',
    left: '40%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
}))

const StyledConnectModalTitle = styled(Box)({
  paddingLeft: '10px',
})
const StyledListItemRight = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& h5': {
    color: theme.palette.secondary.main,
    fontSize: '18px',
    fontWeight: '500',
    marginBottom: '5px',
  },

  '& p': {
    color: theme.palette.secondary.main,
    fontSize: '14px',
    opacity: '0.7',
  },
}))
const StyledIcon = styled(Box)({
  width: '40px',
  height: '40px',
  marginRight: '24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  '& .MuiCircularProgress-root': {
    zoom: 0.85,
  },
})

interface Props {
  select: (adapter: Adapters, supportsTonConnect?: boolean) => void;
  open: boolean;
  onClose: () => void;
  adapters: Adapter[];
  adapterLoading?: Adapters;
  isLoading?: boolean;
  title?: string
}

function AdaptersList({
  onClose,
  select,
  open,
  adapters,
  adapterLoading,
  isLoading,
  title = 'Select Wallet',
}: Props) {
  const { t } = useTranslation()
  const adaptersToShow = isMobile ? adapters.filter((adapter) => adapter.mobileCompatible || adapter.name.toLowerCase() === Adapters.TONSAFE) : adapters

  const onSelect = (adapter: Adapters, supportsTonConnect?: boolean) => {
    select(adapter, supportsTonConnect)
    gaAnalytics.selectWallet(adapter)
  }

  if (!open) {
    return null
  }

  const onAdapterSelect = (type: Adapters, tonConnect?: boolean) => {
    //@ts-ignore
    if (type === Adapters.OPENMASK && !window.ton.isOpenMask) {
      window.open('https://www.openmask.app/', '_blank')
      return
    }
    //@ts-ignore
    if(type === Adapters.MYTONWALLET && !window.myTonWallet.isMyTonWallet) {
      window.open('https://mytonwallet.io/', '_blank')
      return
    }
    if (type === Adapters.TONSAFE && isMobile) {
      return
    }
    onSelect(type, tonConnect)
  }

  return (
    <StyledContainer>
      <Fade in={!isLoading}>
        <StyledConnectModalTitle>
          <Title text={title} />
        </StyledConnectModalTitle>
      </Fade>
      <Fade in={!isLoading}>
        <StyledList>
          {adaptersToShow.map((adapter) => {
            const { type, icon, name, description, disabled, tonConnect } = adapter
            return (
              <ListItem
                disablePadding
                key={name}
                disabled={adapter.name.toLowerCase() === Adapters.TONSAFE && isMobile}
                style={{ pointerEvents: isLoading ? 'none' : 'all' }}
                sx={{
                  width: '100%',
                  background: 'white',
                  borderRadius: '12px',
                  border: title === 'Select Wallet' ? '' : '1px solid #007AFE',
                }}
              >
                <StyledListItemButton
                  onClick={() => onAdapterSelect(type, tonConnect)}
                >
                  <StyledIcon>
                    <img style={{ 'borderRadius': '9px' }} src={icon} />
                  </StyledIcon>
                  <StyledListItemRight>
                    <Typography variant="h5" sx={{ color: title === 'Select Wallet' ? '' : '#007AFE !important' }}>
                      {title === 'Tap to connect' && 'Connect'} {name} {' '}
                      <small>{disabled || adapter.name.toLowerCase() === Adapters.TONSAFE && isMobile ? t('coming-soon') : ''}</small>
                    </Typography>
                    {title !== 'Tap to connect' && <Typography>{description}</Typography>}
                  </StyledListItemRight>
                </StyledListItemButton>
              </ListItem>
            )
          })}
        </StyledList>
      </Fade>
      {isLoading && <CircularProgress />}
    </StyledContainer>
  )
}

export default AdaptersList
