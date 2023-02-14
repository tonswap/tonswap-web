import { Box, Typography } from '@mui/material'
import { Title } from 'components'
import { useStyles } from './styles'
import Fade from '@mui/material/Fade'
import React, { useEffect, useState } from 'react'
import ListToken from './ListToken'
import { styled } from '@mui/system'
import { PoolInfo } from 'services/api/addresses'
import FullPageLoader from 'components/FullPageLoader'
import { TokenSearchBar } from 'screens/components/Tokens/TokenSearchBar'
import { Address } from 'ton'
import { getTokenData } from 'services/api'
import { poolStateInit } from 'services/api/deploy-pool'
import { useTokenOperationsActions } from 'store/token-operations/hooks'
import { ErrorTokenDialog } from 'screens/components/Tokens/TokenDialogs/ErrorTokenDialog'
import { SuccessTokenDialog } from 'screens/components/Tokens/TokenDialogs/SuccessTokenDialog'
import { useTokensActions, useTokensStore } from 'store/tokens/hooks'
import { useDispatch } from 'react-redux'
import { addUserTokenToLocalStorage } from 'utils'
import { FOUND_JETTON } from 'consts'
import * as API from 'services/api'
import ReactConfetti from 'react-confetti'
import { useWindowSize } from 'hooks/useWindowSize'
import { isMobile } from 'react-device-detect'
import { useTranslation } from 'react-i18next'

interface Props {
  title: string;
  onTokenSelect: (token: PoolInfo) => void;
}

const createToken = async (address: string) => {
  const jettonAddress = Address.parse(address)
  const jettonData = await getTokenData(jettonAddress)
  const { futureAddress } = await poolStateInit(jettonAddress, 0)

  return {
    name: jettonData.name,
    ammMinter: futureAddress.toFriendly(),
    tokenMinter: address,
    color: '#c1c1c1',
    displayName: jettonData.name.toUpperCase(),
    image: jettonData.image,
    isCustom: true,
    decimals: jettonData.decimals,
  }
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
    addUserTokenToLocalStorage(foundToken)
    onClose()
    dispatch(addToken(foundToken))
  }

  const onKeyPress = async (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    //@ts-ignore
    if (tokens.find((token) => token.tokenMinter === e.target.value)) {
      return
    }
    if (e.key === 'Enter' && searchText?.length !== 48) {
      setError('incorrect-address')
    }
    if (e.key === 'Enter' && searchText?.length === 48) {
      setIsLoading(true)
      try {
        Address.parse(searchText)
        const foundToken = await createToken(searchText)
        await API.getPoolData(Address.parse(foundToken.ammMinter));
        setFoundToken(foundToken)
      } catch (error: any) {
        if(error?.message.includes('Got exit_code: -13')) {
          setError('pool-not-found')
          return
        }
        setError('incorrect-address')
      } finally {
        setIsLoading(false)
      }
    }
  }

  const checkInput = () => {
    if (searchText.length <= 5 && searchText.length > 0) {
      !tokens.filter((token) => token.tokenMinter === searchText || token.displayName.toLowerCase().includes(searchText.toLowerCase())).length &&
      setError('jetton-not-found')
    }
  }

  useDebounce(checkInput)

  useEffect(() => {
    if (!foundToken) {
      localStorage.removeItem(FOUND_JETTON)
    } else {
      localStorage.setItem(FOUND_JETTON, JSON.stringify(foundToken))
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
  const {width, height} = useWindowSize()
  const {t} = useTranslation()

  return (
    <Fade in timeout={300}>
      <Box className={classes.root}>
        {!!error && <ErrorTokenDialog error={error} onClose={onClose} />}
        {!!foundToken && <SuccessTokenDialog
            onClose={onClose}
            foundJetton={foundToken}
            onAddToLocalStorage={onTokenAddToLocalStorage}
        />}
        {!!foundToken && <ReactConfetti
            width={width}
            height={height}
            numberOfPieces={isMobile ? 100 : 200}
            style={{zIndex: 9999}}
            recycle={false}
        />}
        <FullPageLoader open={isLoading}>
          <Typography>{t('searching-for-jetton')}</Typography>
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
  zIndex: 10,
  paddingBottom: 10,
})

function useDebounce(value: Function) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(
    () => {
      const handler = setTimeout(() => {
        setDebouncedValue(value)
      }, 1000)
      return () => {
        clearTimeout(handler)
      }
    },
    [value, 1000],
  )
  return debouncedValue
}