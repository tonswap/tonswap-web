import { Box, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStore } from "store";
import { useStyles } from "./styles";
import ListToken from "./ListToken";
import TokenActions from "components/TokenActions";
import AnimateHeight from "react-animate-height";
import { getIsSelectedTokenMobile, splitToGroups } from "utils";
import { useMemo } from "react";
import AddCustomTokenButton from "./AddCustomTokenButton";
import { styled } from "@mui/styles";
import { PoolInfo } from "services/api/addresses";


const ANIMATION_DURATION = 150;


const StyledAddToken = styled(Box)({
  height: 110
})
interface Props{
  onAddToken: () => void;
}

const Mobile = observer(({onAddToken}: Props) => {
  const store = useStore();
  const classes = useStyles();

  const groups = useMemo(() => splitToGroups(store.tokens, 2), [store.tokens])


  return (
    <>
      {groups.map((group, index) => {
        const isSelected = getIsSelectedTokenMobile(
          group,
          store.selectedToken?.name
        );

        return (
          <Grid
            key={index}
            className={classes.list}
            container
         
            spacing={2}
         
          >
            {group.map((token: PoolInfo) => {
              return (
                <Grid item xs={6} key={token.name}>
                  <ListToken token={token} />
                </Grid>
              );
            })}
            <Grid
              item
              xs={12}
              style={{ marginBottom: isSelected ? "20px" : "0" }}
            >
              <AnimateHeight
                duration={ANIMATION_DURATION}
                height={isSelected ? "auto" : 0} 
              >
                <Box
                  className={classes.menu}
                  style={{
                    border: isSelected
                      ? "1px solid #B4B4B4"
                      : "1px solid transparent",
                  }}
                >
                  <TokenActions token={store.selectedToken} />
                </Box>
              </AnimateHeight>
            </Grid>
          </Grid>
        );
      })}
      <StyledAddToken>
      <AddCustomTokenButton onClick={onAddToken} />
      </StyledAddToken>
    </>
  );
});

export default Mobile;
