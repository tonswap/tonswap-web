import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { Button, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Adapters } from "services/wallets/types";


interface Props {
    open: boolean;
    adapterId: string | undefined;
    cancel: () => void;
}

const StyledContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#193E61",
    borderRadius: 25,
    padding: 8
});

const StyledButtons = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
})

function isMobile(adapterId: string | undefined): boolean {
    return adapterId === Adapters.TON_HUB;
}

function showApproveText(adapterId: string | undefined): string {
    switch (adapterId) {
        case Adapters.TON_HUB:
            return 'Please approve transaction in your wallet app Ton Hub';
        default:
            return 'Wallet App';
    }
}

function TxLoader({ open, cancel, adapterId }: Props) {
    const openWallet = () => {
        const link = "https://tonhub.com/";
        window.location.replace(link);
    }

    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => 999,
                backdropFilter: "blur(5px) ",
            }}
            open={isMobile(adapterId) && open}>
            <StyledContainer>
                <CircularProgress color="inherit" />
                <Typography>{showApproveText(adapterId)}</Typography>
                <StyledButtons>
                    <Button variant="contained" onClick={openWallet}>Open Wallet</Button>
                    <Button variant="outlined" onClick={cancel}>Cancel</Button>
                </StyledButtons>
            </StyledContainer>
        </Backdrop>
    );
}

export default TxLoader;