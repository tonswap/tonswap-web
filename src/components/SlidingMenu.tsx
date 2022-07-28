import { Typography } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useEffect, useRef, useState } from "react";

const StyledContainer = styled(Box)({
  maxWidth: "320px",
  display: "flex",
  background: "rgba(118, 118, 128, 0.12)",
  borderRadius: 8.91,
  height: 32,
  overflow: "auto",
  position: "relative",
  padding: 2,
  width: "100%",
  "::-webkit-scrollbar": {
    height: 0,
    display: "none",
  },
});

const StyledOption = styled("a")({
  height: "100%",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  zIndex: 10,
  justifyContent: "center",
  p: {
    fontSize: 13,
    pointerEvents: "none",
  },
});

const StyledSelected = styled(Box)(
  ({ allowTransition }: { allowTransition: boolean }) => ({
    transition: allowTransition ? "0.2s all" : "",
    position: "absolute",
    border: "0.5px solid rgba(0, 0, 0, 0.04)",
    boxShadow:
      " 0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)",
    borderRadius: 6.93,
    height: "calc(100% - 4px)",
    top: "50%",
    transform: "translate(0, -50%)",
    pointerEvents: "none",
    background: "white",
  })
);

interface Item {
  text: string;
  method: () => void;
}

interface Props {
  items: Item[];
  action: string;
  symbol?: string;
}

function SlidingMenu({ items, action, symbol }: Props) {
  const [left, setLeft] = useState(0);
  const [width, setWidth] = useState(0);
  const [allowTransition, setAllowTransition] = useState(false);
  const containerRef = useRef<any>();
  const montedRef = useRef(true);

  const onSelect = (index: number) => {
    if (!montedRef.current) {
      return;
    }
    const _width =
      containerRef.current.getBoundingClientRect().width / items.length - 2;
    const _left = _width * index + 2;
    setLeft(_left);
    setWidth(_width);
  };

  useEffect(() => {
    return () => {
      montedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!allowTransition) {
      setTimeout(() => {
        setAllowTransition(true);
      }, 500);
    }
  }, [left]);

  return (
    <StyledContainer ref={containerRef}>
      <StyledSelected
        allowTransition={allowTransition}
        style={{ left: `${left}px`, width: `${width}px` }}
      />
      {items.map((item, index) => {
        const selected = action === item.text.toLowerCase();

        return (
          <SlidingMenuItem
            symbol={symbol}
            onSelect={onSelect}
            selected={selected}
            key={item.text}
            index={index}
            item={item}
            width={`calc(100% / ${items.length})`}
          />
        );
      })}
    </StyledContainer>
  );
}

interface SlidingMenuItemProps {
  width: string;
  item: Item;
  onSelect: (index: number) => void;
  selected: boolean;
  index: number;
  symbol?: string;
}

const SlidingMenuItem = ({
  width,
  item,
  onSelect,
  selected,
  index,
  symbol,
}: SlidingMenuItemProps) => {
  useEffect(() => {
    if (selected) {
      onSelect(index);
    }
  }, [selected]);

  const onClick = () => {
    if (!selected) {
      item.method();
    }
  };

  return (
    <StyledOption style={{ width }} onClick={onClick}>
      <Typography style={{ fontWeight: 500 }}>
        {item.text} {symbol}
      </Typography>
    </StyledOption>
  );
};

export default SlidingMenu;
