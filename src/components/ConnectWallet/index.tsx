import { ActionButton } from "components/ActionButton";
import { LOCAL_STORAGE_ADDRESS } from "consts";
import { useState } from "react";
import { useStore } from "store";
import ConnectPopup from "./ConnectPopup";

interface Props {
  text: string;
  onConnected?: () => void;
}

const ConnectWallet = ({ text, onConnected }: Props) => {
  const [open, setOpen] = useState(false);
  const store = useStore();

  const onConnect = async () => {
    const provider = (window as any).ton;
    if (!provider) {
      setOpen(true);
    } else {
      const accounts = await provider.send("ton_requestAccounts");
      const account = accounts[0];
      if (account) {
        store.setAddress(account);
      } else {
        setOpen(true);
      }
    }
  };

  return (
    <>
      <ActionButton onClick={onConnect}>{text}</ActionButton>
      <ConnectPopup
        onConnected={onConnected}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default ConnectWallet;
