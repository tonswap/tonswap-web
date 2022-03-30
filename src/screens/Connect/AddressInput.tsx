import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormHelperText from "@mui/material/FormHelperText";
import { useTheme } from "@mui/material/styles";
import { useStyles } from "./styles";

interface Props {
  error: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
}

export default function Input({ error, onChange, value, onFocus }: Props) {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <FormControl className={classes.input}>
      <OutlinedInput
        onFocus={onFocus}
        inputProps={{
          style: { paddingTop: 13, paddingBottom: 13, outline: "none" },
        }}
        style={{
          color: "white",
          border: "1px solid white",
          outline: "none",
          borderRadius: 8,
        }}
        value={value}
        placeholder="Enter wallet address"
        onChange={(e) => onChange(e.target.value)}
      />
      {error && (
        <FormHelperText
          className={classes.inputError}
          style={{ color: theme.palette.error.main, fontSize: "14px" }}
        >
          {error}
        </FormHelperText>
      )}
    </FormControl>
  );
}
