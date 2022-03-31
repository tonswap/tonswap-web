import { Grid } from "@mui/material";
import { tokens } from "data";
import { observer } from "mobx-react";
import { useState } from "react";
import { useStore } from "store";
import { Token } from "types";
import ListToken from "../ListToken";
import Menu from "./Menu";

const Desktop = observer(() => {
  const [showMenu, setShowMenu] = useState(false);

  const store = useStore();

  const onClose = () => {
    store.setToken(undefined);
    setShowMenu(false);
  };

  const onTokenSelect = (token: Token) => {
    if (token.isActive) {
      setShowMenu(true);
    }
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
    >
      {tokens.map((token) => {
        return (
          <Grid item sm={4} md={3} key={token.name}>
            <ListToken callback={onTokenSelect} token={token} />
          </Grid>
        );
      })}

      <Menu token={store.selectedToken} onClose={onClose} open={showMenu} />
    </Grid>
  );
});

export default Desktop;
