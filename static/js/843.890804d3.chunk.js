"use strict";(self.webpackChunktonswap_web=self.webpackChunktonswap_web||[]).push([[843],{62843:function(e,n,t){t.r(n),t.d(n,{default:function(){return z}});var i=t(68963),r=t(55204),o=t(39910),s=t(84596),a=t(81003),u=t(77563),c=t(91691),d=t(19867),l=t(55195),f=t(74165),x=t(15861),v=t(45022),p=t(1532),m=t(93431),h=function(){var e=(0,d.x)().selectedToken,n=(0,m.v9)((function(e){return e.poolInfo})),t=(0,m.I0)(),i=function(){var n=(0,x.Z)((0,f.Z)().mark((function n(){var i;return(0,f.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e&&u.Lp){n.next=2;break}return n.abrupt("return");case 2:return n.next=4,(0,u.E3)(v.Address.parse(e.ammMinter),e.ammVersion);case 4:i=n.sent,t((0,p.xD)(i));case 6:case"end":return n.stop()}}),n)})));return function(){return n.apply(this,arguments)}}();return{fetchPoolData:i,poolInfo:n,resetPoolInfo:function(){return t((0,p.__)())}}},Z=t(75859),k=function(e){var n=parseFloat(e);return n>1?n.toFixed(2):n<.01?n.toFixed(6):n.toFixed(4)},y=function(){var e,n=h(),t=n.fetchPoolData,f=n.poolInfo,x=n.resetPoolInfo,v=(0,c.Z)(a.nS.name,(0,s.wE)((null===(e=f.tonReserves)||void 0===e?void 0:e.muln(2))||0,a.nS.decimals)).usd,p=(0,d.x)().selectedToken,m=(0,l.$)().t;return(0,i.useEffect)((function(){return t(),function(){x()}}),[p,u.Lp]),(0,Z.jsx)(r.Z,{sx:{maxWidth:380,margin:"auto"},children:f&&(0,Z.jsxs)(r.Z,{sx:{background:"rgba(173,216,230,0.6)",borderRadius:1.5,padding:"8px 16px"},children:[(0,Z.jsx)(o.Z,{fontSize:"12px",sx:{fontWeight:"bold"},align:"center",children:m("pool-info")}),(0,Z.jsxs)(r.Z,{display:"flex",alignItems:"center",justifyContent:"space-between",sx:{width:"100%"},children:[(0,Z.jsxs)(o.Z,{fontSize:"12px",children:[m("liquidity")," (TVL)"]}),(0,Z.jsxs)(o.Z,{fontSize:"12px",children:["$",k(v)]})]}),(0,Z.jsxs)(r.Z,{display:"flex",alignItems:"center",justifyContent:"space-between",sx:{width:"100%"},children:[(0,Z.jsx)(o.Z,{fontSize:"12px",children:"TON"}),(0,Z.jsx)(o.Z,{fontSize:"12px",children:(null===f||void 0===f?void 0:f.tonReserves)&&k((0,s.wE)(f.tonReserves,a.nS.decimals))})]}),(0,Z.jsxs)(r.Z,{display:"flex",alignItems:"center",justifyContent:"space-between",sx:{width:"100%"},children:[(0,Z.jsx)(o.Z,{fontSize:"12px",children:(null===p||void 0===p?void 0:p.displayName)||"TOKEN"}),(0,Z.jsx)(o.Z,{fontSize:"12px",children:p&&(null===f||void 0===f?void 0:f.tokenReserves)&&k((0,s.wE)(f.tokenReserves,p.decimals))})]})]})})},g=t(30357),T=t(45366),j=t(18740),I=t(79711),A=t(80124),b=t(30371),w=t(94361),L=t(74650),q=t(88027),R=t(71545),S=t(29439),E=t(63317),D=t(84672),M=t(75),C=t(70123),F=t(87673),U=function(){var e=(0,d.x)(),n=e.srcTokenAmount,t=e.destTokenAmount,r=e.selectedToken,o=(0,i.useState)(!1),c=(0,S.Z)(o,2),p=c[0],m=c[1],k=(0,i.useState)(!0),y=(0,S.Z)(k,2),g=y[0],T=y[1],j=(0,l.$)().t,I=h().fetchPoolData,A=function(){var e=(0,x.Z)((0,f.Z)().mark((function e(n,t,i,o){var s,a;return(0,f.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==r&&void 0!==r&&r.name){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,u.kI(null===r||void 0===r?void 0:r.tokenMinter);case 4:if("0"!=(s=e.sent).tokenReserves.toString()||"0"!=s.tonReserves.toString()){e.next=7;break}return e.abrupt("return",0);case 7:return e.next=9,u.hZ(n,t,i,o);case 9:return a=e.sent,e.abrupt("return",a);case 11:case"end":return e.stop()}}),e)})));return function(n,t,i,r){return e.apply(this,arguments)}}();(0,i.useEffect)((function(){if(r){var e=function(){var e=(0,x.Z)((0,f.Z)().mark((function e(){var n;return(0,f.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.E3(v.Address.parse(r.ammMinter),r.ammVersion);case 3:n=e.sent,(0,s.wE)(n.tokenReserves,null===r||void 0===r?void 0:r.decimals),(0,s.wE)(n.tonReserves,9),n.tokenReserves.isZero()||n.tonReserves.isZero()||m(!0),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:return e.prev=11,T(!1),e.finish(11);case 14:case"end":return e.stop()}}),e,null,[[0,9,11,14]])})));return function(){return e.apply(this,arguments)}}();e()}}),[r]);return(0,D.Z)(),!r||g?(0,Z.jsx)(F.Z,{}):(0,Z.jsx)(E.Z,{icon:(0,Z.jsx)(C.Z,{}),getAmountFunc:A,getBalances:function(){return Promise.all([u.gF(),u.yX(r)])},srcToken:a.nS,getTxRequest:function(){if(w.Z.addLiquidityTransaction(),r)return u.El(null===r||void 0===r?void 0:r.tokenMinter,n,t)},destToken:r,submitButtonText:j("add-ton-liquidity",{token:null===r||void 0===r?void 0:r.displayName}),refreshAmountsOnActionChange:!0,actionCategory:M.hX.MANAGE_LIQUIDITY,actionType:M.Us.ADD_LIQUIDITY,gasFee:u.et.ADD_LIQUIDITY,disableInputDependency:!p,onSuccess:I})},_=t(99307),N=function(){var e=(0,d.x)(),n=e.srcTokenAmount,t=e.selectedToken,i=(0,l.$)().t,r=h().fetchPoolData;return(0,D.Z)(),t?(0,Z.jsx)(E.Z,{icon:(0,Z.jsx)(_.Z,{}),getTxRequest:function(){return w.Z.removeLiquidityTransaction(),u.WU(t.tokenMinter,n)},getAmountFunc:u.hZ,getBalances:function(){return u.xN(t.tokenMinter)},srcToken:a.nS,destToken:t,submitButtonText:i("remove-ton-liquidity",{token:null===t||void 0===t?void 0:t.displayName}),refreshAmountsOnActionChange:!0,actionCategory:M.hX.MANAGE_LIQUIDITY,actionType:M.Us.REMOVE_LIQUIDITY,gasFee:u.et.REMOVE_LIQUIDITY,onSuccess:r}):null};var z=function(){var e=(0,d.x)().selectedToken,n=(0,j.Z)(),t=(0,I.UO)(),r=(0,s.xB)(t),o=(0,L.Kr)().onOperationTypeChange,a=(0,l.$)().t,u=(0,d.O)(),c=u.toggleRemoveLiquidity,f=u.toggleAddLiquidity;(0,T.Z)((function(){o(q.C8.MANAGE_LIQUIDITY)}));var x=(0,i.useMemo)((function(){return e?[{text:"add-liquidity",method:function(){w.Z.goToAddLiquidity(),f()}},{text:"remove-liquidity",method:function(){w.Z.goToRemoveLiquidity(),c()}}]:[]}),[n,e]),v=(0,i.useCallback)((function(e){n(A.Z.manageLiquidity.navigateToAddLiquidity.replace(":id",e.tokenMinter)),w.Z.selectTokenToTrade(e.displayName)}),[n]);return(0,Z.jsxs)(R.Fi,{children:[e&&(0,Z.jsx)(g.Z,{items:x,action:r}),(0,Z.jsxs)(I.Z5,{children:[(0,Z.jsx)(I.AW,{path:A.Z.manageLiquidity.addLiquidity,element:(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(U,{}),(0,Z.jsx)(y,{})]})}),(0,Z.jsx)(I.AW,{path:A.Z.manageLiquidity.removeLiquidity,element:(0,Z.jsxs)(Z.Fragment,{children:[(0,Z.jsx)(N,{}),(0,Z.jsx)(y,{})]})}),(0,Z.jsx)(I.AW,{path:A.Z.manageLiquidity.tokens,element:(0,Z.jsx)(b.n,{onTokenSelect:v,title:a("select-token-liquidity")})})]})]})}},70123:function(e,n,t){var i=t(64836);n.Z=void 0;var r=i(t(43563)),o=t(75859),s=(0,r.default)((0,o.jsx)("path",{d:"M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1z"}),"AddRounded");n.Z=s},99307:function(e,n,t){var i=t(64836);n.Z=void 0;var r=i(t(43563)),o=t(75859),s=(0,r.default)((0,o.jsx)("path",{d:"M18 13H6c-.55 0-1-.45-1-1s.45-1 1-1h12c.55 0 1 .45 1 1s-.45 1-1 1z"}),"RemoveRounded");n.Z=s}}]);