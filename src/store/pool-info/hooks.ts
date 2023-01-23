import { useTokenOperationsStore } from 'store/token-operations/hooks'
import { client, getPoolData } from 'services/api'
import { Address } from 'ton'
import { setPoolInfo } from 'store/pool-info/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/store'

export const usePoolInfo = () => {
  const { selectedToken } = useTokenOperationsStore();
  const poolInfo = useSelector((state: RootState) => state.poolInfo)
  const dispatch = useDispatch()

  const fetchPoolData = async () => {
    if(!selectedToken || !client) return
    const data = await getPoolData(Address.parse(selectedToken.ammMinter), selectedToken.ammVersion)
    dispatch(setPoolInfo(data))
  }

  return {fetchPoolData, poolInfo}
}