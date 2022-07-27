import { IconButton } from "@mui/material";
import { isMobile } from "react-device-detect";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useStyles } from "./styles";

interface Props {
  onClick: () => void;
}

function MenuToggle({ onClick }: Props) {
  const classes = useStyles();

 
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
