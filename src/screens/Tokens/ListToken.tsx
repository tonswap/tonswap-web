import { Typography } from "@mui/material";
import useMobile from "hooks/useMobile";
import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { useStore } from "store";
import { Token } from "types";
import IncativeToken from "./Desktop/InactiveToken";
import { useStyles } from "./styles";

const defaultColor = "#F1F1F1";

interface Props {
  token: Token;
  callback?: (token: Token) => void;
}

const scroll = (element: any) => {
  const offset = 90;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element.getBoundingClientRect().top;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

const ListToken = observer(({ token, callback }: Props) => {
  const classes = useStyles();
  const store = useStore();
  const [hovering, setHovering] = useState(false);
  const [showIncativePopup, setShowIncativePopup] = useState(false);
  const ref = useRef<any>();
  const isMobile = useMobile();

  const onSelect = () => {
    if (!token.isActive) {
      setShowIncativePopup(true);
    } else if (store.selectedToken?.id === token.id) {
      store.setToken(undefined);
    } else {
      store.setToken(token);
      callback?.(token);
      // if (ref.current && isMobile) {
      //   scroll(ref.current);
      // }
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

  const isSelected = store.selectedToken?.id === token.id;
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
          <img src={token.image} />
          <Typography
            style={{
              color: textColor,
            }}
          >
            {token.name}
          </Typography>
        </div>
      </div>
      <IncativeToken
        token={token}
        open={showIncativePopup}
        onClose={() => setShowIncativePopup(false)}
      />
    </>
  );
});
export default ListToken;
