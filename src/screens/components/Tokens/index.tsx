import { Box, Grid } from "@mui/material";
import { Title } from "components";
import {
  StyledAddTokenButton,
  StyledAddTokenButtonText,
  useStyles,
} from "./styles";
import Fade from "@mui/material/Fade";
import { ROUTES } from "router/routes";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ListToken from "./ListToken";
import CustomToken from "./CustomToken";
import { useTokensActions, useTokensStore } from "store/tokens/hooks";
import { styled } from "@mui/system";
import { useTokenOperationsActions } from "store/token-operations/hooks";

interface Props {
  title: string;
  onTokenSelect: (name: string) => void;
}

const StyledContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: 11,
  maxWidth: 380,
  marginLeft: "auto",
  marginRight: "auto",
});

export const Tokens = ({ title, onTokenSelect }: Props) => {
  const classes = useStyles();
  const [addTokenModal, setAddTokenModal] = useState(false);
  const { selectToken } = useTokensActions();
  const {clearStore} = useTokenOperationsActions()


  const { tokens } = useTokensStore();

  useEffect(() => {
    selectToken(undefined);
    clearStore()
  }, []);

  return (
    <Fade in>
      <Box className={classes.root}>
        <CustomToken
          open={addTokenModal}
          onClose={() => setAddTokenModal(false)}
        />
        <Title>{title}</Title>
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
            {tokens.map((token) => {
              return (
                <ListToken
                  key={token.name}
                  onSelect={() => onTokenSelect(token.name)}
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
