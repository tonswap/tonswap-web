import { Typography } from "@mui/material";
import { ReactNode } from "react";

export function Title({ children }: { children: ReactNode }) {
  return (
    <Typography  component="h3" fontSize={24} fontWeight={500}>
      {children}
    </Typography>
  );
}

