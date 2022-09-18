"use strict";(self.webpackChunktonswap_web=self.webpackChunktonswap_web||[]).push([[554],{92066:function(e,n,r){var t=r(22112),a=r(75859);n.Z=function(e){var n=e.value,r=e.decimalScale,i=void 0===r?4:r,s=e.prefix;return n?(0,a.jsx)(t.Z,{prefix:s,displayType:"text",value:n,thousandSeparator:!0,decimalScale:i}):(0,a.jsx)(a.Fragment,{children:"0"})}},94659:function(e,n,r){var t=r(56085),a=r(83509),i=r(54308),s=r(54276),o=r(55204),c=r(99581),u=r(75),l=r(39417),d=r(55195),p=r(75859),f=(0,i.ZP)(o.Z)({display:"flex",flexDirection:"column",alignItems:"center",gap:10});n.Z=function(e){var n=e.open,r=e.children,i=(0,l.X)().adapterId,o=(0,d.$)().t,h=!c.tq&&i===u.ht.TON_HUB;return(0,p.jsx)(t.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1},backdropFilter:"blur(5px) "},open:n,children:(0,p.jsxs)(f,{children:[(0,p.jsx)(a.Z,{color:"inherit"}),r,h&&(0,p.jsx)(s.Z,{children:o("check-tonhub")})]})})}},18062:function(e,n,r){var t=r(68963),a=r(42247),i=r(54308),s=r(83227),o=r(55204),c=r(97719),u=r(75859),l=(0,i.ZP)(o.Z)({"& &":{color:"white"},"& a":{color:"white"}});n.Z=function(){var e=(0,a.Ds)(),n=e.enqueueSnackbar,r=e.closeSnackbar;return{showNotification:(0,t.useCallback)((function(e){var t=e.message,a=e.variant,i=e.onClose,o=e.autoHideDuration,d=e.anchorOrigin,p=e.className,f=void 0===p?"":p,h=n((0,u.jsx)(l,{children:t}),{className:f,anchorOrigin:d,variant:a,autoHideDuration:o||5e3,onClose:i,onClick:function(){return r(h)},action:function(){return(0,u.jsx)(s.Z,{children:(0,u.jsx)(c.Z,{style:{width:20,height:20}})})}})}),[r,n])}}},12554:function(e,n,r){r.r(n),r.d(n,{default:function(){return H}});var t=r(74165),a=r(15861),i=r(29439),s=r(37122),o=r(54276),c=r(42200),u=r(68963),l=r(45022),d=r(18366),p=r(94659),f=(0,d.Z)(s.Z)({display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",paddingBottom:"100px",paddingTop:50,width:"100%","& .screen-title":{marginBottom:30}}),h=r(12358),m=r(55195),x=r(75859),Z=(0,d.Z)(s.Z)({width:"100%",marginBottom:20}),v=(0,d.Z)(s.Z)({"& p":{fontSize:12,color:"red",marginTop:5}}),w=function(e){var n=e.onSubmit,r=(0,u.useState)(""),s=(0,i.Z)(r,2),c=s[0],d=s[1],p=(0,u.useState)(!1),f=(0,i.Z)(p,2),w=f[0],k=f[1],g=(0,m.$)().t,b=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(d(r),48===r.length){e.next=3;break}return e.abrupt("return");case 3:try{l.Address.parse(r),n(r),w&&k(!1)}catch(t){k(!0)}case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,x.jsxs)(Z,{children:[(0,x.jsx)(h.Z,{className:"input",fullWidth:!0,label:"Enter jetton minter address",value:c,placeholder:"EQDrjaLahLkMB-hMCmkzOyBuHJ139ZUYmPHu6RRBKnbdLIYI",onChange:function(e){return b(e.target.value)},onFocus:function(){return k(!1)}}),w&&(0,x.jsx)(v,{children:(0,x.jsx)(o.Z,{children:g("invalid-address")})})]})},k=r(18740),g=r(93431),b=r(80124),y=r(77563),j=r(45731),C=r(47079),S=r(18062),A=r(79869),I=r(39417),D=r(5922),E=r(31145);function T(){return(0,g.v9)((function(e){return e.createPool}))}var N=function(){var e=(0,g.I0)(),n=(0,k.Z)(),r=function(){var e=(0,S.Z)().showNotification,n=(0,u.useCallback)(function(){var n=(0,a.Z)((0,t.Z)().mark((function n(r){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,r();case 3:n.next=8;break;case 5:n.prev=5,n.t0=n.catch(0),n.t0 instanceof Error&&e({message:n.t0.message,variant:"error"});case 8:case"end":return n.stop()}}),n,null,[[0,5]])})));return function(e){return n.apply(this,arguments)}}(),[e]);return{handleAsyncFunction:n}}(),i=r.handleAsyncFunction,s=(0,I.X)(),o=s.adapterId,c=s.session,d=T(),p=d.jettonAddress,f=d.tokenData,h=(0,u.useCallback)((function(){e((0,E.oA)())}),[e]),m=(0,u.useCallback)(function(){var r=(0,a.Z)((0,t.Z)().mark((function r(s){var o;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=function(){var r=(0,a.Z)((0,t.Z)().mark((function r(){var a,i,o,c,u,d,p,f,h;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s){r.next=2;break}throw new Error("Address required");case 2:r.prev=2,l.Address.parse(s),r.next=9;break;case 6:throw r.prev=6,r.t0=r.catch(2),new Error("Invalid address");case 9:return a=l.Address.parse(s),r.next=12,(0,y.wl)(a);case 12:return i=r.sent,r.next=15,(0,j.J6)(a,0);case 15:if(o=r.sent,c=o.futureAddress,!o.isDeployed){r.next=25;break}u={name:i.name,ammMinter:c.toFriendly(),tokenMinter:s,color:(0,D.mr)(),displayName:i.name.toUpperCase(),image:i.image,isCustom:!0},e((0,A.Z)(u)),d="".concat(b.Z.manageLiquidity.navigateToAddLiquidity.replace(":id",s)),n(d),r.next=31;break;case 25:return r.next=27,(0,y.BX)(a);case 27:p=r.sent,f=(0,l.fromNano)(p.balance),h={balance:f,name:i.name,image:i.image,symbol:i.symbol},e((0,E.EC)(h));case 31:e((0,E.gF)(s));case 32:case"end":return r.stop()}}),r,null,[[2,6]])})));return function(){return r.apply(this,arguments)}}(),r.abrupt("return",i(o));case 2:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),[i,e,n]),x=(0,u.useCallback)((0,a.Z)((0,t.Z)().mark((function r(){var s;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s=function(){var r=(0,a.Z)((0,t.Z)().mark((function r(){var a,i,s;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(p){r.next=2;break}throw new Error("Jetton address missing");case 2:if(f){r.next=4;break}throw new Error("Jetton data missing");case 4:r.prev=4,l.Address.parse(p),r.next=11;break;case 8:throw r.prev=8,r.t0=r.catch(4),new Error("Invalid address");case 11:return r.next=13,(0,j._e)(l.Address.parse(p));case 13:if(a=r.sent){r.next=16;break}throw new Error("Transaction error");case 16:if(a&&!a.error){r.next=18;break}throw new Error(a.error);case 18:return i=(0,y.OZ)(a.to),r.next=21,C.z.requestTransaction(o,c,a);case 21:return r.next=23,i();case 23:s={name:f.name,ammMinter:a.to,tokenMinter:p,color:(0,D.mr)(),displayName:f.symbol.toUpperCase(),image:f.image,isCustom:!0},e((0,A.Z)(s)),n("".concat(b.Z.manageLiquidity.navigateToAddLiquidity.replace(":id",p)));case 26:case"end":return r.stop()}}),r,null,[[4,8]])})));return function(){return r.apply(this,arguments)}}(),r.abrupt("return",i(s));case 2:case"end":return r.stop()}}),r)}))),[e,f,i,p,o,n,c]);return{onSubmit:m,deployPoolTx:x,clearStore:h}},q=r(92066),B=r(74650),F=(0,d.Z)(s.Z)({display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%",maxWidth:400});var L=(0,d.Z)(s.Z)({display:"flex",alignItems:"center",gap:20,marginTop:20,marginBottom:40,"& .token-details-right":{},"& img":{height:"70px",width:"70px"},"& p":{fontSize:15}}),z=function(){var e=T().tokenData,n=(0,m.$)().t;return e?(0,x.jsxs)(L,{children:[(0,x.jsx)("img",{src:e.image,alt:""}),(0,x.jsxs)(s.Z,{className:"token-details-right",children:[(0,x.jsx)(o.Z,{children:n("token-name",{name:e.name})}),(0,x.jsxs)(o.Z,{children:[" ",n("my-balance")," ",(0,x.jsx)(q.Z,{value:e.balance})]})]})]}):null},H=function(){var e=(0,u.useState)(!1),n=(0,i.Z)(e,2),r=n[0],s=n[1],d=(0,u.useState)(!1),h=(0,i.Z)(d,2),Z=h[0],v=h[1],k=N(),g=k.onSubmit,b=k.deployPoolTx,y=k.clearStore,j=T(),C=j.tokenData,S=j.jettonAddress,A=(0,I.X)().address,D=(0,B.mq)(),E=(0,m.$)().t,q=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.next=3,g(n);case 3:v(!1);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),L=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),e.next=3,b();case 3:s(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){y()}),[y]),(0,x.jsxs)(f,{children:[(0,x.jsx)(p.Z,{open:r,children:(0,x.jsx)(o.Z,{children:E("deploying-pool")})}),(0,x.jsx)(p.Z,{open:Z,children:(0,x.jsx)(o.Z,{children:E("loading")})}),(0,x.jsxs)(F,{children:[(0,x.jsx)(c.UH,{title:E("create-new-pool")}),(0,x.jsx)(w,{onSubmit:q}),(0,x.jsx)(z,{}),A?(0,x.jsxs)(c.Kk,{isDisabled:!(S.length&&l.Address.isFriendly(S)&&(null===C||void 0===C?void 0:C.name)),onClick:L,children:[E("deploy-pool")," \ud83d\ude80"]}):(0,x.jsx)(c.Kk,{onClick:D,children:E("connect-wallet")})]})]})}}}]);