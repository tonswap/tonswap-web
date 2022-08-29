import { NumberInput } from "components/NumberInput";
import { PoolInfo } from "services/api/addresses";
import { ROUTES } from "router/routes";
import { ton } from "tokens";
import { styled, Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";
import Balance from "./Balance";
import UsdAmount from "./UsdAmount";
import useNavigateWithParams from "hooks/useNavigateWithParams";
import {
  useApplicationStore,
  useIsExpandedView,
} from "store/application/hooks";
import { OperationType } from "store/application/reducer";
import { useWalletStore } from "store/wallet/hooks";
import gaAnalytics from "services/analytics/ga/ga";
import TradeInfo from "screens/components/TokenOperations/TradeInfo";
import { ActionType } from "services/wallets/types";

interface Props {
  inputAmount?: string;
  balance: string;
  onChange: (val: string) => void;
  token: PoolInfo;
  isLoading?: boolean;
  balanceLoading: boolean;
  onMaxAmount?: () => void;
  showMax?: boolean;
  srcTokenAmount?: string;
  actionType?: ActionType;
}

function SwapCard({
  inputAmount,
  onChange,
  token,
  isLoading,
  balanceLoading,
  balance,
  onMaxAmount,
  showMax,
  srcTokenAmount,
  actionType
}: Props) {
  const expanded = useIsExpandedView();
  const navigate = useNavigateWithParams();
  const { operationType } = useApplicationStore();
  const { address } = useWalletStore();

  const isTon = token.name === ton.name;


  const onMax = () => {
    gaAnalytics.onMaxClick()
    onMaxAmount?.()
  }

  const onTokenSelect = () => {
    if (isTon) {
      return;
    }
    if (operationType === OperationType.SWAP) {
      gaAnalytics.changeTokenInTrade(token.name)
      navigate(ROUTES.swap.navigateToTokens);
    } else {
      gaAnalytics.changeTokenInManageLiquidity(token.name)
      navigate(ROUTES.manageLiquidity.navigateToTokens);
    }
  };

  return (
    <>
      <StyledContainer className="swap-card">
        <StyledBg color={token.color} />
        <div style={{ position: "relative" }}>
          <StyledInput expanded={expanded}>
            <NumberInput
              placeholder="0"
              isLoading={isLoading}
              value={inputAmount}
              onChange={(val) => onChange(val)}
            />
            <StyledTokenDisplay
              style={{
                cursor: isTon ? "" : "pointer",
                userSelect: isTon ? "none" : "all",
              }}
              onClick={onTokenSelect}
            >
              {token.image && <StyledAvatar src={token.image} alt="token" />}
              <Typography className="name">{token.displayName}</Typography>
              {!isTon && <div className="arrow"></div>}
            </StyledTokenDisplay>
          </StyledInput>

          <StyledBottom>
            {address && (
              <>
                <UsdAmount
                  isLoading={isLoading}
                  value={inputAmount}
                  tokenId={token.tokenMinter}
                />
                <Balance
                  availableAmount={balance}
                  displayName={token.displayName}
                  loading={balanceLoading}
                  onMaxAmountClick={onMax}
                  showMax={showMax}
                />
              </>
            )}
          </StyledBottom>
        </div>
      </StyledContainer>
      {srcTokenAmount && actionType &&
        <StyledFooterTradeInfo>
          <TradeInfo delta={srcTokenAmount} actionType={actionType} tokenColor={token.color} />
        </StyledFooterTradeInfo>}
    </>
  );
}

export default SwapCard;

const StyledContainer = styled(Box)({
  borderRadius: 12,
  padding: "18px",
  display: "flex",
  position: "relative",
  overflow: "hidden",
  flexDirection: "column",
});

const StyledTokenDisplay = styled(Box)({
  padding: "0px 8px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  position: "relative",
  background: "rgba(255,255,255, 0.1)",
  borderRadius: 12,
  height: "100%",
  boxShadow: "rgb(0 0 0 / 8%) 0px 6px 10px",
  ".name": {
    maxWidth: 70,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  ".arrow": {
    width: 7,
    height: 7,
    borderLeft: "2px solid white",
    borderBottom: "2px solid white",
    transform: "rotate(-45deg)",
    position: "relative",
    top: "-2px",
  },
  p: {
    color: "white",
    fontSize: 12,
    fontWeight: 600,
  },
});

const StyledAvatar = styled(Avatar)({
  width: 24,
  height: 24,
});

const StyledBottom = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: 25,
  marginTop: 10,
  p: {
    color: "white",
    fontSize: 12,
    fontWeight: 400,
  },
});

const StyledFooterTradeInfo = styled(Box)({
  alignItems: "center",
  position: "relative",
  bottom: 16,
  p: {
    color: "white",
    fontSize: 12,
    fontWeight: 400,
  },
});

const StyledInput = styled(Box)(({ expanded }: { expanded: boolean }) => ({
  paddingRight: 10,
  position: "relative",
  background: "rgba(255,255,255, 0.1)",
  width: "100%",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  height: expanded ? 54 : 42,
  padding: expanded ? 10 : 5,
  ".input-container": {
    width: "100%",
    height: "100%",
    input: {
      color: "white",
      fontSize: 29,
      fontWeight: 600,
      height: "100%",
      paddingRight: 10,
      textIndent: 5,
    },
  },
}));

const StyledBg = styled(Box)(({ color }: { color: string }) => ({
  background: color,
  width: "100%",
  position: "absolute",
  height: "100%",
  left: 0,
  top: 0,
  pointerEvents: "none",
  opacity: 0.93,
}));
