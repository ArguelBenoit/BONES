!function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(r,o,function(e){return t[e]}.bind(null,o));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=302)}({2:function(t,e,n){"use strict";n.d(e,"a",(function(){return u}));var r=n(25),o=n.n(r),u={uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){var e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))},date:function(){var t=new Date,e=String(t.getDate()).padStart(2,"0"),n=String(t.getMonth()+1).padStart(2,"0"),r=t.getFullYear();return"".concat(n,"-").concat(e,"-").concat(r)},getActivate:function(t){return!0===t.activate&&t.friends.length>0&&""!==t.pair},webExt:function(){return"firefox"===o.a.bro?browser:(o.a.bro,chrome)}}},25:function(t,e){t.exports={type:"prod",bro:"chrome"}},30:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"a",(function(){return u})),n.d(e,"c",(function(){return i}));var r=n(2),o=function(){r.a.webExt().runtime.sendMessage({message:"UPDATE",title:document.title})},u=function(){r.a.webExt().runtime.onMessage.addListener((function(t){var e=t.title;r.a.webExt().tabs.query({}).then((function(t){t.forEach((function(t){"bones popup !#@$"!==e&&t.active||r.a.webExt().tabs.sendMessage(t.id,{message:"UPDATE"})}))}))}))},i=function(t){r.a.webExt().runtime.onMessage.addListener(t)}},302:function(t,e,n){"use strict";n.r(e);var r=n(30);Object(r.a)()}});