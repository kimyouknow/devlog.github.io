(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[691],{7091:function(r){"use strict";var t="%[a-f0-9]{2}",e=new RegExp(t,"gi"),n=new RegExp("("+t+")+","gi");function o(r,t){try{return decodeURIComponent(r.join(""))}catch(a){}if(1===r.length)return r;t=t||1;var e=r.slice(0,t),n=r.slice(t);return Array.prototype.concat.call([],o(e),o(n))}function a(r){try{return decodeURIComponent(r)}catch(a){for(var t=r.match(e),n=1;n<t.length;n++)t=(r=o(t,n).join("")).match(e);return r}}r.exports=function(r){if("string"!=typeof r)throw new TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof r+"`");try{return r=r.replace(/\+/g," "),decodeURIComponent(r)}catch(t){return function(r){for(var e={"%FE%FF":"��","%FF%FE":"��"},o=n.exec(r);o;){try{e[o[0]]=decodeURIComponent(o[0])}catch(t){var i=a(o[0]);i!==o[0]&&(e[o[0]]=i)}o=n.exec(r)}e["%C2"]="�";for(var c=Object.keys(e),u=0;u<c.length;u++){var l=c[u];r=r.replace(new RegExp(l,"g"),e[l])}return r}(r)}}},8616:function(r){"use strict";r.exports=function(r,t){for(var e={},n=Object.keys(r),o=Array.isArray(t),a=0;a<n.length;a++){var i=n[a],c=r[i];(o?-1!==t.indexOf(i):t(i,c,r))&&(e[i]=c)}return e}},2203:function(r,t,e){"use strict";var n=e(8416),o=e(7424),a=e(861);function i(r,t){var e="undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(!e){if(Array.isArray(r)||(e=function(r,t){if(!r)return;if("string"==typeof r)return c(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);"Object"===e&&r.constructor&&(e=r.constructor.name);if("Map"===e||"Set"===e)return Array.from(r);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return c(r,t)}(r))||t&&r&&"number"==typeof r.length){e&&(r=e);var n=0,o=function(){};return{s:o,n:function(){return n>=r.length?{done:!0}:{done:!1,value:r[n++]}},e:function(r){throw r},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,u=!1;return{s:function(){e=e.call(r)},n:function(){var r=e.next();return i=r.done,r},e:function(r){u=!0,a=r},f:function(){try{i||null==e.return||e.return()}finally{if(u)throw a}}}}function c(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n}var u=e(8936),l=e(7091),s=e(4734),p=e(8616),f=Symbol("encodeFragmentIdentifier");function d(r){if("string"!=typeof r||1!==r.length)throw new TypeError("arrayFormatSeparator must be single character string")}function y(r,t){return t.encode?t.strict?u(r):encodeURIComponent(r):r}function g(r,t){return t.decode?l(r):r}function m(r){return Array.isArray(r)?r.sort():"object"==typeof r?m(Object.keys(r)).sort((function(r,t){return Number(r)-Number(t)})).map((function(t){return r[t]})):r}function x(r){var t=r.indexOf("#");return-1!==t&&(r=r.slice(0,t)),r}function v(r){var t=(r=x(r)).indexOf("?");return-1===t?"":r.slice(t+1)}function b(r,t){return t.parseNumbers&&!Number.isNaN(Number(r))&&"string"==typeof r&&""!==r.trim()?r=Number(r):!t.parseBooleans||null===r||"true"!==r.toLowerCase()&&"false"!==r.toLowerCase()||(r="true"===r.toLowerCase()),r}function h(r,t){d((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);var e=function(r){var t;switch(r.arrayFormat){case"index":return function(r,e,n){t=/\[(\d*)\]$/.exec(r),r=r.replace(/\[\d*\]$/,""),t?(void 0===n[r]&&(n[r]={}),n[r][t[1]]=e):n[r]=e};case"bracket":return function(r,e,n){t=/(\[\])$/.exec(r),r=r.replace(/\[\]$/,""),t?void 0!==n[r]?n[r]=[].concat(n[r],e):n[r]=[e]:n[r]=e};case"colon-list-separator":return function(r,e,n){t=/(:list)$/.exec(r),r=r.replace(/:list$/,""),t?void 0!==n[r]?n[r]=[].concat(n[r],e):n[r]=[e]:n[r]=e};case"comma":case"separator":return function(t,e,n){var o="string"==typeof e&&e.includes(r.arrayFormatSeparator),a="string"==typeof e&&!o&&g(e,r).includes(r.arrayFormatSeparator);e=a?g(e,r):e;var i=o||a?e.split(r.arrayFormatSeparator).map((function(t){return g(t,r)})):null===e?e:g(e,r);n[t]=i};case"bracket-separator":return function(t,e,n){var o=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),o){var a=null===e?[]:e.split(r.arrayFormatSeparator).map((function(t){return g(t,r)}));void 0!==n[t]?n[t]=[].concat(n[t],a):n[t]=a}else n[t]=e?g(e,r):e};default:return function(r,t,e){void 0!==e[r]?e[r]=[].concat(e[r],t):e[r]=t}}}(t),n=Object.create(null);if("string"!=typeof r)return n;if(!(r=r.trim().replace(/^[?#&]/,"")))return n;var a,c=i(r.split("&"));try{for(c.s();!(a=c.n()).done;){var u=a.value;if(""!==u){var l=s(t.decode?u.replace(/\+/g," "):u,"="),p=o(l,2),f=p[0],y=p[1];y=void 0===y?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?y:g(y,t),e(g(f,t),y,n)}}}catch(A){c.e(A)}finally{c.f()}for(var x=0,v=Object.keys(n);x<v.length;x++){var h=v[x],k=n[h];if("object"==typeof k&&null!==k)for(var w=0,j=Object.keys(k);w<j.length;w++){var Z=j[w];k[Z]=b(k[Z],t)}else n[h]=b(k,t)}return!1===t.sort?n:(!0===t.sort?Object.keys(n).sort():Object.keys(n).sort(t.sort)).reduce((function(r,t){var e=n[t];return Boolean(e)&&"object"==typeof e&&!Array.isArray(e)?r[t]=m(e):r[t]=e,r}),Object.create(null))}t.extract=v,t.parse=h,t.stringify=function(r,t){if(!r)return"";d((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);for(var e=function(e){return t.skipNull&&null==r[e]||t.skipEmptyString&&""===r[e]},n=function(r){switch(r.arrayFormat){case"index":return function(t){return function(e,n){var o=e.length;return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[[y(t,r),"[",o,"]"].join("")]:[[y(t,r),"[",y(o,r),"]=",y(n,r)].join("")])}};case"bracket":return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[[y(t,r),"[]"].join("")]:[[y(t,r),"[]=",y(n,r)].join("")])}};case"colon-list-separator":return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[[y(t,r),":list="].join("")]:[[y(t,r),":list=",y(n,r)].join("")])}};case"comma":case"separator":case"bracket-separator":var t="bracket-separator"===r.arrayFormat?"[]=":"=";return function(e){return function(n,o){return void 0===o||r.skipNull&&null===o||r.skipEmptyString&&""===o?n:(o=null===o?"":o,0===n.length?[[y(e,r),t,y(o,r)].join("")]:[[n,y(o,r)].join(r.arrayFormatSeparator)])}};default:return function(t){return function(e,n){return void 0===n||r.skipNull&&null===n||r.skipEmptyString&&""===n?e:[].concat(a(e),null===n?[y(t,r)]:[[y(t,r),"=",y(n,r)].join("")])}}}}(t),o={},i=0,c=Object.keys(r);i<c.length;i++){var u=c[i];e(u)||(o[u]=r[u])}var l=Object.keys(o);return!1!==t.sort&&l.sort(t.sort),l.map((function(e){var o=r[e];return void 0===o?"":null===o?y(e,t):Array.isArray(o)?0===o.length&&"bracket-separator"===t.arrayFormat?y(e,t)+"[]":o.reduce(n(e),[]).join("&"):y(e,t)+"="+y(o,t)})).filter((function(r){return r.length>0})).join("&")},t.parseUrl=function(r,t){t=Object.assign({decode:!0},t);var e=s(r,"#"),n=o(e,2),a=n[0],i=n[1];return Object.assign({url:a.split("?")[0]||"",query:h(v(r),t)},t&&t.parseFragmentIdentifier&&i?{fragmentIdentifier:g(i,t)}:{})},t.stringifyUrl=function(r,e){e=Object.assign(n({encode:!0,strict:!0},f,!0),e);var o=x(r.url).split("?")[0]||"",a=t.extract(r.url),i=t.parse(a,{sort:!1}),c=Object.assign(i,r.query),u=t.stringify(c,e);u&&(u="?".concat(u));var l=function(r){var t="",e=r.indexOf("#");return-1!==e&&(t=r.slice(e)),t}(r.url);return r.fragmentIdentifier&&(l="#".concat(e[f]?y(r.fragmentIdentifier,e):r.fragmentIdentifier)),"".concat(o).concat(u).concat(l)},t.pick=function(r,e,o){o=Object.assign(n({parseFragmentIdentifier:!0},f,!1),o);var a=t.parseUrl(r,o),i=a.url,c=a.query,u=a.fragmentIdentifier;return t.stringifyUrl({url:i,query:p(c,e),fragmentIdentifier:u},o)},t.exclude=function(r,e,n){var o=Array.isArray(e)?function(r){return!e.includes(r)}:function(r,t){return!e(r,t)};return t.pick(r,o,n)}},4734:function(r){"use strict";r.exports=function(r,t){if("string"!=typeof r||"string"!=typeof t)throw new TypeError("Expected the arguments to be of type `string`");if(""===t)return[r];var e=r.indexOf(t);return-1===e?[r]:[r.slice(0,e),r.slice(e+t.length)]}},8936:function(r){"use strict";r.exports=function(r){return encodeURIComponent(r).replace(/[!'()*]/g,(function(r){return"%".concat(r.charCodeAt(0).toString(16).toUpperCase())}))}},8223:function(r,t,e){"use strict";e.r(t),e.d(t,{default:function(){return E}});var n=e(2203),o=e(7294),a=e(1523),i=e(3366),c=e(1008),u=e(1597),l=e(3431),s=["active"];var p=(0,c.Z)("div",{target:"ejv2fjz3"})({name:"1joj16v",styles:"width:768px;padding:1rem;margin:0 auto;color:var(--color-heading-text);background-color:var(--color-background-secondary);box-shadow:rgba(0, 0, 0, 0.08) 0px 0px 15px;border:2px solid var(--color-table-border);border-radius:12px"}),f=(0,c.Z)("div",{target:"ejv2fjz2"})({name:"5kov97",styles:"display:flex;flex-wrap:wrap"}),d=(0,c.Z)((function(r){r.active;var t=(0,i.Z)(r,s);return(0,l.tZ)(u.Link,t)}),{target:"ejv2fjz1"})("cursor:pointer;margin-right:12px;border-radius:8px;padding:0 6px;",(function(r){return r.theme.typography.linkSmall})," color:var(--color-text);background-color:var(--color-category-chip);border:2px solid ",(function(r){return r.active?"var(--color-text);":"var(--color-background)"}),";&:hover{color:var(--color-primary);border:2px solid var(--color-primary);}&:last-of-type{margin-right:0;}"),y=(0,c.Z)(d,{target:"ejv2fjz0"})((function(r){return r.theme.typography.linkMedium}),";"),g=["All"],m=function(r){var t=r.selectedCategory,e=r.categoryList,n=e.All,o=(0,i.Z)(e,g);return(0,l.tZ)(f,null,(0,l.tZ)(y,{to:"/?category=All",active:"All"===t},"전체 ",n,"개의 포스팅"),Object.entries(o).map((function(r){var e=r[0],n=r[1];return(0,l.tZ)(d,{key:e,to:"/#category="+e,active:e===t},"#",e,"(",n,")")})))},x=function(r){var t=r.selectedCategory,e=r.categoryList;return(0,l.tZ)(p,null,(0,l.tZ)(a.Z,null),(0,l.tZ)(m,{selectedCategory:t,categoryList:e}))},v=e(7462);var b=(0,c.Z)("div",{target:"e1lpcx997"})({name:"e3n5gc",styles:"width:768px;margin:0 auto;padding:50px 0 100px;display:flex;flex-direction:column;gap:20px;@media (max-width: 768px){width:100%;padding:50px 20px;}"}),h=(0,c.Z)(u.Link,{target:"e1lpcx996"})({name:"off0pw",styles:"display:flex;flex-direction:column;border-radius:10px;box-shadow:0 0 8px rgba(0, 0, 0, 0.15);transition:0.3s box-shadow;cursor:pointer;background-color:var(--color-background-secondary);&:hover{box-shadow:0 0 10px rgba(0, 0, 0, 0.3);}"}),k=(0,c.Z)("div",{target:"e1lpcx995"})({name:"1do7u82",styles:"flex:1;display:flex;flex-direction:column;padding:15px"}),w=(0,c.Z)("h2",{target:"e1lpcx994"})("overflow:hidden;margin-bottom:3px;text-overflow:ellipsis;white-space:normal;overflow-wrap:break-word;",(function(r){return r.theme.typography.linkLarge}),";"),j=(0,c.Z)("span",{target:"e1lpcx993"})((function(r){return r.theme.typography.textSmall})," color:var(--color-text);line-height:16px;"),Z=(0,c.Z)("div",{target:"e1lpcx992"})({name:"1bobky6",styles:"display:flex;flex-wrap:wrap;margin-top:10px;margin:10px -5px"}),A=(0,c.Z)("div",{target:"e1lpcx991"})("margin:2.5px 5px;padding:6px 12px;border-radius:8px;",(function(r){return r.theme.typography.textSmall})," line-height:18px;background-color:var(--color-category-chip);color:var(--color-text);"),S=(0,c.Z)("p",{target:"e1lpcx990"})("display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow-wrap:break-word;overflow:hidden;text-overflow:ellipsis;white-space:normal;color:var(--color-paragraph);",(function(r){return r.theme.typography.textSmall}),";"),O=function(r){var t=r.title,e=r.date,n=r.categories,o=r.summary,a=r.link;return(0,l.tZ)(h,{to:a},(0,l.tZ)(k,null,(0,l.tZ)(w,null,t),(0,l.tZ)(j,null,e),(0,l.tZ)(Z,null,n.map((function(r){return(0,l.tZ)(A,{key:r},r)}))),(0,l.tZ)(S,null,o)))},F=function(r){var t=r.selectedCategory,e=r.posts,n=(0,o.useMemo)((function(){return e.filter((function(r){var e=r.node.frontmatter.categories;return"All"===t||e.includes(t)}))}),[t]);return(0,l.tZ)(b,null,n.map((function(r){var t=r.node,e=t.id,n=t.fields.slug,o=t.frontmatter;return(0,l.tZ)(O,(0,v.Z)({},o,{link:n,key:e}))})))},_=e(7913),I=e(2401),C=e(1251),E=function(r){var t=r.location.hash,e=r.data.allMarkdownRemark.edges,a=(0,I.$)(),i=a.author,c=a.title,u=a.siteUrl,s=a.description,p=a.image,f=a.keywords,d=a.favicon,y=a.seo,g=n.parse(t),m="string"==typeof g.category&&g.category?g.category:"All",v=(0,o.useMemo)((function(){return e.reduce((function(r,t){return t.node.frontmatter.categories.forEach((function(t){void 0===r[t]?r[t]=1:r[t]++})),r.All++,r}),{All:0})}),[]);return(0,l.tZ)(C.Z,null,(0,l.tZ)(_.Z,{author:i,siteUrl:u,title:c,description:s,image:p,keywords:f,favicon:d,seo:y}),(0,l.tZ)(x,{selectedCategory:m,categoryList:v}),(0,l.tZ)(F,{selectedCategory:m,posts:e}))}},3897:function(r){r.exports=function(r,t){(null==t||t>r.length)&&(t=r.length);for(var e=0,n=new Array(t);e<t;e++)n[e]=r[e];return n},r.exports.__esModule=!0,r.exports.default=r.exports},5372:function(r){r.exports=function(r){if(Array.isArray(r))return r},r.exports.__esModule=!0,r.exports.default=r.exports},3405:function(r,t,e){var n=e(3897);r.exports=function(r){if(Array.isArray(r))return n(r)},r.exports.__esModule=!0,r.exports.default=r.exports},8416:function(r){r.exports=function(r,t,e){return t in r?Object.defineProperty(r,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):r[t]=e,r},r.exports.__esModule=!0,r.exports.default=r.exports},9498:function(r){r.exports=function(r){if("undefined"!=typeof Symbol&&null!=r[Symbol.iterator]||null!=r["@@iterator"])return Array.from(r)},r.exports.__esModule=!0,r.exports.default=r.exports},8872:function(r){r.exports=function(r,t){var e=null==r?null:"undefined"!=typeof Symbol&&r[Symbol.iterator]||r["@@iterator"];if(null!=e){var n,o,a=[],i=!0,c=!1;try{for(e=e.call(r);!(i=(n=e.next()).done)&&(a.push(n.value),!t||a.length!==t);i=!0);}catch(u){c=!0,o=u}finally{try{i||null==e.return||e.return()}finally{if(c)throw o}}return a}},r.exports.__esModule=!0,r.exports.default=r.exports},2218:function(r){r.exports=function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},r.exports.__esModule=!0,r.exports.default=r.exports},2281:function(r){r.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")},r.exports.__esModule=!0,r.exports.default=r.exports},7424:function(r,t,e){var n=e(5372),o=e(8872),a=e(6116),i=e(2218);r.exports=function(r,t){return n(r)||o(r,t)||a(r,t)||i()},r.exports.__esModule=!0,r.exports.default=r.exports},861:function(r,t,e){var n=e(3405),o=e(9498),a=e(6116),i=e(2281);r.exports=function(r){return n(r)||o(r)||a(r)||i()},r.exports.__esModule=!0,r.exports.default=r.exports},6116:function(r,t,e){var n=e(3897);r.exports=function(r,t){if(r){if("string"==typeof r)return n(r,t);var e=Object.prototype.toString.call(r).slice(8,-1);return"Object"===e&&r.constructor&&(e=r.constructor.name),"Map"===e||"Set"===e?Array.from(r):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?n(r,t):void 0}},r.exports.__esModule=!0,r.exports.default=r.exports}}]);
//# sourceMappingURL=component---src-pages-index-tsx-95dbe3d7fba2008551f7.js.map