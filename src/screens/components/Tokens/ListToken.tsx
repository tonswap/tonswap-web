import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import BigNumberDisplay from 'components/BigNumberDisplay'
import ContentLoader from 'components/ContentLoader'
import useUsdValue from 'hooks/useUsdValue'
import { useTranslation } from 'react-i18next'
import { PoolInfo } from 'services/api/addresses'
import {
  StyledImage,
  StyledToken,
  StyledTokenTexts,
  StyledUsdValue,
  useStyles,
} from './styles'
import { useState } from 'react'
import { ErrorTokenDialog } from 'screens/components/Tokens/TokenDialogs/ErrorTokenDialog'

interface Props {
  token: PoolInfo;
  onSelect: () => void;
  custom?: boolean
  clickDisabled?: boolean
}

const ListToken = ({ token, onSelect, custom, clickDisabled }: Props) => {
  const classes = useStyles()
  let { loading, usd } = useUsdValue(
    token.tokenMinter!,
    '1',
    0,
    token.isDisabled,
  )
  const isDisabled = (token.isDisabled || !parseFloat(usd)) && !window.location.href.includes('manage-liquidity')
  const { t } = useTranslation()
  const [showError, setShowError] = useState<string | null>(null)

  const onClick = () => {
    if(clickDisabled) {
      return
    }else if(isDisabled) {
      setShowError('Trading pool is empty. Try again later')
      return
    }
    else {
      onSelect()
    }
  }

  return (
    <>
      {!!showError && <ErrorTokenDialog error={showError} onClose={() => setShowError(null)} />}
      <StyledToken
        color={token.color}
        onClick={onClick}
        style={{ position: 'relative' }}
      >
        {isDisabled && <Box sx={{
          cursor: 'default',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '12px',
          zIndex: 9,
          background: !parseFloat(usd) && !loading ? 'rgba(0,0,0, .5)' : 'none',
        }} />}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          border: custom ? '1px solid #fff' : 'none',
          padding: '2px 14px',
          borderRadius: '10px',
        }}>
          {token.image && <Box mr={2}>
              <StyledImage src={token.image} alt="token" />
          </Box>}
          <StyledTokenTexts>
            <Typography className="symbol">
              {token.displayName}
            </Typography>
            <Typography className="name">{token.name}</Typography>
          </StyledTokenTexts>
          <StyledUsdValue>
            {loading ? (
              <ContentLoader borderRadius="8px" width={40} height={20} />
            ) : (
              <Typography>
                <BigNumberDisplay prefix="$" value={usd} decimalScale={6} />
              </Typography>
            )}
          </StyledUsdValue>
        </Box>
      </StyledToken>
    </>
  )
}
export default ListToken
