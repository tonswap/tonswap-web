import { Box, TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";
import { Address } from "ton";

const StyledInputContainer = styled(Box)({
    width: "100%",
    marginBottom: 20,
  });
  
  const StyledInputError = styled(Box)({
    "& p": {
      fontSize: 12,
      color: "red",
      marginTop: 5,
    },
  });
  
  interface SearchInputProps {
    onSubmit: (value: string) => void;
  }
  
  const SearchInput = ({ onSubmit }: SearchInputProps) => {
    const [jettonAddress, setJettonAddress] = useState("");
    const [invalidAddress, setInvalidAddress] = useState(false);
  
    const onChange = async (jettonAddress: string) => {
      setJettonAddress(jettonAddress);
  
      if (jettonAddress.length !== 48) {
        return;
      }
  
      try {
        Address.parse(jettonAddress);
        onSubmit(jettonAddress);
  
        if (invalidAddress) {
          setInvalidAddress(false);
        }
      } catch (error) {
        
        setInvalidAddress(true);
      }
    };
  
    return (
      <StyledInputContainer>
        <TextField
          className="input"
          fullWidth
          label="Enter jetton minter address"
          value={jettonAddress}
          placeholder="EQDrjaLahLkMB-hMCmkzOyBuHJ139ZUYmPHu6RRBKnbdLIYI"
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setInvalidAddress(false)}
        />
        {invalidAddress && (
          <StyledInputError>
            <Typography>Invalid Address</Typography>
          </StyledInputError>
        )}
      </StyledInputContainer>
    );
  };
  

  export default SearchInput