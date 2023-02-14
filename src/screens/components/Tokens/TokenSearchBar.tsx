import React from 'react'
import { Box, IconButton, Input } from '@mui/material'
import search from 'assets/images/shared/search.svg'
import clear from 'assets/images/shared/clear.svg'
import { styled } from '@mui/system'
import { useTranslation } from 'react-i18next'

interface ITokenSearchBar {
  searchText: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => Promise<void>
  onClear: () => void
}

export const TokenSearchBar: React.FC<ITokenSearchBar> = ({searchText, onChange, onKeyPress, onClear}) => {
  const { t } = useTranslation()

  return (
    <Box sx={{ width: '100%' }}>
      <ContentContainer>
        <img src={search} alt="Search icon" width={28} height={28} style={{ marginRight: 8 }} />
        <StyledInput
          disableUnderline
          value={searchText}
          placeholder={t('search-placeholder')}
          onChange={onChange}
          onKeyDown={onKeyPress}
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