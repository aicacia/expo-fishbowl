(this.webpackJsonp=this.webpackJsonp||[]).push([[2],{220:function(r,e,n){"use strict";n.d(e,"a",(function(){return t})),n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o}));var t=1080,a=640;function o(r){return r>=t}},257:function(r){r.exports=JSON.parse('{"color-primary-100":"#CEFDFB","color-primary-200":"#9EFBFC","color-primary-300":"#6DEBF7","color-primary-400":"#48D5F0","color-primary-500":"#10B5E7","color-primary-600":"#0B8DC6","color-primary-700":"#086AA6","color-primary-800":"#054C85","color-primary-900":"#03366E","color-primary-transparent-100":"rgba(16, 181, 231, 0.08)","color-primary-transparent-200":"rgba(16, 181, 231, 0.16)","color-primary-transparent-300":"rgba(16, 181, 231, 0.24)","color-primary-transparent-400":"rgba(16, 181, 231, 0.32)","color-primary-transparent-500":"rgba(16, 181, 231, 0.4)","color-primary-transparent-600":"rgba(16, 181, 231, 0.48)","color-success-100":"#F1FAC9","color-success-200":"#E1F595","color-success-300":"#C2E15D","color-success-400":"#9EC434","color-success-500":"#709E04","color-success-600":"#5C8702","color-success-700":"#497102","color-success-800":"#385B01","color-success-900":"#2C4B00","color-success-transparent-100":"rgba(112, 158, 4, 0.08)","color-success-transparent-200":"rgba(112, 158, 4, 0.16)","color-success-transparent-300":"rgba(112, 158, 4, 0.24)","color-success-transparent-400":"rgba(112, 158, 4, 0.32)","color-success-transparent-500":"rgba(112, 158, 4, 0.4)","color-success-transparent-600":"rgba(112, 158, 4, 0.48)","color-info-100":"#CBFEFE","color-info-200":"#98F6FE","color-info-300":"#65E7FE","color-info-400":"#3FD3FD","color-info-500":"#00B4FC","color-info-600":"#008CD8","color-info-700":"#0068B5","color-info-800":"#004A92","color-info-900":"#003578","color-info-transparent-100":"rgba(0, 180, 252, 0.08)","color-info-transparent-200":"rgba(0, 180, 252, 0.16)","color-info-transparent-300":"rgba(0, 180, 252, 0.24)","color-info-transparent-400":"rgba(0, 180, 252, 0.32)","color-info-transparent-500":"rgba(0, 180, 252, 0.4)","color-info-transparent-600":"rgba(0, 180, 252, 0.48)","color-warning-100":"#FFF3CD","color-warning-200":"#FFE49B","color-warning-300":"#FFD16A","color-warning-400":"#FFBF45","color-warning-500":"#FFA007","color-warning-600":"#DB8005","color-warning-700":"#B76403","color-warning-800":"#934B02","color-warning-900":"#7A3901","color-warning-transparent-100":"rgba(255, 160, 7, 0.08)","color-warning-transparent-200":"rgba(255, 160, 7, 0.16)","color-warning-transparent-300":"rgba(255, 160, 7, 0.24)","color-warning-transparent-400":"rgba(255, 160, 7, 0.32)","color-warning-transparent-500":"rgba(255, 160, 7, 0.4)","color-warning-transparent-600":"rgba(255, 160, 7, 0.48)","color-danger-100":"#FFE5D3","color-danger-200":"#FFC5A8","color-danger-300":"#FF9E7C","color-danger-400":"#FF795C","color-danger-500":"#FF3B26","color-danger-600":"#DB1E1B","color-danger-700":"#B7131D","color-danger-800":"#930C20","color-danger-900":"#7A0721","color-danger-transparent-100":"rgba(255, 59, 38, 0.08)","color-danger-transparent-200":"rgba(255, 59, 38, 0.16)","color-danger-transparent-300":"rgba(255, 59, 38, 0.24)","color-danger-transparent-400":"rgba(255, 59, 38, 0.32)","color-danger-transparent-500":"rgba(255, 59, 38, 0.4)","color-danger-transparent-600":"rgba(255, 59, 38, 0.48)"}')},258:function(r){r.exports=JSON.parse('{"strict":{"border-radius":0}}')},276:function(r,e,n){n(277),r.exports=n(905)},277:function(r,e){"serviceWorker"in navigator&&window.addEventListener("load",(function(){navigator.serviceWorker.register("/expo-service-worker.js",{scope:"/"}).then((function(r){})).catch((function(r){console.info("Failed to register service-worker",r)}))}))},77:function(r,e,n){"use strict";n.d(e,"c",(function(){return c})),n.d(e,"d",(function(){return l})),n.d(e,"b",(function(){return i})),n.d(e,"a",(function(){return s})),n.d(e,"e",(function(){return u}));var t,a=n(11),o=n.n(a),c="Home",l="Lobby",i="Game",s=c,u={prefixes:["https://fishbowl.aicacia.com","fishbowl.aicacia://","https://aicacia.github.io/fishbowl"],config:{screens:(t={},o()(t,c,""),o()(t,l,"lobby/:id"),o()(t,i,"game/:id"),t)}}},905:function(r,e,n){"use strict";n.r(e);var t=n(911),a=n(1),o=n.n(a),c=n(11),l=n.n(c),i=n(0),s=n.n(i),u=n(263),p=n(155),g=n(262),m=n(48),f=n(257),b=n(258),E=n(238),d=n(910),y=n(76),F=n(5),w=/[^\r\n]+/g;function h(r){return console.error(r.error),s.a.createElement(s.a.Fragment,null,s.a.createElement(m.Text,{category:"h1"},r.error.name),s.a.createElement(m.Text,{category:"h3"},r.error.message),s.a.createElement(F.a,null,(r.error.stack||"").split(w).map((function(r,e){return s.a.createElement(m.Text,{key:e},r)}))))}var v=n(6),O=v.a.create({container:{flex:1,flexGrow:999,alignItems:"center",justifyContent:"center"}});function D(r){return s.a.createElement(F.a,{style:O.container},s.a.createElement(m.Spinner,{animating:!0,size:r.size||"large"}))}var B=n(111),C=n(220),x=v.a.create({safeAreaView:{flex:1},container:{flex:1,flexDirection:"row",alignItems:"flex-start",justifyContent:"center"},wrapper:{flex:1,flexDirection:"column",maxWidth:C.a,padding:16},content:{flex:1}});function j(r){return s.a.createElement(B.a,{style:x.safeAreaView},s.a.createElement(m.Layout,{style:x.container},s.a.createElement(F.a,{style:x.wrapper},s.a.createElement(F.a,{style:x.content},r.children))))}function P(){return s.a.createElement(j,null,s.a.createElement(y.Async,{promise:Promise.all([n.e(0),n.e(8)]).then(n.bind(null,997)),onSuccess:function(r){var e=r.Home;return s.a.createElement(e,null)},onPending:function(){return s.a.createElement(D,null)},onError:function(r){return s.a.createElement(h,{error:r})}}))}function A(r){return s.a.createElement(j,null,s.a.createElement(y.Async,{promise:Promise.all([n.e(0),n.e(1),n.e(6)]).then(n.bind(null,998)),onSuccess:function(e){var n=e.Game;return s.a.createElement(n,{id:r.route.params.id})},onPending:function(){return s.a.createElement(D,null)},onError:function(r){return s.a.createElement(h,{error:r})}}))}function k(r){return s.a.createElement(j,null,s.a.createElement(y.Async,{promise:Promise.all([n.e(0),n.e(1),n.e(5),n.e(7)]).then(n.bind(null,999)),onSuccess:function(e){var n=e.Lobby;return s.a.createElement(n,{id:r.route.params.id})},onPending:function(){return s.a.createElement(D,null)},onError:function(r){return s.a.createElement(h,{error:r})}}))}var S=n(77),I=Object(d.a)(),J=I.Navigator,L=I.Screen;function N(){return s.a.createElement(E.a,{linking:S.e,fallback:s.a.createElement(D,null)},s.a.createElement(G,null))}function G(){return s.a.createElement(J,{initialRouteName:S.a,screenOptions:{headerShown:!1},detachInactiveScreens:!0},s.a.createElement(L,{name:S.c,component:P}),s.a.createElement(L,{name:S.b,component:A}),s.a.createElement(L,{name:S.d,component:k}))}function T(r,e){var n=Object.keys(r);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(r);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),n.push.apply(n,t)}return n}function W(r){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?T(Object(n),!0).forEach((function(e){l()(r,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(n,e))}))}return r}Object(t.a)((function(){return s.a.createElement(s.a.Fragment,null,s.a.createElement(m.IconRegistry,{icons:g.EvaIconsPack}),s.a.createElement(m.ApplicationProvider,o()({},p,{theme:W(W({},p.light),f),customMapping:b}),s.a.createElement(u.a,{style:"auto"}),s.a.createElement(N,null)))}))}},[[276,3,4]]]);
//# sourceMappingURL=app.52a9172e.chunk.js.map