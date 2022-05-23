import { makeStyles } from "@mui/styles";


interface Props{
  color: string;
  expanded: boolean;
}

const useStyles = makeStyles({
  root: {
    background: (props: Props) => props.color,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 12,
    position: "relative",
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop:(props: Props) => props.expanded ?  42 : 30,
    paddingBottom: (props: Props) => props.expanded ? 28 : 16,
    transition: '0.2s all',
   
    "& *": {
      color: "white",
    },
  },
  tokenImage: {
    transition:'0.2s all',
    position: "absolute",
    left: "50%",
    transform: "translate(-50%, -50%)",
    top: "0%",
    width: (props: Props) => props.expanded ? 60 : 48,
    height: (props: Props) => props.expanded ? 60 : 48,
    objectFit:'cover',
    "& img": {
      width:'100%',
      height: '100%'
    }
  },
  inputBox: {
    width: "100%",
    "& input": {
      transition:'0.2s all',
      height: (props: Props) => props.expanded ? '50px' : '34px',
      fontSize: (props: Props) => props.expanded ? '28px' : '18px'
    }
  },
  bottomBox: {
    marginTop: 8,
    "& p": {
      fontSize: 12,
      "& strong": {
        fontWeight: "bold",
      },
    },
  },
})

export {useStyles}