(this.webpackJsonp=this.webpackJsonp||[]).push([[6],{910:function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"i",(function(){return u})),n.d(t,"d",(function(){return d})),n.d(t,"c",(function(){return b})),n.d(t,"a",(function(){return m})),n.d(t,"h",(function(){return l})),n.d(t,"e",(function(){return p})),n.d(t,"f",(function(){return O})),n.d(t,"g",(function(){return j}));var r=n(916),c=n(920),a=Object(c.Record)({name:"",team:0});function u(e){return Object.keys(e).reduce((function(t,n){return t.set(n,function(e){return a({name:e.name,team:e.team})}(e[n]))}),Object(c.Map)())}var o=Object(c.Record)({text:""});function i(e){return o({text:e.text})}function s(e){return Object.keys(e).reduce((function(t,n){return t.set(n,Object(c.List)(e[n].map(i)))}),Object(c.Map)())}var f=Object(c.Record)({peers:Object(c.Map)(),teams:Object(c.List)(["Team 1","Team 2"]),cards:Object(c.Map)()});function d(e){return f({peers:u(e.peers),teams:Object(c.List)(e.teams),cards:s(e.cards)})}var b="game",m=f(),l=Object(r.createActionWithPayload)(b+".sync"),p=Object(r.createActionWithPayload)(b+".set-name"),O=Object(r.createActionWithPayload)(b+".set-team"),j=Object(r.createActionWithPayload)(b+".set-team-name")},911:function(e,t,n){"use strict";n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return s}));var r=n(11),c=n.n(r),a=n(916),u=n(924),o=n(910),i=new a.State(c()({},o.c,o.a),c()({},o.c,o.d)),s=(Object(u.createConnect)(i),Object(u.createHook)(i))},912:function(e,t,n){"use strict";n.d(t,"a",(function(){return j})),n.d(t,"b",(function(){return h}));var r=n(52),c=n.n(r),a=n(17),u=n.n(a),o=n(262),i=n(917),s=n(0),f=n(915),d=n(918),b=n.n(d),m=n(913),l=Object(o.none)(),p=Object(o.none)(),O=new f.EventEmitter;function j(){return new Promise((function(e){return p.ifSome(e).ifNone((function(){return O.once("peer",e)}))}))}function h(){var e=Object(s.useState)(p.toJS()),t=u()(e,2),n=t[0],r=t[1];return Object(s.useEffect)((function(){null===n&&j().then(r)}),[n]),n}!function(){var e,t;c.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.t0=m.a,n.next=3,c.a.awrap(Object(m.b)());case 3:return n.t1=n.sent,e=(0,n.t0)(n.t1),n.next=7,c.a.awrap(i.Peer.create(new b.a(e)));case 7:(t=n.sent).on("error",(function(e){console.error(e)})),l.replace(e),p.replace(t),O.emit("peer-id",e),O.emit("peer",t);case 13:case"end":return n.stop()}}),null,null,null,Promise)}()},913:function(e,t,n){"use strict";n.d(t,"a",(function(){return f})),n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return b}));var r=n(52),c=n.n(r),a=n(262),u=n(922),o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",i="fishbowl-aicacia-com-";function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6;return Object(a.range)(0,e).iter().map((function(){return o.charAt(Math.floor(Math.random()*o.length))})).toArray().join("")}function f(e){return i+e}function d(e){return e.substring(i.length)}function b(){var e,t,n=arguments;return c.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e=n.length>0&&void 0!==n[0]?n[0]:6,r.next=3,c.a.awrap(u.a.getItem("ID"));case 3:if(!(t=r.sent)){r.next=8;break}return r.abrupt("return",t);case 8:return t=s(e),r.next=11,c.a.awrap(u.a.setItem("ID",t));case 11:return r.abrupt("return",t);case 12:case"end":return r.stop()}}),null,null,null,Promise)}},914:function(e,t,n){"use strict";n.d(t,"e",(function(){return m})),n.d(t,"c",(function(){return l})),n.d(t,"d",(function(){return p})),n.d(t,"f",(function(){return O})),n.d(t,"a",(function(){return r.b})),n.d(t,"b",(function(){return r.c})),n.d(t,"g",(function(){return j})),n.d(t,"h",(function(){return h}));var r=n(910),c=n(911),a=n(912),u=n(926),o=c.a.getStore(r.c);function i(e,t,n){return e.update("peers",(function(e){var c=e.get(t,Object(r.b)());return e.set(t,n(c))}))}function s(e,t,n){return i(e,t,(function(e){return e.set("name",n)}))}function f(e,t,n){return i(e,t,(function(e){return e.set("team",n)}))}function d(e,t,n){return e.update("teams",(function(e){return e.set(t,n)}))}function b(e,t){return e.update("peers",(function(e){return e.merge(t)}))}var m=Object(u.debounce)((function(e,t){!function(e,t){o.update((function(n){return d(n,e,t)}))}(e,t),Object(a.a)().then((function(n){return n.broadcast(r.g.create({team:e,name:t}))}))}),500),l=Object(u.debounce)((function(e,t){!function(e,t){o.update((function(n){return s(n,e,t)}))}(e,t),Object(a.a)().then((function(n){return n.broadcast(r.e.create({id:e,name:t}))}))}),500);function p(e,t){!function(e,t){o.update((function(n){return f(n,e,t)}))}(e,t),Object(a.a)().then((function(n){return n.broadcast(r.f.create({id:e,team:t}))}))}function O(e,t){return r.e.is(t)?s(e,t.payload.id,t.payload.name):r.f.is(t)?f(e,t.payload.id,t.payload.team):r.g.is(t)?d(e,t.payload.team,t.payload.name):r.h.is(t)?b(e,Object(r.i)(t.payload.peers)):e}function j(e){return e[r.c].peers}function h(e){return e[r.c].teams}Object(a.a)().then((function(e){e.on("connection",(function(t){e.send(t,r.h.create(o.getCurrent().toJS()))}))}))},919:function(e,t){function n(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}n.keys=function(){return[]},n.resolve=n,e.exports=n,n.id=919},921:function(e,t,n){"use strict";var r=n(11),c=n.n(r),a=n(916),u=n(912),o=n(914),i=n(911);n.d(t,"a",(function(){return i.b}));var s=Object(a.createDispatcher)(i.a,Object(a.mergeReducers)(c()({},o.b,o.f)));Object(u.a)().then((function(e){e.on("message",s)}))},942:function(e,t,n){"use strict";n.r(t),n.d(t,"Lobby",(function(){return j}));var r=n(52),c=n.n(r),a=n(17),u=n.n(a),o=n(0),i=n.n(o),s=n(5),f=n(48),d=n(66),b=n(912),m=n(921),l=n(914),p=n(913),O=n(32);function j(e){var t=Object(b.b)(),n=Object(m.a)(l.g),r=Object(m.a)(l.h),a=n.get(t?t.getId():"",Object(l.a)()),j=Object(o.useState)(a.name),h=u()(j,2),g=h[0],v=h[1],y=Object(o.useState)(r),x=u()(y,2),k=x[0],E=x[1],w=Object(O.useNavigation)(),C=n.filter((function(e){return 0===e.team})).toList(),I=n.filter((function(e){return 1===e.team})).toList();Object(o.useMemo)((function(){return E(r)}),[r]),Object(o.useMemo)((function(){var n,r;return c.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(n=Object(p.a)(e.id),!t){a.next=13;break}if(n===t.getId()){a.next=12;break}return a.prev=3,a.next=6,c.a.awrap(t.connect(n));case 6:a.next=10;break;case 8:a.prev=8,a.t0=a.catch(3);case 10:r=function n(r){"start"===r.type&&(w.navigate(d.c,{id:e.id}),t.off("message",n))},t.on("message",r);case 12:Object(l.c)(t.getId(),Object(p.c)(t.getId()));case 13:case"end":return a.stop()}}),null,null,[[3,8]],Promise)}),[t,e.id]);var S=Object(o.useCallback)((function(e){return function(n){t&&(Object(l.e)(e,n),E((function(t){return t.set(e,n)})))}}),[t]),P=Object(o.useCallback)((function(e){t&&(Object(l.c)(t.getId(),e),v(e))}),[t]),T=Object(o.useCallback)((function(e){return function(){t&&Object(l.d)(t.getId(),e)}}),[t]),M=Object(o.useCallback)((function(){t&&(t.broadcast({type:"start"}),w.navigate(d.c,{id:e.id}))}),[t,e.id]);return i.a.createElement(s.a,null,i.a.createElement(f.Input,{label:"Your Name",value:g,onChangeText:P}),i.a.createElement(f.Input,{label:"Team 1 Name",value:k.get(0,""),onChangeText:S(0)}),i.a.createElement(f.Input,{label:"Team 2 Name",value:k.get(1,""),onChangeText:S(1)}),i.a.createElement(f.Divider,null),i.a.createElement(f.CheckBox,{checked:0==a.team,onChange:T(0)},(1==a.team?"Join ":"")+k.get(0,"")),C.toSeq().map((function(e,t){return i.a.createElement(f.Text,{key:t},e.name)})).valueSeq(),i.a.createElement(f.CheckBox,{checked:1==a.team,onChange:T(1)},(0==a.team?"Join ":"")+k.get(1,"")),I.toSeq().map((function(e,t){return i.a.createElement(f.Text,{key:t},e.name)})).valueSeq(),i.a.createElement(f.Button,{disabled:C.isEmpty()||I.isEmpty(),onPress:M},"Start"))}}}]);
//# sourceMappingURL=6.4a71d437.chunk.js.map