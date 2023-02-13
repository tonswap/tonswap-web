import { Box, Typography } from '@mui/material'
import { Title } from 'components'
import { useStyles } from './styles'
import Fade from '@mui/material/Fade'
import React, { useCallback, useEffect, useState } from 'react'
import ListToken from './ListToken'
import { styled } from '@mui/system'
import { PoolInfo } from 'services/api/addresses'
import FullPageLoader from 'components/FullPageLoader'
import { TokenSearchBar } from 'screens/components/Tokens/TokenSearchBar'
import { Address } from 'ton'
import { getTokenData } from 'services/api'
import { poolStateInit } from 'services/api/deploy-pool'
import debounce from 'lodash.debounce'
import { useTokenOperationsActions } from 'store/token-operations/hooks'
import { TOKENS_IN_LOCAL_STORAGE } from 'consts'
import { ErrorTokenDialog } from 'screens/components/Tokens/TokenDialogs/ErrorTokenDialog'
import { SuccessTokenDialog } from 'screens/components/Tokens/TokenDialogs/SuccessTokenDialog'
import { useTokensActions, useTokensStore } from 'store/tokens/hooks'
import { useDispatch } from 'react-redux'

interface Props {
  title: string;
  onTokenSelect: (token: PoolInfo) => void;
}

const useTokenSearch = () => {
  const { selectToken } = useTokenOperationsActions()
  const { clearStore } = useTokenOperationsActions()
  const { addToken } = useTokensActions()
  const { tokens } = useTokensStore()
  const dispatch = useDispatch<any>()

  const [foundToken, setFoundToken] = useState<PoolInfo | null>(null)

  const [searchText, setSearchText] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const onSearchTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setSearchText(e.target.value)

  const onClose = () => {
    setError(null)
    setFoundToken(null)
    setSearchText('')
    setIsLoading(false)
  }

  const onTokenAddToLocalStorage = () => {
    if (!foundToken) {
      return
    }
    let usersTokens: PoolInfo[] = JSON.parse(localStorage.getItem(TOKENS_IN_LOCAL_STORAGE) || '[]')
    usersTokens = [foundToken, ...usersTokens.filter((token) => token.tokenMinter !== foundToken?.tokenMinter)]

    window.localStorage.setItem(TOKENS_IN_LOCAL_STORAGE, JSON.stringify(usersTokens))

    onClose()
    dispatch(addToken(foundToken))
  }

  const verifyFoundToken = async (address: string): Promise<PoolInfo | null> => {
    let jettonAddress
    let jettonData
    let ammMinterAddress

    try {
      jettonAddress = Address.parse(address)
      jettonData = await getTokenData(jettonAddress)
      const { futureAddress } = await poolStateInit(jettonAddress, 0)
      ammMinterAddress = futureAddress

    } catch (error) {
      setError('Jetton not found')
      setIsLoading(false)
      return null
    }

    return {
      name: jettonData.name,
      ammMinter: ammMinterAddress.toFriendly(),
      tokenMinter: address,
      color: '#c1c1c1',
      displayName: jettonData.name.toUpperCase(),
      image: jettonData.image,
      isCustom: true,
      decimals: jettonData.decimals,
    }
  }

  const onKeyPress = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //@ts-ignore
    if (tokens.find((token) => token.tokenMinter === e.target.value)) {
      return
    }
    if (e.key === 'Enter' && searchText?.length === 48) {
      setIsLoading(true)
      try {
        Address.parse(searchText)
        const token = await verifyFoundToken(searchText)
        setFoundToken(token)
      } catch (error) {
        setIsLoading(false)
        setError('Address is incorrect')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const checkInput = () => {
    if (searchText.length <= 5 && searchText.length > 0) {
      !tokens.filter((token) => token.tokenMinter === searchText || token.displayName.toLowerCase().includes(searchText.toLowerCase())).length &&
      setError('Jetton not found')
    }
  }

  const debouncedSearchHandler = useCallback(debounce(checkInput, 1000), [tokens, searchText])

  useEffect(() => {
    debouncedSearchHandler()
    return () => debouncedSearchHandler.cancel()
  }, [tokens, searchText])

  useEffect(() => {
    if (!foundToken) {
      localStorage.removeItem('foundJetton')
    } else {
      localStorage.setItem('foundJetton', JSON.stringify(foundToken))
    }
  }, [foundToken])

  useEffect(() => {
    selectToken(undefined)
    clearStore()
  }, [])

  return {
    tokens,
    foundToken,
    searchText,
    isLoading,
    error,
    onSearchTextChange,
    onClose,
    onTokenAddToLocalStorage,
    onKeyPress,
  }
}

export const Tokens = ({ title, onTokenSelect }: Props) => {
  const classes = useStyles()
  const {
    tokens,
    foundToken,
    onSearchTextChange,
    searchText,
    onTokenAddToLocalStorage,
    isLoading,
    error,
    onKeyPress,
    onClose,
  } = useTokenSearch()

  return (
    <Fade in timeout={300}>
      <Box className={classes.root}>
        {!!error && <ErrorTokenDialog error={error} onClose={onClose} />}
        {!!foundToken && <SuccessTokenDialog
            onClose={onClose}
            foundJetton={foundToken}
            onAddToLocalStorage={onTokenAddToLocalStorage}
        />}
        <FullPageLoader open={isLoading}>
          <Typography>Searching for Jetton</Typography>
        </FullPageLoader>

        <StyledTitle>
          <Title>{title}</Title>
        </StyledTitle>
        <Box className={classes.lists}>
          <StyledContainer>
            <TokenSearchBar
              searchText={searchText}
              onChange={onSearchTextChange}
              onKeyPress={onKeyPress}
              onClear={onClose}
            />
            {tokens.filter((token) => token.tokenMinter === searchText || token.displayName.toLowerCase().includes(searchText.toLowerCase())).map((token) => {
              return (
                <ListToken
                  key={token.tokenMinter}
                  onSelect={() => onTokenSelect(token)}
                  token={token}
                  custom={token.isCustom}
                />
              )
            })}
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