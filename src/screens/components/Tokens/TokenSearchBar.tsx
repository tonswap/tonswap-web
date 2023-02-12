import React from 'react'
import { Box, IconButton, Input } from '@mui/material'
import search from 'assets/images/shared/search.svg'
import clear from 'assets/images/shared/clear.svg'
import { styled } from '@mui/system'
import { useTokenSearch } from 'hooks/useTokenSearch'
import { useTokensStore } from 'store/tokens/hooks'
import { ErrorTokenDialog } from 'screens/components/Tokens/TokenDialogs/ErrorTokenDialog'
import { SuccessTokenDialog } from 'screens/components/Tokens/TokenDialogs/SuccessTokenDialog'

export const TokenSearchBar = () => {
  const {
    onKeyPress,
    onDigitEnter,
    onClear,
  } = useTokenSearch()
  const { address, error, foundJetton } = useTokensStore()
  const { onClose, onAddToLocalStorage, } = useTokenSearch()

  return (
    <Box sx={{ width: '100%' }}>
      {!!error && <ErrorTokenDialog error={error} onClose={onClose} />}
      {!!foundJetton && <SuccessTokenDialog onClose={onClose} foundJetton={foundJetton} onAddToLocalStorage={onAddToLocalStorage} />}
      <ContentContainer>
        <img src={search} alt="Search icon" width={28} height={28} style={{ marginRight: 8 }} />
        <StyledInput
          disableUnderline
          value={address}
          placeholder="Enter Jetton symbol or address"
          onChange={onDigitEnter}
          onKeyDown={(e) => {
            onKeyPress(e)
          }}
        />
        <IconButton onClick={onClear}>
          <img src={clear} alt="Clear icon" width={24} height={24} />
        </IconButton>
      </ContentContainer>
    </Box>
  )
}

const StyledInput = styled(Input)({
  width: '100%',
  height: '100%',
  border: 'none',
  outline: 'none',
  fontSize: 14,
})

const ContentContainer = styled(Box)({
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  border: '1px solid #AEAEAE',
  borderRadius: '12px',
  padding: '0 12px',
})