"use strict";(self.webpackChunktonswap_web=self.webpackChunktonswap_web||[]).push([[702],{45731:function(t,e,n){n.d(e,{J6:function(){return v},_e:function(){return m},j3:function(){return h}});var r=n(74165),a=n(1413),s=n(29439),u=n(15861),i=n(62616),o=n.n(i),c=n(45022),C=n(77563),p=n(92271),l=(n(25124),n(5647).lW),f=.5,A=function(t){var e=new p.Sha256;return e.update(t),l.from(e.digestSync())},F={name:"utf8",description:"utf8",image:"ascii",symbol:"utf8",decimals:"utf8",poolToken:"utf8",image_data:void 0},d=c.Address.parse("EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c"),E=new c.TonClient({endpoint:"https://mainnet.tonhubapi.com/jsonRPC"}),w={description:"TonSwap Liquidity Provider Jetton.",decimals:"9",image:"ipfs://bafkreia3ktmxxobtn6exd5juehf3k4tmcl46cej7buk3ce2nub7xl2573i",symbol:"TONSWAP-LP"};function v(t,e){return B.apply(this,arguments)}function B(){return(B=(0,u.Z)((0,r.Z)().mark((function t(e,n){var s,u,i,o,p,l,f;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,C.wl)(e);case 2:return s=t.sent,u=(0,a.Z)({name:"LP-".concat(s.symbol,"-V").concat("1.2"),poolToken:e.toFriendly()},w),i=b(u),o=i.codeCell,p=i.initDataCell,t.next=7,(0,c.contractAddress)({workchain:n,initialData:p,initialCode:o});case 7:return l=t.sent,t.next=10,E.isContractDeployed(l);case 10:return f=t.sent,t.abrupt("return",{isDeployed:f,futureAddress:l,initDataCell:p,codeCell:o});case 12:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function m(t){return D.apply(this,arguments)}function D(){return D=(0,u.Z)((0,r.Z)().mark((function t(e){var n,a,s,u,i,o=arguments;return(0,r.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return o.length>1&&void 0!==o[1]?o[1]:{},n=o.length>2&&void 0!==o[2]?o[2]:0,t.next=4,v(e,n);case 4:return a=t.sent,s=a.futureAddress,u=a.initDataCell,i=a.codeCell,t.abrupt("return",{to:s.toFriendly(),value:(0,c.toNano)(f).toString(),timeout:3e5,stateInit:new c.StateInit({data:u,code:i}),payload:"",error:""});case 9:case"end":return t.stop()}}),t)}))),D.apply(this,arguments)}function b(t){var e=function(t){var e=256,n=(0,c.beginDict)(e);return Object.entries(t).forEach((function(t){var e=(0,s.Z)(t,2),r=e[0],a=e[1];if(!F[r])throw new Error("Unsupported onchain key: ".concat(r));if(void 0!==a&&""!==a){for(var u=l.from(a,F[r]),i=Math.floor(1023/8)-1,o=new c.Cell,C=o;u.length>0;)if(C.bits.writeUint8(0),C.bits.writeBuffer(u.slice(0,i)),(u=u.slice(i)).length>0){var p=new c.Cell;C.refs.push(p),C=p}n.storeRef(A(r),o)}})),(0,c.beginCell)().storeInt(0,8).storeDict(n.endDict()).endCell()}(t),n=new c.Cell;return n.bits.writeCoins(0),n.bits.writeAddress(d),n.bits.writeCoins(0),n.bits.writeCoins(0),n.bits.writeAddress(c.Address.parse("EQAxZiaJf80xadJw4qvFN5WkNACXAP56Wa00svHTf4iAjpqy")),n.refs.push(e),n.refs.push(c.Cell.fromBoc("B5EE9C724102110100031C000114FF00F4A413F4BCF2C80B0102016202030202CC0405001BA0F605DA89A1F401F481F481A8610201D40607020148080900B70831C02497C138007434C0C05C6C2544D7C0FC02F83E903E900C7E800C5C75C87E800C7E800C00B4C7C8608403E29FA96EA54C4D167C023808608405E351466EA58C511100FC02780D60841657C1EF2EA4D67C02B817C12103FCBC2000113E910C1C2EBCB853600201200A0B0201200F1001F100F4CFFE803E90087C007B51343E803E903E90350C144DA8548AB1C17CB8B04A30BFFCB8B0950D109C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF274013E903D010C7E800835D270803CB8B11DE0063232C1540233C59C3E8085F2DAC4F3200C02F73B51343E803E903E90350C0234CFFE80145468017E903E9014D6F1C1551CDB5C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C0327E401C1D3232C0B281F2FFF274140371C1472C7CB8B0C2BE80146A2860822625A019AD822860822625A028062849E5C412440E0DD7C138C34975C2C0600D0E009E8210178D4519C8CB1F19CB3F5007FA0222CF165006CF1625FA025003CF16C95005CC2391729171E25008A813A08209C9C380A014BCF2E2C504C98040FB001023C85004FA0258CF1601CF16CCC9ED5400705279A018A182107362D09CC8CB1F5230CB3F58FA025007CF165007CF16C9718018C8CB0524CF165006FA0215CB6A14CCC971FB0010241023007CC30023C200B08E218210D53276DB708010C8CB055008CF165004FA0216CB6A12CB1F12CB3FC972FB0093356C21E203C85004FA0258CF1601CF16CCC9ED5400D73B51343E803E903E90350C01F4CFFE803E900C145468549271C17CB8B049F0BFFCB8B08160824C4B402805AF3CB8B0E0841EF765F7B232C7C572CFD400FE8088B3C58073C5B25C60063232C14933C59C3E80B2DAB33260103EC01004F214013E809633C58073C5B3327B55200081200835C87B51343E803E903E90350C0134C7C8608405E351466E80A0841EF765F7AE84AC7CB8B174CFCC7E800C04E81408F214013E809633C58073C5B3327B552034B539C1")[0]),{initDataCell:n,codeCell:c.Cell.fromBoc("B5EE9C7241022A010005F5000114FF00F4A413F4BCF2C80B0102016202030202CB0405020120202102012006070201CE1B1C02012008090201200E0F03CDD19916380492F81F068698180B8D8492F81F07D207D2018FD0018B8EB90FD0018FD001801E98FE99FF8031141083DEECBEF5D474536097D007D201821AA00F011600CF18111410839B1684E5D7181189999C00D7C22896382D8095D4A6A187D8270184207F97840A0B0C00496BB51343E80007E187E90007E18BE80007E18FE80007E193E90007E1975007E19B50C3E19E01ECF843F8412759A984F844F8412859A984F828F847285970542013541403C85004FA0258CF1601CF16CCC922C8CB0112F400F400CB00C9F9007074C8CB02CA07CBFFC9D05005C705F2E04A21AA008209C9C380A058A012A15423405230F00B5121F00AF84301A1F863F84401A1F864F84101A1F861DB3C1F01A06C12FA00FA0030F8445210BCF2D258F844C000F2D259F8428D0860000000000000000000000000000000000000000000000000000000000000000004C705F2D25A5314BCF2D25B50457F5530F00CDB3C1F01AC6C12FA00FA40D30031F8428D0860000000000000000000000000000000000000000000000000000000000000000004C705C000F84226C705C000B093F2C25CDED31F21C01698314566441403F011E035C018E3025F060D0170F8428D0860000000000000000000000000000000000000000000000000000000000000000004C705F2D25A03FA00305045705530F00CDB3C1F020120101102012014150047420C103923071E07021925CBB8E125CA0AB005300A824BC9231A5946C12A401E2E86C218020120121300271C20063232C15400F3C5807E80B2DAB25CFEC02000771C608403E29FA97232C7C572CFD63E8088B3C59633C59C3E8084B2C0725C5C1D20063232C17E10B3C594017E808532DA04F2C004B2C033325CFEC0200201201617020120191A01A509303FE4BE10E4BE113889703FE4BE1124BE10F89515C8A08057533B50F614826E54A0AF2C63840C0D40B03FE50C4CBC02A51000FC02F8B801303FE384C408D7C0FE10C8E87E18FE1116283E19007C02B8C36018002F14CD7C02882A8020827270E02805A8140168052844BC02E00058F84325A0F863F84426A1F864048208989680A023AA00A014A102AA008209C9C380A05220BCF2E25D4033F00B00752040FA3E1130002614C86A3C02006A4123854C3E1054882A3E10EA413E1054882A3E112A412D8238BE1116283E193E10D6283E18FE1048683E1860002708B0803CB8978870800870802C3CB897C06A612000CF1C208405E351467232C7C532CFD63E8088F3C588F3C588BE8084B2C0327E0A3E11C4091C150804D50500F214013E809633C58073C5B33248B232C044BD003D0032C032483E401C1D3232C0B281F2FFF2741DE0063232C15633C59400FE8084B2DAF333325C7EC02003F501B4C7FE800C09B0000970002C48AC7098E58C4C91543C037808AA8020827270E02814842820820F42402814942848EA8020822625A02820822625A02814842E48A084017D78402E6C65CC0C4C91543C03781C3E10F0802504099B0CB8C370006497C1B814093C03BE10A271C164C07E18A44C7890C0FC0436CF201D1E1F00E6F844F8432A59F00FF843F8442559F00F806426A152508064A98480645007A152B08064A9845227BB5217BB16B19D5B3254562227544A3618F00D718E34375326A15295A120821005F5E100BC9B333303AA0028544730F00B8E1530343521821005F5E100BC945252F00A9131E25033E213E213004380000000000000000000000000000000000000000000000000000000000000000010003CF847F846C8F841FA02F842CF16F843FA02F844FA02F845CF16CCCCC9ED540201202223020148262702015824250027B9D4C028103E5A85203A8018103E8A858A0A90480009B29DE019A00027B3C67C01BE105FFE10BE10FE113E117E11BE11E002015828290025B7AF0A225510207D15005430207CB515209490006BADBCF8037C147C23B82A1009AA0A01E428027D012C678B00E78B666491646580897A007A00658064FC80383A6465816503E5FFE4E8400029AF16F8037C13B791187C20BFFC22FC237C23AA8240CE52E22B")[0]}}function h(t){var e=!1,n=t.readDict(256,(function(t){var n=l.from(""),r=function t(e,n,r){if(e.toCell().beginParse(),r&&0!==e.readUint(8).toNumber())throw new Error("Only snake format is supported");return n=l.concat([n,e.readRemainingBytes()]),1===e.remainingRefs&&(n=t(e.readRef(),n,!1)),n};return 0===t.remainingRefs?(e=!0,r(t,n,!0)):r(t.readRef(),n,!0)})),r={};return Object.keys(F).forEach((function(t){var e,a,s=null===(e=n.get((a=A(t).toString("hex"),new(o())(a,"hex").toString(10))))||void 0===e?void 0:e.toString(F[t]);s&&(r[t]=s)})),{metadata:r,isJettonDeployerFaultyOnChainData:e}}},77563:function(t,e,n){n.d(e,{et:function(){return D},GW:function(){return y},Lp:function(){return b},wv:function(){return H},El:function(){return et},qb:function(){return tt},WU:function(){return nt},wN:function(){return $},Vk:function(){return U},hZ:function(){return V},E3:function(){return M},kI:function(){return P},yX:function(){return k},BX:function(){return S},wl:function(){return Q},mN:function(){return q},xN:function(){return g},gF:function(){return T},OZ:function(){return ut},GO:function(){return at}});var r,a,s=n(1413),u=n(29439),i=n(74165),o=n(15861),c=n(45022),C=n(84596),p=n(15671),l=n(43144),f=n(62616),A=n.n(f);!function(t){t[t.Transfer=260734629]="Transfer",t[t.Transfer_notification=1935855772]="Transfer_notification",t[t.Internal_transfer=395134233]="Internal_transfer",t[t.Excesses=3576854235]="Excesses",t[t.Burn=1499400124]="Burn",t[t.Burn_notification=2078119902]="Burn_notification",t[t.ADD_LIQUIDITY=22]="ADD_LIQUIDITY",t[t.REMOVE_LIQUIDITY=23]="REMOVE_LIQUIDITY",t[t.SWAP_TOKEN=24]="SWAP_TOKEN",t[t.SWAP_TON=25]="SWAP_TON",t[t.ClaimRewards=94625792]="ClaimRewards",t[t.ClaimRewardsNotification=94625793]="ClaimRewardsNotification"}(r||(r={})),function(t){t[t.MinAmountOutIsInsufficient=601]="MinAmountOutIsInsufficient",t[t.ADD_LIQUIDITY_INSUFFICIENT_BALANCE=103]="ADD_LIQUIDITY_INSUFFICIENT_BALANCE",t[t.ADD_LIQUIDITY_WRONG_JETTON_SENDER=76]="ADD_LIQUIDITY_WRONG_JETTON_SENDER"}(a||(a={}));var F=function(){function t(){(0,p.Z)(this,t)}return(0,l.Z)(t,null,[{key:"initData",value:function(){var t=(0,o.Z)((0,i.Z)().mark((function t(){var e;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(e=new c.Cell).bits.writeUint(101,32),e.bits.writeUint(1,64),t.abrupt("return",e);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()},{key:"addLiquidity",value:function(e,n,a){var s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new(A())(0),u=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0;return t.transferOverload(e,n,a,s,r.ADD_LIQUIDITY,u,i)}},{key:"transferOverload",value:function(t,e,n){var a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:new(A())(0),s=arguments.length>4?arguments[4]:void 0,u=arguments.length>5?arguments[5]:void 0,i=arguments.length>6?arguments[6]:void 0;console.log("jettonAmount: ".concat(e.toString()," forwardTonAmount ").concat(a.toString()," => minAmount: ").concat(u));var o=new c.Cell;return o.bits.writeUint(r.Transfer,32),o.bits.writeUint(1,64),o.bits.writeCoins(e),o.bits.writeAddress(t),o.bits.writeAddress(n),o.bits.writeBit(!1),o.bits.writeCoins(a),o.bits.writeBit(!1),o.bits.writeUint(new(A())(s),32),s===r.ADD_LIQUIDITY&&i?(o.bits.writeUint(u,32),o.bits.writeCoins(i)):s===r.SWAP_TOKEN&&o.bits.writeCoins(u),o}},{key:"transfer",value:function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n){var a;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(a=new c.Cell).bits.writeUint(r.Transfer,32),a.bits.writeUint(1,64),a.bits.writeCoins(n),a.bits.writeAddress(e),a.bits.writeAddress(e),a.bits.writeBit(!1),a.bits.writeCoins(0),t.abrupt("return",a);case 9:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"removeLiquidity",value:function(t,e){var n=new c.Cell;return n.bits.writeUint(r.Burn,32),n.bits.writeUint(1,64),n.bits.writeCoins(t),n.bits.writeAddress(e),n}},{key:"swapTon",value:function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n){var a;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("SwapTon tonToSwap:".concat(e.toString()," minAmountOut:").concat(n.toString())),(a=new c.Cell).bits.writeUint(r.SWAP_TON,32),a.bits.writeUint(1,64),a.bits.writeCoins(e),a.bits.writeCoins(n),t.abrupt("return",a);case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}()},{key:"swapToken",value:function(){var e=(0,o.Z)((0,i.Z)().mark((function e(n,a,s){var u,o,c=arguments;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return u=c.length>3&&void 0!==c[3]?c[3]:new(A())(0),o=c.length>4?c[4]:void 0,e.abrupt("return",t.transferOverload(n,a,s,u,r.SWAP_TOKEN,o));case 3:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}()},{key:"mx",value:function(){var t=(0,o.Z)((0,i.Z)().mark((function t(){var e;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(e=new c.Cell).bits.writeUint(new(A())(5),32),e.bits.writeUint(new(A())(0),64),t.abrupt("return",e);case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}()}]),t}(),d=n(81003),E=n(71451),w=n(45731),v=n(2491),B=n(5647).lW,m="https://mainnet.tonhubapi.com/jsonRPC";document.location.href.indexOf("testnet=")>-1?m="https://testnet.tonhubapi.com/jsonRPC":document.location.href.indexOf("sandbox=")>-1&&(m="https://sandbox.tonhubapi.com/jsonRPC");var D,b=new c.TonClient({endpoint:m});!function(t){t[t.SWAP=.14]="SWAP",t[t.FORWARD_TON=.09]="FORWARD_TON",t[t.ADD_LIQUIDITY_FORWARD_TON=.12]="ADD_LIQUIDITY_FORWARD_TON",t[t.ADD_LIQUIDITY=.2]="ADD_LIQUIDITY",t[t.REMOVE_LIQUIDITY=.2]="REMOVE_LIQUIDITY"}(D||(D={}));var h=function(t){return new Promise((function(e){return setTimeout(e,t)}))},x=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n,r){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,b.callGetMethod(e,n,r);case 3:return t.abrupt("return",t.sent);case 6:return t.prev=6,t.t0=t.catch(0),t.next=10,h(500);case 10:return t.abrupt("return",b.callGetMethod(e,n,r));case 11:case"end":return t.stop()}}),t,null,[[0,6]])})));return function(e,n,r){return t.apply(this,arguments)}}(),k=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e){var n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e.tokenMinter,_());case 2:return n=t.sent,t.abrupt("return",S(c.Address.parse(n.tokenMinter)));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),Z=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e){var n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e,_());case 2:return n=t.sent,t.abrupt("return",y(n.lpWallet,c.Address.parse(n.ammMinter)));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),g=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e){var n,r,a,s,o,p,l;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e,_());case 2:return n=t.sent,t.next=5,Promise.all([M(c.Address.parse(n.ammMinter)),Z(e)]);case 5:if(r=t.sent,a=(0,u.Z)(r,2),s=a[0],"0"!==(o=a[1]).balance.toString()){t.next=11;break}return t.abrupt("return",[(0,C.wE)("0",n.decimals),(0,C.wE)("0",n.decimals)]);case 11:return p=o.balance.mul(s.tonReserves).div(s.totalSupply),l=o.balance.mul(s.tokenReserves).div(s.totalSupply),t.abrupt("return",[(0,C.wE)(p,9),(0,C.wE)(l,n.decimals)]);case 14:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function _(){var t=v.Z.getState().wallet.address;if(!t)throw new Error("No owner logged in");return c.Address.parse(t)}function y(t,e){return I.apply(this,arguments)}function I(){return(I=(0,o.Z)((0,i.Z)().mark((function t(e,n){var r,a,s,u,o,c;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,console.log("_getJettonBalance::  jettonWallet at ".concat(e.toFriendly())),t.next=4,b.callGetMethod(e,"get_wallet_data",[]);case 4:return r=t.sent,a=(0,C.mh)(r.stack[0][1]),s=(0,d.NH)(r.stack[1][1].bytes),u=(0,d.NH)(r.stack[2][1].bytes),t.next=10,Q(n);case 10:return o=t.sent,c=o.decimals,t.abrupt("return",{balance:a,walletOwner:s,jettonMaster:u,decimals:c});case 15:return t.prev=15,t.t0=t.catch(0),console.log(t.t0),t.abrupt("return",{balance:new(A())(0),walletOwner:_(),jettonMaster:n,decimals:9});case 19:case"end":return t.stop()}}),t,null,[[0,15]])})))).apply(this,arguments)}var S=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e){var n,r,a,s;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return(n=new c.Cell).bits.writeAddress(_()),t.t0=d.J2,t.next=5,n.toBoc({idx:!1});case 5:return t.t1=t.sent,r=(0,t.t0)(t.t1),t.next=9,x(e,"get_wallet_address",[["tvm.Slice",r]]);case 9:return a=t.sent,s=(0,d.NH)(a.stack[0][1].bytes),t.abrupt("return",y(s,e));case 12:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),T=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(){var e;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.getBalance(_());case 2:return e=t.sent,t.abrupt("return",(0,c.fromNano)(e));case 4:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();function N(t,e,n,r){return R.apply(this,arguments)}function R(){return(R=(0,o.Z)((0,i.Z)().mark((function t(e,n,r,a){var s;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log(n.toString(),r.toString(),a.toString()),t.next=3,b.callGetMethod(e,"get_amount_out",[["num",n.toString()],["num",r.toString()],["num",a.toString()]]);case 3:return s=t.sent,console.log("GetAmountOut(amountIn), (reserveIn), (reserveOut) =>",(0,C.mh)(s.stack[0][1]).toString()),t.abrupt("return",(0,C.mh)(s.stack[0][1]).toString());case 6:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function O(t,e,n,r){return L.apply(this,arguments)}function L(){return(L=(0,o.Z)((0,i.Z)().mark((function t(e,n,r,a){var s;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("amountIn.toString(), reserveIn.toString(), reserveOut.toString()"),console.log((0,C.wE)(n,18),(0,C.wE)(r,9),(0,C.wE)(a,18)),t.next=4,b.callGetMethod(e,"get_amount_in",[["num",n.toString()],["num",r.toString()],["num",a.toString()]]);case 4:return s=t.sent,console.log("getAmountIn2(amountIn), (reserveIn), (reserveOut)"),console.log("getAmountIn2=",(0,C.mh)(s.stack[0][1]).toString()),t.abrupt("return",(0,C.mh)(s.stack[0][1]).toString());case 8:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var U=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n,r,a){var s,u,o,C,p,l;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(s=(0,d.jf)()[e],u=s.ammMinter){t.next=4;break}throw new Error("Amm address missing");case 4:return t.next=6,M(c.Address.parse(u),s.ammVersion);case 6:if(o=t.sent,C=c.Address.parse(u),!r){t.next=17;break}if(p=r,!n){t.next=14;break}return t.abrupt("return",N(C,p,o.tokenReserves,o.tonReserves));case 14:return t.abrupt("return",N(C,p,o.tonReserves,o.tokenReserves));case 15:t.next=23;break;case 17:if(l=a||new(A())(0),n){t.next=22;break}return t.abrupt("return",O(C,new(A())(l),o.tonReserves,o.tokenReserves));case 22:return t.abrupt("return",O(C,new(A())(l),o.tokenReserves,o.tonReserves));case 23:case"end":return t.stop()}}),t)})));return function(e,n,r,a){return t.apply(this,arguments)}}();function P(t){return W.apply(this,arguments)}function W(){return(W=(0,o.Z)((0,i.Z)().mark((function t(e){var n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e,_());case 2:return n=t.sent,t.abrupt("return",M(n.ammMinter,n.ammVersion));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function M(t){return j.apply(this,arguments)}function j(){return j=(0,o.Z)((0,i.Z)().mark((function t(e){var n,r,a,s,u,o,c,p,l=arguments;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=l.length>1&&void 0!==l[1]?l[1]:1.2,r=1.1==n?"get_jetton_data":"get_pool_data",t.next=4,b.callGetMethod(e,r,[]);case 4:return a=t.sent,s=(0,C.mh)(a.stack[0][1]),u=a.stack[1][1],o=a.stack[2][1].bytes,c=(0,C.mh)(a.stack[3][1]),p=(0,C.mh)(a.stack[4][1]),a.stack[5][1].bytes,t.abrupt("return",{totalSupply:s,jettonWalletAddress:(0,d.NH)(o),mintable:u,tonReserves:c,tokenReserves:p});case 12:case"end":return t.stop()}}),t)}))),j.apply(this,arguments)}function Q(t){return Y.apply(this,arguments)}function Y(){return(Y=(0,o.Z)((0,i.Z)().mark((function t(e){var n,r,a,u,o,p,l;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b.callGetMethod(e,"get_jetton_data",[]);case 2:if(n=t.sent,r=(0,C.mh)(n.stack[0][1]),a=it(n.stack[2][1].bytes).beginParse().readAddress(),u=c.Cell.fromBoc(B.from(n.stack[3][1].bytes,"base64"))[0],t.prev=6,2!=(p=(0,C.V1)(u)).length){t.next=10;break}throw"onchain data";case 10:return t.next=12,fetch(p.replace("ipfs://","https://ipfs.io/ipfs/"));case 12:return l=t.sent,t.next=15,l.json();case 15:o=t.sent,t.next=21;break;case 18:t.prev=18,t.t0=t.catch(6),o=(0,w.j3)(u.beginParse()).metadata;case 21:return t.abrupt("return",(0,s.Z)({owner:a,totalSupply:r,decimals:9},o));case 22:case"end":return t.stop()}}),t,null,[[6,18]])})))).apply(this,arguments)}var G,V=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n,r,a){var s,u,o,c;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,"ton"!==e?e:n,_());case 2:return s=t.sent,t.next=5,M(s.ammMinter,s.ammVersion);case 5:if(u=t.sent,o=u.tokenReserves,c=u.tonReserves,"0"!==o.toString()||"0"!==c.toString()){t.next=10;break}return t.abrupt("return",new(A())(0));case 10:if(console.log("tokenReserves: ".concat((0,C.wE)(o,s.decimals)," tonReserves: ").concat((0,C.wE)(c,9))),"ton"!==e){t.next=20;break}if(null==r){t.next=16;break}return t.abrupt("return",new(A())(r).mul(o).div(c));case 16:if(null==a){t.next=18;break}return t.abrupt("return",(0,C.t1)(a,s.decimals).mul(c).div(o));case 18:t.next=26;break;case 20:if(null==r){t.next=24;break}return t.abrupt("return",new(A())(r).mul(o).div(c));case 24:if(null==a){t.next=26;break}return t.abrupt("return",new(A())(a).mul(c).div(o));case 26:return t.abrupt("return",new(A())(0));case 27:case"end":return t.stop()}}),t)})));return function(e,n,r,a){return t.apply(this,arguments)}}(),q=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n){var r,a,s,u,o,C,p,l;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=new(A())(1),a=(0,d.jf)()[e],t.next=4,X();case 4:if(s=t.sent,"ton"!=e){t.next=7;break}return t.abrupt("return",(s*Number(n)).toFixed(2));case 7:if(u=a.ammMinter){t.next=10;break}throw new Error("Amm minter missing");case 10:return t.next=12,M(c.Address.parse(u),a.ammVersion);case 12:return o=t.sent,C=o.tokenReserves,p=o.tonReserves,r=p.mul(new(A())(Math.pow(10,a.decimals/2))).div(C.div(new(A())(Math.pow(10,a.decimals/2)))),l=parseFloat((0,c.fromNano)(r))*K,t.abrupt("return",(l*parseFloat(n)).toFixed(6));case 18:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),J={},H=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e){var n,r,a;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!J[e]){t.next=2;break}return t.abrupt("return",J[e].toFixed());case 2:return t.next=4,fetch("https://api.coingecko.com/api/v3/simple/price?ids=".concat(e,"&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false"));case 4:return n=t.sent,t.next=7,n.json();case 7:return r=t.sent,a=r[e].usd,J[e]=a,t.abrupt("return",a.toFixed(2));case 11:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),K=0;function X(){return z.apply(this,arguments)}function z(){return z=(0,o.Z)((0,i.Z)().mark((function t(){var e,n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!G){t.next=3;break}return t.next=3,new Promise(function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,G;case 2:setTimeout(e,20);case 3:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}());case 3:if(!K){t.next=5;break}return t.abrupt("return",K);case 5:return G=fetch("https://api.coingecko.com/api/v3/simple/price?ids=the-open-network&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false"),t.next=8,G;case 8:return e=t.sent,t.next=11,e.json();case 11:return n=t.sent,K=parseFloat(n["the-open-network"].usd),setTimeout((function(){return K=0}),18e4),t.abrupt("return",K);case 15:case"end":return t.stop()}}),t)}))),z.apply(this,arguments)}var $=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n,a){var s,u,o,p;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e,_());case 2:return s=t.sent,u=F.transferOverload(c.Address.parse(s.ammMinter),(0,C.t1)(n,s.decimals),_(),(0,c.toNano)(D.FORWARD_TON),r.SWAP_TOKEN,(0,c.toNano)(a).mul(new(A())(995)).div(new(A())(1e3))),o=u.toBoc().toString("base64"),p=(0,c.toNano)(D.SWAP),t.abrupt("return",rt(s.jettonWallet,p,o));case 7:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),tt=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n,r){var a,s,u,o;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e,_());case 2:return a=t.sent,t.next=5,F.swapTon((0,c.toNano)(n),(0,C.t1)(r,a.decimals).mul(new(A())(995)).div(new(A())(1e3)));case 5:return s=t.sent,u=s.toBoc().toString("base64"),o=(0,c.toNano)(n).add((0,c.toNano)(D.SWAP)),t.abrupt("return",rt(c.Address.parse(a.ammMinter),o,u));case 9:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),et=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n,r){var a,s,u,o,p;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e,_());case 2:return a=t.sent,s=new(A())(5),t.next=6,F.addLiquidity(c.Address.parse(a.ammMinter),(0,C.t1)(r,a.decimals),_(),(0,c.toNano)(n).add((0,c.toNano)(D.FORWARD_TON)),s,(0,c.toNano)(n));case 6:return u=t.sent,o=u.toBoc().toString("base64"),p=(0,c.toNano)(n).add((0,c.toNano)(D.ADD_LIQUIDITY)),t.abrupt("return",rt(a.jettonWallet,p,o));case 10:case"end":return t.stop()}}),t)})));return function(e,n,r){return t.apply(this,arguments)}}(),nt=function(){var t=(0,o.Z)((0,i.Z)().mark((function t(e,n){var r,a,s,u,o,C,p;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,(0,d.LP)(b,e,_());case 2:return r=t.sent,t.next=5,M(c.Address.parse(r.ammMinter));case 5:return a=t.sent,s=(0,c.toNano)(n).mul(a.totalSupply).div(a.tonReserves),t.next=9,Z(e);case 9:return t.sent.balance,t.next=12,F.removeLiquidity(s,_());case 12:return u=t.sent,o=u.toBoc().toString("base64"),t.next=16,(0,d.LP)(b,e,_());case 16:return C=t.sent,p=(0,c.toNano)(D.REMOVE_LIQUIDITY),t.abrupt("return",rt(C.lpWallet,p,o));case 19:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}();function rt(t,e,n){return{to:t.toFriendly({bounceable:!0}),value:e.toString(),timeout:3e5,payload:n}}function at(t){return st.apply(this,arguments)}function st(){return(st=(0,o.Z)((0,i.Z)().mark((function t(e){var n;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getSeqNo();case 2:return n=t.sent,t.abrupt("return",(0,o.Z)((0,i.Z)().mark((function t(){var r,a;return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:r=0;case 1:if(!(r<20)){t.next=18;break}return t.next=4,(0,C.gw)(3e3);case 4:return a=void 0,t.prev=5,t.next=8,e.getSeqNo();case 8:a=t.sent,t.next=13;break;case 11:t.prev=11,t.t0=t.catch(5);case 13:if(!(a&&a>n)){t.next=15;break}return t.abrupt("return");case 15:r++,t.next=1;break;case 18:throw new Error(E.Gp);case 19:case"end":return t.stop()}}),t,null,[[5,11]])}))));case 4:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function ut(t){return(0,o.Z)((0,i.Z)().mark((function e(){var n,r;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=0;case 1:if(!(n<20)){e.next=18;break}return e.next=4,(0,C.gw)(3e3);case 4:return r=void 0,e.prev=5,e.next=8,a=t,b.isContractDeployed(c.Address.parse(a));case 8:r=e.sent,e.next=13;break;case 11:e.prev=11,e.t0=e.catch(5);case 13:if(!r){e.next=15;break}return e.abrupt("return");case 15:n++,e.next=1;break;case 18:throw new Error(E.Gp);case 19:case"end":return e.stop()}var a}),e,null,[[5,11]])})))}function it(t){return c.Cell.fromBoc(B.from(t,"base64"))[0]}}}]);