import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    height: 70,
    width: 70,
    borderRadius: "50%",
    display: 'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  image: {
    height: '45%',
    objectFit:'contain'
  }
});

interface Props {
  image: string;
  color: string;
}

function TokenImage({ image, color }: Props) {
  const classes = useStyles();
  return (
    <Box style={{ background: color }} className={classes.root}>
      <img className={classes.image} src={image} />
    </Box>
  );
}

export default TokenImage;
