import { TextField, Typography } from "@mui/material";
import { styled } from "@mui/styles";
import { Box } from "@mui/system";
import { ActionButton, Popup } from "components";
import { useState } from "react";
import { PoolInfo } from "services/api/addresses";
import { useStore } from "store";
import { Address, fromNano } from "ton";
import { convertToCurrencySystem, getRandomColor } from "utils";
import { getTokenData } from "services/api";
import { poolStateInit } from "services/api/deploy-pool";
import * as API from "services/api";
import TokenPreview from "components/TokenPreview";
import TonIcon from "assets/images/tokens/ton.svg";
import AddressText from "components/AddressText";
import FullPageLoader from "components/FullPageLoader";

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
  "& input": {},
});

interface Props {
  open: boolean;
  onClose: () => void;
}

type Token = {
  name: string;
  image?: string;
  ammMinter: string;
  tokenMinter: string;
};

type Pool = {
  tonReserves: string;
  tokenReserves: string;
};

function AddCustomToken({ open, onClose }: Props) {
  const [isPoolDeployed, setIsPoolDeployed] = useState(false);
  const [token, setToken] = useState<Token | undefined>();
  const [pool, setPool] = useState<Pool | undefined>();
  const [getTokenLoading, setGetTokenLoading] = useState(false);
  const [jettonAddress, setJettonAddress] = useState("");
  const store = useStore();

  const create = (tokenData: Token) => {
    try {
      const newToken: PoolInfo = {
        name: tokenData.name,
        ammMinter: Address.parse(tokenData.ammMinter),
        tokenMinter: Address.parse(tokenData.tokenMinter),
        color: getRandomColor(),
        displayName: tokenData.name.toUpperCase(),
        image: tokenData.image,
        isCustom: true,
      };

      store.addToken(newToken);
      onClose();
    } catch (error) {}
  };

  const onChange = async (e: any) => {
    const value = e.target.value;
    setJettonAddress(value);
    if (value.length !== 48) {
      return;
    }
    try {
      const address = Address.parse(value);
      setGetTokenLoading(true);
      const jettonData = await getTokenData(address);

      const { futureAddress, isDeployed } = await poolStateInit(value, 0);

      if (isDeployed) {
        const poolData = await API.getPoolData(futureAddress);
        setPool({
          tokenReserves: parseFloat(fromNano(poolData.tokenReserves)).toFixed(
            2
          ),
          tonReserves: parseFloat(fromNano(poolData.tonReserves)).toFixed(2),
        });
      }
      setToken({
        ...jettonData,
        tokenMinter: value,
        ammMinter: futureAddress.toFriendly(),
      });
      setIsPoolDeployed(isDeployed);
    } catch (error) {
    } finally {
      setGetTokenLoading(false);
    }
  };

  const onCreate = () => {
    if (token) {
      create(token);
    }
  };

  const StyledTokenDetails = styled(Box)({});

  return (
    <Popup open={open} onClose={onClose}>
      <FullPageLoader open={getTokenLoading}>
        <Typography>Loading...</Typography>
      </FullPageLoader>
      <StyledContainer>
        <StyledTitle>Add custom token</StyledTitle>
        <StyledInput>
          <TextField
            label="Jetton address"
            onChange={onChange}
            value={jettonAddress}
          />
        </StyledInput>

        {token && (
          <StyledTokenDetails>
            <TokenPreview name={token.name.toUpperCase()} image={token.image} />
            <Box>
              <Typography>Amm minter: </Typography>
              <AddressText address={token.ammMinter} />
            </Box>
          </StyledTokenDetails>
        )}

        {isPoolDeployed && token && pool && (
          <Box>
            <Typography>
              Pool Reservers {token.name.toUpperCase()}-TON
            </Typography>
            <Box>
              <TokenPreview
                name={token.name.toUpperCase()}
                image={token.image}
              />
              <Typography>
                {convertToCurrencySystem(pool.tokenReserves)}
              </Typography>
            </Box>
            <Box>
              <TokenPreview name={token.name.toUpperCase()} image={TonIcon} />
              <Typography>
                {convertToCurrencySystem(pool.tonReserves)}
              </Typography>
            </Box>
          </Box>
        )}

        <Box marginTop="50px">
          <ActionButton isDisabled={!isPoolDeployed} onClick={onCreate}>
            Add token
          </ActionButton>
        </Box>
      </StyledContainer>
    </Popup>
  );
}

export default AddCustomToken;
