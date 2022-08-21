import { Button, SwipeableDrawer, Typography } from "@mui/material";
import { styled, Box } from "@mui/system";
import BN from "bn.js";
import { useEffect, useState } from "react";
import * as API from "services/api";
import { GAS_FEE } from "services/api";
import { PoolInfo } from "services/api/addresses";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { fromNano } from "ton";

interface Props {
    delta: string;
}

interface TradeInfoData {
    tradeFee: number;
    gasFee: number;
    slippage: number;
    impact: number;
}

const StyledContainer = styled(Box)({
    borderRadius: 12,
    padding: "18px",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    flexDirection: "column",
});


const StyledContent = styled(Box)({
    "p": {
        fontSize: 19,
        fontWeight: 500,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 22,
    "img": {
        width: 45,
        height: 45,
        objectFit: "contain",
    }
});




const TradInfo = ({ delta }: Props) => {
    const { selectedToken } =
        useTokenOperationsStore();
    const [open, setOpen] = useState(false)
    const [tradeData, setTradeData] = useState<TradeInfoData>();

    const getTradeIntoData = async (selectedToken: PoolInfo | undefined) => {
        if (selectedToken) {
            let data = await API.getPoolInfo(selectedToken?.tokenMinter);

            const deltaNumber = Number(delta)
            const tokenReserves = Number(data.tokenReserves);
            const tradeFee = tokenReserves * 0.003;
            const gasFee = GAS_FEE.SWAP;
            const slippage = 0.05 * tokenReserves;
            const impact = ((tokenReserves * (1 - (1 - tradeFee))) + (deltaNumber * tokenReserves * (1 - tradeFee))) / (tokenReserves + (deltaNumber * tokenReserves * (1 - tradeFee)))

            setTradeData({ tradeFee, gasFee, slippage, impact })
        }
    }

    const toggleDrawer = (open: boolean) => () => {
        setOpen(open)
    }

    useEffect(() => {
        getTradeIntoData(selectedToken);
    }, [delta])

    return (
        <StyledContainer className="swap-card">
            <Box sx={{ textAlign: 'center', pt: 1 }}>
                <Button onClick={toggleDrawer(true)}>Show Trade Info</Button>
            </Box>
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                disableSwipeToOpen={false}
                swipeAreaWidth={10}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledContent>
                    <Typography>Trade Fee: {tradeData?.tradeFee}</Typography>
                    <Typography>Gas Fee: {tradeData?.gasFee}</Typography>
                    <Typography>Slippage: {tradeData?.slippage}</Typography>
                    <Typography>Price Impact: {tradeData?.impact}</Typography>
                </StyledContent>
            </SwipeableDrawer>
        </StyledContainer >
    );
}

export default TradInfo;
