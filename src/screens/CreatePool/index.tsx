import { Box, Typography } from "@mui/material";
import { ActionButton, ScreenTitle } from "components";
import { useEffect, useState } from "react";
import { Address } from "ton";
import { styled } from "@mui/styles";
import FullPageLoader from "components/FullPageLoader";
import { StyledContainer } from "./styles";
import SearchInput from "./SearchInput";
import {
  useCreatePoolActions,
  useCreatePoolStore,
} from "store/create-pool/hooks";
import BigNumberDisplay from "components/BigNumberDisplay";
import { useWalletStore } from "store/wallet/hooks";
import { useWalletModalToggle } from "store/application/hooks";
import { useTranslation } from "react-i18next";

const StyledContent = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  maxWidth: 400,
});

function CreatePool() {
  const [txLoading, setTxLoading] = useState(false);
  const [getTokenLoading, setGetTokenLoading] = useState(false);

  const { onSubmit, deployPoolTx, clearStore } = useCreatePoolActions();
  const { tokenData, jettonAddress } = useCreatePoolStore();
  const { address } = useWalletStore();
  const toggle = useWalletModalToggle();
  const { t } = useTranslation();

  const validateForm = () => {
    return (
      jettonAddress.length &&
      Address.isFriendly(jettonAddress) &&
      tokenData?.name
    );
  };

  const onJettonAddressSubmit = async (jAddress: string) => {
    setGetTokenLoading(true);
    await onSubmit(jAddress);
    setGetTokenLoading(false);
  };

  const onDeploy = async () => {
    setTxLoading(true);
    await deployPoolTx();
    setTxLoading(false);
  };

  useEffect(() => {
    clearStore();
  }, [clearStore]);

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

        <TokenDetails />

        {address ? (
          <ActionButton isDisabled={!validateForm()} onClick={onDeploy}>
            Deploy Pool 🚀
          </ActionButton>
        ) : (
          <ActionButton onClick={toggle}>{t('connect-wallet')}</ActionButton>
        )}
      </StyledContent>
    </StyledContainer>
  );
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

const TokenDetails = () => {
  const { tokenData } = useCreatePoolStore();

  if (!tokenData) {
    return null;
  }

  return (
    <StyledTokenDetails>
      <img src={tokenData.image} alt="" />
      <Box className="token-details-right">
        <Typography>Name: {tokenData.name}</Typography>
        <Typography>
          {" "}
          My Balance: <BigNumberDisplay value={tokenData.balance} />
        </Typography>
      </Box>
    </StyledTokenDetails>
  );
};

export default CreatePool;
