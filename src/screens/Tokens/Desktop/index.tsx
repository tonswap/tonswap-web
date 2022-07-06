import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import { useState } from "react";
import { useStore } from "store";
import ListToken from "../ListToken";
import Menu from "./Menu";
import AddCustomTokenButton from "../AddCustomTokenButton";

interface Props{
  onAddToken: () => void;
}

const Desktop = observer(({onAddToken}: Props) => {
  const [showMenu, setShowMenu] = useState(false);

  const store = useStore();

  const onClose = () => {
    store.setToken(undefined);
    setShowMenu(false);
  };

  const onTokenSelect = () => {
    setShowMenu(true);
  };
  return (
    <Grid
      container
      spacing={2}
      left="-7px"
      maxWidth="850px"
      marginLeft="auto"
      marginRight="auto"
      width="100%"
      position="relative"
      justifyContent="center"
    >

      {store.tokens.map((token) => {
        return (
          <Grid item sm={4} md={3} key={token.name}>
            <ListToken callback={onTokenSelect} token={token} />
          </Grid>
        );
      })}
      <Grid item sm={4} md={3}>
       <AddCustomTokenButton onClick = {onAddToken} />
      </Grid>

      <Menu token={store.selectedToken} onClose={onClose} open={showMenu} />
    </Grid>
  );
});

export default Desktop;
