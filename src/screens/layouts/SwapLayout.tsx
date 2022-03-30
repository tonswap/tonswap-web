import { ScreenTitle } from "components";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ReactNode } from "react";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import Fade from "@mui/material/Fade";

interface Props {
  children: ReactNode;
  title: string;
  subTitle?: ReactNode | string;
  titleImage: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
      display: 'flex',
      flexDirection:'column',
      alignItems:'center',
      maxWidth:'380px',
   
      height: '100%',
      paddingTop: 55,
      [theme.breakpoints.down('sm')]: {
        paddingTop: 0,
      }
  }
}))

export function SwapLayout({ children, titleImage, title, subTitle }: Props) {
  const classes = useStyles()
  useTokenFromParams();
  return (
    <Fade in>
    <Box className={classes.root}>
      <ScreenTitle title={title} subTitle={subTitle} titleImage={titleImage} />
      {children}
    </Box>
    </Fade>
  );
}
