import { Box, Theme, Typography } from "@mui/material";
import React, { ReactNode } from "react";
import { makeStyles } from "@mui/styles";
import useWebAppResize from "hooks/useWebAppResize";


const useStyles = makeStyles((theme: Theme) => ({
  titleBox: {
    transition:'0.2s all',
    marginBottom: 65,
    textAlign: "center",
    [theme.breakpoints.down('sm')]: {
      marginBottom: 40,
    }
  },
  logo: {
    transition:'0.2s all',
    height:'38px',
    objectFit:'contain',
    [theme.breakpoints.down('sm')]: {
      height:'30px',
    }
  },
  title: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: 10,
    "& h3": {
      transition:'0.2s all',
      fontSize: 24,
      fontWeight: 500,
      [theme.breakpoints.down('sm')]: {
        fontSize: 19,
      }
    },
  },
  subTitle: {
    marginTop:10
  },
 
}))
interface Props {
  titleImage: string;
  title: string;
  subTitle?: ReactNode | string;
}
export function ScreenTitle({ titleImage, title, subTitle }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.titleBox}>
      <Box className={classes.title}>
        <img src={titleImage} alt='title' className={classes.logo} />
        <Typography component="h3">{title}</Typography>
      </Box>
      {subTitle && <Box className={classes.subTitle}>{subTitle}</Box>}
    </Box>
  );
}
