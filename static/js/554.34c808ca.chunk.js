"use strict";(self.webpackChunktonswap_web=self.webpackChunktonswap_web||[]).push([[554],{92066:function(e,n,r){var t=r(22112),a=r(75859);n.Z=function(e){var n=e.value,r=e.decimalScale,i=void 0===r?4:r,s=e.prefix;return n?(0,a.jsx)(t.Z,{prefix:s,displayType:"text",value:n,thousandSeparator:!0,decimalScale:i}):(0,a.jsx)(a.Fragment,{children:"0"})}},94659:function(e,n,r){var t=r(39736),a=r(75926),i=r(75174),s=r(39910),o=r(55204),c=r(99581),u=r(75),l=r(39417),d=r(75859),p=(0,i.ZP)(o.Z)({display:"flex",flexDirection:"column",alignItems:"center",gap:10});n.Z=function(e){var n=e.open,r=e.children,i=(0,l.X)().adapterId,o=!c.tq&&i===u.ht.TON_HUB;return(0,d.jsx)(t.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1},backdropFilter:"blur(5px) "},open:n,children:(0,d.jsxs)(p,{children:[(0,d.jsx)(a.Z,{color:"inherit"}),r,o&&(0,d.jsx)(s.Z,{children:"Please check tonhub wallet for pending notification"})]})})}},18062:function(e,n,r){var t=r(68963),a=r(80447),i=r(75174),s=r(51998),o=r(55204),c=r(97719),u=r(75859),l=(0,i.ZP)(o.Z)({"& &":{color:"white"},"& a":{color:"white"}});n.Z=function(){var e=(0,a.Ds)(),n=e.enqueueSnackbar,r=e.closeSnackbar;return{showNotification:(0,t.useCallback)((function(e){var t=e.message,a=e.variant,i=e.onClose,o=e.autoHideDuration,d=e.anchorOrigin,p=e.className,f=void 0===p?"":p,h=n((0,u.jsx)(l,{children:t}),{className:f,anchorOrigin:d,variant:a,autoHideDuration:o||5e3,onClose:i,onClick:function(){return r(h)},action:function(){return(0,u.jsx)(s.Z,{children:(0,u.jsx)(c.Z,{style:{width:20,height:20}})})}})}),[r,n])}}},12554:function(e,n,r){r.r(n),r.d(n,{default:function(){return F}});var t=r(88214),a=r(15861),i=r(70885),s=r(62399),o=r(39910),c=r(96763),u=r(68963),l=r(45022),d=r(18366),p=r(94659),f=(0,d.Z)(s.Z)({display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",paddingBottom:"100px",paddingTop:50,width:"100%","& .screen-title":{marginBottom:30}}),h=r(99263),m=r(75859),x=(0,d.Z)(s.Z)({width:"100%",marginBottom:20}),Z=(0,d.Z)(s.Z)({"& p":{fontSize:12,color:"red",marginTop:5}}),v=function(e){var n=e.onSubmit,r=(0,u.useState)(""),s=(0,i.Z)(r,2),c=s[0],d=s[1],p=(0,u.useState)(!1),f=(0,i.Z)(p,2),v=f[0],w=f[1],g=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(r){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(d(r),48===r.length){e.next=3;break}return e.abrupt("return");case 3:try{l.Address.parse(r),n(r),v&&w(!1)}catch(t){w(!0)}case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return(0,m.jsxs)(x,{children:[(0,m.jsx)(h.Z,{className:"input",fullWidth:!0,label:"Enter jetton minter address",value:c,placeholder:"EQDrjaLahLkMB-hMCmkzOyBuHJ139ZUYmPHu6RRBKnbdLIYI",onChange:function(e){return g(e.target.value)},onFocus:function(){return w(!1)}}),v&&(0,m.jsx)(Z,{children:(0,m.jsx)(o.Z,{children:"Invalid Address"})})]})},w=r(18740),g=r(93431),k=r(80124),b=r(77563),j=r(45731),y=r(47079),C=r(18062),S=r(79869),A=r(39417),D=r(5922),I=r(31145);function E(){return(0,g.v9)((function(e){return e.createPool}))}var N=function(){var e=(0,g.I0)(),n=(0,w.Z)(),r=function(){var e=(0,C.Z)().showNotification,n=(0,u.useCallback)(function(){var n=(0,a.Z)((0,t.Z)().mark((function n(r){return(0,t.Z)().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,r();case 3:n.next=8;break;case 5:n.prev=5,n.t0=n.catch(0),n.t0 instanceof Error&&e({message:n.t0.message,variant:"error"});case 8:case"end":return n.stop()}}),n,null,[[0,5]])})));return function(e){return n.apply(this,arguments)}}(),[e]);return{handleAsyncFunction:n}}(),i=r.handleAsyncFunction,s=(0,A.X)(),o=s.adapterId,c=s.session,d=E(),p=d.jettonAddress,f=d.tokenData,h=(0,u.useCallback)((function(){e((0,I.oA)())}),[e]),m=(0,u.useCallback)(function(){var r=(0,a.Z)((0,t.Z)().mark((function r(s){var o;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return o=function(){var r=(0,a.Z)((0,t.Z)().mark((function r(){var a,i,o,c,u,d,p,f,h;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(s){r.next=2;break}throw new Error("Address required");case 2:r.prev=2,l.Address.parse(s),r.next=9;break;case 6:throw r.prev=6,r.t0=r.catch(2),new Error("Invalid address");case 9:return a=l.Address.parse(s),r.next=12,(0,b.wl)(a);case 12:return i=r.sent,r.next=15,(0,j.J6)(a,0);case 15:if(o=r.sent,c=o.futureAddress,!o.isDeployed){r.next=26;break}u={name:i.name,ammMinter:c.toFriendly(),tokenMinter:s,color:(0,D.mr)(),displayName:i.name.toUpperCase(),image:i.image,isCustom:!0},e((0,S.Z)(u)),d="".concat(k.Z.manageLiquidity.navigateToAddLiquidity.replace(":id",s)),console.log(d),n(d),r.next=32;break;case 26:return r.next=28,(0,b.BX)(a);case 28:p=r.sent,f=(0,l.fromNano)(p.balance),h={balance:f,name:i.name,image:i.image},e((0,I.EC)(h));case 32:e((0,I.gF)(s));case 33:case"end":return r.stop()}}),r,null,[[2,6]])})));return function(){return r.apply(this,arguments)}}(),r.abrupt("return",i(o));case 2:case"end":return r.stop()}}),r)})));return function(e){return r.apply(this,arguments)}}(),[i,e,n]),x=(0,u.useCallback)((0,a.Z)((0,t.Z)().mark((function r(){var s;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return s=function(){var r=(0,a.Z)((0,t.Z)().mark((function r(){var a,i,s;return(0,t.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(p){r.next=2;break}throw new Error("Jetton address missing");case 2:if(f){r.next=4;break}throw new Error("Jetton data missing");case 4:r.prev=4,l.Address.parse(p),r.next=11;break;case 8:throw r.prev=8,r.t0=r.catch(4),new Error("Invalid address");case 11:return r.next=13,(0,j._e)(l.Address.parse(p));case 13:if(a=r.sent){r.next=16;break}throw new Error("Transaction error");case 16:if(a&&!a.error){r.next=18;break}throw new Error(a.error);case 18:return i=(0,b.OZ)(a.to),r.next=21,y.z.requestTransaction(o,c,a);case 21:return r.next=23,i();case 23:s={name:f.name,ammMinter:a.to,tokenMinter:p,color:(0,D.mr)(),displayName:f.name.toUpperCase(),image:f.image,isCustom:!0},e((0,S.Z)(s)),n("".concat(k.Z.manageLiquidity.navigateToAddLiquidity.replace(":id",p)));case 26:case"end":return r.stop()}}),r,null,[[4,8]])})));return function(){return r.apply(this,arguments)}}(),r.abrupt("return",i(s));case 2:case"end":return r.stop()}}),r)}))),[e,f,i,p,o,n,c]);return{onSubmit:m,deployPoolTx:x,clearStore:h}},T=r(92066),B=(0,d.Z)(s.Z)({display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",width:"100%",maxWidth:400});var P=(0,d.Z)(s.Z)({display:"flex",alignItems:"center",gap:20,marginTop:20,marginBottom:40,"& .token-details-right":{},"& img":{height:"70px",width:"70px"},"& p":{fontSize:15}}),q=function(){var e=E().tokenData;return e?(0,m.jsxs)(P,{children:[(0,m.jsx)("img",{src:e.image,alt:""}),(0,m.jsxs)(s.Z,{className:"token-details-right",children:[(0,m.jsxs)(o.Z,{children:["Name: ",e.name]}),(0,m.jsxs)(o.Z,{children:[" My Balance: ",(0,m.jsx)(T.Z,{value:e.balance})]})]})]}):null},F=function(){var e=(0,u.useState)(!1),n=(0,i.Z)(e,2),r=n[0],s=n[1],d=(0,u.useState)(!1),h=(0,i.Z)(d,2),x=h[0],Z=h[1],w=N(),g=w.onSubmit,k=w.deployPoolTx,b=w.clearStore,j=E(),y=j.tokenData,C=j.jettonAddress,S=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(n){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return Z(!0),e.next=3,g(n);case 3:Z(!1);case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),A=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s(!0),e.next=3,k();case 3:s(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,u.useEffect)((function(){b()}),[b]),(0,m.jsxs)(f,{children:[(0,m.jsx)(p.Z,{open:r,children:(0,m.jsx)(o.Z,{children:"Deploying pool..."})}),(0,m.jsx)(p.Z,{open:x,children:(0,m.jsx)(o.Z,{children:"Loading..."})}),(0,m.jsxs)(B,{children:[(0,m.jsx)(c.UH,{title:"Create a new Pool"}),(0,m.jsx)(v,{onSubmit:S}),(0,m.jsx)(q,{}),(0,m.jsx)(c.Kk,{isDisabled:!(C.length&&l.Address.isFriendly(C)&&(null===y||void 0===y?void 0:y.name)),onClick:A,children:"Deploy Pool \ud83d\ude80"})]})]})}}}]);