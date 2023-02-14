import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import { isMobile } from 'react-device-detect'
import flexingDuck from 'assets/images/drawings/flexing-duck.svg'
import { AppPopup } from 'components/AppPopup'
import { styled } from '@mui/styles'
import { useTranslation } from 'react-i18next'

interface IErrorTokenDialog {
  error: string
  onClose: () => void
}

const ContentWrapper = styled(Box)(({ isMobile }: { isMobile: boolean }) => ({
  width: isMobile ? 280 : 461,
  height: 274,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
}))

const DialogButton = styled(Button)({
  width: 225,
  height: 50,
  background: '#50A7EA',
  color: '#fff',
})

export const ErrorTokenDialog: React.FC<IErrorTokenDialog> = ({ error, onClose }) => {
  const {t} = useTranslation()

  return (
    <AppPopup flexibleSpacings={false} open={!!error} onClose={onClose}>
      <ContentWrapper isMobile={isMobile}>
        <Typography variant='h5' sx={{ marginBottom: 3 }}>{t(error)}</Typography>
        <img style={{ marginBottom: 24 }} src={flexingDuck} alt="Flexing duck" width={119} height={108} />
        <DialogButton onClick={onClose}>{t('close-button')}</DialogButton>
      </ContentWrapper>
    </AppPopup>
  )
}