import styled from "@emotion/styled";
import {
  ListItem,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Fade,
  Box,
} from "@mui/material";
import { Adapters } from "../../../services/wallets/types";
import Title from "./Title";
import ExtensionIcon from "@mui/icons-material/Extension";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useTheme, Theme } from "@mui/material/styles";
import { isMobile } from "react-device-detect";
import { useMemo } from "react";

const wallets = [
  {
    text: "Tonhub",
    type: Adapters.TON_HUB,
    icon: AccountBalanceWalletIcon,
    mobileCompatible: true
  },
  {
    text: "Ton Wallet",
    type: Adapters.TON_WALLET,
    icon: ExtensionIcon,
    mobileCompatible: false
  },
];

const StyledListItem = styled(ListItem)({
  background: "white",
  width: "100%",
});
const StyledList = styled(List)({
  width: "100%",
});

const StyledListItemButton = styled(ListItemButton)({
  paddingLeft: 10,
});

const StyledContainer = styled(Box)({
  width: "300px",
  padding: "20px",
});

const StyledConnectModalTitle = styled(Box)({
  paddingLeft: "10px",
});
const StyledListItemText = styled(ListItemText)(({ theme }: {theme: Theme}) =>({
    color: theme.palette.text.primary
}))




interface Props {
  select: (adapter: Adapters) => void;
  open: boolean;
  onClose: () => void;
}

function WalletsList({ onClose, select, open }: Props) {
  const theme = useTheme()

  const filteredAdapters = useMemo(() => wallets.filter(m => isMobile ? m.mobileCompatible :  m), [isMobile])

  return (
    <Fade in={open} exit={!open}>
      <StyledContainer>
        <StyledConnectModalTitle>
          <Title onClose={onClose} text="Select Wallet" />
        </StyledConnectModalTitle>
        <StyledList>
          {filteredAdapters.map((wallet) => {
            const { type, icon: Icon, text } = wallet;
            return (
              <StyledListItem disablePadding key = {type}>
                <StyledListItemButton onClick={() => select(type)} >
                  <ListItemIcon style={{minWidth:'40px'}}>
                    <Icon sx={{color: theme.palette.text.primary}} />
                  </ListItemIcon>
                  <StyledListItemText theme={theme} primary={text} />
                </StyledListItemButton>
              </StyledListItem>
            );
          })}
        </StyledList>
      </StyledContainer>
    </Fade>
  );
}

export default WalletsList;
