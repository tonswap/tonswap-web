import { Box, Button, styled, Typography } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Props {
    show: boolean;
    changeShow: () => void;
}

const StyledViewRow = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "baseline",
})

const ArrowWrap = styled(Box)({
    position: "relative",
    bottom: 2,
    color: 'white'
})


const ShowTradeInfoButton = ({ show, changeShow }: Props) => {
    return (
        <Button onClick={changeShow}>
            <StyledViewRow>
                <Typography>
                    {show ? 'Close Info' : 'View Info'}
                </Typography>
                <ArrowWrap>
                    {show ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </ArrowWrap>
            </StyledViewRow>
        </Button >
    )
}

export default ShowTradeInfoButton;