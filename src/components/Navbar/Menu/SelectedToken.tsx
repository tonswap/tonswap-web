import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useStyles } from "./style";
import TokenActions from "components/TokenActions";
import { PoolInfo } from "services/api/addresses";
import { Link } from "react-router-dom";
import { ROUTES } from "router/routes";

interface Props {
  token: PoolInfo;
  hideMenu: () => void;
}

function SelectedToken({ token, hideMenu }: Props) {
  const classes = useStyles();
  const store = {} as any

  const onReplace = () => {
    hideMenu();
    store.setToken(undefined);
  };

  return (
    <Box className={classes.selectedToken}>
      <Typography
        fontWeight="500"
        fontSize="24px"
        component="h3"
        lineHeight="unset"
        className={classes.selectedTokenTitle}
      >
        Selected Token
      </Typography>
      <Box className={classes.selectedTokenDetails}>
        <img src={token.image} alt='token' />
        <Typography color="#060606" fontWeight={500}>
          {token.displayName}
        </Typography>
      </Box>
      <Link onClick={onReplace} to={ROUTES.tokens} className={classes.replace}>
        Change Token
      </Link>
      <Box className={classes.actions}>
        <TokenActions onActionClick={hideMenu} token={token} />
      </Box>
    </Box>
  );
}

export default SelectedToken;
