import { Typography } from "@mui/material";
import { styled, Box, borderRadius } from "@mui/system";
import BigNumberDisplay from "components/BigNumberDisplay";
import ContentLoader from "components/ContentLoader";
import { useTranslation } from "react-i18next";

interface Props {
  loading: boolean;
  displayName: string;
  availableAmount: string;
  onMaxAmountClick?: () => void;
  showMax?: boolean;
}

const StyledContainer = styled(Box)({
  height: "100%",
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  marginRight: 12,
});

const StyledMaxButton = styled('button')({
  background: "rgba(255,255,255, 0.1)",
  padding: '0px 10px',
  borderRadius: 10,
  height: '100%',

  cursor: 'pointer',
  "p": {
    color: 'white',
    fontSize: 12,
    fontWeight: 500
  }
})

function Balance({ loading, availableAmount, onMaxAmountClick, showMax }: Props) {
  const { t } = useTranslation();
  return (
    <StyledContainer>
      {loading ? (
        <ContentLoader width={40} height={15} borderRadius="4px" />
      ) : (
        <>
          <Typography component="p" textAlign="right">
            <strong>{`${t('balance')}: `}</strong>
            {/* {availableAmount} */}
            {console.log(availableAmount)}
            <BigNumberDisplay value={availableAmount} />
            {/* {` ${displayName}`} */}
          </Typography>
          {showMax && onMaxAmountClick && <StyledMaxButton
            onClick={onMaxAmountClick}
          >
            <Typography> {t('max')}</Typography>
          </StyledMaxButton>}
        </>
      )}
    </StyledContainer>
  );
}

export default Balance;
