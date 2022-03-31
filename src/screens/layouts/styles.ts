import { makeStyles } from "@mui/styles";

import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    paddingBottom: 20,
    alignItems:'center',

  },
}));

export { useStyles };
