import { Box, Typography } from "@mui/material";
import React, { ReactNode } from "react";

import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  titleBox: {
    marginBottom: 65,
    textAlign: "center",
  },
  title: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: 10,
    "& h3": {
      fontSize: 24,
      fontWeight: 500,
    },
  },
  subTitle: {
    marginTop:10
  },
}));
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
        <img src={titleImage} />
        <Typography component="h3">{title}</Typography>
      </Box>
      {subTitle && <Box className={classes.subTitle}>{subTitle}</Box>}
    </Box>
  );
}
