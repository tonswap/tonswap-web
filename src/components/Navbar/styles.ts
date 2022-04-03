import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  logoBox: {
    display: "flex",
    alignItems: "center",
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 10,
  },
  menuIcon: {
    color: "#6D6D6D",
  },
  leftGrid: {
    display: "flex",
    alignItems: "center",
  },
  rightGrid: {
    display: "flex",
    alignItems: "center",
    border: `0.5px solid ${theme.palette.primary.main}`,
    height: 35,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 20,
    "& img": {
      marginRight: 10,
    },
    "& p": {
      color: theme.palette.primary.main,
      maxWidth: 85,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
}));

export { useStyles };
