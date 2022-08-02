import { Box } from "@mui/material";
import { Title } from "components";
import { useStyles } from "./styles";
import Fade from "@mui/material/Fade";
import { useEffect, useState } from "react";
import ListToken from "./ListToken";
import CustomToken from "./CustomToken";
import { useTokensStore } from "store/tokens/hooks";
import { styled } from "@mui/system";
import { useTokenOperationsActions } from "store/token-operations/hooks";
import { PoolInfo } from "services/api/addresses";

interface Props {
  title: string;
  onTokenSelect: (name: string) => void;
}

export const Tokens = ({ title, onTokenSelect }: Props) => {
  const classes = useStyles();
  const [addTokenModal, setAddTokenModal] = useState(false);
  const { selectToken } = useTokenOperationsActions();
  const { clearStore } = useTokenOperationsActions();
  const { tokens } = useTokensStore();

  useEffect(() => {
    selectToken(undefined);
    clearStore();
  }, []);

  return (
    <Fade in timeout={300}>
      <Box className={classes.root}>
        <CustomToken
          open={addTokenModal}
          onClose={() => setAddTokenModal(false)}
        />
        <StyledTitle>
          <Title>{title}</Title>
        </StyledTitle>
        <Box className={classes.lists}>
          <StyledContainer>
            {/* <Grid item sm={4} md={3}>
              <StyledAddTokenButton onClick={() => setAddTokenModal(true)}>
                <AddIcon style={{ fontSize: 30 }} />
                <StyledAddTokenButtonText>
                  Import Token
                </StyledAddTokenButtonText>
              </StyledAddTokenButton>
            </Grid> */}
            {tokens.map((token: PoolInfo) => {
              return (
                <ListToken
                  key={token.tokenMinter}
                  onSelect={() => onTokenSelect(token.tokenMinter)}
                  token={token}
                />
              );
            })}
          </StyledContainer>
        </Box>
      </Box>
    </Fade>
  );
};

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 11,
  maxWidth: 380,
  marginLeft: "auto",
  marginRight: "auto",
  minHeight: 300,
});

const StyledTitle = styled(Box)({
  position: "sticky",
  top: 54,
  background: "white",
  zIndex: 1,
  paddingBottom: 10,
});
