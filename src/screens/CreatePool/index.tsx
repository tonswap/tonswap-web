import { Box, TextField, CardHeader } from "@mui/material";
import { styled } from "@mui/system";
import { ActionButton } from "components";
import Notification from "components/Notification";
import { TEST_MODE } from "consts";
import { useStore, addTokenToList } from "store";

import { useState } from "react";
import { deployPool } from "services/api/deploy-pool";
import { Address } from "ton";
import { walletService } from "services/wallets/WalletService";
import { TransactionRequest } from "services/wallets/types";
import { getTokenBalance, getTokenBalanceByMinter, getTokenData, getTonBalance } from "services/api";
import { fromNano } from "ton";
import BN from "bn.js";

import ContentLoader from "components/ContentLoader";


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
  const [newPoolAddress, setNewPoolAddress] = useState("EQDh3hrzLm-yBA_bYpxRdLwVMeDNLnUFJLXhr7j8EJ3jMv23");

  const [tonBalance, setTonBalance] = useState(0);
  const [error, setError] = useState("");


  const validateForm = () => {
    return jettonAddress.length && Address.isFriendly(jettonAddress) && tokenData?.name
  }

  const jettonAddressChanged = async (jettonAddress: string) => {
    setJettonAddress(jettonAddress)
    // if(jettonAddress.length != 48) {
    //   return setJettonAddress(jettonAddress);  
    // }
    setIsLoading(true);
   //jettonAddress="EQCcCT-RPnSDmScJeBV9xME_A0H27T3Pg_Ur2zdmawcla3uU";
    const address = Address.parse(jettonAddress);
    const jettonData = await getTokenData(address);
    console.log(jettonData);
    
    const jd = await getTokenBalanceByMinter(address)
    setTokenData(jettonData)
    
    
    let balance = parseFloat(fromNano(jd.balance.toString()));
    setTokenBalance(balance);
    setTonBalance(await getTonBalance());
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
          addTokenToList(tokenData.name, { 
            image: tokenData.image,
            displayName: tokenData.name,
            name: tokenData.name,
            color: "#b393ef",
            isActive: true,
          }, Address.parse(jettonAddress), Address.parse(tx.to))
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

  const deployedContainer = () => {
    return (
      <StyledContainer>
      <StyledContent>
        <div>
          Contract Address
        </div>
        <div>
          New Pool Address:{newPoolAddress || "na"} for {tokenData?.name} Token

        </div>
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
          <div>Jetton Address</div>
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
    <div><img  style={{ height:"24px", width:'24px',  position: "relative",top: "5px",left: "-5px"}} src={tokenData.image} alt="" ></img><b>{tokenData.name}</b></div>
    
    <div style={{marginTop:"20px", marginBottom:"20px"}}>
      Balance: {tokenBalance}
    </div>
    {/* <div style={{marginTop:"20px", marginBottom:"20px"}}>
      Total Supply: {tokenData.totalSupply}
    </div> */}
    {/* <div>💎 Balance: {tonBalance}</div> */}
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


