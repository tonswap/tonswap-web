import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { ActionButton, Popup } from "components";
import { TOKENS_IN_LOCAL_STORAGE } from "consts";
import { useState } from "react";
import { PoolInfo } from "services/api/addresses";
import { useStore } from "store";
import { Address, fromNano } from "ton";
import { getRandomColor } from "utils";
import { getTokenBalance, getTokenBalanceByMinter, getTokenData, getTonBalance } from "services/api";
import inputs from "./data";
import { poolStateInit } from "services/api/deploy-pool";
import * as API from "services/api";

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
  const [poolMinter, setPoolMinter] = useState("");
  const [isPoolDeployed, setIsPoolDeployed] = useState(false);
  const [tokenData, setTokenData] = useState({name:"", image:"", ammMinter:"", tokenMinter:""});
  const [poolData, setPoolData] = useState({tonReserves:"", tokenReserves:""});
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
    try {
      const token: PoolInfo = {
        name: tokenData.name,
        ammMinter: Address.parse(data.ammMinter),
        tokenMinter: Address.parse(data.tokenMinter),
        color: getRandomColor(),
        displayName: tokenData.name.toUpperCase(),
        image: tokenData.image,
      };
       
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

  const onChange = async (e: any) => {
    const tokenMinter = e.target.value;
    const address = Address.parse(tokenMinter);
    const jettonData = await getTokenData(address);
    const jd = await getTokenBalanceByMinter(address)
    
    const { futureAddress, isDeployed } = await poolStateInit(tokenMinter, 0);
    setTokenData({ ...jettonData, tokenMinter, ammMinter: futureAddress});
    setPoolMinter(futureAddress.toFriendly());
    setIsPoolDeployed(isDeployed);
    if(isDeployed) {
      const pdata = await API.getPoolData(futureAddress);
      debugger
      // @ts-ignore
      setPoolData(pdata)
    }
  }

  return (
    <Popup open={open} onClose={onClose}>
      <StyledContainer>
        <StyledTitle>Add custom token</StyledTitle>
        <StyledInputs>
              <StyledInput key = "tokenMinter">

                <TextField
                  label="jetton address"
                  onChange={onChange}
                />
                
                  {/* <StyledError>'jetton address is invalid'</StyledError> */}
              </StyledInput>
              <div><img  style={{ height:"24px", width:'24px',  position: "relative",top: "5px",left: "-5px"}} src={tokenData?.image} alt="" ></img><b>{tokenData?.name}</b></div>
              <StyledInput key = "ammMinter">
                <TextField
                  label="amm address"
                  value={poolMinter}
                  disabled
                />
                <br></br>
                {
                  isPoolDeployed ?   
                  (
                    <div>
                    <div>✅ Pool Reservers ({tokenData?.name})-TON </div>
                    <div>Token: {fromNano(poolData.tokenReserves)} 🪙</div>
                    <div>Ton: {fromNano(poolData.tonReserves)} 💎</div>
                    </div>
                  )  : (<div>⛔️ Pool not found</div>) 

                }
                
                
                  {/* <StyledError>'jetton address is invalid'</StyledError> */}
              </StyledInput>
           
        </StyledInputs>
        <Box marginTop="50px">
          <ActionButton isDisabled={!isPoolDeployed} onClick={create}>Add token</ActionButton>
        </Box>
      </StyledContainer>
    </Popup>
  );
}

export default AddCustomToken;
