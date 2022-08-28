import { Button, Divider, SwipeableDrawer, Typography } from "@mui/material";
import { styled, Box, width } from "@mui/system";
import { useEffect, useState } from "react";
import * as API from "services/api";
import { GAS_FEE } from "services/api";
import { PoolInfo } from "services/api/addresses";
import { ActionType } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";

interface Props {
    delta: string;
    actionType: ActionType;
}

interface ImpactProps {
    X: number;
    lambda: number;
    deltaX: number;
}

interface TradeInfoData {
    tradeFee: string | undefined;
    gasFee: number;
    slippage: string | undefined;
    impact: string | undefined;
}

const StyledContainer = styled(Box)({
    borderRadius: 12,
    padding: "18px",
    display: "flex",
    position: "relative",
    overflow: "hidden",
    flexDirection: "column",
});

const StyledRow = styled(Box)({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 300
})


const StyledContent = styled(Box)({
    "p": {
        fontSize: 19,
        fontWeight: 500,
    },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 22,
    paddingTop: 20,
    paddingBottom: 20,
    "img": {
        width: 45,
        height: 45,
        objectFit: "contain",
    }
});

const TradeInfo = ({ delta, actionType }: Props) => {
    const { selectedToken } =
        useTokenOperationsStore();
    const [open, setOpen] = useState(false)
    const [tradeData, setTradeData] = useState<TradeInfoData>();

    const calculateImpact = ({ X, lambda, deltaX }: ImpactProps): string => {
        const impact = ((X * (1 - lambda)) + (deltaX * lambda)) / (X + (deltaX * lambda));
        return (impact * 100).toFixed(3)
    }

    const getTradeIntoData = async (selectedToken: PoolInfo | undefined) => {
        if (selectedToken) {
            const data = await API.getPoolInfo(selectedToken?.tokenMinter);
            const deltaX = Number(delta)
            const X = actionType === ActionType.BUY ? Number(data.tonReserves) : Number(data.tokenReserves);
            const tradeFee = 0.003;
            const lambda = 1 - tradeFee;
            const gasFee = GAS_FEE.SWAP;
            const slippage = 0.005;
            const impact = calculateImpact({ X, lambda, deltaX })

            const trimmedTradeFee = (tradeFee * 100).toFixed(3);
            const trimmedSlippage = (slippage * 100).toFixed(3);

            setTradeData({ tradeFee: trimmedTradeFee, gasFee, slippage: trimmedSlippage, impact })
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
                    <StyledRow>
                        <Typography>Trade Fee:</Typography><Typography> {tradeData?.tradeFee} %</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Typography>Gas Fee:</Typography><Typography> {tradeData?.gasFee} %</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Typography>Slippage:</Typography><Typography>  {tradeData?.slippage} %</Typography>
                    </StyledRow>
                    <StyledRow>
                        <Typography>Price Impact:</Typography><Typography>  {tradeData?.impact} %</Typography>
                    </StyledRow>
                </StyledContent>
            </SwipeableDrawer>
        </StyledContainer >
    );
}
export default TradeInfo;
