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

const StyledContainer = styled(Box)({
    borderRadius: 12,
    paddingRight: 12,
    display: "flex",
    position: "relative",
    overflow: "hidden",
    flexDirection: "column",
});

const TradeInfo = ({ delta, actionType }: Props) => {
    const { selectedToken } =
        useTokenOperationsStore();
    const [tradeData, setTradeData] = useState<TradeInfoData>();
    const [showInfo, setShowInfo] = useState<boolean>(false);

    const onShowInfo = () => {
        setShowInfo(!showInfo);
    }

    const calculateImpact = ({ X, gamma, deltaX }: ImpactProps): string => {
        const impact = ((X * (1 - gamma)) + (deltaX * gamma)) / (X + (deltaX * gamma));
        return (impact * 100).toFixed(2)
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

            const trimmedTradeFee = (tradeFee * 100).toFixed(2);
            const trimmedSlippage = (slippage * 100).toFixed(2);
            setTradeData({ tradeFee: trimmedTradeFee, gasFee, slippage: trimmedSlippage, impact })
        }
    }

    useEffect(() => {
        getTradeIntoData(selectedToken);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [delta])

    return (
        <StyledContainer className="swap-card">
            <ShowTradeInfoButton show={showInfo} changeShow={onShowInfo} />
            <Collapse orientation="vertical" in={showInfo}>
                <TradeInfoRow title={'Gas Fee:'} value={`${tradeData?.gasFee} TON`} />
                <TradeInfoRow title={'Trade Fee:'} value={`${tradeData?.tradeFee}%`} />
                <TradeInfoRow title={'Max Slippage:'} value={`${tradeData?.slippage}%`} />
                <TradeInfoRow title={'Price Impact:'} value={`${tradeData?.impact}%`} />
            </Collapse>
        </StyledContainer >
    );
}
export default TradeInfo;
