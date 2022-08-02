import { Box, TextField } from "@mui/material";
import NumberFormat from "react-number-format";
import ContentLoader from "components/ContentLoader";
import { styled } from "@mui/system";
import { DECIMALS_LIMIT } from "consts";

interface Props {
  value?: string;
  onChange: (val: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

const StyledContainer = styled(Box)({
  height: "100%",
  width: "100%",
  position: "relative",
  display: "flex",
  alignItems: "center",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
});

const StyledLoader = styled(Box)({
  position: "absolute",
  left: 15,
  top: "50%",
  transform: "translate(0, -50%)",
});

export function NumberInput({
  value,
  onChange,
  isLoading,
  placeholder,
}: Props) {
  return (
    <StyledContainer className="input-container">
      {isLoading && (
        <StyledLoader>
          <ContentLoader width={140} height={30} borderRadius={3} />
        </StyledLoader>
      )}
      <NumberFormat
        inputProps={{
          sx: {
            padding: 0,
            border: "none",
            textIndent: "16px",
            background: "transparent",
          },
          inputMode: "decimal",
        }}
        className="input"
        placeholder={isLoading ? "" : placeholder}
        autoComplete="off"
        value={isLoading ? "" : value || ""}
        customInput={TextField}
        decimalScale={DECIMALS_LIMIT}
        decimalSeparator="."
        thousandSeparator=","
        onValueChange={({ value }, event: any) => {
          if (event.source !== "prop") {
            console.log(value);
            if (value === ".") {
              onChange("0.") ;
            }else{
              onChange(value);
            }
            
          }
        }}
      />
    </StyledContainer>
  );
}
