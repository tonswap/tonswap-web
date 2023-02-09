import { Box, Typography } from '@mui/material'
import { Title } from 'components'
import { useStyles } from './styles'
import Fade from '@mui/material/Fade'
import { useState } from 'react'
import ListToken from './ListToken'
import CustomToken from './CustomToken'
import { useTokensStore } from 'store/tokens/hooks'
import { styled } from '@mui/system'
import { PoolInfo } from 'services/api/addresses'
import FullPageLoader from 'components/FullPageLoader'
import { useTokenSearch } from 'hooks/useTokenSearch'
import { ErrorTokenDialog } from 'screens/components/Tokens/TokenDialogs/ErrorTokenDialog'
import { SuccessTokenDialog } from 'screens/components/Tokens/TokenDialogs/SuccessTokenDialog'
import { TokenSearchBar } from 'screens/components/Tokens/TokenSearchBar'

interface Props {
  title: string;
  onTokenSelect: (token: PoolInfo) => void;
}

export const Tokens = ({ title, onTokenSelect }: Props) => {
  const classes = useStyles()
  const [addTokenModal, setAddTokenModal] = useState(false)
  const { onClose, onAddToLocalStorage, } = useTokenSearch()
  const { foundJetton, allTokens, isLoading, error, userTokens } = useTokensStore()

  return (
    <Fade in timeout={300}>
      <Box className={classes.root}>
        {!!error && <ErrorTokenDialog error={error} onClose={onClose} />}
        {!!foundJetton && <SuccessTokenDialog onClose={onClose} foundJetton={foundJetton} onAddToLocalStorage={onAddToLocalStorage} />}
        <FullPageLoader open={isLoading}>
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
            <TokenSearchBar />
            {allTokens.map((token: PoolInfo) => {
              return (
                <ListToken
                  key={token.tokenMinter}
                  onSelect={() => onTokenSelect(token)}
                  token={token}
                  custom={!!userTokens.find((jetton: PoolInfo) => jetton.displayName === token.displayName)}
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