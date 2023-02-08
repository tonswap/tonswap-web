import { Box, Button, IconButton, Typography } from '@mui/material'
import { Popup, Title } from 'components'
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

interface Props {
  title: string;
  onTokenSelect: (token: PoolInfo) => void;
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
    if(!allTokens?.length && jettonAddress.length < 5 && jettonAddress.length > 0) {
      onSetError('Nothing was found')
    }
  }

  const debouncedSearchHandler = useCallback(debounce(checkInput, 1000)
  , [allTokens, jettonAddress])

  useEffect(() => {
    debouncedSearchHandler()
    return () => debouncedSearchHandler.cancel()
  },[jettonAddress, allTokens])

  return (
    <Fade in timeout={300}>
      <Box className={classes.root}>
        {!!error && <Popup open={!!error} onClose={onClose}>
            <Box sx={{
              minWidth: 250,
              width: '100%',
              maxWidth: 461,
              minHeight: 200,
              maxHeight: 274,
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
        </Popup>}
        {!!foundJetton && <Popup open={!!foundJetton} onClose={onClose}>
            <Box px={2} sx={{
              minWidth: 150,
              width: '100%',
              maxWidth: 461,
              minHeight: 200,
              maxHeight: 274,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
                <Typography>Jetton pool found</Typography>
                <Box sx={{ width: '100%' }}>
                    <ListToken
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
                    <Button sx={{ flex: 1, maxWidth: 225, height: 50, background: '#50A7EA', color: '#fff' }}
                            onClick={onAddToLS}>Add
                        to list</Button>
                </Box>
            </Box>
        </Popup>}
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
                'input:focus::placeholder': {
                  color: 'transparent',
                },
              }}>
                <img src={search} alt="Search icon" width={28} height={28} style={{ marginRight: 8 }} />
                <input
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                    fontSize: 14,
                  }}
                  value={jettonAddress}
                  placeholder="Enter Jetton symbol or address"
                  onChange={onDigitEnter}
                  onKeyDown={onKeyPress}
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