import Backdrop from "@mui/material/Backdrop";
import { Box, Button, styled, Typography, Stack } from "@mui/material";
import { Adapters } from "services/wallets/types";
import { useTokenOperationsStore } from "store/token-operations/hooks";


interface Props {
    open: boolean;
    address: string | undefined;
    cancel: () => void;
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
    padding: 8,
});

function isMobile(adapterId: string | undefined): boolean {
    return adapterId === Adapters.TON_HUB;
}

function showApproveText(adapterId: string | undefined): string {
    switch (adapterId) {
        case Adapters.TON_HUB:
            return 'Please approve this transaction in your wallet app (Tonhub)';
        default:
            return 'Wallet App';
    }
}

function TxLoader({ open, address, cancel, adapterId }: Props) {
    const { srcTokenAmount } = useTokenOperationsStore();

    const openWallet = () => {
        const link = `https://tonhub.com/transfer/${address}?amount=${srcTokenAmount}`;
        window.location.replace(link);
    }

    return (
        <Backdrop
            sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backdropFilter: "blur(5px) ",
            }}
            open={isMobile(adapterId) && open}>
            <StyledContainer>
                <Typography>{showApproveText(adapterId)}</Typography>
                <Stack spacing={4} direction="row">
                    <Button variant="text" onClick={cancel}>CANCEL</Button>
                    <Button variant="text" onClick={openWallet}>WALLET APP</Button>
                </Stack>
            </StyledContainer>
        </Backdrop>
    );
}

export default TxLoader;
