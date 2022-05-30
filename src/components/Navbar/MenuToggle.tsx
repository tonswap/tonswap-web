import { IconButton } from "@mui/material";
import { isMobile } from "react-device-detect";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useStyles } from "./styles";

interface Props {
  onClick: () => void;
  show: boolean;
}

function MenuToggle({ onClick, show }: Props) {
  const classes = useStyles();

  if(!show){
      return null
  }
  return (
    <IconButton
      onClick={onClick}
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
      style={{
        padding: 0,
        marginLeft: 0,
        marginRight: isMobile ? 10 : 28,
      }}
    >
      <MenuRoundedIcon fontSize="large" className={classes.menuIcon} />
    </IconButton>
  );
}

export default MenuToggle;
