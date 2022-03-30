import { ActionButton } from "components/ActionButton";
import { useState } from "react";
import ConnectPopup from "./ConnectPopup";

interface Props {
  text: string;
  onConnected?: () => void;
}

const ConnectWallet = ({ text, onConnected }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ActionButton onClick={() => setOpen(true)}>{text}</ActionButton>
      <ConnectPopup onConnected={onConnected} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default ConnectWallet;
