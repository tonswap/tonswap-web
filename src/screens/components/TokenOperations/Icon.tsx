import { Box, styled } from "@mui/system";
import useWebAppResize from "hooks/useWebAppResize";

interface Props {
  icon: any;
  color: string;
}

const StylesIcon = styled(Box)(
  ({ color, expanded }: { color: string; expanded: boolean }) => ({
    marginLeft: "auto",
    marginRight: "auto",
    width: expanded ? 33 : 28,
    height: expanded ? 33 : 28,
    marginTop: 16,
    borderRadius: "50%",
    marginBottom: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${color}`,
    "& svg": {
      width: "70%",
      "& path": {
        fill: color,
      },
    },
  })
);

function Icon({ icon, color }: Props) {
  const expanded = useWebAppResize();
  return (
    <StylesIcon color={color} expanded={expanded}>
      {icon}
    </StylesIcon>
  );
}

export default Icon;
