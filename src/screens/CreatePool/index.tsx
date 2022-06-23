import { Box, TextField, CardHeader, Link } from "@mui/material";
import { styled } from "@mui/system";
import { ActionButton } from "components";
import Notification from "components/Notification";
import { TEST_MODE } from "consts";
import { useStore, addTokenToList } from "store";

import { useState } from "react";
import { deployPool, poolStateInit } from "services/api/deploy-pool";
import { Address } from "ton";
import { walletService } from "services/wallets/WalletService";
import { TransactionRequest } from "services/wallets/types";
import { getTokenBalance, getTokenBalanceByMinter, getTokenData, getTonBalance } from "services/api";
import { fromNano } from "ton";
import BN from "bn.js";

import ContentLoader from "components/ContentLoader";
import { ROUTES } from "router/routes";
import { PoolInfo } from "services/api/addresses";
import { getRandomColor } from "utils";


interface jettonData {
  balance: BN,
  name: string,
  image: string,
}


const StyledContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection:'column',
  padding:'100px',
  paddingBottom:'100px'
});

const StyledContent = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection:'column',
    padding: 20,
    background: 'rgba(0,0,0, 0.03)',
    width: '400px'
  });

const DEFAULT_JETTON = "xRPnSDmScJeBV9xME_A0H27T3Pg_Ur2zdmawcla3ux";
const MIN_GAS = 0.05;
const pwd = "orbs123";

export function CreatePool() {
  const store = useStore();
  const [jettonAddress, setJettonAddress] = useState("");
  const [poolAddress, setPoolAddress] = useState("");
  const [tokenBalance, setTokenBalance] = useState(0);
  const [isDeployed, setIsDeployed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tokenData, setTokenData] = useState({} as jettonData);
  // TODO zero address
  const [newPoolAddress, setNewPoolAddress] = useState("");

  const [tonBalance, setTonBalance] = useState(0);
  const [error, setError] = useState("");


  const validateForm = () => {

    return jettonAddress.length && Address.isFriendly(jettonAddress) && tokenData?.name && !isDeployed
  }

  const jettonAddressChanged = async (jettonAddress: string) => {
    setJettonAddress(jettonAddress)
    setIsLoading(true);
   //jettonAddress="EQCcCT-RPnSDmScJeBV9xME_A0H27T3Pg_Ur2zdmawcla3uU";
    const address = Address.parse(jettonAddress);
    const jettonData = await getTokenData(address);
    
    const jd = await getTokenBalanceByMinter(address)
    setTokenData(jettonData)
    let balance = parseFloat(fromNano(jd.balance.toString()));
    setTokenBalance(balance);
    setTonBalance(await getTonBalance());

    const { futureAddress, isDeployed } = await poolStateInit(address, 0);
    setIsDeployed(isDeployed);
    if (isDeployed) {
      setNewPoolAddress(futureAddress.toFriendly());
    }
    //  setTokenBalance(parseFloat(fromNano(jettonBalance.balance)))
    
    setIsLoading(false);
  }


  const deployPoolTx = async () => {  
    const tx = await deployPool(Address.parse(jettonAddress));
    if(!tx) {
      return;
    }

    if(tx.error) {
      return setError(tx.error);
    }
    
    try {
      console.log(tokenData);
      

      await walletService.requestTransaction(
        store.adapterId!!,
        store.session,
        tx,
        () => {
          setIsDeployed(true);
          setNewPoolAddress(tx.to)
          const token: PoolInfo = {
            name: tokenData.name,
            ammMinter: Address.parse(tx.to),
            tokenMinter: Address.parse(jettonAddress),
            color: getRandomColor(),
            displayName: tokenData.name.toUpperCase(),
            image: tokenData.image,
            isCustom: true
          };
          store.addToken(token);
        }
      );
    } catch (error) {
      //cancelPolling();
      //setLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }

  };

  const StyledDiv = styled(Box)({
    width:'100%',
    overflow:'hidden'
  })

  const deployedContainer = () => {
    return (
      <StyledContainer>
      <StyledContent>
        <div>
          Contract Address
        </div>
        <StyledDiv>
          New Pool :
          <br />
          <b>{newPoolAddress || "na"}</b> 
          <br />
          for <b>{tokenData?.name}</b> Token
        </StyledDiv>
        <div>
          <a href={`https://tonscan.org/jetton/${newPoolAddress}`}>explorer</a>
        </div>

        <div>
          <a href={`http://localhost:3000/tonswap-web/add-liquidity/${tokenData.name}`}>💧 Add Liquidity to Pool</a>
        </div>
      
        </StyledContent>
      </StyledContainer>
    )
  }

  if(isDeployed) {
    return deployedContainer();
  }

  return (
    <StyledContainer>
        <StyledContent>
          <h2>Create a new Pool</h2>
          <div>Enter jetton minter address</div>
        <TextField
          style={{marginBottom:'20px', width:'100%'}}
          value={jettonAddress}
          placeholder="EQDrjaLahLkMB-hMCmkzOyBuHJ139ZUYmPHu6RRBKnbdLIYI"
          onChange={(e) => { 
            jettonAddressChanged(e.target.value);
            try {
              Address.parse(e.target.value)
            } catch(e) {
              setError( "invalid Address" )
            }
          }
        }/>
    { isLoading ? (<ContentLoader width={40} height="15px" borderRadius="4px" />) : (<div></div>) }
    { tokenDetails(tokenBalance, tokenData.image, tokenData.name, isDeployed, poolAddress) }
 
    <div>{poolAddress}</div>
      <ActionButton  isDisabled={!validateForm()} onClick={deployPoolTx}>Deploy Pool 🚀</ActionButton>
        </StyledContent>
      <Notification
        isError
        text={error}
        open={error.length > 0}
        onClose={() => setError("")}
      />
    </StyledContainer>
  );
}


const tokenDetails = (tokenBalance: number, image: string, name: string, isDeployed: boolean, poolAddress?: string)=> {
  
  if(!name) {
    return <></>
  }

  return (
    <div> 
    <div> 
      <img  style={{ height:"24px", width:'24px',  position: "relative",top: "5px",left: "-5px"}} src={image} alt="" ></img><b>{name}</b>
    </div>
      <div style={{marginTop:"20px", marginBottom:"20px"}}>
        My Balance: {tokenBalance}
      </div>
      { isDeployed ? ( <div>Pool already exists</div> ) : (<></>) }
    </div>
  );
}



//<Link   to={ROUTES.connect} >{name} Pool</Link>
