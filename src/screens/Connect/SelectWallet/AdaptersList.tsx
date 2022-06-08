import {styled} from '@mui/styles';
import {
  ListItem,
  List,
  ListItemButton,
  Box,
  Typography,
} from "@mui/material";
import { Adapter, Adapters } from "../../../services/wallets/types";
import Title from "./Title";
import {  Theme } from "@mui/material/styles";

const StyledListItem = styled(ListItem)({
  background: "white",
  width: "100%",
});
const StyledList = styled(List)({
  width: "100%",
  gap:'5px',
  display: 'flex',
  flexDirection:'column'
});

const StyledListItemButton = styled(ListItemButton)({
  paddingLeft: 10,
  
});

const StyledContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  width: "350px",
  [theme.breakpoints.down('sm')]: {
    width: "300px",
  }

}));

const StyledConnectModalTitle = styled(Box)({
  paddingLeft: "10px",
});
const StyledListItemRight = styled(Box)(
  ({ theme }: { theme: Theme }) => ({
    '& h5':{
      color: theme.palette.secondary.main,
      fontSize:'18px',
      fontWeight:'500',
      marginBottom:'5px'
    },
    '& p':{
      color: theme.palette.secondary.main,
      fontSize:'14px',
      opacity: '0.7'

    }
   

  })
);
const StyledIcon = styled('img')({
  width:'40px',
  height:'40px',
  objectFit:'cover',
  marginRight:'24px'
})



interface Props {
  select: (adapter: Adapters) => void;
  open: boolean;
  onClose: () => void;
  adapters: Adapter[];
}

function AdaptersList({ onClose, select, open, adapters }: Props) {

  if (!open) {
    return null; 
  }

  return (
    <StyledContainer>
      <StyledConnectModalTitle>
        <Title onClose={onClose} text="Select Wallet" />
      </StyledConnectModalTitle>
      <StyledList>
        {adapters.map((adapter) => {
          const { type, icon, name, description } = adapter;
          return (
            <StyledListItem disablePadding key={type}>
              <StyledListItemButton onClick={() => select(type)}>
              <StyledIcon src ={icon} />
               <StyledListItemRight>
                 <Typography variant='h5'>{name}</Typography>
                 <Typography>{description}</Typography>
               </StyledListItemRight>
              </StyledListItemButton>
            </StyledListItem>
          );
        })}
      </StyledList>
    </StyledContainer>
  );
}

export default AdaptersList;
