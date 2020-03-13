(this["webpackJsonpreact-formguards-example"]=this["webpackJsonpreact-formguards-example"]||[]).push([[0],{10:function(e,a,t){},11:function(e,a,t){"use strict";t.r(a);var n=t(0),l=t.n(n),r=t(2),m=t.n(r),i=(t(10),{phone:function(e){return c.test(e)},email:function(e){return o.test(e)},minLength:function(e){return function(a){return a.length>=e}},maxLength:function(e){return function(a){return a.length<=e}},required:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return"number"===typeof e||null!==e&&void 0!==e&&0!==e.length&&0!==Object.keys(e).length&&""!==e}}),o=/^$|(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i,c=/^$|^(\+\d{1,3})?\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/,u=function(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e},s=Object.assign||function(e){for(var a=1;a<arguments.length;a++){var t=arguments[a];for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])}return e},p=function(e,a){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,a){var t=[],n=!0,l=!1,r=void 0;try{for(var m,i=e[Symbol.iterator]();!(n=(m=i.next()).done)&&(t.push(m.value),!a||t.length!==a);n=!0);}catch(o){l=!0,r=o}finally{try{!n&&i.return&&i.return()}finally{if(l)throw r}}return t}(e,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")},d=function(e){if(Array.isArray(e)){for(var a=0,t=Array(e.length);a<e.length;a++)t[a]=e[a];return t}return Array.from(e)},h=function(e){var a=e.children,t=e.dirty,n=e.isvalid,r=e.id,m=e.name,i=e.className,o=void 0===i?"":i;return!n&&!0===t&&l.a.createElement("span",s({id:r,name:m},{className:o+" validation-error"}),a)},x=function(e){return function(e){return!!e&&"object"===typeof e}(e)&&!function(e){var a=Object.prototype.toString.call(e);return"[object RegExp]"===a||"[object Date]"===a||function(e){return e.$$typeof===b}(e)}(e)};var b="function"===typeof Symbol&&Symbol.for?Symbol.for("react.element"):60103;function f(e,a){return!1!==a.clone&&a.isMergeableObject(e)?g((t=e,Array.isArray(t)?[]:{}),e,a):e;var t}function E(e,a,t){return e.concat(a).map((function(e){return f(e,t)}))}function v(e){return Object.keys(e).concat(function(e){return Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(e).filter((function(a){return e.propertyIsEnumerable(a)})):[]}(e))}function y(e,a){try{return a in e}catch(t){return!1}}function F(e,a,t){var n={};return t.isMergeableObject(e)&&v(e).forEach((function(a){n[a]=f(e[a],t)})),v(a).forEach((function(l){(function(e,a){return y(e,a)&&!(Object.hasOwnProperty.call(e,a)&&Object.propertyIsEnumerable.call(e,a))})(e,l)||(y(e,l)&&t.isMergeableObject(a[l])?n[l]=function(e,a){if(!a.customMerge)return g;var t=a.customMerge(e);return"function"===typeof t?t:g}(l,t)(e[l],a[l],t):n[l]=f(a[l],t))})),n}function g(e,a,t){(t=t||{}).arrayMerge=t.arrayMerge||E,t.isMergeableObject=t.isMergeableObject||x,t.cloneUnlessOtherwiseSpecified=f;var n=Array.isArray(a);return n===Array.isArray(e)?n?t.arrayMerge(e,a,t):F(e,a,t):f(a,t)}g.all=function(e,a){if(!Array.isArray(e))throw new Error("first argument should be an array");return e.reduce((function(e,t){return g(e,t,a)}),{})};var k=g,w=function(e){return Array.isArray(e)?e:[e]},S={checkbox:!1,"select-multiple":[],"file-multiple":[]},G=function(e){var a=e.children,t=e.className,r=e.id,m=e.name,i=e.onSubmit,o=e.useFieldsets,c=void 0!==o&&o,x=e.formVals,b=void 0===x?{}:x,f={},E=Object(n.useState)({}),v=p(E,2),y=v[0],F=v[1],g=Object(n.useState)(b),G=p(g,2),B=G[0],V=G[1],O=Object(n.useRef)(null),W=function e(){var a=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return l.a.Children.map(a,(function(a,l){if(!a||!a.props)return a;var i=a.props,o=i.children,c=i.name,u=a.type,s=["input","select","textarea"].includes(u),p=u===h,x="fieldset"===u&&c?[c].concat(d(t)):t,b=e(o,x),f=b.length>0;return s?r(a,l,t):p?m(a,l):f?Object(n.cloneElement)(a,{},b):a}));function r(e,a,t){var l=e.props.name,r=e.props.className||"",m=y[l]||{},i=function(e){var a=e.props.multiple,t="select"===e.type,n="file"===e.type;return t&&a?"select-multiple":n&&a?"file-multiple":e.props.type||e.type}(e),o=function(e,a,t){var n=B[a]||e.props.value||S[t]||"";return"radio"===t?e.props.value:"file"===t.substr(0,4)?void 0:n}(e,l,i),c=!1===m.isvalid&&m.blurred?r+" input-invalid":r;return t.length>0&&y[l]&&!y[l].fieldsets&&(f[l]||(f[l]={}),f[l].fieldsets=t),["submit","image","reset"].includes(i)?e:Object(n.cloneElement)(e,{key:a,className:c,value:o,onChange:function(a){return j(a,e.props.onChange)},onBlur:function(a){return N(a,e.props.onBlur)}})}function m(e,a){var t=e.props.validatesWith,l=w(e.props.watches),r=l.map((function(e){return B[e]||""})),m=!!t.apply(null,r),i=l.reduce((function(e,a){var t=p(e,2),n=t[0],l=t[1];f[a]=f[a]||{};var r=y[a]||{},i=m&&void 0===r.isvalid,o=!m&&!1!==r.isvalid;return r.validated||(f[a].validated=!0),(o||i)&&(f[a].isvalid=m),[n||r.dirty,l||r.blurred]}),[!1,!1]),o=p(i,2),c=o[0],d=o[1];return f=s({},f,l.reduce((function(e,a){return s({},e,u({},a,M(a)===c?f[a]:s({},f[a],{groupDirty:c})))}),{}),l.reduce((function(e,a){return s({},e,u({},a,A(a)===d?f[a]:s({},f[a],{groupBlurred:d})))}),{})),Object(n.cloneElement)(e,{key:a,value:r,dirty:c,isvalid:m})}}(a);return Object.values(f).filter((function(e){return Object.keys(e).length>0})).length>0&&F(k(y,f)),Object(n.useEffect)((function(){P({isvalid:void 0})}),[B]),l.a.createElement("form",{className:t,id:r,name:m,ref:O,onSubmit:function(e){e.preventDefault();var a=Object.keys(B).reduce((function(e,a){var t=y[a]&&y[a].fieldsets||[];return c&&t.length>0?k(e,function(e,a,t){return e.reduce((function(e,n){return 0===Object.keys(e).length?u({},n,u({},a,t)):u({},n,e)}),{})}(t,a,B[a])):s({},e,u({},a,B[a]))}),{});0===Object.values(y).filter((function(e){return e.validated&&!e.isvalid})).length?i(e,a,C):P({dirty:!0,blurred:!0})}},W);function j(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},t=e.target,n=t.name,l=t.value,r=t.checked,m=t.options,i=t.files,o=t.type;"checkbox"===o?l=r:"select"===o||"select-multiple"===o?l=Array.from(m).filter((function(e){return e.selected})).map((function(e){return e.value})):"file"!==o&&"file-multiple"!==o||(l=i),q(n,l),M(n)||F(k(y,u({},n,{dirty:!0}))),a(e)}function N(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},t=e.target.name;y[t]&&!y[t].blurred&&F(k(y,u({},t,{blurred:!0}))),a(e)}function C(){O.current.reset(),F({}),V({})}function q(e,a){V(k(B,u({},e,a)))}function P(e){F(Object.entries(y).reduce((function(a,t){var n=p(t,2),l=n[0],r=n[1];return s({},a,u({},l,s({},r,e)))}),{}))}function M(e){return y[e]&&y[e].dirty}function A(e){return y[e]&&y[e].blurred}},B=function(){return l.a.createElement(G,{onSubmit:function(e,a){return console.log(a)}},l.a.createElement("label",{htmlFor:"example1-name"},"Name:"),l.a.createElement("input",{type:"text",name:"name",id:"example1-name"}),l.a.createElement("label",{htmlFor:"example1-email"},"Email:"),l.a.createElement(h,{watches:"email",validatesWith:i.required},"Email is required"),l.a.createElement(h,{watches:"email",validatesWith:i.email},"Please enter a valid email address"),l.a.createElement("input",{type:"email",name:"email",id:"example1-email"}),l.a.createElement("label",{htmlFor:"example1-phone"},"Telephone:"),l.a.createElement(h,{watches:"phone",validatesWith:i.phone},"Please enter a valid phone number"),l.a.createElement("input",{type:"tel",name:"phone",id:"example1-phone"}),l.a.createElement("label",{htmlFor:"example1-comments"},"Comments:"),l.a.createElement(h,{watches:"comments",validatesWith:i.maxLength(80)},"Maximum length (80 characters) exceeded"),l.a.createElement("textarea",{name:"comments",id:"example1-comments"}),l.a.createElement(h,{watches:"radioButtons",validatesWith:i.required},"Pick One!"),l.a.createElement("input",{type:"radio",name:"radioButtons",value:"Radio 1",id:"example1-radioButtons1"}),l.a.createElement("label",{htmlFor:"example1-radioButtons1"},"Radio 1"),l.a.createElement("input",{type:"radio",name:"radioButtons",value:"Radio 2",id:"example1-radioButtons2"}),l.a.createElement("label",{htmlFor:"example1-radioButtons2"},"Radio 2"),l.a.createElement("input",{type:"radio",name:"radioButtons",value:"Radio 3",id:"example1-radioButtons3"}),l.a.createElement("label",{htmlFor:"example1-radioButtons3"},"Radio 3"),l.a.createElement("br",null),l.a.createElement(h,{watches:["checkBox1","checkBox2","checkBox3"],validatesWith:function(e,a,t){return e||a||t}},"Pick One!"),l.a.createElement("input",{type:"checkbox",name:"checkBox1",id:"example1-checkbox1"}),l.a.createElement("label",{htmlFor:"example1-checkbox1"},"Check 1"),l.a.createElement("input",{type:"checkbox",name:"checkBox2",id:"example1-checkbox2"}),l.a.createElement("label",{htmlFor:"example1-checkbox2"},"Check 2"),l.a.createElement("input",{type:"checkbox",name:"checkBox3",id:"example1-checkbox3"}),l.a.createElement("label",{htmlFor:"example1-checkbox3"},"Check 3"),l.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},V=function(){return l.a.createElement(G,{onSubmit:function(e,a){return console.log(a)}},l.a.createElement("label",{htmlFor:"example2-fzappa"},"Must be Frank Zappa:"),l.a.createElement(h,{watches:"fzappa",validatesWith:function(e){return"Frank Zappa"===e}},'Value must be "Frank Zappa"'),l.a.createElement("input",{type:"text",name:"fzappa",id:"example2-fzappa"}),l.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},O=function(){return l.a.createElement(G,{onSubmit:function(e,a){return console.log(a)}},l.a.createElement("label",{htmlFor:"example3-input1"},"Input 1:"),l.a.createElement("input",{type:"text",name:"input1",id:"example3-input1"}),l.a.createElement(h,{watches:["input1","input2"],validatesWith:function(e,a){return e&&e.length>0||a&&a.length>0}},"Either input 1 OR input 2 is required."),l.a.createElement("label",{htmlFor:"example3-input2"},"Input 2:"),l.a.createElement("input",{type:"text",name:"input2",id:"example3-input2"}),l.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},W=function(){return l.a.createElement(G,{id:"example-style",onSubmit:function(e,a){return console.log(a)}},l.a.createElement("label",{htmlFor:"example1-email"},"Email:"),l.a.createElement(h,{watches:"email",validatesWith:i.required},"Email is required"),l.a.createElement(h,{watches:"email",validatesWith:i.email},"Please enter a valid email address"),l.a.createElement("input",{type:"email",name:"email",id:"example1-email"}),l.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},j=function(){return l.a.createElement(G,{formVals:{name:"Emmett Brown",email:"doc@example.org",phone:"555 555 5555",comments:"Great Scott!!"},onSubmit:function(e,a){return console.log(a)}},l.a.createElement("label",{htmlFor:"example1-name"},"Name:"),l.a.createElement("input",{type:"text",name:"name",id:"example1-name"}),l.a.createElement("label",{htmlFor:"example1-email"},"Email:"),l.a.createElement(h,{watches:"email",validatesWith:i.required},"Email is required"),l.a.createElement(h,{watches:"email",validatesWith:i.email},"Please enter a valid email address"),l.a.createElement("input",{type:"email",name:"email",id:"example1-email"}),l.a.createElement("label",{htmlFor:"example1-phone"},"Telephone:"),l.a.createElement(h,{watches:"phone",validatesWith:i.phone},"Please enter a valid phone number"),l.a.createElement("input",{type:"tel",name:"phone",id:"example1-phone"}),l.a.createElement("label",{htmlFor:"example1-comments"},"Comments:"),l.a.createElement(h,{watches:"comments",validatesWith:i.maxLength(80)},"Maximum length (80 characters) exceeded"),l.a.createElement("textarea",{name:"comments",id:"example1-comments"}),l.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},N=t(3),C=function(){return l.a.createElement(G,{onSubmit:function(e,a){return console.log(a)}},Object(N.a)(Array(200).keys()).map((function(e){return l.a.createElement("div",{key:e},l.a.createElement("label",{htmlFor:"example2-input-".concat(e)},"Label ",e,":"),l.a.createElement(h,{watches:"input-".concat(e),validatesWith:i.required},"Value is Required"),l.a.createElement("input",{type:"text",name:"input-".concat(e),id:"example6-input-".concat(e)}))})),l.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"}))},q=t(4),P=function(){var e=Object(n.useState)(!0),a=Object(q.a)(e,2),t=a[0],r=a[1];return l.a.createElement(l.a.Fragment,null,l.a.createElement("form",null,l.a.createElement("label",{htmlFor:"useFieldsets"},"useFieldsets"),l.a.createElement("input",{type:"checkbox",checked:t,onChange:function(){return r(!t)},name:"useFieldSets",id:"useFieldsets"})),l.a.createElement(G,{onSubmit:function(e,a){return console.log(a)},useFieldsets:t},l.a.createElement("fieldset",{name:"person"},l.a.createElement("legend",null,"Person"),l.a.createElement("label",{htmlFor:"example7-name"},"Name:"),l.a.createElement(h,{watches:"name",validatesWith:i.required},"Name is required"),l.a.createElement("input",{type:"text",name:"name",id:"example7-name"}),l.a.createElement("fieldset",{name:"contact-info"},l.a.createElement("legend",null,"Contact Info"),l.a.createElement("label",{htmlFor:"example7-email"},"Email:"),l.a.createElement(h,{watches:"email",validatesWith:i.required},"Email is required"),l.a.createElement(h,{watches:"email",validatesWith:i.email},"Please enter a valid email address"),l.a.createElement("input",{type:"email",name:"email",id:"example7-email"}),l.a.createElement("label",{htmlFor:"example7-phone"},"Telephone:"),l.a.createElement(h,{watches:"phone",validatesWith:i.phone},"Please enter a valid phone number"),l.a.createElement("input",{type:"tel",name:"phone",id:"example7-phone"}))),l.a.createElement("label",{htmlFor:"example7-comments"},"Comments:"),l.a.createElement(h,{watches:"comments",validatesWith:i.maxLength(80)},"Maximum length (80 characters) exceeded"),l.a.createElement("textarea",{name:"comments",id:"example7-comments"}),l.a.createElement("input",{type:"submit",value:"Check the console for onSubmit"})))},M=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("section",null,l.a.createElement("h1",{id:"top"},"react-formguards"),l.a.createElement("h3",null,"A simple, declarative approach to client side validation."),l.a.createElement("span",null,l.a.createElement("a",{href:"https://www.npmjs.com/package/react-formguards"},"npm")," | ",l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards"},"github")),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement("a",{href:"#basic"},"Basic Validation")),l.a.createElement("li",null,l.a.createElement("a",{href:"#custom"},"Custom Validation Functions")),l.a.createElement("li",null,l.a.createElement("a",{href:"#multiple"},"Watching Multiple Elements With One FormGuard")),l.a.createElement("li",null,l.a.createElement("a",{href:"#style"},"Styling / CSS")),l.a.createElement("li",null,l.a.createElement("a",{href:"#preset"},"Passing Preset Values")),l.a.createElement("li",null,l.a.createElement("a",{href:"#fieldsets"},"Grouping data with useFieldsets")),l.a.createElement("li",null,l.a.createElement("a",{href:"#benchmark"},"Performance / Large Forms With Many Elements"))),l.a.createElement("hr",null),l.a.createElement("div",{id:"basic",className:"example"},l.a.createElement("div",{className:"example-code"},l.a.createElement("h2",null,"Basic Validation"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-basic.jsx"},"Source"),"  -  ",l.a.createElement("a",{href:"#top"},"Back to top"),l.a.createElement("ol",null,l.a.createElement("li",null,"Just write your form like normal, replacing your <form> tag with a <ValidatedForm> tag.  Pass it an onSubmit function."),l.a.createElement("li",null,"Then add <FormGuard> tags anywhere you'd like a validation error to show up. ",l.a.createElement("br",null)," Each <FormGuard> tag:",l.a.createElement("ul",null,l.a.createElement("li",null,"Watches specified input(s) and validates as needed"),l.a.createElement("li",null,"Becomes a <span> in the DOM when the error shows"),l.a.createElement("li",null,"onSubmit won't be called until all the FormGuard's are satisfied")),l.a.createElement("p",null,"Some basic validators are included -- required, email, phone, maxLength, and minLength"))),l.a.createElement("pre",null,"\n  <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n    <label htmlFor='example1-name'>Name:</label>\n    <input type='text' name='name' id='example1-name' />\n\n    <label htmlFor='example1-email'>Email:</label>\n    <FormGuard watches='email' validatesWith={validators.required} >\n              Email is required\n    </FormGuard>\n    <FormGuard watches='email' validatesWith={validators.email} >\n              Please enter a valid email address\n    </FormGuard>\n    <input type='email' name='email' id='example1-email' />\n\n    <label htmlFor='example1-phone'>Telephone:</label>\n    <FormGuard watches='phone' validatesWith={validators.phone} >\n              Please enter a valid phone number\n    </FormGuard>\n    <input type='tel' name='phone' id='example1-phone' />\n\n    <label htmlFor='example1-comments'>Comments:</label>\n    <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >\n              Maximum length (80 characters) exceeded\n    </FormGuard>\n    <textarea name='comments' id='example1-comments' />\n\n    <FormGuard watches='radioButtons' validatesWith={validators.required} >\n              Pick One!\n    </FormGuard>\n    <input type='radio' name='radioButtons' value='Radio 1' id='example1-radioButtons1' />\n    <label htmlFor='example1-radioButtons1'>Radio 1</label>\n    <input type='radio' name='radioButtons' value='Radio 2' id='example1-radioButtons2' />\n    <label htmlFor='example1-radioButtons2'>Radio 2</label>\n    <input type='radio' name='radioButtons' value='Radio 3' id='example1-radioButtons3' />\n    <label htmlFor='example1-radioButtons3'>Radio 3</label>\n\n    <br />\n    <FormGuard\n      watches={['checkBox1', 'checkBox2', 'checkBox3']}\n      validatesWith={(cb1, cb2, cb3) => { return cb1 || cb2 || cb3}} >\n              Pick One!\n    </FormGuard>\n    <input type='checkbox' name='checkBox1' id='example1-checkbox1' />\n    <label htmlFor='example1-checkbox1'>Check 1</label>\n    <input type='checkbox' name='checkBox2' id='example1-checkbox2' />\n    <label htmlFor='example1-checkbox2'>Check 2</label>\n    <input type='checkbox' name='checkBox3' id='example1-checkbox3' />\n    <label htmlFor='example1-checkbox3'>Check 3</label>\n\n    <input type='submit' value='Check the console for onSubmit' />\n  </ValidatedForm>\n          ")),l.a.createElement("div",{className:"example-implementation"},l.a.createElement(B,null))),l.a.createElement("hr",null),l.a.createElement("div",{id:"custom",className:"example"},l.a.createElement("div",{className:"example-code"},l.a.createElement("h2",null,"Custom Validation Functions"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-function.jsx"},"Source"),"  -  ",l.a.createElement("a",{href:"#top"},"Back to top"),l.a.createElement("p",null,"Just pass a function to validatesWith to use your own validation functions."),l.a.createElement("pre",null,"\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n      <label htmlFor='example2-fzappa'>Must be Frank Zappa:</label>\n      <FormGuard watches='fzappa' validatesWith={ val => val === 'Frank Zappa' } >\n          Value must be \"Frank Zappa\"\n      </FormGuard> \n      <input type='text' name='fzappa' id='example2-fzappa' />  \n      \n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),l.a.createElement("div",{className:"example-implementation"},l.a.createElement(V,null))),l.a.createElement("hr",null),l.a.createElement("div",{id:"multiple",className:"example"},l.a.createElement("div",{className:"example-code"},l.a.createElement("h2",null,"Guarding Multiple Form Elements with one FormGuard"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-multiple-watches.jsx"},"Source"),"  -  ",l.a.createElement("a",{href:"#top"},"Back to top"),l.a.createElement("p",null,"A FormGuard can watch multiple elements by passing an array to the ",l.a.createElement("i",null,"watches")," prop"),l.a.createElement("p",null,"In this example the ",l.a.createElement("i",null,"validateTwoInputs")," function requires that either ",l.a.createElement("i",null,"input1")," OR ",l.a.createElement("i",null,"input2")," is filled in."),l.a.createElement("pre",null,"\n    function validateTwoInputs (input1, input2) {\n      return (input1 && input1.length > 0) || \n             (input2 && input2.length > 0);\n    }\n\n    [...]\n\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n      <label htmlFor='example3-input1'>Input 1:</label>\n      <input type='text' name='input1' id='example3-input1' />  \n\n      <FormGuard \n          watches={['input1', 'input2']} \n          validatesWith={validateTwoInputs} >\n          \n          Either input 1 OR input 2 is required.\n      </FormGuard> \n\n      <label htmlFor='example3-input2'>Input 2:</label>\n      <input type='text' name='input2' id='example3-input2' />  \n\n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),l.a.createElement("div",{className:"example-implementation"},l.a.createElement(O,null))),l.a.createElement("hr",null),l.a.createElement("div",{id:"style",className:"example"},l.a.createElement("div",{className:"example-code"},l.a.createElement("h2",null,"Styling / CSS"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-style.jsx"},"Source"),"  -  ",l.a.createElement("a",{href:"#top"},"Back to top"),l.a.createElement("p",null,"react-formguards will add the css class 'input-invalid' to form controls that are invalid."),l.a.createElement("p",null,"The span that displays a FormGuard error text will have the css class 'validation-error'"),l.a.createElement("pre",null,"\n    \n    .input-invalid {\n      outline: 3px solid #0000ff;\n    }\n\n    span.validation-error {\n      float: right;\n      font-weight: bold;\n      color: #00ff00;\n    }\n\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n      <label htmlFor='example4-email'>Email:</label>\n      <FormGuard watches='email' validatesWith={validators.required} >\n          Email is required  \n      </FormGuard> \n      <FormGuard watches='email' validatesWith={validators.email} >\n          Please enter a valid email address  \n      </FormGuard> \n      <input type='email' name='email' id='example4-email' />  \n      \n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),l.a.createElement("div",{className:"example-implementation"},l.a.createElement(W,null))),l.a.createElement("hr",null),l.a.createElement("div",{id:"preset",className:"example"},l.a.createElement("div",{className:"example-code"},l.a.createElement("h2",null,"Passing Preset Values"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-values.jsx"},"Source"),"  -  ",l.a.createElement("a",{href:"#top"},"Back to top"),l.a.createElement("p",null,"Just pass an object as the formVals prop to preset values in the form."),l.a.createElement("pre",null,"\n    const formVals = {\n      name: 'Emmett Brown',\n      email: 'doc@example.org',\n      phone: '555 555 5555',\n      comments: 'Great Scott!!'\n    };\n\n    [...]\n\n    <ValidatedForm formVals={formVals} onSubmit={(e, formVals) => console.log(formVals)}>\n      <label htmlFor='example1-name'>Name:</label>\n      <input type='text' name='name' id='example1-name' />\n\n      <label htmlFor='example1-email'>Email:</label>\n      <FormGuard watches='email' validatesWith={validators.required} >\n          Email is required  \n      </FormGuard> \n      <FormGuard watches='email' validatesWith={validators.email} >\n          Please enter a valid email address  \n      </FormGuard> \n      <input type='email' name='email' id='example1-email' />  \n      \n      <label htmlFor='example1-phone'>Telephone:</label>\n      <FormGuard watches='phone' validatesWith={validators.phone} >\n          Please enter a valid phone number  \n      </FormGuard> \n      <input type='tel' name='phone' id='example1-phone' />  \n\n      <label htmlFor='example1-comments'>Comments:</label>\n      <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >\n          Maximum length (80 characters) exceeded\n      </FormGuard> \n      <textarea name='comments' id='example1-comments' />  \n      \n      <input type='submit' value='Check the console for onSubmit' />\n    </ValidatedForm>\n            ")),l.a.createElement("div",{className:"example-implementation"},l.a.createElement(j,null))),l.a.createElement("hr",null),l.a.createElement("div",{id:"fieldsets",className:"example"},l.a.createElement("div",{className:"example-code"},l.a.createElement("h2",null,"Grouping data with useFieldsets"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-fieldsets.jsx"},"Source"),"  -  ",l.a.createElement("a",{href:"#top"},"Back to top"),l.a.createElement("p",null,"If you pass useFieldsets=true to a ValidatedForm it'll create sub-objects in the formVals passed to onSubmit based upon the fieldset hierarchy in the form. "),l.a.createElement("p",null,"In the example below, the data passed to onSubmit takes the form: "),l.a.createElement("pre",null,"\n            \n            {\n              person: {\n                name\n                contact-info: {\n                  email\n                  phone\n                }\n              }\n              comments\n            }\n            \n            "),l.a.createElement("p",null,"If useFieldsets is false it'll have the form:"),l.a.createElement("pre",null,"\n            \n            {\n              name\n              email\n              phone\n              comments\n            }\n            \n            "),l.a.createElement("pre",null,"\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)} useFieldsets={useFieldsets}>\n    \n    <fieldset name=\"person\">\n      <legend>Person</legend>\n\n      <label htmlFor='example7-name'>Name:</label>\n      <FormGuard watches='name' validatesWith={validators.required} >\n          Name is required\n      </FormGuard>\n      <input type='text' name='name' id='example7-name' />\n      \n      <fieldset name=\"contact-info\">\n        <legend>Contact Info</legend>\n  \n        <label htmlFor='example7-email'>Email:</label>\n        <FormGuard watches='email' validatesWith={validators.required} >\n                  Email is required\n        </FormGuard>\n        <FormGuard watches='email' validatesWith={validators.email} >\n                  Please enter a valid email address\n        </FormGuard>\n        <input type='email' name='email' id='example7-email' />\n\n        <label htmlFor='example7-phone'>Telephone:</label>\n        <FormGuard watches='phone' validatesWith={validators.phone} >\n                  Please enter a valid phone number\n        </FormGuard>\n        <input type='tel' name='phone' id='example7-phone' />\n\n      </fieldset>\n    </fieldset>\n    \n    <label htmlFor='example7-comments'>Comments:</label>\n    <FormGuard watches='comments' validatesWith={validators.maxLength(80)} >\n              Maximum length (80 characters) exceeded\n    </FormGuard>\n    <textarea name='comments' id='example7-comments' />\n\n    <input type='submit' value='Check the console for onSubmit' />\n  </ValidatedForm>\n            ")),l.a.createElement("div",{className:"example-implementation"},l.a.createElement(P,null))),l.a.createElement("hr",null),l.a.createElement("div",{id:"benchmark",className:"example"},l.a.createElement("div",{className:"example-code"},l.a.createElement("h2",null,"Large Forms"),l.a.createElement("a",{href:"https://github.com/NuclearHorseStudios/react-formguards/blob/master/example/src/examples/example-benchmark.jsx"},"Source"),"  -  ",l.a.createElement("a",{href:"#top"},"Back to top"),l.a.createElement("p",null,"react-formguards handles large forms as well.  Here is a contrived exmaple with 200, individually validated, input boxes."),l.a.createElement("pre",null,"\n    <ValidatedForm onSubmit={(e, formVals) => console.log(formVals)}>\n\n    {[...Array(200).keys()].map(idx =>\n      <div key={idx}>\n        <label htmlFor={`example2-input-${idx}`}>Label {idx}:</label>\n        <FormGuard watches={`input-${idx}`} validatesWith={validators.required} >\n              Value is Required\n        </FormGuard>\n        <input type='text' name={`input-${idx}`} id={`example6-input-${idx}`} />\n      </div>\n    )}\n    <input type='submit' value='Check the console for onSubmit' />\n  </ValidatedForm>\n            ")),l.a.createElement("div",{className:"example-implementation"},l.a.createElement("details",null,l.a.createElement("summary",null,"Click to see example.  "),l.a.createElement("div",null,l.a.createElement(C,null)))))))};m.a.render(l.a.createElement(M,null),document.getElementById("root"))},5:function(e,a,t){e.exports=t(11)}},[[5,1,2]]]);
//# sourceMappingURL=main.9a1bbbc1.chunk.js.map