import { Box, Fade, Typography } from "@mui/material";
import { ActionButton } from "components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "router/routes";
import { getPoolData, getTokenData, _getJettonBalance } from "services/api";
import { Address, fromNano } from "ton";
import { getUsdAmount } from "screens/cmponents/TokenOperations/util";
import TonIcon from "assets/images/tokens/ton.svg";
import DefaultTokenIcon from "assets/images/shared/default-token-image.png";
import Loader from "./Loader";
import { observer } from "mobx-react-lite";
import { PoolInfo } from "services/api/addresses";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import {
  StyledContainer,
  StyledHeader,
  StyledPoolTokens,
  StyledPoolActions,
  StyledDetails,
  StyledReserves,
  StyledTvl,
  StyledLockedToken,
  StyledError,
} from "./styles";
import { convertToCurrencySystem } from "utils";
import TokenPreview from "components/TokenPreview";

type Token = {
  name: string;
  image?: string;
  symbol: string;
};

type Pool = {
  tonReserves: string;
  tokenReserves: string;
  tvl: string;
  address: string;
};

const getTokemByAmmMinter = (
  ammMinter: Address,
  tokens: PoolInfo[]
): Token | undefined => {
  const result = tokens.find(
    (t) => t.ammMinter?.toFriendly() === ammMinter.toFriendly()
  );
  if (result) {
    return {
      name: result.name,
      symbol: result.displayName,
      image: result.image,
    };
  }
};

const getPool = async (
  ammMinter: string,
  tokens: PoolInfo[]
): Promise<{ token: Token; pool: Pool }> => {
  const poolAddress = Address.parse(ammMinter);

  const poolDataRaw = await getPoolData(poolAddress);
  if (!poolDataRaw) {
    throw new Error("Failed to find pool");
  }
  const jettonWalletAddress = poolDataRaw.jettonWalletAddress;

  const poolTvl = await getUsdAmount(
    "ton",
    Number(fromNano(poolDataRaw.tonReserves)) * 2
  );

  let tokenData = getTokemByAmmMinter(poolAddress, tokens);
  if (!tokenData) {
    const jData = await _getJettonBalance(jettonWalletAddress);
    const { name, symbol, image } = await getTokenData(jData.jettonMaster!!);
    tokenData = { name, symbol, image };
  }

  if (!tokenData) {
    throw new Error("Failed to get jetton data");
  }

  return {
    token: {
      name: tokenData.name,
      image: tokenData.image,
      symbol: tokenData.symbol,
    },
    pool: {
      tonReserves: Number(fromNano(poolDataRaw.tonReserves)).toFixed(2),
      tokenReserves:  Number(fromNano(poolDataRaw.tokenReserves)).toFixed(2),
      tvl: poolTvl.toFixed(2),
      address: ammMinter,
    },
  };
};

const PoolScreen = observer(() => {
  const navigate = useNavigate();
  const { id: ammMinter } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<Token | undefined>();
  const [pool, setPool] = useState<Pool | undefined>();
  const store = {} as any

  useEffect(() => {
    
    if (ammMinter) {
      (async () => {
        try {
          const data = await getPool(ammMinter, store.tokens);
            setToken(data.token)
            setPool(data.pool)
        } catch (error) {

        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [ammMinter, store.tokens]);

  if (isLoading) {
    return (
      <Fade in>
        <StyledContainer>
          <Loader />
        </StyledContainer>
      </Fade>
    );
  }

  if (!token || !pool) {
    return (
      <StyledContainer>
        <StyledError>
          <ErrorOutlineIcon />
          <Typography>Failed to get Pool info</Typography>
        </StyledError>
      </StyledContainer>
    );
  }

  return (
    <Fade in>
      <StyledContainer>
        <StyledHeader>
          <StyledPoolTokens>
            <img src={token.image || DefaultTokenIcon} />
            <img src={TonIcon} />
            <Box className="pair-name">
              <Typography>{token.name.toUpperCase()} / TON</Typography>
            </Box>
          </StyledPoolTokens>
          <StyledPoolActions>
            <ActionButton
              onClick={() =>
                navigate(ROUTES.actions.addLiquidity.replace(":id", token.name))
              }
            >
              Add Liquidity
            </ActionButton>
            <ActionButton
              onClick={() =>
                navigate(ROUTES.actions.buy.replace(":id", token.name))
              }
            >
              Buy
            </ActionButton>
          </StyledPoolActions>
        </StyledHeader>
        <StyledDetails>
          <StyledReserves>
            <Typography className="reserves-title">
              Total Tokens Locked
            </Typography>
            <Box className="flex">
              <TokenReserves
                name={token.name}
                image={token.image}
                reserves={convertToCurrencySystem(pool.tokenReserves)}
              />
              <TokenReserves
                name="TON"
                image={TonIcon}
                reserves={convertToCurrencySystem(pool.tonReserves)}
              />
            </Box>
          </StyledReserves>
          <StyledTvl>
            <Typography className="tvl-title">TVL</Typography>
            <Typography className="tvl-amount"> {`$${convertToCurrencySystem(pool.tvl)}`}</Typography>
          </StyledTvl>
        </StyledDetails>
      </StyledContainer>
    </Fade>
  );
});

interface TokenReservesProps {
  image?: string;
  name: string;
  reserves: number | string;
}

const TokenReserves = ({ image, name, reserves }: TokenReservesProps) => {
  return (
    <StyledLockedToken>
      <TokenPreview name={name.toUpperCase()} image={image} />
      <Typography className="reserve">{reserves}</Typography>
    </StyledLockedToken>
  );
};

export { PoolScreen };
