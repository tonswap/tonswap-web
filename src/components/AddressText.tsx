import { Box, IconButton, Link } from "@mui/material";
import CopyToClipboard from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { styled } from "@mui/styles";
import useNotification from "hooks/useNotification";
import { useTranslation } from "react-i18next";

const StyledAddressBox = styled(Box)({
  display: "flex",
  flex: 1,
  alignItems: "center",
  "& a": {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    flex: 1,
    paddingRight: 30
  },
});

const AddressText = ({ address }: { address: string }) => {
  const { showNotification } = useNotification();
  const { t } = useTranslation()

  const onCopy = () => {
    showNotification({
      message: <>{t('address-copy')}</>,
      variant: "success",
      autoHideDuration: 4000,
    });
  };
  return (
    <StyledAddressBox className="address">
      <Link href={`https://tonscan.org/address/${address}`} target="_blank">
        {address}
      </Link>
      <CopyToClipboard text={address} onCopy={onCopy}>
        <IconButton sx={{ padding: 0 }}>
          <ContentCopyIcon style={{ color: '#50A7EA', width: 20, height: 20 }} />
        </IconButton>
      </CopyToClipboard>
    </StyledAddressBox>
  );
};

export default AddressText