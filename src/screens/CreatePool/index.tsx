import { Box, Typography } from "@mui/material";
import { ActionButton, ScreenTitle } from "components";
import { useState } from "react";
import { deployPool, poolStateInit } from "services/api/deploy-pool";
import { Address } from "ton";
import { walletService } from "services/wallets/WalletService";
import { getTokenBalanceByMinter, getTokenData } from "services/api";
import { fromNano } from "ton";
import BN from "bn.js";
import { PoolInfo } from "services/api/addresses";
import { delay, getRandomColor } from "utils";
import { styled } from "@mui/styles";
import FullPageLoader from "components/FullPageLoader";
import useNotification from "hooks/useNotification";
import { StyledContainer } from "./styles";
import SearchInput from "./SearchInput";
import useContractPolling from "hooks/useContractPolling";
import { ROUTES } from "router/routes";
import { useTokensActions } from "store/tokens/hooks";
import { useWalletStore } from "store/wallet/hooks";
import useNavigateWithParams from "hooks/useNavigateWithParams";

const pollingDelay = 5000;
interface jettonData {
  balance: BN;
  name: string;
  image: string;
}

const StyledContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  maxWidth: 400,
});

 function CreatePool() {
  
  const [jettonAddress, setJettonAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState<string | undefined>();
  const [txLoading, setTxLoading] = useState(false);
  const [getTokenLoading, setGetTokenLoading] = useState(false);
  const [tokenData, setTokenData] = useState<jettonData | undefined>();
  const { poll } = useContractPolling();
  const {addToken} = useTokensActions()
  const {adapterId, session} = useWalletStore()

  const navigate = useNavigateWithParams()

  const { showNotification } = useNotification();

  const validateForm = () => {
    return (
      jettonAddress.length &&
      Address.isFriendly(jettonAddress) &&
      tokenData?.name
    );
  };

  const onJettonAddressSubmit = async (jAddress: string) => {
    try {
      setGetTokenLoading(true);
      setJettonAddress(jAddress);

      const address = Address.parse(jAddress);

      const jettonData = await getTokenData(address);
      

      const { futureAddress, isDeployed } = await poolStateInit(address, 0);

      if (isDeployed) {
        addNewPool(
          futureAddress.toFriendly(),
          address.toFriendly(),
          jettonData
        );          
        navigate(`${ROUTES.manageLiquidity.navigateToAddLiquidity.replace(':id', futureAddress.toFriendly())}`);
      } else {
        const jd = await getTokenBalanceByMinter(address);
        let balance = fromNano(jd.balance)
        setTokenData(jettonData);
        setTokenBalance(balance);
        setGetTokenLoading(false);
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e);
        
        setGetTokenLoading(false);
        showNotification({
          message: <>Something went wrong</>,
          variant: "error",
        });
      }
    }
  };

  const addNewPool = async (
    newPool: string,
    jAddress = jettonAddress,
    jData = tokenData
  ) => {
    if (!jData) {
      return;
    }

    const token: PoolInfo = {
      name: jData.name,
      ammMinter: newPool,
      tokenMinter: jAddress,
      color: getRandomColor(),
      displayName: jData.name.toUpperCase(),
      image: jData.image,
      isCustom: true,
    };
    addToken(token);
  };

  const deployPoolTx = async () => {

    try {
      setTxLoading(true);
      const tx = await deployPool(Address.parse(jettonAddress));

      if (!tx) {
        throw new Error("Transaction error");
      }

      if (!tx || tx.error) {        
        throw new Error(tx.error);
      }
      
      await walletService.requestTransaction(
        adapterId!!,
        session,
        tx
      );

      await delay(pollingDelay);

      const onFinish = () => {
        addNewPool(tx.to);
        showNotification({
          message: <>Pool deployed successfully</>,
          variant: "success",
        });
        setTxLoading(false);
        
        navigate(`${ROUTES.manageLiquidity.navigateToAddLiquidity.replace(':id', tx.to)}`);
      };

      const onTimeout = () => {
        showNotification({
          message: <>Something went wrong</>,
          variant: "error",
        });
      };

      poll({ onFinish, onTimeout, contractAddress: tx.to });
    } catch (error) {
      setTxLoading(false);
      if (error instanceof Error) {
        showNotification({
          message: <>Something went wrong</>,
          variant: "error",
        });
      }
    }
  };

  return (
    <StyledContainer>
      <FullPageLoader open={txLoading}>
        <Typography>Deploying pool...</Typography>
      </FullPageLoader>
      <FullPageLoader open={getTokenLoading}>
        <Typography>Loading...</Typography>
      </FullPageLoader>
      <StyledContent>
        <ScreenTitle title="Create a new Pool" />
        <SearchInput onSubmit={onJettonAddressSubmit} />

        {tokenData && (
          <TokenDetails tokenData={tokenData} tokenBalance={tokenBalance} />
        )}

        <ActionButton isDisabled={!validateForm()} onClick={deployPoolTx}>
          Deploy Pool 🚀
        </ActionButton>
      </StyledContent>
    </StyledContainer>
  );
}

interface TokenDetailsProps {
  tokenBalance?: string;
  tokenData: jettonData;
}

const StyledTokenDetails = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: 20,
  marginTop: 20,
  marginBottom: 40,
  "& .token-details-right": {},
  "& img": {
    height: "70px",
    width: "70px",
  },
  "& p": {
    fontSize: 15,
  },
});

const TokenDetails = ({ tokenBalance, tokenData }: TokenDetailsProps) => {
  return (
    <StyledTokenDetails>
      <img src={tokenData.image} alt="" />
      <Box className="token-details-right">
        <Typography>Name: {tokenData.name}</Typography>
        {tokenBalance && (
          <Typography> My Balance: {tokenBalance.toLocaleString()}</Typography>
        )}
      </Box>
    </StyledTokenDetails>
  );
};



export default CreatePool