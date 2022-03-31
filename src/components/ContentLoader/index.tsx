import Skeleton from "@mui/material/Skeleton";

interface Props {
  height: number | string;
  bgcolor?: string;
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  style?: any;
  borderRadius?: number | string
}

function ContentLoader({
  height,
  bgcolor = "rgba(255,255,255, 0.15)",
  variant,
  width,
  style = {},
  borderRadius = 6
}: Props) {
  return (
    <Skeleton
      style={style}
      height={height}
      sx={{ bgcolor, borderRadius: borderRadius }}
      variant={variant}
      width={width}
      
    />
  );
}

export default ContentLoader;
