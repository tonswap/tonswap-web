import { Box, styled, Typography } from "@mui/material";

interface Props {
    title: string;
    value: string;
}

const TradeInfoRow = ({ title, value }: Props) => {
    return (
        <StyledRow>
            <Typography component="p" textAlign="left">
                {title}
            </Typography>
            <Typography component="p" textAlign="right">
                {value}
            </Typography>
        </StyledRow>
    )
}

const StyledRow = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
})

export default TradeInfoRow;