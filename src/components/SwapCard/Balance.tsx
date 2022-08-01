import { Typography } from "@mui/material";
import { styled, Box, borderRadius } from "@mui/system";
import BigNumberDisplay from "components/BigNumberDisplay";
import ContentLoader from "components/ContentLoader";

interface Props {
  loading: boolean;
  displayName: string;
  availableAmount: string;
  onMaxAmountClick: () => void;
  showMax?: boolean;

}

const StyledContainer = styled(Box)({
  height: "100%",
  display:'flex',
  alignItems:'center',
  gap:5 ,
  marginRight:12,
});

const StyledMaxButton = styled('button')({
    background: "rgba(255,255,255, 0.1)",
    padding:'0px 10px',
    borderRadius: 10,
    height: '100%',
   
    cursor:'pointer',
    "p": {
        color:'white',
        fontSize: 12,
        fontWeight: 500
    }
})

function Balance({ loading, displayName, availableAmount, onMaxAmountClick, showMax }: Props) {
  return (
    <StyledContainer>
      {loading ? (
        <ContentLoader width={40} height={15} borderRadius="4px" />
      ) : (
        <>
          <Typography component="p" textAlign="right">
            <strong>Balance: </strong>
            {/* {availableAmount} */}
            {console.log(availableAmount)}
            <BigNumberDisplay value={availableAmount} decimalScale={7} />
            {/* {` ${displayName}`} */}
          </Typography>
          {showMax && <StyledMaxButton
            onClick={onMaxAmountClick}
          >
           <Typography> MAX</Typography>
          </StyledMaxButton>}
        </>
      )}
    </StyledContainer>
  );
}

export default Balance;
