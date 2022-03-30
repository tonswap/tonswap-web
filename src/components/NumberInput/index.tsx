import { Box, Button, TextField, Typography } from "@mui/material";
import NumberFormat, { FormatInputValueFunction } from "react-number-format";
import { makeStyles } from "@mui/styles";
import { InputAdornment } from "@mui/material";

interface Props {
  value: string;
  onChange: (val: string) => void;
  title?: string;
  maxAmount: string;
}

const useStyles = makeStyles({
  root: {
    width: "100%",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  flex: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255, 0.1)",
    borderRadius: "12px",
  },
});

export function NumberInput({ value, onChange, title, maxAmount }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {title && (
        <Typography
          component="h5"
          paddingLeft="10px"
          marginBottom="4px"
          fontSize="11px"
        >
          {title}
        </Typography>
      )}
      <Box className={classes.flex}>
        <NumberFormat
          inputProps={{
            sx: {
              padding: 0,
              height: "50px",
              border: "none",
              color: "white",
              fontSize: "30px",
              textIndent: "16px",
              background: "transparent",

              width: "100%",
            },
          }}
          style={{ width: "100%" }}
          autoComplete="off"
          sx={{ border: "none" }}
          value={value}
          customInput={TextField}
          type="text"
          thousandSeparator={","}
          onValueChange={({ value }) => onChange(value)}
        />
        <Button
          onClick={() => onChange(maxAmount)}
          sx={{ color: "white", height: "100%" }}
          variant="text"
        >
          <Typography fontSize={12} fontWeight={700}>
            {" "}
            MAX
          </Typography>
        </Button>
      </Box>
    </Box>
  );
}
