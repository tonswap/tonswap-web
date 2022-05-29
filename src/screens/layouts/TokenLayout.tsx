import { ScreenTitle } from "components";
import useTokenFromParams from "hooks/useTokenFromParams";
import { ReactNode, useEffect } from "react";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";

interface Props {
  children: ReactNode;
  title: string;
  subTitle?: ReactNode | string;
  titleImage: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: "380px",
    width: "100%",
    paddingTop: 40,
    paddingBottom: 60,
    [theme.breakpoints.down("sm")]: {
      paddingTop: 0,
      paddingBottom: 0,
      flex: 1,
    },
 
  },
}));

export function TokenLayout({ children, titleImage, title, subTitle }: Props) {
  const classes = useStyles();
  useTokenFromParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className={classes.root}>
      <ScreenTitle title={title} subTitle={subTitle} titleImage={titleImage} />
      {children}
    </Box>
  );
}
