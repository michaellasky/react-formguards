(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,function(e,t,a){"use strict";(function(e){a.d(t,"b",function(){return v}),a.d(t,"a",function(){return p}),a.d(t,"c",function(){return l});var n=a(0),r=a.n(n),l={phone:function(e){return o.test(e)},email:function(e){return i.test(e)},minLength:function(e){return function(t){return t.length>=e}},maxLength:function(e){return function(t){return t.length<=e}},required:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"number"===typeof e||null!==e&&void 0!==e&&0!==e.length&&0!==Object.keys(e).length&&""!==e}},i=/^$|(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,o=/^$|^(\+\d{1,3})?\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,c=function(e){return Array.isArray(e)?e:[e]},u="undefined"!==typeof globalThis?globalThis:"undefined"!==typeof window?window:"undefined"!==typeof e?e:"undefined"!==typeof self?self:{};var m,s=(function(e,t){var a=200,n="__lodash_hash_undefined__",r=800,l=16,i=9007199254740991,o="[object Arguments]",c="[object AsyncFunction]",m="[object Function]",s="[object GeneratorFunction]",p="[object Null]",d="[object Object]",h="[object Proxy]",f="[object Undefined]",b=/^\[object .+?Constructor\]$/,v=/^(?:0|[1-9]\d*)$/,x={};x["[object Float32Array]"]=x["[object Float64Array]"]=x["[object Int8Array]"]=x["[object Int16Array]"]=x["[object Int32Array]"]=x["[object Uint8Array]"]=x["[object Uint8ClampedArray]"]=x["[object Uint16Array]"]=x["[object Uint32Array]"]=!0,x[o]=x["[object Array]"]=x["[object ArrayBuffer]"]=x["[object Boolean]"]=x["[object DataView]"]=x["[object Date]"]=x["[object Error]"]=x[m]=x["[object Map]"]=x["[object Number]"]=x[d]=x["[object RegExp]"]=x["[object Set]"]=x["[object String]"]=x["[object WeakMap]"]=!1;var y="object"==typeof u&&u&&u.Object===Object&&u,E="object"==typeof self&&self&&self.Object===Object&&self,g=y||E||Function("return this")(),_=t&&!t.nodeType&&t,F=_&&e&&!e.nodeType&&e,w=F&&F.exports===_,k=w&&y.process,j=function(){try{return k&&k.binding&&k.binding("util")}catch(e){}}(),S=j&&j.isTypedArray;function O(e,t){return"__proto__"==t?void 0:e[t]}var B,G,V=Array.prototype,z=Function.prototype,N=Object.prototype,W=g["__core-js_shared__"],A=z.toString,C=N.hasOwnProperty,P=function(){var e=/[^.]+$/.exec(W&&W.keys&&W.keys.IE_PROTO||"");return e?"Symbol(src)_1."+e:""}(),q=N.toString,R=A.call(Object),T=RegExp("^"+A.call(C).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),$=w?g.Buffer:void 0,I=g.Symbol,L=g.Uint8Array,M=$?$.allocUnsafe:void 0,D=(B=Object.getPrototypeOf,G=Object,function(e){return B(G(e))}),H=Object.create,U=N.propertyIsEnumerable,Z=V.splice,J=I?I.toStringTag:void 0,K=function(){try{var e=ge(Object,"defineProperty");return e({},"",{}),e}catch(t){}}(),Q=$?$.isBuffer:void 0,X=Math.max,Y=Date.now,ee=ge(g,"Map"),te=ge(Object,"create"),ae=function(){function e(){}return function(t){if(!ze(t))return{};if(H)return H(t);e.prototype=t;var a=new e;return e.prototype=void 0,a}}();function ne(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}function re(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}function le(e){var t=-1,a=null==e?0:e.length;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}function ie(e){var t=this.__data__=new re(e);this.size=t.size}function oe(e,t){var a=Se(e),n=!a&&je(e),r=!a&&!n&&Be(e),l=!a&&!n&&!r&&We(e),i=a||n||r||l,o=i?function(e,t){for(var a=-1,n=Array(e);++a<e;)n[a]=t(a);return n}(e.length,String):[],c=o.length;for(var u in e)!t&&!C.call(e,u)||i&&("length"==u||r&&("offset"==u||"parent"==u)||l&&("buffer"==u||"byteLength"==u||"byteOffset"==u)||_e(u,c))||o.push(u);return o}function ce(e,t,a){(void 0===a||ke(e[t],a))&&(void 0!==a||t in e)||se(e,t,a)}function ue(e,t,a){var n=e[t];C.call(e,t)&&ke(n,a)&&(void 0!==a||t in e)||se(e,t,a)}function me(e,t){for(var a=e.length;a--;)if(ke(e[a][0],t))return a;return-1}function se(e,t,a){"__proto__"==t&&K?K(e,t,{configurable:!0,enumerable:!0,value:a,writable:!0}):e[t]=a}ne.prototype.clear=function(){this.__data__=te?te(null):{},this.size=0},ne.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e];return this.size-=t?1:0,t},ne.prototype.get=function(e){var t=this.__data__;if(te){var a=t[e];return a===n?void 0:a}return C.call(t,e)?t[e]:void 0},ne.prototype.has=function(e){var t=this.__data__;return te?void 0!==t[e]:C.call(t,e)},ne.prototype.set=function(e,t){var a=this.__data__;return this.size+=this.has(e)?0:1,a[e]=te&&void 0===t?n:t,this},re.prototype.clear=function(){this.__data__=[],this.size=0},re.prototype.delete=function(e){var t=this.__data__,a=me(t,e);return!(a<0)&&(a==t.length-1?t.pop():Z.call(t,a,1),--this.size,!0)},re.prototype.get=function(e){var t=this.__data__,a=me(t,e);return a<0?void 0:t[a][1]},re.prototype.has=function(e){return me(this.__data__,e)>-1},re.prototype.set=function(e,t){var a=this.__data__,n=me(a,e);return n<0?(++this.size,a.push([e,t])):a[n][1]=t,this},le.prototype.clear=function(){this.size=0,this.__data__={hash:new ne,map:new(ee||re),string:new ne}},le.prototype.delete=function(e){var t=Ee(this,e).delete(e);return this.size-=t?1:0,t},le.prototype.get=function(e){return Ee(this,e).get(e)},le.prototype.has=function(e){return Ee(this,e).has(e)},le.prototype.set=function(e,t){var a=Ee(this,e),n=a.size;return a.set(e,t),this.size+=a.size==n?0:1,this},ie.prototype.clear=function(){this.__data__=new re,this.size=0},ie.prototype.delete=function(e){var t=this.__data__,a=t.delete(e);return this.size=t.size,a},ie.prototype.get=function(e){return this.__data__.get(e)},ie.prototype.has=function(e){return this.__data__.has(e)},ie.prototype.set=function(e,t){var n=this.__data__;if(n instanceof re){var r=n.__data__;if(!ee||r.length<a-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new le(r)}return n.set(e,t),this.size=n.size,this};var pe,de=function(e,t,a){for(var n=-1,r=Object(e),l=a(e),i=l.length;i--;){var o=l[pe?i:++n];if(!1===t(r[o],o,r))break}return e};function he(e){return null==e?void 0===e?f:p:J&&J in Object(e)?function(e){var t=C.call(e,J),a=e[J];try{e[J]=void 0}catch(r){}var n=q.call(e);t?e[J]=a:delete e[J];return n}(e):function(e){return q.call(e)}(e)}function fe(e){return Ne(e)&&he(e)==o}function be(e){return!(!ze(e)||(t=e,P&&P in t))&&(Ge(e)?T:b).test(function(e){if(null!=e){try{return A.call(e)}catch(t){}try{return e+""}catch(t){}}return""}(e));var t}function ve(e){if(!ze(e))return function(e){var t=[];if(null!=e)for(var a in Object(e))t.push(a);return t}(e);var t=Fe(e),a=[];for(var n in e)("constructor"!=n||!t&&C.call(e,n))&&a.push(n);return a}function xe(e,t,a,n,r){e!==t&&de(t,function(l,i){if(ze(l))r||(r=new ie),function(e,t,a,n,r,l,i){var o=O(e,a),c=O(t,a),u=i.get(c);if(u)return void ce(e,a,u);var m=l?l(o,c,a+"",e,t,i):void 0,s=void 0===m;if(s){var p=Se(c),h=!p&&Be(c),f=!p&&!h&&We(c);m=c,p||h||f?Se(o)?m=o:Ne(b=o)&&Oe(b)?m=function(e,t){var a=-1,n=e.length;t||(t=Array(n));for(;++a<n;)t[a]=e[a];return t}(o):h?(s=!1,m=function(e,t){if(t)return e.slice();var a=e.length,n=M?M(a):new e.constructor(a);return e.copy(n),n}(c,!0)):f?(s=!1,m=function(e,t){var a=t?function(e){var t=new e.constructor(e.byteLength);return new L(t).set(new L(e)),t}(e.buffer):e.buffer;return new e.constructor(a,e.byteOffset,e.length)}(c,!0)):m=[]:function(e){if(!Ne(e)||he(e)!=d)return!1;var t=D(e);if(null===t)return!0;var a=C.call(t,"constructor")&&t.constructor;return"function"==typeof a&&a instanceof a&&A.call(a)==R}(c)||je(c)?(m=o,je(o)?m=function(e){return function(e,t,a,n){var r=!a;a||(a={});var l=-1,i=t.length;for(;++l<i;){var o=t[l],c=n?n(a[o],e[o],o,a,e):void 0;void 0===c&&(c=e[o]),r?se(a,o,c):ue(a,o,c)}return a}(e,Ae(e))}(o):(!ze(o)||n&&Ge(o))&&(m=function(e){return"function"!=typeof e.constructor||Fe(e)?{}:ae(D(e))}(c))):s=!1}var b;s&&(i.set(c,m),r(m,c,n,l,i),i.delete(c));ce(e,a,m)}(e,t,i,a,xe,n,r);else{var o=n?n(O(e,i),l,i+"",e,t,r):void 0;void 0===o&&(o=l),ce(e,i,o)}},Ae)}function ye(e,t){return we(function(e,t,a){return t=X(void 0===t?e.length-1:t,0),function(){for(var n=arguments,r=-1,l=X(n.length-t,0),i=Array(l);++r<l;)i[r]=n[t+r];r=-1;for(var o=Array(t+1);++r<t;)o[r]=n[r];return o[t]=a(i),function(e,t,a){switch(a.length){case 0:return e.call(t);case 1:return e.call(t,a[0]);case 2:return e.call(t,a[0],a[1]);case 3:return e.call(t,a[0],a[1],a[2])}return e.apply(t,a)}(e,this,o)}}(e,t,qe),e+"")}function Ee(e,t){var a=e.__data__;return function(e){var t=typeof e;return"string"==t||"number"==t||"symbol"==t||"boolean"==t?"__proto__"!==e:null===e}(t)?a["string"==typeof t?"string":"hash"]:a.map}function ge(e,t){var a=function(e,t){return null==e?void 0:e[t]}(e,t);return be(a)?a:void 0}function _e(e,t){var a=typeof e;return!!(t=null==t?i:t)&&("number"==a||"symbol"!=a&&v.test(e))&&e>-1&&e%1==0&&e<t}function Fe(e){var t=e&&e.constructor;return e===("function"==typeof t&&t.prototype||N)}var we=function(e){var t=0,a=0;return function(){var n=Y(),i=l-(n-a);if(a=n,i>0){if(++t>=r)return arguments[0]}else t=0;return e.apply(void 0,arguments)}}(K?function(e,t){return K(e,"toString",{configurable:!0,enumerable:!1,value:(a=t,function(){return a}),writable:!0});var a}:qe);function ke(e,t){return e===t||e!==e&&t!==t}var je=fe(function(){return arguments}())?fe:function(e){return Ne(e)&&C.call(e,"callee")&&!U.call(e,"callee")},Se=Array.isArray;function Oe(e){return null!=e&&Ve(e.length)&&!Ge(e)}var Be=Q||function(){return!1};function Ge(e){if(!ze(e))return!1;var t=he(e);return t==m||t==s||t==c||t==h}function Ve(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=i}function ze(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}function Ne(e){return null!=e&&"object"==typeof e}var We=S?function(e){return function(t){return e(t)}}(S):function(e){return Ne(e)&&Ve(e.length)&&!!x[he(e)]};function Ae(e){return Oe(e)?oe(e,!0):ve(e)}var Ce,Pe=(Ce=function(e,t,a,n){xe(e,t,a,n)},ye(function(e,t){var a=-1,n=t.length,r=n>1?t[n-1]:void 0,l=n>2?t[2]:void 0;for(r=Ce.length>3&&"function"==typeof r?(n--,r):void 0,l&&function(e,t,a){if(!ze(a))return!1;var n=typeof t;return!!("number"==n?Oe(a)&&_e(t,a.length):"string"==n&&t in a)&&ke(a[t],e)}(t[0],t[1],l)&&(r=n<3?void 0:r,n=1),e=Object(e);++a<n;){var i=t[a];i&&Ce(e,i,a,r)}return e}));function qe(e){return e}e.exports=Pe}(m={exports:{}},m.exports),m.exports),p=function(e){var t=e.children,a=e.dirty;return!e.isvalid&&!0===a&&r.a.createElement("span",{className:"validation-error"},t)},d=function(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e},h=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},f=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var i,o=e[Symbol.iterator]();!(n=(i=o.next()).done)&&(a.push(i.value),!t||a.length!==t);n=!0);}catch(c){r=!0,l=c}finally{try{!n&&o.return&&o.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),b={checkbox:!1,"select-multiple":[],"file-multiple":[]},v=function(e){var t=e.children,a=e.className,l=e.id,i=e.name,o=e.onSubmit,u=e.formVals,m=void 0===u?{}:u,v={},x=Object(n.useState)({}),y=f(x,2),E=y[0],g=y[1],_=Object(n.useState)(m),F=f(_,2),w=F[0],k=F[1],j=Object(n.useRef)(null),S=function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return r.a.Children.map(t,function(t,a){if(!t||!t.props)return t;var r=t.props.children,l=t.type,i=e(r),o=i.length>0,u=["input","select","textarea"].includes(l),m=l===p;return u?function(e,t){var a=e.props.name,r=function(e){var t=e.props.multiple,a="select"===e.type,n="file"===e.type;return a&&t?"select-multiple":n&&t?"file-multiple":e.props.type||e.type}(e),l=function(e,t,a){var n=w[t]||e.props.value||b[a]||"";return"radio"===a?e.props.value:"file"===a.substr(0,4)?void 0:n}(e,a,r),i=E[a]&&!1===E[a].isvalid&&W(a)?e.props.className+" input-invalid":e.props.className;return["submit","image","reset"].includes(r)?e:Object(n.cloneElement)(e,{key:t,className:i,value:l,onChange:function(t){return B(t,e.props.onChange)}})}(t,a):m?function(e,t){var a=e.props.validatesWith,r=c(e.props.watches),l=r.map(function(e){return w[e]||""}),i=!!a.apply(null,l),o=r.reduce(function(e,t){v[t]=v[t]||{};var a=O(E[t],v[t]),n=0===Object.keys(a).length,r=i&&void 0===a.isvalid,l=!i&&!1!==a.isvalid;return!n&&a.validated||(v[t].validated=!0),(l||r)&&(v[t].isvalid=i),e||!0===a.dirty},!1),u=r.filter(function(e){return v[e].dirty!==o||E[e]&&E[e].dirty!==o});return v=h({},v,r.reduce(function(e,t){return h({},e,d({},t,u.includes(t)?v[t]:h({},v[t],{dirty:o})))},{})),Object(n.cloneElement)(e,{key:t,value:l,dirty:o,isvalid:i})}(t,a):o?Object(n.cloneElement)(t,{},i):t})}(t);return Object.values(v).filter(function(e){return Object.keys(e).length>0}).length>0&&g(O(E,v)),Object(n.useEffect)(function(){N("isvalid",void 0)},[w]),r.a.createElement("form",{className:a,id:l,name:i,ref:j,onSubmit:function(e){e.preventDefault(),0===Object.values(E).filter(function(e){return e.validated&&!e.isvalid}).length?o(e,w,G):N("dirty",!0)}},S);function O(e,t){return s(e,t,function(e,t,a){return"isvalid"===a?e&&t:void 0})}function B(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:function(){},a=e.target,n=a.name,r=a.value,l=a.checked,i=a.options,o=a.files,c=a.type;if(c==="checkbox"){r=l}else if(c==="select"||c==="select-multiple"){r=Array.from(i).filter(function(e){return e.selected}).map(function(e){return e.value})}else if(c==="file"||c==="file-multiple"){r=o}if(!W(n)){V(n,{dirty:true})}z(n,r),t(e)}function G(){j.current.reset(),g({}),k({})}function V(e,t){g(s(E,d({},e,t)))}function z(e,t){k(h({},w,d({},e,t)))}function N(e,t){g(Object.entries(E).reduce(function(a,n){var r=f(n,2),l=r[0],i=r[1];return h({},a,d({},l,h({},i,d({},e,t))))},{}))}function W(e){return E[e]&&E[e].dirty}}}).call(this,a(3))},,,,,function(e,t,a){e.exports=a(12)},,,,,function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(4),i=a.n(l),o=(a(11),a(1)),c=function(){return r.a.createElement(o.b,{onSubmit:function(e,t){return console.log(t)}},r.a.createElement("label",{htmlFor:"example1-name"},"Name:"),r.a.createElement("input",{type:"text",name:"name",id:"example1-name"}),r.a.createElement("label",{htmlFor:"example1-email"},"Email:"),r.a.createElement(o.a,{watches:"email",validatesWith:o.c.required},"Email is required"),r.a.createElement(o.a,{watches:"email",validatesWith:o.c.email},"Please enter a valid email address"),r.a.createElement("input",{type:"email",name:"email",id:"example1-email"}),r.a.createElement("label",{htmlFor:"example1-phone"},"Telephone:"),r.a.createElement(o.a,{watches:"phone",validatesWith:o.c.phone},"Please enter a valid phone number"),r.a.createElement("input",{type:"tel",name:"phone",id:"example1-phone"}),r.a.createElement("label",{htmlFor:"example1-comments"},"Comments:"),r.a.createElement(o.a,{watches:"comments",validatesWith:o.c.maxLength(80)},"Maximum length (80 characters) exceeded"),r.a.createElement("textarea",{name:"comments",id:"example1-comments"}),r.a.createElement(o.a,{watches:"radioButtons",validatesWith:o.c.required},"Pick One!"),r.a.createElement("input",{type:"radio",name:"radioButtons",value:"Radio 1",id:"example1-radioButtons1"}),r.a.createElement("label",{htmlFor:"example1-radioButtons1"},"Radio 1"),r.a.createElement("input",{type:"radio",name:"radioButtons",value:"Radio 2",id:"example1-radioButtons2"}),r.a.createElement("label",{htmlFor:"example1-radioButtons2"},"Radio 2"),r.a.createElement("input",{type:"radio",name:"radioButtons",value:"Radio 3",id:"example1-radioButtons3"}),r.a.createElement("label",{htmlFor:"example1-radioButtons3"},"Radio 3"),r.a.createElement("br",null),r.a.createElement(o.a,{watches:["checkBox1","checkBox2","checkBox3"],validatesWith:function(e,t,a){return e||t||a}},"Pick One!"),r.a.createElement("input",{type:"checkbox",name:"checkBox1",id:"example1-checkbox1"}),r.a.createElement("label",{htmlFor:"example1-checkbox1"},"Check 1"),r.a.createElement("input",{type:"checkbox",name:"checkBox2",id:"example1-checkbox2"}),r.a.createElement("label",{htmlFor:"example1-checkbox2"},"Check 2"),r.a.createElement("input",{type:"checkbox",name:"checkBox3",id:"example1-checkbox3"}),r.a.createElement("label",{htmlFor:"example1-checkbox3"},"Check 3"),r.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},u=function(){return r.a.createElement(o.b,{onSubmit:function(e,t){return console.log(t)}},r.a.createElement("label",{htmlFor:"example2-fzappa"},"Must be Frank Zappa:"),r.a.createElement(o.a,{watches:"fzappa",validatesWith:function(e){return"Frank Zappa"===e}},'Value must be "Frank Zappa"'),r.a.createElement("input",{type:"text",name:"fzappa",id:"example2-fzappa"}),r.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},m=function(){return r.a.createElement(o.b,{onSubmit:function(e,t){return console.log(t)}},r.a.createElement("label",{htmlFor:"example3-input1"},"Input 1:"),r.a.createElement("input",{type:"text",name:"input1",id:"example3-input1"}),r.a.createElement(o.a,{watches:["input1","input2"],validatesWith:function(e,t){return e&&e.length>0||t&&t.length>0}},"Either input 1 OR input 2 is required."),r.a.createElement("label",{htmlFor:"example3-input2"},"Input 2:"),r.a.createElement("input",{type:"text",name:"input2",id:"example3-input2"}),r.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},s=function(){return r.a.createElement(o.b,{id:"example-style",onSubmit:function(e,t){return console.log(t)}},r.a.createElement("label",{htmlFor:"example1-email"},"Email:"),r.a.createElement(o.a,{watches:"email",validatesWith:o.c.required},"Email is required"),r.a.createElement(o.a,{watches:"email",validatesWith:o.c.email},"Please enter a valid email address"),r.a.createElement("input",{type:"email",name:"email",id:"example1-email"}),r.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},p=function(){return r.a.createElement(o.b,{formVals:{name:"Emmett Brown",email:"doc@example.org",phone:"555 555 5555",comments:"Great Scott!!"},onSubmit:function(e,t){return console.log(t)}},r.a.createElement("label",{htmlFor:"example1-name"},"Name:"),r.a.createElement("input",{type:"text",name:"name",id:"example1-name"}),r.a.createElement("label",{htmlFor:"example1-email"},"Email:"),r.a.createElement(o.a,{watches:"email",validatesWith:o.c.required},"Email is required"),r.a.createElement(o.a,{watches:"email",validatesWith:o.c.email},"Please enter a valid email address"),r.a.createElement("input",{type:"email",name:"email",id:"example1-email"}),r.a.createElement("label",{htmlFor:"example1-phone"},"Telephone:"),r.a.createElement(o.a,{watches:"phone",validatesWith:o.c.phone},"Please enter a valid phone number"),r.a.createElement("input",{type:"tel",name:"phone",id:"example1-phone"}),r.a.createElement("label",{htmlFor:"example1-comments"},"Comments:"),r.a.createElement(o.a,{watches:"comments",validatesWith:o.c.maxLength(80)},"Maximum length (80 characters) exceeded"),r.a.createElement("textarea",{name:"comments",id:"example1-comments"}),r.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},d=a(5),h=function(){return r.a.createElement(o.b,{onSubmit:function(e,t){return console.log(t)}},Object(d.a)(Array(200).keys()).map(function(e){return r.a.createElement("div",{key:e},r.a.createElement("label",{htmlFor:"example2-input-".concat(e)},"Label ",e,":"),r.a.createElement(o.a,{watches:"input-".concat(e),validatesWith:o.c.required},"Value is Required"),r.a.createElement("input",{type:"text",name:"input-".concat(e),id:"example6-input-".concat(e)}))}),r.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},f=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("section",null,r.a.createElement("h1",null,"react-formguards"),r.a.createElement("h3",null,"A simple, declarative approach to client side validation."),r.a.createElement("span",null,r.a.createElement("a",{href:"https://www.npmjs.com/package/react-formguards"},"npm")," | ",r.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards"},"github")),r.a.createElement("div",{className:"example"},r.a.createElement("div",{className:"example-code"},r.a.createElement("h2",null,"Basic Validation"),r.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-basic.jsx"},"Source"),r.a.createElement("ol",null,r.a.createElement("li",null,"Just write your form like normal, replacing your <form> tag with a <ValidatedForm> tag.  Pass it an onSubmit function."),r.a.createElement("li",null,"Then add <FormGuard> tags anywhere you'd like a validation error to show up. ",r.a.createElement("br",null)," Each <FormGuard> tag:",r.a.createElement("ul",null,r.a.createElement("li",null,"Watches specified input(s) and validates as needed"),r.a.createElement("li",null,"Becomes a <span> in the DOM when the error shows"),r.a.createElement("li",null,"onSubmit won't be called until all the FormGuard's are satisfied")),r.a.createElement("p",null,"Some basic validators are included -- required, email, phone, maxLength, and minLength"))),r.a.createElement("pre",null,"\n  <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n    <label htmlFor='example1-name'>Name:</label>\n    <input type='text' name='name' id='example1-name' />\n\n    <label htmlFor='example1-email'>Email:</label>\n    <FormGuard watches='email' validatesWith={validators.required} >\n              Email is required\n    </FormGuard>\n    <FormGuard watches='email' validatesWith={validators.email} >\n              Please enter a valid email address\n    </FormGuard>\n    <input type='email' name='email' id='example1-email' />\n\n    <label htmlFor='example1-phone'>Telephone:</label>\n    <FormGuard watches='phone' validatesWith={validators.phone} >\n              Please enter a valid phone number\n    </FormGuard>\n    <input type='tel' name='phone' id='example1-phone' />\n\n    <label htmlFor='example1-comments'>Comments:</label>\n    <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >\n              Maximum length (80 characters) exceeded\n    </FormGuard>\n    <textarea name='comments' id='example1-comments' />\n\n    <FormGuard watches='radioButtons' validatesWith={validators.required} >\n              Pick One!\n    </FormGuard>\n    <input type='radio' name='radioButtons' value='Radio 1' id='example1-radioButtons1' />\n    <label htmlFor='example1-radioButtons1'>Radio 1</label>\n    <input type='radio' name='radioButtons' value='Radio 2' id='example1-radioButtons2' />\n    <label htmlFor='example1-radioButtons2'>Radio 2</label>\n    <input type='radio' name='radioButtons' value='Radio 3' id='example1-radioButtons3' />\n    <label htmlFor='example1-radioButtons3'>Radio 3</label>\n\n    <br />\n    <FormGuard\n      watches={['checkBox1', 'checkBox2', 'checkBox3']}\n      validatesWith={(cb1, cb2, cb3) => { return cb1 || cb2 || cb3}} >\n              Pick One!\n    </FormGuard>\n    <input type='checkbox' name='checkBox1' id='example1-checkbox1' />\n    <label htmlFor='example1-checkbox1'>Check 1</label>\n    <input type='checkbox' name='checkBox2' id='example1-checkbox2' />\n    <label htmlFor='example1-checkbox2'>Check 2</label>\n    <input type='checkbox' name='checkBox3' id='example1-checkbox3' />\n    <label htmlFor='example1-checkbox3'>Check 3</label>\n\n    <input type='submit' value='Check the console for onSubmit' />\n  </ValidatedForm>\n          ")),r.a.createElement("div",{className:"example-implementation"},r.a.createElement(c,null))),r.a.createElement("div",{className:"example"},r.a.createElement("div",{className:"example-code"},r.a.createElement("h2",null,"Custom Validation Functions"),r.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-function.jsx"},"Source"),r.a.createElement("p",null,"Just pass a function to validatesWith to use your own validation functions."),r.a.createElement("pre",null,"\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n      <label htmlFor='example2-fzappa'>Must be Frank Zappa:</label>\n      <FormGuard watches='fzappa' validatesWith={ val => val === 'Frank Zappa' } >\n          Value must be \"Frank Zappa\"\n      </FormGuard> \n      <input type='text' name='fzappa' id='example2-fzappa' />  \n      \n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),r.a.createElement("div",{className:"example-implementation"},r.a.createElement(u,null))),r.a.createElement("div",{className:"example"},r.a.createElement("div",{className:"example-code"},r.a.createElement("h2",null,"Guarding Multiple Form Elements with one FormGuard"),r.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-multiple-watches.jsx"},"Source"),r.a.createElement("p",null,"A FormGuard can watch multiple elements by passing an array to the ",r.a.createElement("i",null,"watches")," prop"),r.a.createElement("p",null,"In this example the ",r.a.createElement("i",null,"validateTwoInputs")," function requires that either ",r.a.createElement("i",null,"input1")," OR ",r.a.createElement("i",null,"input2")," is filled in."),r.a.createElement("pre",null,"\n    function validateTwoInputs (input1, input2) {\n      return (input1 && input1.length > 0) || \n             (input2 && input2.length > 0);\n    }\n\n    [...]\n\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n      <label htmlFor='example3-input1'>Input 1:</label>\n      <input type='text' name='input1' id='example3-input1' />  \n\n      <FormGuard \n          watches={['input1', 'input2']} \n          validatesWith={validateTwoInputs} >\n          \n          Either input 1 OR input 2 is required.\n      </FormGuard> \n\n      <label htmlFor='example3-input2'>Input 2:</label>\n      <input type='text' name='input2' id='example3-input2' />  \n\n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),r.a.createElement("div",{className:"example-implementation"},r.a.createElement(m,null))),r.a.createElement("div",{className:"example"},r.a.createElement("div",{className:"example-code"},r.a.createElement("h2",null,"Styling / CSS"),r.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-style.jsx"},"Source"),r.a.createElement("p",null,"react-formguards will add the css class 'input-invalid' to form controls that are invalid."),r.a.createElement("p",null,"The span that displays a FormGuard error text will have the css class 'validation-error'"),r.a.createElement("pre",null,"\n    \n    .input-invalid {\n      outline: 3px solid #0000ff;\n    }\n\n    span.validation-error {\n      float: right;\n      font-weight: bold;\n      color: #00ff00;\n    }\n\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n      <label htmlFor='example4-email'>Email:</label>\n      <FormGuard watches='email' validatesWith={validators.required} >\n          Email is required  \n      </FormGuard> \n      <FormGuard watches='email' validatesWith={validators.email} >\n          Please enter a valid email address  \n      </FormGuard> \n      <input type='email' name='email' id='example4-email' />  \n      \n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),r.a.createElement("div",{className:"example-implementation"},r.a.createElement(s,null))),r.a.createElement("div",{className:"example"},r.a.createElement("div",{className:"example-code"},r.a.createElement("h2",null,"Passing Preset Values"),r.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-values.jsx"},"Source"),r.a.createElement("p",null,"Just pass an object as the formVals prop to preset values in the form."),r.a.createElement("pre",null,"\n    const formVals = {\n      name: 'Emmett Brown',\n      email: 'doc@example.org',\n      phone: '555 555 5555',\n      comments: 'Great Scott!!'\n    };\n\n    [...]\n\n    <ValidatedForm formVals={formVals} onSubmit={(e, formVals) => console.log(formVals)}>\n      <label htmlFor='example1-name'>Name:</label>\n      <input type='text' name='name' id='example1-name' />\n\n      <label htmlFor='example1-email'>Email:</label>\n      <FormGuard watches='email' validatesWith={validators.required} >\n          Email is required  \n      </FormGuard> \n      <FormGuard watches='email' validatesWith={validators.email} >\n          Please enter a valid email address  \n      </FormGuard> \n      <input type='email' name='email' id='example1-email' />  \n      \n      <label htmlFor='example1-phone'>Telephone:</label>\n      <FormGuard watches='phone' validatesWith={validators.phone} >\n          Please enter a valid phone number  \n      </FormGuard> \n      <input type='tel' name='phone' id='example1-phone' />  \n\n      <label htmlFor='example1-comments'>Comments:</label>\n      <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >\n          Maximum length (80 characters) exceeded\n      </FormGuard> \n      <textarea name='comments' id='example1-comments' />  \n      \n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),r.a.createElement("div",{className:"example-implementation"},r.a.createElement(p,null))),r.a.createElement("div",{className:"example"},r.a.createElement("div",{className:"example-code"},r.a.createElement("h2",null,"Large Forms"),r.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-benchmark.jsx"},"Source"),r.a.createElement("p",null,"react-formguards handles large forms as well.  Here is a contrived exmaple with 200, individually validated, input boxes."),r.a.createElement("pre",null,"\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n    {[...Array(200).keys()].map(idx =>\n      <div key={idx}>\n        <label htmlFor={`example2-input-${idx}`}>Label {idx}:</label>\n        <FormGuard watches={`input-${idx}`} validatesWith={validators.required} >\n              Value is Required\n        </FormGuard>\n        <input type='text' name={`input-${idx}`} id={`example6-input-${idx}`} />\n      </div>\n    )}\n    <input type='submit' value='Check the console for onSubmit' />\n  </ValidatedForm>\n            ")),r.a.createElement("div",{className:"example-implementation"},r.a.createElement("details",null,r.a.createElement("summary",null,"Click to see example.  "),r.a.createElement("p",null,r.a.createElement(h,null)))))))};i.a.render(r.a.createElement(f,null),document.getElementById("root"))}],[[6,1,2]]]);
//# sourceMappingURL=main.6c06bb43.chunk.js.map