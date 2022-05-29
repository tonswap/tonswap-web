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
 
  link: {
    textDecoration:'none',
    color: '#6D6D6D'
  }
}));

export { useStyles };
