import { Avatar, Grid, IconButton } from "@mui/material";
import WalletAddressImg from "assets/images/shared/wallet-address.svg";
import { useStore } from "store";
import { observer } from "mobx-react-lite";
import Chip from "@mui/material/Chip";
import {styled} from '@mui/styles';
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import Tooltip from "components/Tooltip";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "router/routes";
import theme from "theme";

const StyledChip = styled(Chip)({
  display: "flex",
  alignItems: "center",
  border: `1px solid ${theme.palette.primary.main}!important`,
  height: 35,
  paddingLeft: 10,
  borderRadius: 20,
  background: "transparent!important",
  color: theme.palette.primary.main,
  maxWidth: '185px!important'
})

const StyledIconButton = styled(IconButton)({
  color: `${theme.palette.primary.main}!important`,
})

const WalletAddress = observer(() => {
  const store = useStore();
  const navigate = useNavigate();

  const onDisconnect = () => {
    navigate(ROUTES.connect);
    store.disconnect();
  };

  return store.address ? (
    <Grid item display="flex" gap="10px">
      <StyledIconButton onClick={onDisconnect} >
        <PowerSettingsNewIcon />
      </StyledIconButton>
      <Tooltip placement="bottom-end" title={store.address}>
        <StyledChip
          label={store.address}
          avatar={<Avatar alt="wallet" src={WalletAddressImg} />}
        />
      </Tooltip>
    </Grid>
  ) : null;
});

export default WalletAddress;
