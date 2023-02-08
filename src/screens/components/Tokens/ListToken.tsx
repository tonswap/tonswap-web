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

interface Props {
  token: PoolInfo;
  onSelect: () => void;
  custom?: boolean
}

const ListToken = ({ token, onSelect, custom }: Props) => {
  const classes = useStyles()
  let { loading, usd } = useUsdValue(
    token.tokenMinter!,
    '1',
    0,
    token.isDisabled,
  )
  const { t } = useTranslation()

  return (
    <StyledToken
      color={token.color}
      onClick={token.isDisabled ? () => {
      } : onSelect}
      style={{
        cursor: token.isDisabled ? '' : 'pointer',
        opacity: token.isDisabled ? 0.4 : 1,
      }}
    >
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        border: custom ? '1px solid #BDCBC5' : 'none',
        padding: '2px 14px',
        borderRadius: '10px',
      }}>
        {token.image && <Box mr={2}>
            <StyledImage src={token.image} alt="token" />
        </Box>}
        <StyledTokenTexts>
          <Typography className="symbol">
            {token.displayName} {token.isDisabled ? t('coming-soon') : ''}
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
  )
}
export default ListToken
