import { Box, styled } from "@mui/system";
import { useIsExpandedView } from "store/application/hooks";

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
    marginTop: 8,
    borderRadius: "50%",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // border: `1px solid ${color}`,
    "& svg": {
      width: "70%",
      "& path": {
        fill: color,
      },
    },
  })
);

function Icon({ icon, color }: Props) {
  const expanded = useIsExpandedView();
  return (
    <StylesIcon color={color} expanded={expanded}>
      {icon}
    </StylesIcon>
  );
}

export default Icon;
