
import { TonClient } from "ton";

function parseJettonTransfer(msg) {
    let slice = msg.beginParse();
    var op = slice.readUint(32);
    var query = slice.readUint(64);
    var amount = slice.readCoins();
    var to = slice.readAddress();

    return {
        op: op.toString(10),
        query: query.toString(10),
        to,
        amount,
    };
}

function parseJettotnTransfer(str) {

}

document.querySelectorAll("pre").forEach( (it) => {
    if(it.innerText.indexOf("x{00000019000000000000000140BF873C362D3F5313DC00}") > -1 ) {
        
        it.innerText = 
    }

})