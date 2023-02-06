import { Box, Button, IconButton, Popover, TextField, Typography } from '@mui/material'
import { Popup, Title } from 'components'
import { useStyles } from './styles'
import Fade from '@mui/material/Fade'
import { ChangeEvent, useEffect, useState } from 'react'
import ListToken from './ListToken'
import CustomToken from './CustomToken'
import { useTokensStore } from 'store/tokens/hooks'
import { styled } from '@mui/system'
import { useTokenOperationsActions } from 'store/token-operations/hooks'
import { PoolInfo } from 'services/api/addresses'
import { Address } from 'ton'
import { getTokenData } from 'services/api'
import { poolStateInit } from 'services/api/deploy-pool'
import search from 'assets/images/shared/search.svg'
import clear from 'assets/images/shared/clear.svg'
import flexingDuck from 'assets/images/drawings/flexing-duck.svg'
import FullPageLoader from 'components/FullPageLoader'

interface Props {
  title: string;
  onTokenSelect: (token: PoolInfo) => void;
}

//check SearchInput for logic
//test jetton EQBLMMLPNQ7VTND3YGZuNMiGiOIdUaNE0R4819ETHj3QUA4l

const useJettonSearch = () => {
  const [jettonAddress, setJettonAddress] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [foundJetton, setFoundJetton] = useState<any>()
  const [userJettons, setUserJettons] = useState<any>(JSON.parse(localStorage.getItem('userJettons') || '[]'))

  const getUserJettons = () => JSON.parse(localStorage.getItem('userJettons') || '[]')

  const onSubmit = async (address: string) => {
    let jettonAddress
    let jettonData
    let ammMinterAddress

    try {
      jettonAddress = Address.parse(address)
      jettonData = await getTokenData(jettonAddress)
      const { futureAddress } = await poolStateInit(jettonAddress, 0)
      ammMinterAddress = futureAddress
    } catch (e) {
      setError('Jetton was not found')
      setLoading(false)
      return
    }

    const newUserJetton = {
      name: jettonData.name,
      ammMinter: ammMinterAddress.toFriendly(),
      tokenMinter: address,
      color: '#c1c1c1',
      displayName: jettonData.name.toUpperCase(),
      image: jettonData.image,
      isCustom: true,
      decimals: jettonData.decimals,
    }

    setFoundJetton(newUserJetton)
  }

  const onAddToLS = () => {
    let updatedJettons: any[] = getUserJettons()
    updatedJettons = [...updatedJettons.filter((jetton) => jetton.tokenMinter !== foundJetton.tokenMinter), foundJetton]
    window.localStorage.setItem('userJettons', JSON.stringify(updatedJettons))
    setUserJettons(getUserJettons())
    onClose()
  }

  const onDigitEnter = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setError(null)
    setJettonAddress(e.target.value)
  }

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && jettonAddress.length === 48) {
      setLoading(true)
      try {
        Address.parse(jettonAddress)
        onSubmit(jettonAddress)
      } catch (e) {
        setLoading(false)
        setError('Address is incorrect')
        return
      }
    }
  }

  const onClose = () => {
    setError(null)
    setFoundJetton(null)
    setLoading(false)
  }

  return {
    onDigitEnter, error, loading, foundJetton, onKeyPress, userJettons, onClose, onAddToLS,
  }
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
  } = useJettonSearch()
  const [allTokens, setAllTokens] = useState([...userJettons, ...tokens])

  useEffect(() => {
    setAllTokens([...userJettons, ...tokens])
  }, [userJettons, tokens])

  useEffect(() => {
    selectToken(undefined)
    clearStore()
  }, [])

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
                <Typography>Jetton not found</Typography>
                <img src={flexingDuck} alt="Flexing duck" width={119} height={108} />
                <Button sx={{ width: 225, height: 50, background: '#50A7EA', color: '#fff' }}
                        onClick={onClose}>Close</Button>
            </Box>
        </Popup>}
        {!!foundJetton && <Popup open={!!foundJetton} onClose={onClose}>
            <Box px={2} sx={{
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
                <Typography>Jetton pool found</Typography>
                <Box sx={{ width: '100%' }}>
                    <ListToken
                        key={foundJetton.tokenMinter}
                        onSelect={() => {
                        }}
                        token={foundJetton}
                    />
                </Box>
                <Box>
                    <Button sx={{ width: 142, height: 50, background: '#50A7EA', color: '#fff', marginRight: 2 }}
                            onClick={onClose}>Cancel</Button>
                    <Button sx={{ width: 225, height: 50, background: '#50A7EA', color: '#fff' }} onClick={onAddToLS}>Add
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
              }}>
                <img src={search} alt="Search icon" width={24} height={24} />
                <input
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    outline: 'none',
                  }}
                  placeholder="Enter Jetton symbol or address"
                  onChange={onDigitEnter}
                  onKeyDown={onKeyPress}
                />
                <IconButton onClick={() => {
                }}>
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

/*
                sx={{
                  width: '100%',
                  marginBottom: 1,
                  '& label.Mui-focused': {
                    color: 'green',
                    borderRadius: 12,
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'green',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      height: 40,
                      borderColor: 'red',
                      borderRadius: '12px',
                      paddingLeft: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: 'yellow',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'green',
                    },
                  },
              }}
 */