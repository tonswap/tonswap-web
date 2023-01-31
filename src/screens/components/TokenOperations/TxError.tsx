import { Typography } from "@mui/material";
import { styled, Box } from "@mui/system";
import { Popup } from "components";
import {
  useTokenOperationsActions,
  useTokenOperationsStore,
} from "store/token-operations/hooks";
import ErrorIcon from "assets/images/shared/error.png";
import { useEffect, useState } from "react";
import { delay } from "utils";

const errorCleaner = (error: string) => {
  return error.replace('[TON_CONNECT_SDK_ERROR]', '')
}

function TxError() {
  const { txError } = useTokenOperationsStore();
  const { hideTxError } = useTokenOperationsActions();
  const [open, setOpen] = useState(false)

  useEffect(() => {
      if(txError){
        setOpen(true)
      }
  }, [txError])


  const onClose = async () => {
    setOpen(false)
    await delay(500)
    hideTxError()
  }
  

  return (
    <Popup open={open} onClose={onClose} maxWidth={400}>
      <StyledContent sx={{minWidth: 240}}>
      <img src={ErrorIcon} className="icon" />
        <Typography>{txError && errorCleaner(txError)}</Typography>
      </StyledContent>
    </Popup>
  );
}

export default TxError;

const StyledContent = styled(Box)({
  "p": {
    fontSize: 19,
    fontWeight: 500,
  },
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  gap: 22,
  "img":{
    width: 45,
    height: 45,
    objectFit: "contain",
  }
});
