import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import { styled } from '@mui/material'
import { Box } from '@mui/system'
import { ReactNode } from 'react'

interface Props {
  open: boolean;
  children?: ReactNode;
}

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 10,
});

function FullPageLoader({ open, children }: Props) {

  return (
    <Backdrop
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backdropFilter: "blur(5px) ",
      }}
      open={open}
    >
      <StyledContainer>
        <CircularProgress color="inherit" />
        {children}
      </StyledContainer>
    </Backdrop>
  );
}

export default FullPageLoader;
