import { Avatar, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { styled, Box } from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    width: "100%",
    paddingBottom: 50,
    overflow:'auto',
    flex:1,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 80,
    },
  },
  lists: {
    paddingTop: 30,
  },
  list: {},
  token: {},
  menu: {
    borderRadius: "10px",
    padding: 15,
    transition: "0.1s all",
  },
}));

export const StyledImage = styled(Avatar)({
  width: 43,
  height: 43,
})


export const StyledUsdValue = styled(Box)({
  marginLeft:'auto'
})

export const StyledToken = styled(Box)(({color}:{color: string}) => ({
  overflow: "hidden",
  position: "relative",
  transition: "0.2s all",
  background: color,
  borderRadius: 12,
  display: "flex",
  gap:10,
  alignItems: "center",
  justifyContent: "flex-start",
  padding: '10px 20px 10px 14px',
  boxShadow:'rgb(0 0 0 / 1%) 0px 0px 1px, rgb(0 0 0 / 4%) 0px 4px 8px, rgb(0 0 0 / 4%) 0px 16px 24px, rgb(0 0 0 / 1%) 0px 24px 32px',
  "& p": {
    fontSize: 14,
    fontWeight: 500,
    color:'white'
  }
}));

export const StyledAddTokenButton = styled(Box)({
  width: "100%",
  height: "100%",
  borderRadius: 12,
  borderSpacing: "20px",
  borderStyle: "dashed",
  borderWidth: "1px",
  borderColor: "rgba(0,0,0, 0.2)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

export const StyledAddTokenButtonText = styled(Typography)({
  marginTop: 20,
  fontWeight: 500,
  fontSize: 14,
});

export { useStyles };
