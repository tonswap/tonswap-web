import Backdrop from "@mui/material/Backdrop";
import { Box, Button, styled, Typography, Stack, Divider } from "@mui/material";
import { Adapters } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";


interface Props {
    open: boolean;
    close: () => void;
    confirm: () => void;
    getTxRequest: () => any;
    adapterId: string | undefined;
}

const StyledContainer = styled(Box)({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "space-between",
    textAlign: "center",
    backgroundColor: 'white',
    color: '#000',
    width: 250,
    gap: 20,
    borderRadius: 10,
});

function showApproveText(adapterId: string | undefined): string {
    switch (adapterId) {
        case Adapters.TON_HUB:
            return 'Please approve this transaction in your wallet app (Tonhub)';
        default:
            return 'Wallet App';
    }
}

function TxLoader({ open, close, confirm, getTxRequest, adapterId }: Props) {
    const { srcTokenAmount } = useTokenOperationsStore();

    const openWallet = async () => {
        confirm();
        const request = await getTxRequest();
        const link = `https://tonhub.com/transfer`;
        window.location.replace(link);
        close();
    }

    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(5px) ",
            }}
            open={open}>
            <StyledContainer>
                <Typography sx={{ p: 1.5 }}>{showApproveText(adapterId)}</Typography>
                <Divider orientation="horizontal" sx={{ position: "relative", top: 20 }} flexItem />
                <Stack spacing={4} direction="row" divider={
                    <Divider orientation="vertical" variant="fullWidth" flexItem />}>
                    <Button variant="text" sx={{ m: 0.8, position: "relative", left: 6 }} onClick={close}>Cancel</Button>
                    <Button variant="text" sx={{ m: 0.8, position: "relative", right: 6 }} onClick={openWallet}>Wallet App</Button>
                </Stack>
            </StyledContainer>
        </Backdrop>
    );
}

export default TxLoader;
