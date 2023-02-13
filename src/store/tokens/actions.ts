import { createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { PoolInfo } from 'services/api/addresses'
import { Address } from 'ton'
import { getTokenData } from 'services/api'
import { poolStateInit } from 'services/api/deploy-pool'

export const onAddressChange = createAction<string>('tokens/onAddressChange')

export const onSetError = createAction<string | null>('tokens/onSetError')

export const onSetIsLoading = createAction<boolean>('tokens/onSetIsLoading')

export const onSetFoundJetton = createAsyncThunk<PoolInfo | null,
  {
    address: string
  }>('tokens/onSetFoundJetton', async ({
  address,
}, thunkAPI) => {
  let jettonAddress
  let jettonData
  let ammMinterAddress

  if(!address.length) {
    return null
  }

  try {
    jettonAddress = Address.parse(address)
    jettonData = await getTokenData(jettonAddress)
    const { futureAddress } = await poolStateInit(jettonAddress, 0)
    ammMinterAddress = futureAddress
  } catch (error) {
    onSetError('Jetton not found')
    onSetIsLoading(false)
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
})

export const onSetUsersTokens = createAction('tokens/onSetUsersTokens')

export const onSetAllTokens = createAction<PoolInfo[]>('tokens/onSetAllTokens')

export const onResetFoundJetton = createAction('tokens/onResetFoundJetton')