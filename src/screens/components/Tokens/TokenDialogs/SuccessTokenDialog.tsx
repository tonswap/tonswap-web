import React from 'react'
import { AppPopup } from 'components/AppPopup'
import { Box, Button, Typography } from '@mui/material'
import { isMobile } from 'react-device-detect'
import ListToken from 'screens/components/Tokens/ListToken'
import { styled } from '@mui/styles'
import useUsdValue from 'hooks/useUsdValue'
import { PoolInfo } from 'services/api/addresses'

interface ISuccessTokenDialog {
  foundJetton: any
  onClose: () => void
  onAddToLocalStorage?: () => void
}

const ContentWrapper = styled(Box)(({ isMobile }: { isMobile: boolean }) => ({
  padding: '0 8px',
  minWidth: isMobile ? 300 : 460,
  width: '100%',
  maxWidth: 461,
  maxHeight: 274,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const DialogButton = styled(Button)({
  height: 50,
  background: '#50A7EA',
  color: '#fff',
})

const DialogCancelButton = styled(DialogButton)({
  flex: 1,
  maxWidth: 142,
  marginRight: 2,
})

const DialogSubmitButton = styled(DialogButton)({
  flex: 2,
})

export const SuccessTokenDialog: React.FC<ISuccessTokenDialog> = ({
  foundJetton,
  onAddToLocalStorage,
  onClose,
}) => {
  let { loading, usd } = useUsdValue(
    foundJetton.tokenMinter!,
    '1',
    0,
    foundJetton.isDisabled,
  )

  return (
    <AppPopup open={!!foundJetton} onClose={onClose}>
      <ContentWrapper isMobile={isMobile} px={2}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>Jetton pool found!</Typography>
        <Box mb={2} sx={{ width: '100%' }}>
          <ListToken
            clickDisabled
            custom
            key={foundJetton.tokenMinter}
            onSelect={() => {
            }}
            token={foundJetton}
          />
        </Box>
        {!loading && !parseFloat(usd) && <Box mb={2} sx={{ display: 'flex', width: '100%' }}>
            <Typography>
                Warning: Pool is currently empty
            </Typography>
        </Box>}
        <Box sx={{ display: 'flex', width: '100%' }}>
          <DialogCancelButton onClick={onClose}>Cancel</DialogCancelButton>
          <DialogSubmitButton onClick={onAddToLocalStorage}>Add to list</DialogSubmitButton>
        </Box>
      </ContentWrapper>
    </AppPopup>
  )
}