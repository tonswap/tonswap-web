import { Box, Button, styled, Typography } from "@mui/material";
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useTranslation } from "react-i18next";

interface Props {
    show: boolean;
    changeShow: () => void;
}

const StyledViewRow = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "baseline",
    position: "relative",
    top: 8,
    left: 8,
})

const ArrowWrap = styled(Box)({
    position: "relative",
    bottom: 2,
    color: 'white'
})


const ShowTradeInfoButton = ({ show, changeShow }: Props) => {
    const {t} = useTranslation()
    return (
        <Button onClick={changeShow}>
            <StyledViewRow onClick={changeShow}>
                <Typography>
                    {show ? t('less-info') : t('more-info')}
                </Typography>
                <ArrowWrap>
                    {show ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                </ArrowWrap>
            </StyledViewRow>
        </Button >
    )
}

export default ShowTradeInfoButton;