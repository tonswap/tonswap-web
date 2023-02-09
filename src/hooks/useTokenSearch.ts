import { ChangeEvent, useCallback, useEffect } from 'react'
import { Address } from 'ton'
import { isMobile } from 'react-device-detect'
import debounce from 'lodash.debounce'
import { useTokenOperationsActions } from 'store/token-operations/hooks'
import { useTokensStore } from 'store/tokens/hooks'
import { useDispatch } from 'react-redux'
import {
  onAddressChange,
  onSetError,
  onSetFoundJetton,
  onSetIsLoading,
  onSetUsersTokens,
  onSetAllTokens, onResetFoundJetton,
} from 'store/tokens/actions'

export const useTokenSearch = () => {
  const { selectToken } = useTokenOperationsActions()
  const { clearStore } = useTokenOperationsActions()
  const { officialTokens, userTokens, allTokens, address } = useTokensStore()
  const dispatch = useDispatch<any>()

  const onClear = () => dispatch(onAddressChange(''))

  const onDigitEnter = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => dispatch(onAddressChange(e.target.value))

  const onAddToLocalStorage = () => {
    dispatch(onSetUsersTokens())
    onClose()
  }

  const onClose = () => {
    dispatch(onSetError(null))
    dispatch(onSetIsLoading(false))
    dispatch(onAddressChange(''))
    dispatch(onResetFoundJetton())
  }


  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && address.length === 48) {
      dispatch(onSetIsLoading(true))
      try {
        Address.parse(address)
        dispatch(onSetFoundJetton({ address: address }))
      } catch (e) {
        dispatch(onSetIsLoading(false))
        dispatch(onSetError('Address is incorrect'))
        return
      } finally {
        isMobile && dispatch(onSetIsLoading(false))
      }
    }
  }

  useEffect(() => {
    dispatch(onSetAllTokens([...userTokens, ...officialTokens]))
  }, [userTokens, officialTokens])

  useEffect(() => {
    dispatch(onSetAllTokens([...userTokens, ...officialTokens].filter((token) => token.displayName.toLowerCase().includes(address.toLowerCase()))))
  }, [address])

  useEffect(() => {
    selectToken(undefined)
    clearStore()
  }, [])

  const checkInput = () => {
    if (!allTokens?.length && address.length <= 5 && address.length > 0) {
      dispatch(onSetError('Jetton not found'))
    }
  }

  const debouncedSearchHandler = useCallback(debounce(checkInput, 1000)
    , [allTokens, address])

  useEffect(() => {
    debouncedSearchHandler()
    return () => debouncedSearchHandler.cancel()
  }, [address, allTokens])

  return {
    onDigitEnter,
    onKeyPress,
    onClose,
    onAddToLocalStorage,
    onClear,
  }
}