
import Ton from "assets/images/tokens/ton.svg";



export interface Token {
  
  image: string,
  displayName: string,
  color: string,
  name: string,
  isActive?:  boolean
}



const ton: Token = {
  image: Ton,
  displayName: "TON",
  name: "ton",
  color: "#1490CD",
  isActive: true,
};


export { ton };
