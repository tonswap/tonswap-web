import { Box, Button, TextField, Typography } from "@mui/material";
import NumberFormat from "react-number-format";
import { makeStyles } from "@mui/styles";
import ContentLoader from "components/ContentLoader";

interface Props {
  value?: number;
  onChange: (val: string) => void;
  title?: string;
  maxAmount: number;
  isLoading?: boolean;
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
    position: "relative",
  },
  inputLoader: {
    position: "absolute",
    left: 15,
    top: "50%",
    transform: "translate(0, -50%)",
  },
  maxLoader: {
    position: "absolute",
    right: 15,
    top: "50%",
    transform: "translate(0, -50%)",
  },
});

export function NumberInput({
  value,
  onChange,
  title,
  maxAmount,
  isLoading,
}: Props) {
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
        {isLoading && (
          <>
            <Box className={classes.inputLoader}>
              <ContentLoader width={140} height='100%' borderRadius={3} />
            </Box>
            <Box className={classes.maxLoader}>
              <ContentLoader width={40} height='100%' borderRadius={3} />
            </Box>
          </>
        )}
        <NumberFormat
          inputProps={{
            sx: {
              padding: 0,
              height: "100%",
              border: "none",
              textIndent: "16px",
              background: "transparent",
              width: "100%",
            },
            inputMode: 'decimal'
            
          }}
          style={{ width: "100%", height:'100%' }}
          autoComplete="off"
          sx={{ border: "none" }}
          value={ isLoading ? '' :  value || ''}
          customInput={TextField}
          decimalSeparator="."
          thousandSeparator=","
          onValueChange={({ value }, event: any) => {

            if (event.source !== "prop") {
              onChange(value);
            }
          }}
        />
        {!isLoading && (
          <Button
            onClick={() => onChange(maxAmount.toString())}
            sx={{ color: "white", height: "100%" }}
            variant="text"
          >
            <Typography fontSize={12} fontWeight={700}>
              {" "}
              MAX
            </Typography>
          </Button>
        )}
      </Box>
    </Box>
  );
}
