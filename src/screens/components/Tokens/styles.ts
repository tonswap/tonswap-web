import { Avatar, Typography } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { styled, Box } from "@mui/system";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    textAlign: "center",
    width: "100%",
    paddingBottom: 50,
    [theme.breakpoints.down("sm")]: {
      paddingBottom: 30,
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
  marginLeft:'auto',
  opacity: 0.6,
})

export const StyledToken = styled(Box)(({color}:{color: string}) => ({
  overflow: "hidden",
  position: "relative",
  transition: "0.2s all",
  background: color,
  borderRadius: 12,
  display: "flex",
  gap:14,
  alignItems: "center",
  justifyContent: "flex-start",
  padding: '8px 20px 8px 14px',
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



export const StyledTokenTexts = styled(Box)({
 display:'flex',
 flexDirection:'column',
 alignItems:'flex-start',
 "& .symbol": {
    fontWeight: 500,
    fontSize: 17
 },
 "& .name": {
  fontSize: 12,
  opacity: 0.6,
  fontWeight: 400
 }
})

export { useStyles };
