import { NumberInput } from "components/NumberInput";
import { PoolInfo } from "services/api/addresses";
import ContentLoader from "components/ContentLoader";
import useWebAppResize from "hooks/useWebAppResize";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import { ton } from "tokens";
import useUsdValue from "hooks/useUsdValue";
import { styled, Box } from "@mui/system";
import { Avatar, IconButton, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
interface Props {
  inputAmount?: number;
  availableAmount: number;
  onChange: (val: string) => void;
  maxAmount: number;
  token: PoolInfo;
  isLoading?: boolean;
  availableAmountLoading: boolean;
}

const StyledContainer = styled(Box)(({ color }: { color: string }) => ({
  borderRadius: 12,
  background: color,
  padding: "12px 18px 14px 12px",
  display: "flex",
}));

const StyledLeft = styled(Box)({
  width: 87,
  paddingTop: 8,
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 17,
});

const StyledRight = styled(Box)({
  flex: 1,
  position: "relative",
  paddingLeft: 13,
  display: "flex",
  flexDirection: "column",
  ".border": {
    position: "absolute",
    left: 0,
    top: "50%",
    width: 1,
    height: "calc(100% - 20px)",
    background: "white",
    opacity: 0.25,
    transform: "translate(0, -50%)",
  },
  input: {
    height: 49,
    color: "white",
    fontSize: 30,
    fontWeight: 600,
  },
});

const StyledAvatar = styled(Avatar)({
  width: 37,
  height: 37,
});

const StyledDisplayName = styled(Box)(({isTon}:{isTon: boolean}) => ({
 width:'100%',
  borderRadius: 12,
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  border: !isTon ? '0.5px solid #FFFFFF' : '',
  ".MuiIconButton-root": {
    padding: 0,
  },
  p: {
    color: "white",
    fontSize: 12,
    fontWeight: 500,
  },
}));

const StyledUsd = styled(Box)({
  marginTop: 6,
  marginLeft: "auto",
  p: {
    color: "white",
    fontSize: 13,
  },
});

const StyledTop = styled(Box)({
  display: "flex",
  alignItems: "center",
  marginBottom: 9,
  justifyContent: "space-between",
  width: "100%",
  p: {
    color: "white",
    fontSize: 12,
  },
});

function SwapCard({
  inputAmount,
  availableAmount,
  onChange,
  maxAmount,
  token,
  isLoading,
  availableAmountLoading,
}: Props) {
  const expanded = useWebAppResize();
  const navigate = useNavigate();
  const { loading: usdLoading, usd } = useUsdValue(token.name, inputAmount);
    const isTon = token.name === ton.name
  const onAvatarClick = () => {
    if (!isTon) {
      navigate(ROUTES.tokens);
    }
  };

  return (
    <StyledContainer color={token.color}>
      <StyledLeft>
        {token.image && <StyledAvatar src={token.image} alt="token" />}
        <StyledDisplayName isTon={isTon}>
          <Typography>{token.displayName}</Typography>
          {!isTon && <IconButton>
            <ArrowDropDownIcon />
          </IconButton>}
        </StyledDisplayName>
      </StyledLeft>

      <StyledRight>
        <aside className="border" />
        <StyledTop>
          <Typography className="enter-amount">Enter Amount</Typography>
          {availableAmountLoading ? 
          <ContentLoader width={40} height={15} borderRadius="4px" />
           : <Typography component="p" textAlign="right">
            <strong>Balance: </strong>
            {availableAmount.toLocaleString("en-US", {
              maximumFractionDigits: 4,
            })}{" "}
            {token.displayName}
          </Typography>}
        </StyledTop>
        <NumberInput
          placeholder="0"
          isLoading={isLoading}
          maxAmount={maxAmount}
          value={inputAmount}
          onChange={(val) => onChange(val)}
        />
        <StyledUsd>
          {usdLoading ? (
            <ContentLoader width={40} height="15px" borderRadius="4px" />
          ) : (
            <Typography component="p">
              ~$
              {usd.toLocaleString("en-US", {
                maximumFractionDigits: 4,
              })}
            </Typography>
          )}
        </StyledUsd>
      </StyledRight>
    </StyledContainer>
  );
}

export default SwapCard;
