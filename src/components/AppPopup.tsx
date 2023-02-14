import React from 'react'
import Dialog from '@mui/material/Dialog'
import { isMobile } from 'react-device-detect'
import { Box, IconButton } from '@mui/material'
import clear from 'assets/images/shared/clear.svg'
import { styled } from '@mui/system'
import { StyledDialogContent } from 'components/Popup'

interface IAppPopup {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  maxWidth?: number
  minWidth?: number
  backgroundColor?: string,
  flexibleSpacings?: boolean
}

const PopupContentWrapper = styled(StyledDialogContent)(({isMobile}: {isMobile: boolean}) => ({
  padding: isMobile ? '5px' : "15px",
  paddingBottom: isMobile? '20px' : '25px',
  paddingTop: '15px',
}))

const CloseButtonWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%'
})

export const AppPopup = ({
  open,
  onClose,
  maxWidth,
  minWidth,
  backgroundColor = 'rgba(48, 48, 48, 0.8)',
  flexibleSpacings = true,
  children,
}: IAppPopup) => {
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          width: '100%',
          height: '100%',
          maxWidth: 'unset',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      }}
      BackdropProps={{
        style: {
          backgroundColor,
        },
      }}
    >
      <PopupContentWrapper isMobile={flexibleSpacings ? isMobile : false} maxWidth={maxWidth} minWidth={minWidth}>
        <CloseButtonWrapper>
          <IconButton onClick={onClose} sx={{padding: 0}}>
            <img src={clear} width={24} height={24} alt="Close icon" />
          </IconButton>
        </CloseButtonWrapper>
        <Box>{children}</Box>
      </PopupContentWrapper>
    </Dialog>
  )
}