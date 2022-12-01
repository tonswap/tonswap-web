import { styled } from "@mui/styles";
import {
  ListItem,
  List,
  ListItemButton,
  Box,
  Typography,
  Fade,
} from "@mui/material";
import Title from "./Title";
import { Theme } from "@mui/material/styles";
import { Adapter, Adapters } from "services/wallets/types";
import CircularProgress from "@mui/material/CircularProgress";
import gaAnalytics from "services/analytics/ga/ga";
import { useTranslation } from "react-i18next";

const StyledListItem = styled(ListItem)(
  ({ disabled }: { disabled?: boolean }) => ({
    background: "white",
    width: "100%",
  })
);

const StyledList = styled(List)({
  width: "100%",
  gap: "5px",
  display: "flex",
  flexDirection: "column",
});

const StyledListItemButton = styled(ListItemButton)({
  paddingLeft: 10,
});

const StyledContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: "100%",
  position: 'relative',
  "& .MuiCircularProgress-root": {
    position: 'absolute',
    left: '40%',
    top: '50%',
    transform: 'translate(-50%, -50%)'
  },
}));

const StyledConnectModalTitle = styled(Box)({
  paddingLeft: "10px",
});
const StyledListItemRight = styled(Box)(({ theme }: { theme: Theme }) => ({
  "& h5": {
    color: theme.palette.secondary.main,
    fontSize: "18px",
    fontWeight: "500",
    marginBottom: "5px",
  },

  "& p": {
    color: theme.palette.secondary.main,
    fontSize: "14px",
    opacity: "0.7",
  },
}));
const StyledIcon = styled(Box)({
  width: "40px",
  height: "40px",
  marginRight: "24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  "& .MuiCircularProgress-root": {
    zoom: 0.85,
  },
});

interface Props {
  select: (adapter: Adapters) => void;
  open: boolean;
  onClose: () => void;
  adapters: Adapter[];
  adapterLoading?: Adapters;
  isLoading?: boolean;
  title?: string
}

function AdaptersList({
  onClose,
  select,
  open,
  adapters,
  adapterLoading,
  isLoading,
  title = "Select Wallet"
}: Props) {
  const { t } = useTranslation()

  const onSelect = (adapter: Adapters) => {
    select(adapter)
    gaAnalytics.selectWallet(adapter)
  }

  if (!open) {
    return null;
  }

  return (
    <StyledContainer>
      <Fade in={!isLoading}>
        <StyledConnectModalTitle>
          <Title text={title} />
        </StyledConnectModalTitle>
      </Fade>
      <Fade in={!isLoading}>
        <StyledList>
          {adapters.map((adapter) => {
            const { type, icon, name, description, disabled } = adapter;
            return (
              <StyledListItem
                disablePadding
                key={type}
                disabled={disabled}
                style={{ pointerEvents: isLoading ? "none" : "all" }}
              >
                <StyledListItemButton
                  onClick={disabled ? () => { } : () => onSelect(type)}
                >
                  <StyledIcon>
                    <img style={{ "borderRadius": "9px" }} src={icon} />
                  </StyledIcon>
                  <StyledListItemRight>
                    <Typography variant="h5">
                      {name} <small>{disabled ? t('coming-soon') : ""}</small>
                    </Typography>
                    <Typography>{description}</Typography>
                  </StyledListItemRight>
                </StyledListItemButton>
              </StyledListItem>
            );
          })}
        </StyledList>
      </Fade>
      {isLoading && <CircularProgress />}
    </StyledContainer>
  );
}

export default AdaptersList;
