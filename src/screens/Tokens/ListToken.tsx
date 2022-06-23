import { Typography } from "@mui/material";
import useMobile from "hooks/useMobile";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { PoolInfo } from "services/api/addresses";
import { useStore } from "store";
import { useStyles } from "./styles";

const defaultColor = "#F1F1F1";

interface Props {
  token: PoolInfo;
  callback?: (token: PoolInfo) => void;
}

const ListToken = observer(({ token, callback }: Props) => {
  const classes = useStyles();
  const store = useStore();
  const [hovering, setHovering] = useState(false);
  const ref = useRef<any>();
  const isMobile = useMobile();

  const onSelect = () => {
    if (store.selectedToken?.name === token.name) {
      store.setToken(undefined);
    } else {
      store.setToken(token);
      callback?.(token);
    }
  };

  const onMouseEnter = () => {
    if (!isMobile) {
      setHovering(true);
    }
  };

  const onMouseLeave = () => {
    if (!isMobile) {
      setHovering(false);
    }
  };

  const isSelected = store.selectedToken?.name === token.name;
  const background = isSelected || hovering ? token.color : defaultColor;
  const textColor = isSelected || hovering ? "white" : "";

  return (
    <>
      <div
        ref={ref}
        onClick={onSelect}
        className={classes.token}
        style={{
          background: background,
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div style={{ position: "relative" }}>
          {token.image && <img src={token.image} alt="token" />}
          <Typography
            style={{
              color: textColor,
            }}
          >
            {token.displayName}
          </Typography>
        </div>
      </div>
    </>
  );
});
export default ListToken;
