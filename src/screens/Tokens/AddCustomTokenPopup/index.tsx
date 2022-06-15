import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { ActionButton, Popup } from "components";
import { TOKENS_IN_LOCAL_STORAGE } from "consts";
import { useState } from "react";
import { PoolInfo } from "services/api/addresses";
import { useStore } from "store";
import { Address } from "ton";
import { getRandomColor } from "utils";
import inputs from "./data";

const StyledContainer = styled(Box)({
  maxWidth: "500px",
  width: "100%",
  height: "auto",
  background: "white",
  marginLeft: "auto",
  marginRight: "auto",
  padding: 20,
  display: "flex",
  flexDirection: "column",
});

const StyledInputs = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 15,
  marginTop: 30,
});

const StyledTitle = styled(Typography)({
  fontSize: 26,
  textAlign: "center",
  fontWeight: 500,
});

const StyledInput = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  "& input": {
  }
});

const StyledError = styled(Typography)({
  fontSize: 12,
  marginTop:3
})

interface Data {
  name: string;
  ammMinter: string;
  tokenMinter: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

interface Errors {
  name?: boolean;
  ammMinter?: boolean;
  tokenMinter?: boolean;
}

function isCleanFromErrors(obj: Errors) {
  return Object.values(obj).every((x) => x === null || x === "");
}

const validate = (data: Data) => {
  const { name, ammMinter, tokenMinter } = data;
  const errors: Errors = {};
  if (!name) {
    errors.name = true;
  }
  try {
    Address.parse(ammMinter);
  } catch (error) {
    errors.ammMinter = true;
  }
  try {
    Address.parse(tokenMinter);
  } catch (error) {
    errors.tokenMinter = true;
  }
  return errors;
};

function AddCustomToken({ open, onClose }: Props) {
  const [data, setData] = useState<Data>({} as Data);
  const [inputErros, setInputErros] = useState<Errors>({} as Errors);
  const store = useStore();

  const updateData = (name: string, value: string) => {
    setData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const create = () => {
    const errors = validate(data);
    if (!isCleanFromErrors(errors)) {
      setInputErros(errors);
      return;
    }
    try {
      const token: PoolInfo = {
        name: data.name,
        ammMinter: Address.parse(data.ammMinter),
        tokenMinter: Address.parse(data.tokenMinter),
        color: getRandomColor(),
        displayName: data.name.toUpperCase(),
        image: "",
      };
      console.log(token.ammMinter);
      
     localStorage.setItem(TOKENS_IN_LOCAL_STORAGE, JSON.stringify(token.ammMinter) )
     const res = localStorage.getItem(TOKENS_IN_LOCAL_STORAGE)
  
      
      store.addToken(token);
      setData({} as Data)
      onClose()
    } catch (error) {}
  };

  const onFocus = (name: keyof Errors) => {
    setInputErros((prevState) => {
      return {
        ...prevState,
        [name]: null,
      };
    });
  };
  return (
    <Popup open={open} onClose={onClose}>
      <StyledContainer>
        <StyledTitle>Add custom token</StyledTitle>
        <StyledInputs>
          {inputs.map((input) => {
            const { name, label, error } = input;
            const errorKey = name as keyof Errors;
            return (
              <StyledInput key = {name}>
                <TextField
                  onFocus={() => onFocus(errorKey)}
                  label={label}
                  value={data[name as keyof Data] || ""}
                  onChange={(e) => updateData(name, e.target.value)}
                />
                {inputErros[errorKey] && (
                  <StyledError>{error}</StyledError>
                )}
              </StyledInput>
            );
          })}
        </StyledInputs>
        <Box marginTop="50px">
          <ActionButton onClick={create}>Add token</ActionButton>
        </Box>
      </StyledContainer>
    </Popup>
  );
}

export default AddCustomToken;
