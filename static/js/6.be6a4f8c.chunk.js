(this.webpackJsonp=this.webpackJsonp||[]).push([[6],{912:function(e,n,t){"use strict";t.d(n,"a",(function(){return h})),t.d(n,"b",(function(){return w})),t.d(n,"c",(function(){return O}));var r=t(52),u=t.n(r),a=t(17),c=t.n(a),o=t(264),i=t(923),s=t(0),f=t(917),l=t(924),b=t.n(l),m=t(915),p=Object(o.none)(),d=Object(o.none)(),v=new f.EventEmitter;function h(){return new Promise((function(e){return d.ifSome(e).ifNone((function(){return v.once("peer",e)}))}))}function w(){var e=Object(s.useState)(d.toJS()),n=c()(e,2),t=n[0],r=n[1];return Object(s.useEffect)((function(){null===t&&h().then(r)}),[t]),t}function O(){var e=Object(s.useState)(p.toJS()),n=c()(e,2),t=n[0],r=n[1];return Object(s.useEffect)((function(){null===t&&new Promise((function(e){return p.ifSome(e).ifNone((function(){return v.once("peer-id",e)}))})).then(r)}),[t]),t}!function(){var e,n;u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=m.a,t.next=3,u.a.awrap(Object(m.b)());case 3:return t.t1=t.sent,e=(0,t.t0)(t.t1),t.next=7,u.a.awrap(i.Peer.create(new b.a(e)));case 7:(n=t.sent).on("error",(function(e){console.error(e)})),p.replace(e),d.replace(n),v.emit("peer-id",e),v.emit("peer",n);case 13:case"end":return t.stop()}}),null,null,null,Promise)}()},915:function(e,n,t){"use strict";t.d(n,"a",(function(){return f})),t.d(n,"c",(function(){return l})),t.d(n,"b",(function(){return b}));var r=t(52),u=t.n(r),a=t(264),c=t(937),o="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",i="fishbowl-aicacia-com-";function s(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:6;return Object(a.range)(0,e).iter().map((function(){return o.charAt(Math.floor(Math.random()*o.length))})).toArray().join("")}function f(e){return i+e}function l(e){return e.substring(i.length)}function b(){var e,n,t=arguments;return u.a.async((function(r){for(;;)switch(r.prev=r.next){case 0:return e=t.length>0&&void 0!==t[0]?t[0]:6,r.next=3,u.a.awrap(c.a.getItem("ID"));case 3:if(!(n=r.sent)){r.next=8;break}return r.abrupt("return",n);case 8:return n=s(e),r.next=11,u.a.awrap(c.a.setItem("ID",n));case 11:return r.abrupt("return",n);case 12:case"end":return r.stop()}}),null,null,null,Promise)}},925:function(e,n){function t(e){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}t.keys=function(){return[]},t.resolve=t,e.exports=t,t.id=925},993:function(e,n,t){"use strict";t.r(n),t.d(n,"Home",(function(){return d}));var r=t(17),u=t.n(r),a=t(0),c=t.n(a),o=t(6),i=t(5),s=t(48),f=t(93),l=t(912),b=t(32),m=t(915),p=o.a.create({startNewGame:{marginTop:32}});function d(e){var n=Object(a.useState)(""),t=u()(n,2),r=t[0],o=t[1],d=Object(l.b)(),v=Object(b.useNavigation)();return c.a.createElement(i.a,null,c.a.createElement(s.Input,{value:r,onChangeText:o}),c.a.createElement(s.Button,{disabled:!r.length,onPress:function(){return v.navigate(f.b,{id:r})}},"Join Game"),d&&c.a.createElement(s.Button,{style:p.startNewGame,onPress:function(){return v.navigate(f.b,{id:Object(m.c)(d.getId())})}},"Start New Game"))}}}]);
//# sourceMappingURL=6.be6a4f8c.chunk.js.map