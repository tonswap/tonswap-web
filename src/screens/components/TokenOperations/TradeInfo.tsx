import { Collapse } from "@mui/material";
import { styled, Box } from "@mui/system";
import { useEffect, useState } from "react";
import * as API from "services/api";
import { GAS_FEE } from "services/api";
import { PoolInfo } from "services/api/addresses";
import { ActionType } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";
import { fromNano } from "ton";
import ShowTradeInfoButton from "./ShowTradeInfoButton";
import TradeInfoRow from "./TradeInfoRow";

interface Props {
    delta?: string;
    actionType?: ActionType;
    tokenColor: string;
}

interface ImpactProps {
    X: number;
    gamma: number;
    deltaX: number;
}

interface TradeInfoData {
    tradeFee: string | undefined;
    gasFee: number;
    slippage: string | undefined;
    impact: string | undefined;
}

const StyledContainer = styled(Box)(({ color }: { color: string }) => ({
    padding: 20,
    borderRadius: 12,
    display: "flex",
    position: "relative",
    overflow: "hidden",
    flexDirection: "column",
    backgroundColor: color,
}));

const TradeInfo = ({ delta, actionType, tokenColor }: Props) => {
    const { selectedToken } =
        useTokenOperationsStore();
    const [tradeData, setTradeData] = useState<TradeInfoData>();
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const onShowInfo = () => {
        setShowInfo(!showInfo);
    }

    const calculateImpact = ({ X, gamma, deltaX }: ImpactProps): string => {
        const impact = ((X * (1 - gamma)) + (deltaX * gamma)) / (X + (deltaX * gamma));
        return (impact * 100).toFixed(3)
    }

    const getTradeIntoData = async (selectedToken: PoolInfo | undefined) => {
        if (selectedToken) {
            const data = await API.getPoolInfo(selectedToken?.tokenMinter);
            const deltaX = Number(delta)
            const X = actionType === ActionType.BUY ? parseFloat(fromNano(data.tonReserves)) : parseFloat(fromNano(data.tokenReserves));
            const tradeFee = 0.003;
            const gamma = 1 - tradeFee;
            const gasFee = GAS_FEE.SWAP;
            const slippage = 0.005;
            const impact = calculateImpact({ X, gamma, deltaX })

            const trimmedTradeFee = (tradeFee * 100).toFixed(3);
            const trimmedSlippage = (slippage * 100).toFixed(3);
            setTradeData({ tradeFee: trimmedTradeFee, gasFee, slippage: trimmedSlippage, impact })
            console.log({
                tonReserves: parseFloat(fromNano(data.tonReserves)),
                tokenReserves: parseFloat(fromNano(data.tokenReserves)),
                X,
                gamma,
                gasFee,
                slippage,
                impact
            });
        }
    }

    useEffect(() => {
        getTradeIntoData(selectedToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delta])

    return (
        <StyledContainer className="swap-card" color={tokenColor}>
            <ShowTradeInfoButton show={showInfo} changeShow={onShowInfo} />
            <Collapse orientation="vertical" in={showInfo}>
                <TradeInfoRow title={'Trade Fee:'} value={`${tradeData?.tradeFee}%`} />
                <TradeInfoRow title={'Gas Fee:'} value={`${tradeData?.gasFee} TON`} />
                <TradeInfoRow title={'Slippage:'} value={`${tradeData?.slippage}%`} />
                <TradeInfoRow title={'Price Impact:'} value={`${tradeData?.impact}%`} />
            </Collapse>
        </StyledContainer >
    );
}
export default TradeInfo;
