import { createAction } from '@reduxjs/toolkit'
import { IPoolInfo } from 'store/pool-info/reducer'

export const setPoolInfo = createAction<IPoolInfo>("poolInfo/setPoolInfo");
