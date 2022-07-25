import { observer } from "mobx-react-lite";
import { Box } from "@mui/material";
import AppRoutes from "router/Router";
import { Navbar } from "components";
import { LAYOUT_MAX_WIDTH } from "consts";
import { styled } from "@mui/system";
import useAuth from "hooks/useAuth";

const StyledAppContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  position: "relative",
  paddingLeft: "20px",
  paddingRight: "20px",
  paddingBottom: 30,
  maxWidth: LAYOUT_MAX_WIDTH,
  marginLeft: "auto",
  marginRight: "auto",
  flex: 1,
});

const StyledRoutesContainer = styled(Box)(({ theme }) => ({
  background: "#FAFAFA",
  borderRadius: 20,
  maxHeight: "calc(100vh - 130px)",
  width: "100%",
  overflow: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    background: "transparent",
    flex: 1,
    maxHeight: "unset",
    borderRadius: 0,
  },
}));

const App = observer(() => {
  // useAuth()

  return (
    <StyledAppContainer>
      <Navbar />
      <StyledRoutesContainer>
        <AppRoutes />
      </StyledRoutesContainer>
    </StyledAppContainer>
  );
});

export default App;
