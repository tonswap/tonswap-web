import { Box, Button, IconButton, Input, Typography } from '@mui/material'
import { Popup, StyledDialogContent, Title } from 'components'
import { useStyles } from './styles'
import Fade from '@mui/material/Fade'
import { useCallback, useEffect, useState } from 'react'
import ListToken from './ListToken'
import CustomToken from './CustomToken'
import { useTokensStore } from 'store/tokens/hooks'
import { styled } from '@mui/system'
import { useTokenOperationsActions } from 'store/token-operations/hooks'
import { PoolInfo } from 'services/api/addresses'
import search from 'assets/images/shared/search.svg'
import clear from 'assets/images/shared/clear.svg'
import flexingDuck from 'assets/images/drawings/flexing-duck.svg'
import FullPageLoader from 'components/FullPageLoader'
import { useTokenSearch } from 'hooks/useTokenSearch'
import debounce from 'lodash.debounce'
import Dialog from '@mui/material/Dialog'
import { isMobile } from 'react-device-detect'

interface Props {
  title: string;
  onTokenSelect: (token: PoolInfo) => void;
}

const PopupContentWrapper = styled(StyledDialogContent)(({isMobile}: {isMobile: boolean}) => ({
  padding: isMobile ? '5px' : "15px",
  paddingBottom: isMobile? '20px' : '25px',
  paddingTop: '15px',
}))

interface IMobilePopup {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: number
  minWidth?: number
  backgroundColor?: string,
  flexibleSpacings?: boolean
}

const MobilePopup = ({
  open,
  onClose,
  maxWidth,
  minWidth,
  backgroundColor = 'rgba(48, 48, 48, 0.8)',
  flexibleSpacings = true,
  children,
}: IMobilePopup) => {

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          width: '100%',
          height: '100%',
          maxWidth: 'unset',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor,
        },
      }}
    >
      <PopupContentWrapper isMobile={flexibleSpacings ? isMobile : false} maxWidth={maxWidth} minWidth={minWidth}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
          <IconButton onClick={onClose} sx={{padding: 0}}>
            <img src={clear} width={24} height={24} alt="Close icon" />
          </IconButton>
        </Box>
        <Box>{children}</Box>
      </PopupContentWrapper>
    </Dialog>
  )
}

export const Tokens = ({ title, onTokenSelect }: Props) => {
  const classes = useStyles()
  const [addTokenModal, setAddTokenModal] = useState(false)
  const { selectToken } = useTokenOperationsActions()
  const { clearStore } = useTokenOperationsActions()
  const { tokens } = useTokensStore()
  const {
    onKeyPress,
    onClose,
    error,
    loading,
    foundJetton,
    onDigitEnter,
    onAddToLS,
    userJettons,
    onClear,
    jettonAddress,
    onSetError,
  } = useTokenSearch()
  const [allTokens, setAllTokens] = useState([...userJettons, ...tokens])

  useEffect(() => {
    setAllTokens([...userJettons, ...tokens])
  }, [userJettons, tokens])

  useEffect(() => {
    setAllTokens([...userJettons, ...tokens].filter((token) => token.displayName.toLowerCase().includes(jettonAddress.toLowerCase())))
  }, [jettonAddress])

  useEffect(() => {
    selectToken(undefined)
    clearStore()
  }, [])

  const checkInput = () => {
    if (!allTokens?.length && jettonAddress.length <= 5 && jettonAddress.length > 0) {
      onSetError('Jetton not found')
    }
  }

  const debouncedSearchHandler = useCallback(debounce(checkInput, 1000)
    , [allTokens, jettonAddress])

  useEffect(() => {
    debouncedSearchHandler()
    return () => debouncedSearchHandler.cancel()
  }, [jettonAddress, allTokens])

  return (
    <Fade in timeout={300}>
      <Box className={classes.root}>
        {!!error && <MobilePopup flexibleSpacings={false} open={!!error} onClose={onClose}>
            <Box sx={{
              width: isMobile ? 280 : 461,
              height: 274,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
                <Typography sx={{ marginBottom: 3 }}>{error}</Typography>
                <img style={{ marginBottom: 24 }} src={flexingDuck} alt="Flexing duck" width={119} height={108} />
                <Button sx={{ width: 225, height: 50, background: '#50A7EA', color: '#fff' }}
                        onClick={onClose}>Close</Button>
            </Box>
        </MobilePopup>}
        {!!foundJetton && <MobilePopup open={!!foundJetton} onClose={onClose}>
            <Box px={2} sx={{
              padding: '0 8px',
              minWidth: isMobile ? 300 : 460,
              width: '100%',
              maxWidth: 461,
              maxHeight: 274,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
                <Typography sx={{marginBottom: 2}}>Jetton pool found</Typography>
                <Box mb={3} sx={{ width: '100%' }}>
                    <ListToken
                        custom
                        key={foundJetton.tokenMinter}
                        onSelect={() => {
                        }}
                        token={foundJetton}
                    />
                </Box>
                <Box sx={{ display: 'flex', width: '100%' }}>
                    <Button sx={{
                      flex: 1,
                      maxWidth: 142,
                      height: 50,
                      background: '#50A7EA',
                      color: '#fff',
                      marginRight: 2,
                    }}
                            onClick={onClose}>Cancel</Button>
                    <Button sx={{ flex: 2, height: 50, background: '#50A7EA', color: '#fff' }}
                            onClick={onAddToLS}>Add
                        to list</Button>
                </Box>
            </Box>
        </MobilePopup>}
        <FullPageLoader open={loading}>
          <Typography>Searching for Jetton</Typography>
        </FullPageLoader>
        <CustomToken
          open={addTokenModal}
          onClose={() => setAddTokenModal(false)}
        />
        <StyledTitle>
          <Title>{title}</Title>
        </StyledTitle>
        <Box className={classes.lists}>
          <StyledContainer>
            <Box sx={{ width: '100%' }}>
              <Box sx={{
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid #AEAEAE',
                borderRadius: '12px',
                padding: '0 12px',
              }}>
                <img src={search} alt="Search icon" width={28} height={28} style={{ marginRight: 8 }} />
                <Input
                  disableUnderline
                  sx={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: 14,
                  }}
                  value={jettonAddress}
                  placeholder="Enter Jetton symbol or address"
                  onChange={onDigitEnter}
                  onKeyDown={(e) => {
                    onKeyPress(e)
                  }}
                />
                <IconButton onClick={onClear}>
                  <img src={clear} alt="Clear icon" width={24} height={24} />
                </IconButton>
              </Box>
            </Box>
            {allTokens.map((token: PoolInfo) => {
              return (
                <ListToken
                  key={token.tokenMinter}
                  onSelect={() => onTokenSelect(token)}
                  token={token}
                  custom={userJettons.find((jetton: any) => jetton.displayName === token.displayName)}
                />
              )
            })
            }
          </StyledContainer>
        </Box>
      </Box>
    </Fade>
  )
}

const StyledContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 11,
  maxWidth: 380,
  marginLeft: 'auto',
  marginRight: 'auto',
  minHeight: 300,
})

const StyledTitle = styled(Box)({
  position: 'sticky',
  top: 54,
  background: 'white',
  zIndex: 1,
  paddingBottom: 10,
})