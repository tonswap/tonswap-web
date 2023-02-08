import { ChangeEvent, useState } from 'react'
import { Address } from 'ton'
import { getTokenData } from 'services/api'
import { poolStateInit } from 'services/api/deploy-pool'
import { isMobile } from 'react-device-detect'

export const useTokenSearch = () => {
  const [jettonAddress, setJettonAddress] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [foundJetton, setFoundJetton] = useState<any>()
  const [userJettons, setUserJettons] = useState<any>(JSON.parse(localStorage.getItem('userJettons') || '[]'))

  const getUserJettons = () => JSON.parse(localStorage.getItem('userJettons') || '[]')

  const onSetError = (val: string | null) => setError(val)
  const onClear = () => setJettonAddress('')

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
      setError('Jetton not found')
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

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement |HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && jettonAddress.length === 48) {
      setLoading(true)
      try {
        Address.parse(jettonAddress)
        onSubmit(jettonAddress)
      } catch (e) {
        setLoading(false)
        setError('Address is incorrect')
        return
      } finally {
        isMobile && setLoading(false)
      }
    }
  }

  const onClose = () => {
    setError(null)
    setFoundJetton(null)
    setLoading(false)
    setJettonAddress('')
  }

  return {
    onDigitEnter,
    error,
    onSetError,
    loading,
    foundJetton,
    onKeyPress,
    jettonAddress,
    userJettons,
    onClose,
    onAddToLS,
    onClear,
  }
}