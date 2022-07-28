import { IconButton, Link } from "@mui/material";
import { Box, styled } from "@mui/system";
import { GITHUB, TELEGRAM } from "consts";
import TelegramImg from 'assets/images/socials/telegram.svg'
import GithubImg from 'assets/images/socials/github.svg'


const StyledContainer = styled(Box)({
  display: "flex",
  gap: 20,
  marginTop: "auto",
  "& a": {
    width: 30,
    height: 30,

    "& img": {
        width:'100%',
        height: '100%',
        objectFit:'cover'
    }
  },
});

function Socials() {
  return (
    <StyledContainer>
      <Link href={GITHUB} target='_blank'>
        <img src = {GithubImg} />
      </Link>
      <Link href={TELEGRAM} target='_blank'>
      <img src = {TelegramImg} />
      </Link>
    </StyledContainer>
  );
}

export default Socials;
