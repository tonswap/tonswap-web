"use strict";(self.webpackChunktonswap_web=self.webpackChunktonswap_web||[]).push([[539],{40539:function(e,n,t){t.r(n),t.d(n,{default:function(){return j}});var a=t(30357),o=t(45366),s=t(18740),r=t(68963),u=t(78344),c=t(80124),l=t(30371),i=t(74650),d=t(88027),p=t(19867),x=t(5922),m=t(88214),f=t(15861),k=t(77563),T=t(43217),g=t(24145),h=t(71879),Z=t(84672),v=t(75),y=t(75859),A=function(){var e=(0,p.x)(),n=e.srcTokenAmount,t=e.destTokenAmount,a=e.selectedToken,o=(0,p.x)().totalBalances,s=function(){var e=(0,f.Z)((0,m.Z)().mark((function e(){return(0,m.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",k.qb(a.tokenMinter,n,t));case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,Z.Z)(),a?(0,y.jsx)(T.Z,{icon:(0,y.jsx)(g.Z,{}),getTxRequest:s,getAmountFunc:k.Vk,getBalances:function(){return Promise.all([k.gF(),k.yX(a)])},srcToken:h.nS,destToken:a,submitButtonText:"Buy ".concat(null===a||void 0===a?void 0:a.displayName),refreshAmountsOnActionChange:!o.destBalance&&!o.srcBalance,actionCategory:v.hX.SWAP,actionType:v.Us.BUY,gasFee:k.et.SWAP}):null},B=function(){var e=(0,p.x)(),n=e.srcTokenAmount,t=e.destTokenAmount,a=e.selectedToken,o=(0,p.x)().totalBalances;return(0,Z.Z)(),a?(0,y.jsx)(T.Z,{icon:(0,y.jsx)(g.Z,{}),getTxRequest:function(){return k.wN(a.tokenMinter,n,t)},getAmountFunc:k.Vk,getBalances:function(){return Promise.all([k.yX(a),k.gF()])},srcToken:a,destToken:h.nS,submitButtonText:"Sell ".concat(null===a||void 0===a?void 0:a.displayName),refreshAmountsOnActionChange:!o.destBalance&&!o.srcBalance,actionCategory:v.hX.SWAP,actionType:v.Us.SELL,gasFee:k.et.SWAP}):null};var j=function(){var e=(0,p.x)().selectedToken,n=(0,p.O)(),t=n.toggleBuyToSell,m=n.toggleSellToBuy,f=(0,i.Kr)().onOperationTypeChange,k=(0,s.Z)(),T=(0,u.UO)(),g=(0,x.xB)(T);(0,o.Z)((function(){f(d.C8.SWAP)}));var h=(0,r.useMemo)((function(){return e?[{text:"Buy",method:m},{text:"Sell",method:t}]:[]}),[k,e]),Z=(0,r.useCallback)((function(e){k(c.Z.swap.navigateToBuy.replace(":id",e))}),[k]);return(0,y.jsxs)(y.Fragment,{children:[e&&(0,y.jsx)(a.Z,{symbol:e.displayName,items:h,action:g}),(0,y.jsxs)(u.Z5,{children:[(0,y.jsx)(u.AW,{path:c.Z.swap.buy,element:(0,y.jsx)(A,{})}),(0,y.jsx)(u.AW,{path:c.Z.swap.sell,element:(0,y.jsx)(B,{})}),(0,y.jsx)(u.AW,{path:c.Z.swap.tokens,element:(0,y.jsx)(l.n,{onTokenSelect:Z,title:"Jettons available for trade"})})]})]})}},24145:function(e,n,t){var a=t(64836);n.Z=void 0;var o=a(t(43563)),s=t(75859),r=(0,o.default)((0,s.jsx)("path",{d:"M18.3 14.29a.9959.9959 0 0 0-1.41 0L13 18.17V3c0-.55-.45-1-1-1s-1 .45-1 1v15.18L7.12 14.3a.9959.9959 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l5.59 5.59c.39.39 1.02.39 1.41 0l5.59-5.59c.38-.39.38-1.03 0-1.42z"}),"SouthRounded");n.Z=r}}]);