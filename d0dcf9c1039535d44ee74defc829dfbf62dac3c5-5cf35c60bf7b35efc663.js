(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[640],{8778:function(e){"use strict";var t=function(e,t){if("string"!=typeof e&&!Array.isArray(e))throw new TypeError("Expected the input to be `string | string[]`");t=Object.assign({pascalCase:!1},t);var r;return e=Array.isArray(e)?e.map((function(e){return e.trim()})).filter((function(e){return e.length})).join("-"):e.trim(),0===e.length?"":1===e.length?t.pascalCase?e.toUpperCase():e.toLowerCase():(e!==e.toLowerCase()&&(e=function(e){for(var t=!1,r=!1,n=!1,i=0;i<e.length;i++){var a=e[i];t&&/[a-zA-Z]/.test(a)&&a.toUpperCase()===a?(e=e.slice(0,i)+"-"+e.slice(i),t=!1,n=r,r=!0,i++):r&&n&&/[a-zA-Z]/.test(a)&&a.toLowerCase()===a?(e=e.slice(0,i-1)+"-"+e.slice(i-1),n=r,r=!1,t=!0):(t=a.toLowerCase()===a&&a.toUpperCase()!==a,n=r,r=a.toUpperCase()===a&&a.toLowerCase()!==a)}return e}(e)),e=e.replace(/^[_.\- ]+/,"").toLowerCase().replace(/[_.\- ]+(\w|$)/g,(function(e,t){return t.toUpperCase()})).replace(/\d+(\w|$)/g,(function(e){return e.toUpperCase()})),r=e,t.pascalCase?r.charAt(0).toUpperCase()+r.slice(1):r)};e.exports=t,e.exports.default=t},6494:function(e){"use strict";e.exports=Object.assign},2993:function(e){var t="undefined"!=typeof Element,r="function"==typeof Map,n="function"==typeof Set,i="function"==typeof ArrayBuffer&&!!ArrayBuffer.isView;function a(e,o){if(e===o)return!0;if(e&&o&&"object"==typeof e&&"object"==typeof o){if(e.constructor!==o.constructor)return!1;var s,c,u,l;if(Array.isArray(e)){if((s=e.length)!=o.length)return!1;for(c=s;0!=c--;)if(!a(e[c],o[c]))return!1;return!0}if(r&&e instanceof Map&&o instanceof Map){if(e.size!==o.size)return!1;for(l=e.entries();!(c=l.next()).done;)if(!o.has(c.value[0]))return!1;for(l=e.entries();!(c=l.next()).done;)if(!a(c.value[1],o.get(c.value[0])))return!1;return!0}if(n&&e instanceof Set&&o instanceof Set){if(e.size!==o.size)return!1;for(l=e.entries();!(c=l.next()).done;)if(!o.has(c.value[0]))return!1;return!0}if(i&&ArrayBuffer.isView(e)&&ArrayBuffer.isView(o)){if((s=e.length)!=o.length)return!1;for(c=s;0!=c--;)if(e[c]!==o[c])return!1;return!0}if(e.constructor===RegExp)return e.source===o.source&&e.flags===o.flags;if(e.valueOf!==Object.prototype.valueOf)return e.valueOf()===o.valueOf();if(e.toString!==Object.prototype.toString)return e.toString()===o.toString();if((s=(u=Object.keys(e)).length)!==Object.keys(o).length)return!1;for(c=s;0!=c--;)if(!Object.prototype.hasOwnProperty.call(o,u[c]))return!1;if(t&&e instanceof Element)return!1;for(c=s;0!=c--;)if(("_owner"!==u[c]&&"__v"!==u[c]&&"__o"!==u[c]||!e.$$typeof)&&!a(e[u[c]],o[u[c]]))return!1;return!0}return e!=e&&o!=o}e.exports=function(e,t){try{return a(e,t)}catch(r){if((r.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw r}}},4839:function(e,t,r){"use strict";var n,i=r(7294),a=(n=i)&&"object"==typeof n&&"default"in n?n.default:n;function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}var s=!("undefined"==typeof window||!window.document||!window.document.createElement);e.exports=function(e,t,r){if("function"!=typeof e)throw new Error("Expected reducePropsToState to be a function.");if("function"!=typeof t)throw new Error("Expected handleStateChangeOnClient to be a function.");if(void 0!==r&&"function"!=typeof r)throw new Error("Expected mapStateOnServer to either be undefined or a function.");return function(n){if("function"!=typeof n)throw new Error("Expected WrappedComponent to be a React component.");var c,u=[];function l(){c=e(u.map((function(e){return e.props}))),f.canUseDOM?t(c):r&&(c=r(c))}var f=function(e){var t,r;function i(){return e.apply(this,arguments)||this}r=e,(t=i).prototype=Object.create(r.prototype),t.prototype.constructor=t,t.__proto__=r,i.peek=function(){return c},i.rewind=function(){if(i.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var e=c;return c=void 0,u=[],e};var o=i.prototype;return o.UNSAFE_componentWillMount=function(){u.push(this),l()},o.componentDidUpdate=function(){l()},o.componentWillUnmount=function(){var e=u.indexOf(this);u.splice(e,1),l()},o.render=function(){return a.createElement(n,this.props)},i}(i.PureComponent);return o(f,"displayName","SideEffect("+function(e){return e.displayName||e.name||"Component"}(n)+")"),o(f,"canUseDOM",s),f}}},6296:function(e,t,r){"use strict";r.d(t,{G:function(){return j},L:function(){return m},M:function(){return T},P:function(){return w},_:function(){return s},a:function(){return o},b:function(){return u},g:function(){return l},h:function(){return c}});var n=r(7294),i=(r(8778),r(5697)),a=r.n(i);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o.apply(this,arguments)}function s(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)t.indexOf(r=a[n])>=0||(i[r]=e[r]);return i}var c=function(){return"undefined"!=typeof HTMLImageElement&&"loading"in HTMLImageElement.prototype};function u(e,t,r,n,i){return void 0===i&&(i={}),o({},r,{loading:n,shouldLoad:e,"data-main-image":"",style:o({},i,{opacity:t?1:0})})}function l(e,t,r,n,i,a,s,c){var u={};a&&(u.backgroundColor=a,"fixed"===r?(u.width=n,u.height=i,u.backgroundColor=a,u.position="relative"):("constrained"===r||"fullWidth"===r)&&(u.position="absolute",u.top=0,u.left=0,u.bottom=0,u.right=0)),s&&(u.objectFit=s),c&&(u.objectPosition=c);var l=o({},e,{"aria-hidden":!0,"data-placeholder-image":"",style:o({opacity:t?0:1,transition:"opacity 500ms linear"},u)});return l}var f,d=["children"],p=function(e){var t=e.layout,r=e.width,i=e.height;return"fullWidth"===t?n.createElement("div",{"aria-hidden":!0,style:{paddingTop:i/r*100+"%"}}):"constrained"===t?n.createElement("div",{style:{maxWidth:r,display:"block"}},n.createElement("img",{alt:"",role:"presentation","aria-hidden":"true",src:"data:image/svg+xml;charset=utf-8,%3Csvg height='"+i+"' width='"+r+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E",style:{maxWidth:"100%",display:"block",position:"static"}})):null},m=function(e){var t=e.children,r=s(e,d);return n.createElement(n.Fragment,null,n.createElement(p,o({},r)),t,null)},g=["src","srcSet","loading","alt","shouldLoad"],h=["fallback","sources","shouldLoad"],y=function(e){var t=e.src,r=e.srcSet,i=e.loading,a=e.alt,c=void 0===a?"":a,u=e.shouldLoad,l=s(e,g);return n.createElement("img",o({},l,{decoding:"async",loading:i,src:u?t:void 0,"data-src":u?void 0:t,srcSet:u?r:void 0,"data-srcset":u?void 0:r,alt:c}))},v=function(e){var t=e.fallback,r=e.sources,i=void 0===r?[]:r,a=e.shouldLoad,c=void 0===a||a,u=s(e,h),l=u.sizes||(null==t?void 0:t.sizes),f=n.createElement(y,o({},u,t,{sizes:l,shouldLoad:c}));return i.length?n.createElement("picture",null,i.map((function(e){var t=e.media,r=e.srcSet,i=e.type;return n.createElement("source",{key:t+"-"+i+"-"+r,type:i,media:t,srcSet:c?r:void 0,"data-srcset":c?void 0:r,sizes:l})})),f):f};y.propTypes={src:i.string.isRequired,alt:i.string.isRequired,sizes:i.string,srcSet:i.string,shouldLoad:i.bool},v.displayName="Picture",v.propTypes={alt:i.string.isRequired,shouldLoad:i.bool,fallback:i.exact({src:i.string.isRequired,srcSet:i.string,sizes:i.string}),sources:i.arrayOf(i.oneOfType([i.exact({media:i.string.isRequired,type:i.string,sizes:i.string,srcSet:i.string.isRequired}),i.exact({media:i.string,type:i.string.isRequired,sizes:i.string,srcSet:i.string.isRequired})]))};var b=["fallback"],w=function(e){var t=e.fallback,r=s(e,b);return t?n.createElement(v,o({},r,{fallback:{src:t},"aria-hidden":!0,alt:""})):n.createElement("div",o({},r))};w.displayName="Placeholder",w.propTypes={fallback:i.string,sources:null==(f=v.propTypes)?void 0:f.sources,alt:function(e,t,r){return e[t]?new Error("Invalid prop `"+t+"` supplied to `"+r+"`. Validation failed."):null}};var T=function(e){return n.createElement(n.Fragment,null,n.createElement(v,o({},e)),n.createElement("noscript",null,n.createElement(v,o({},e,{shouldLoad:!0}))))};T.displayName="MainImage",T.propTypes=v.propTypes;var C,E,O=function(e,t,r){for(var n=arguments.length,i=new Array(n>3?n-3:0),o=3;o<n;o++)i[o-3]=arguments[o];return e.alt||""===e.alt?a().string.apply(a(),[e,t,r].concat(i)):new Error('The "alt" prop is required in '+r+'. If the image is purely presentational then pass an empty string: e.g. alt="". Learn more: https://a11y-style-guide.com/style-guide/section-media.html')},A={image:a().object.isRequired,alt:O},S=["as","image","style","backgroundColor","className","class","onStartLoad","onLoad","onError"],x=["style","className"],k=new Set,L=function(e){var t=e.as,i=void 0===t?"div":t,a=e.image,u=e.style,l=e.backgroundColor,f=e.className,d=e.class,p=e.onStartLoad,m=e.onLoad,g=e.onError,h=s(e,S),y=a.width,v=a.height,b=a.layout,w=function(e,t,r){var n={},i="gatsby-image-wrapper";return"fixed"===r?(n.width=e,n.height=t):"constrained"===r&&(i="gatsby-image-wrapper gatsby-image-wrapper-constrained"),{className:i,"data-gatsby-image-wrapper":"",style:n}}(y,v,b),T=w.style,O=w.className,A=s(w,x),L=(0,n.useRef)(),j=(0,n.useMemo)((function(){return JSON.stringify(a.images)}),[a.images]);d&&(f=d);var Z=function(e,t,r){var n="";return"fullWidth"===e&&(n='<div aria-hidden="true" style="padding-top: '+r/t*100+'%;"></div>'),"constrained"===e&&(n='<div style="max-width: '+t+'px; display: block;"><img alt="" role="presentation" aria-hidden="true" src="data:image/svg+xml;charset=utf-8,%3Csvg height=\''+r+"' width='"+t+"' xmlns='http://www.w3.org/2000/svg' version='1.1'%3E%3C/svg%3E\" style=\"max-width: 100%; display: block; position: static;\"></div>"),n}(b,y,v);return(0,n.useEffect)((function(){C||(C=Promise.all([r.e(774),r.e(989)]).then(r.bind(r,5989)).then((function(e){var t=e.renderImageToString,r=e.swapPlaceholderImage;return E=t,{renderImageToString:t,swapPlaceholderImage:r}})));var e,t,n=L.current.querySelector("[data-gatsby-image-ssr]");return n&&c()?(n.complete?(null==p||p({wasCached:!0}),null==m||m({wasCached:!0}),setTimeout((function(){n.removeAttribute("data-gatsby-image-ssr")}),0)):document.addEventListener("load",(function e(){document.removeEventListener("load",e),null==p||p({wasCached:!0}),null==m||m({wasCached:!0}),setTimeout((function(){n.removeAttribute("data-gatsby-image-ssr")}),0)})),void k.add(j)):E&&k.has(j)?void 0:(C.then((function(r){var n=r.renderImageToString,i=r.swapPlaceholderImage;L.current&&(L.current.innerHTML=n(o({isLoading:!0,isLoaded:k.has(j),image:a},h)),k.has(j)||(e=requestAnimationFrame((function(){L.current&&(t=i(L.current,j,k,u,p,m,g))}))))})),function(){e&&cancelAnimationFrame(e),t&&t()})}),[a]),(0,n.useLayoutEffect)((function(){k.has(j)&&E&&(L.current.innerHTML=E(o({isLoading:k.has(j),isLoaded:k.has(j),image:a},h)),null==p||p({wasCached:!0}),null==m||m({wasCached:!0}))}),[a]),(0,n.createElement)(i,o({},A,{style:o({},T,u,{backgroundColor:l}),className:O+(f?" "+f:""),ref:L,dangerouslySetInnerHTML:{__html:Z},suppressHydrationWarning:!0}))},j=(0,n.memo)((function(e){return e.image?(0,n.createElement)(L,e):null}));j.propTypes=A,j.displayName="GatsbyImage";var Z,I=["src","__imageData","__error","width","height","aspectRatio","tracedSVGOptions","placeholder","formats","quality","transformOptions","jpgOptions","pngOptions","webpOptions","avifOptions","blurredOptions","breakpoints","outputPixelDensities"],P=function(e,t){for(var r=arguments.length,n=new Array(r>2?r-2:0),i=2;i<r;i++)n[i-2]=arguments[i];return"fullWidth"!==e.layout||"width"!==t&&"height"!==t||!e[t]?a().number.apply(a(),[e,t].concat(n)):new Error('"'+t+'" '+e[t]+" may not be passed when layout is fullWidth.")},_=new Set(["fixed","fullWidth","constrained"]),M={src:a().string.isRequired,alt:O,width:P,height:P,sizes:a().string,layout:function(e){if(void 0!==e.layout&&!_.has(e.layout))return new Error("Invalid value "+e.layout+'" provided for prop "layout". Defaulting to "constrained". Valid values are "fixed", "fullWidth" or "constrained".')}},N=(Z=j,function(e){var t=e.src,r=e.__imageData,i=e.__error,a=s(e,I);return i&&console.warn(i),r?n.createElement(Z,o({image:r},a)):(console.warn("Image not loaded",t),null)});N.displayName="StaticImage",N.propTypes=M},1523:function(e,t,r){"use strict";r.d(t,{Z:function(){return A}});var n=r(3201),i=r(1521),a=r(7462),o=r(3366),s=r(1008),c=r(1597),u=r(6296),l=r(7294),f=r(3431),d=["src","size","isCircle"],p=["isCircle"],m={s:"var(--icon-medium)",m:"var(--icon-large)",l:"var(--icon-xLarge)"},g=(0,s.Z)((function(e){e.isCircle;var t=(0,o.Z)(e,p);return(0,f.tZ)(u.G,t)}),{target:"e1f3d8fl0"})("width:",(function(e){var t=e.size;return t&&m[t]}),";height:",(function(e){var t=e.size;return t&&m[t]}),";border-radius:",(function(e){return e.isCircle&&"50%"}),";&.gatsby-image-wrapper{z-index:0;min-width:",(function(e){var t=e.size;return t&&m[t]}),";}"),h=function(e){var t=e.src,r=e.size,n=void 0===r?"m":r,i=e.isCircle,s=void 0!==i&&i,u=(0,o.Z)(e,d),p=(0,c.useStaticQuery)(y),m=(0,l.useMemo)((function(){return p.images.edges.find((function(e){var r=e.node;return t===r.relativePath}))}),[p,t]);if(!m)return null;var h=m.node,v=h.childImageSharp,b=h.publicURL;return(0,f.tZ)(g,(0,a.Z)({size:n,isCircle:s,image:v.gatsbyImageData,alt:b},u))},y="4267943715",v=r(9549),b=r(9229);var w=(0,s.Z)("div",{target:"ef2d6sn4"})({name:"5413mk",styles:"display:flex;gap:12px;margin-bottom:12px;align-items:flex-start"}),T=(0,s.Z)("div",{target:"ef2d6sn3"})({name:"tw4sx",styles:"display:flex;flex-direction:column;gap:12px"}),C=(0,s.Z)("h3",{target:"ef2d6sn2"})(""),E=(0,s.Z)("div",{target:"ef2d6sn1"})((function(e){return e.theme.typography.textBase})," line-height:1.4;"),O=(0,s.Z)("ul",{target:"ef2d6sn0"})({name:"71m0pa",styles:"display:flex;gap:8px;a{color:var(--color-text);display:flex;align-items:center;gap:4px;:hover{color:var(--color-primary);}}a>svg{width:var(--icon-small);height:var(--icon-small);}"}),A=function(){var e=(0,v.Z)(),t=e.social,r=e.author,a=e.description;return(0,f.tZ)(w,null,(0,f.tZ)(h,{src:"profile-image.png",isCircle:!0,size:"l"}),(0,f.tZ)(T,null,(0,f.tZ)(C,null,r),(0,f.tZ)(E,null,a),(0,f.tZ)(O,null,(0,f.tZ)("li",null,(0,f.tZ)("a",{onClick:function(){(0,b.k)(t.email)}},(0,f.tZ)(i.Zuw,null),"Mail")),(0,f.tZ)("li",null,(0,f.tZ)("a",{href:t.github,target:"_blank"},(0,f.tZ)(n.hJX,null),"Github")),(0,f.tZ)("li",null,(0,f.tZ)("a",{href:t.til,target:"_blank"},(0,f.tZ)(n.hJX,null),"TIL")))))}},7913:function(e,t,r){"use strict";r.d(t,{Z:function(){return ye}});var n,i,a,o,s=r(5697),c=r.n(s),u=r(4839),l=r.n(u),f=r(2993),d=r.n(f),p=r(7294),m=r(6494),g=r.n(m),h="bodyAttributes",y="htmlAttributes",v="titleAttributes",b={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"},w=(Object.keys(b).map((function(e){return b[e]})),"charset"),T="cssText",C="href",E="http-equiv",O="innerHTML",A="itemprop",S="name",x="property",k="rel",L="src",j="target",Z={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},I="defaultTitle",P="defer",_="encodeSpecialCharacters",M="onChangeClientState",N="titleTemplate",R=Object.keys(Z).reduce((function(e,t){return e[Z[t]]=t,e}),{}),q=[b.NOSCRIPT,b.SCRIPT,b.STYLE],z="data-react-helmet",H="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},D=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},U=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),F=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},B=function(e,t){var r={};for(var n in e)t.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(e,n)&&(r[n]=e[n]);return r},W=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t},Y=function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return!1===t?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},K=function(e){var t=X(e,b.TITLE),r=X(e,N);if(r&&t)return r.replace(/%s/g,(function(){return Array.isArray(t)?t.join(""):t}));var n=X(e,I);return t||n||void 0},V=function(e){return X(e,M)||function(){}},G=function(e,t){return t.filter((function(t){return void 0!==t[e]})).map((function(t){return t[e]})).reduce((function(e,t){return F({},e,t)}),{})},$=function(e,t){return t.filter((function(e){return void 0!==e[b.BASE]})).map((function(e){return e[b.BASE]})).reverse().reduce((function(t,r){if(!t.length)for(var n=Object.keys(r),i=0;i<n.length;i++){var a=n[i].toLowerCase();if(-1!==e.indexOf(a)&&r[a])return t.concat(r)}return t}),[])},J=function(e,t,r){var n={};return r.filter((function(t){return!!Array.isArray(t[e])||(void 0!==t[e]&&ne("Helmet: "+e+' should be of type "Array". Instead found type "'+H(t[e])+'"'),!1)})).map((function(t){return t[e]})).reverse().reduce((function(e,r){var i={};r.filter((function(e){for(var r=void 0,a=Object.keys(e),o=0;o<a.length;o++){var s=a[o],c=s.toLowerCase();-1===t.indexOf(c)||r===k&&"canonical"===e[r].toLowerCase()||c===k&&"stylesheet"===e[c].toLowerCase()||(r=c),-1===t.indexOf(s)||s!==O&&s!==T&&s!==A||(r=s)}if(!r||!e[r])return!1;var u=e[r].toLowerCase();return n[r]||(n[r]={}),i[r]||(i[r]={}),!n[r][u]&&(i[r][u]=!0,!0)})).reverse().forEach((function(t){return e.push(t)}));for(var a=Object.keys(i),o=0;o<a.length;o++){var s=a[o],c=g()({},n[s],i[s]);n[s]=c}return e}),[]).reverse()},X=function(e,t){for(var r=e.length-1;r>=0;r--){var n=e[r];if(n.hasOwnProperty(t))return n[t]}return null},Q=(n=Date.now(),function(e){var t=Date.now();t-n>16?(n=t,e(t)):setTimeout((function(){Q(e)}),0)}),ee=function(e){return clearTimeout(e)},te="undefined"!=typeof window?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||Q:r.g.requestAnimationFrame||Q,re="undefined"!=typeof window?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||ee:r.g.cancelAnimationFrame||ee,ne=function(e){return console&&"function"==typeof console.warn&&console.warn(e)},ie=null,ae=function(e,t){var r=e.baseTag,n=e.bodyAttributes,i=e.htmlAttributes,a=e.linkTags,o=e.metaTags,s=e.noscriptTags,c=e.onChangeClientState,u=e.scriptTags,l=e.styleTags,f=e.title,d=e.titleAttributes;ce(b.BODY,n),ce(b.HTML,i),se(f,d);var p={baseTag:ue(b.BASE,r),linkTags:ue(b.LINK,a),metaTags:ue(b.META,o),noscriptTags:ue(b.NOSCRIPT,s),scriptTags:ue(b.SCRIPT,u),styleTags:ue(b.STYLE,l)},m={},g={};Object.keys(p).forEach((function(e){var t=p[e],r=t.newTags,n=t.oldTags;r.length&&(m[e]=r),n.length&&(g[e]=p[e].oldTags)})),t&&t(),c(e,m,g)},oe=function(e){return Array.isArray(e)?e.join(""):e},se=function(e,t){void 0!==e&&document.title!==e&&(document.title=oe(e)),ce(b.TITLE,t)},ce=function(e,t){var r=document.getElementsByTagName(e)[0];if(r){for(var n=r.getAttribute(z),i=n?n.split(","):[],a=[].concat(i),o=Object.keys(t),s=0;s<o.length;s++){var c=o[s],u=t[c]||"";r.getAttribute(c)!==u&&r.setAttribute(c,u),-1===i.indexOf(c)&&i.push(c);var l=a.indexOf(c);-1!==l&&a.splice(l,1)}for(var f=a.length-1;f>=0;f--)r.removeAttribute(a[f]);i.length===a.length?r.removeAttribute(z):r.getAttribute(z)!==o.join(",")&&r.setAttribute(z,o.join(","))}},ue=function(e,t){var r=document.head||document.querySelector(b.HEAD),n=r.querySelectorAll(e+"["+"data-react-helmet]"),i=Array.prototype.slice.call(n),a=[],o=void 0;return t&&t.length&&t.forEach((function(t){var r=document.createElement(e);for(var n in t)if(t.hasOwnProperty(n))if(n===O)r.innerHTML=t.innerHTML;else if(n===T)r.styleSheet?r.styleSheet.cssText=t.cssText:r.appendChild(document.createTextNode(t.cssText));else{var s=void 0===t[n]?"":t[n];r.setAttribute(n,s)}r.setAttribute(z,"true"),i.some((function(e,t){return o=t,r.isEqualNode(e)}))?i.splice(o,1):a.push(r)})),i.forEach((function(e){return e.parentNode.removeChild(e)})),a.forEach((function(e){return r.appendChild(e)})),{oldTags:i,newTags:a}},le=function(e){return Object.keys(e).reduce((function(t,r){var n=void 0!==e[r]?r+'="'+e[r]+'"':""+r;return t?t+" "+n:n}),"")},fe=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[Z[r]||r]=e[r],t}),t)},de=function(e,t,r){switch(e){case b.TITLE:return{toComponent:function(){return e=t.title,r=t.titleAttributes,(n={key:e})[z]=!0,i=fe(r,n),[p.createElement(b.TITLE,i,e)];var e,r,n,i},toString:function(){return function(e,t,r,n){var i=le(r),a=oe(t);return i?"<"+e+' data-react-helmet="true" '+i+">"+Y(a,n)+"</"+e+">":"<"+e+' data-react-helmet="true">'+Y(a,n)+"</"+e+">"}(e,t.title,t.titleAttributes,r)}};case h:case y:return{toComponent:function(){return fe(t)},toString:function(){return le(t)}};default:return{toComponent:function(){return function(e,t){return t.map((function(t,r){var n,i=((n={key:r})[z]=!0,n);return Object.keys(t).forEach((function(e){var r=Z[e]||e;if(r===O||r===T){var n=t.innerHTML||t.cssText;i.dangerouslySetInnerHTML={__html:n}}else i[r]=t[e]})),p.createElement(e,i)}))}(e,t)},toString:function(){return function(e,t,r){return t.reduce((function(t,n){var i=Object.keys(n).filter((function(e){return!(e===O||e===T)})).reduce((function(e,t){var i=void 0===n[t]?t:t+'="'+Y(n[t],r)+'"';return e?e+" "+i:i}),""),a=n.innerHTML||n.cssText||"",o=-1===q.indexOf(e);return t+"<"+e+' data-react-helmet="true" '+i+(o?"/>":">"+a+"</"+e+">")}),"")}(e,t,r)}}}},pe=function(e){var t=e.baseTag,r=e.bodyAttributes,n=e.encode,i=e.htmlAttributes,a=e.linkTags,o=e.metaTags,s=e.noscriptTags,c=e.scriptTags,u=e.styleTags,l=e.title,f=void 0===l?"":l,d=e.titleAttributes;return{base:de(b.BASE,t,n),bodyAttributes:de(h,r,n),htmlAttributes:de(y,i,n),link:de(b.LINK,a,n),meta:de(b.META,o,n),noscript:de(b.NOSCRIPT,s,n),script:de(b.SCRIPT,c,n),style:de(b.STYLE,u,n),title:de(b.TITLE,{title:f,titleAttributes:d},n)}},me=l()((function(e){return{baseTag:$([C,j],e),bodyAttributes:G(h,e),defer:X(e,P),encode:X(e,_),htmlAttributes:G(y,e),linkTags:J(b.LINK,[k,C],e),metaTags:J(b.META,[S,w,E,x,A],e),noscriptTags:J(b.NOSCRIPT,[O],e),onChangeClientState:V(e),scriptTags:J(b.SCRIPT,[L,O],e),styleTags:J(b.STYLE,[T],e),title:K(e),titleAttributes:G(v,e)}}),(function(e){ie&&re(ie),e.defer?ie=te((function(){ae(e,(function(){ie=null}))})):(ae(e),ie=null)}),pe)((function(){return null})),ge=(i=me,o=a=function(e){function t(){return D(this,t),W(this,e.apply(this,arguments))}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,e),t.prototype.shouldComponentUpdate=function(e){return!d()(this.props,e)},t.prototype.mapNestedChildrenToProps=function(e,t){if(!t)return null;switch(e.type){case b.SCRIPT:case b.NOSCRIPT:return{innerHTML:t};case b.STYLE:return{cssText:t}}throw new Error("<"+e.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},t.prototype.flattenArrayTypeChildren=function(e){var t,r=e.child,n=e.arrayTypeChildren,i=e.newChildProps,a=e.nestedChildren;return F({},n,((t={})[r.type]=[].concat(n[r.type]||[],[F({},i,this.mapNestedChildrenToProps(r,a))]),t))},t.prototype.mapObjectTypeChildren=function(e){var t,r,n=e.child,i=e.newProps,a=e.newChildProps,o=e.nestedChildren;switch(n.type){case b.TITLE:return F({},i,((t={})[n.type]=o,t.titleAttributes=F({},a),t));case b.BODY:return F({},i,{bodyAttributes:F({},a)});case b.HTML:return F({},i,{htmlAttributes:F({},a)})}return F({},i,((r={})[n.type]=F({},a),r))},t.prototype.mapArrayTypeChildrenToProps=function(e,t){var r=F({},t);return Object.keys(e).forEach((function(t){var n;r=F({},r,((n={})[t]=e[t],n))})),r},t.prototype.warnOnInvalidChildren=function(e,t){return!0},t.prototype.mapChildrenToProps=function(e,t){var r=this,n={};return p.Children.forEach(e,(function(e){if(e&&e.props){var i=e.props,a=i.children,o=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return Object.keys(e).reduce((function(t,r){return t[R[r]||r]=e[r],t}),t)}(B(i,["children"]));switch(r.warnOnInvalidChildren(e,a),e.type){case b.LINK:case b.META:case b.NOSCRIPT:case b.SCRIPT:case b.STYLE:n=r.flattenArrayTypeChildren({child:e,arrayTypeChildren:n,newChildProps:o,nestedChildren:a});break;default:t=r.mapObjectTypeChildren({child:e,newProps:t,newChildProps:o,nestedChildren:a})}}})),t=this.mapArrayTypeChildrenToProps(n,t)},t.prototype.render=function(){var e=this.props,t=e.children,r=B(e,["children"]),n=F({},r);return t&&(n=this.mapChildrenToProps(t,n)),p.createElement(i,n)},U(t,null,[{key:"canUseDOM",set:function(e){i.canUseDOM=e}}]),t}(p.Component),a.propTypes={base:c().object,bodyAttributes:c().object,children:c().oneOfType([c().arrayOf(c().node),c().node]),defaultTitle:c().string,defer:c().bool,encodeSpecialCharacters:c().bool,htmlAttributes:c().object,link:c().arrayOf(c().object),meta:c().arrayOf(c().object),noscript:c().arrayOf(c().object),onChangeClientState:c().func,script:c().arrayOf(c().object),style:c().arrayOf(c().object),title:c().string,titleAttributes:c().object,titleTemplate:c().string},a.defaultProps={defer:!0,encodeSpecialCharacters:!0},a.peek=i.peek,a.rewind=function(){var e=i.rewind();return e||(e=pe({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),e},o);ge.renderStatic=ge.rewind;var he=r(3431),ye=function(e){var t=e.lang,r=void 0===t?"ko":t,n=e.author,i=e.siteName,a=e.siteUrl,o=e.title,s=void 0===o?i:o,c=e.description,u=e.image,l=e.keywords,f=e.favicon,d=e.seo,p=e.readingTime,m=a+"/"+u;return(0,he.tZ)(ge,{htmlAttributes:{lang:r}},(0,he.tZ)("title",null,s),(0,he.tZ)("meta",{name:"description",content:c}),(0,he.tZ)("meta",{name:"author",content:n}),(0,he.tZ)("meta",{name:"keywords",content:l.join(", ")}),(0,he.tZ)("link",{rel:"icon",type:"image/png",href:f,sizes:"16x16"}),(0,he.tZ)("meta",{name:"google-site-verification",content:d.google}),(0,he.tZ)("meta",{name:"naver-site-verification",content:d.naver}),(0,he.tZ)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),(0,he.tZ)("meta",{property:"og:type",content:"website"}),(0,he.tZ)("meta",{property:"og:site_name",content:i}),(0,he.tZ)("meta",{property:"og:title",content:s}),(0,he.tZ)("meta",{property:"og:description",content:c}),(0,he.tZ)("meta",{property:"og:image",content:m}),(0,he.tZ)("meta",{property:"og:url",content:a}),(0,he.tZ)("meta",{property:"og:locale",content:"ko_KR"}),(0,he.tZ)("meta",{property:"og:locale:alternate",content:"es_ES"}),(0,he.tZ)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,he.tZ)("meta",{name:"twitter:domain",content:a}),(0,he.tZ)("meta",{name:"twitter:title",content:s}),(0,he.tZ)("meta",{name:"twitter:description",content:c}),(0,he.tZ)("meta",{name:"twitter:image",content:m}),(0,he.tZ)("meta",{name:"twitter:image:alt",content:c}),(0,he.tZ)("meta",{name:"twitter:label1",content:"Time to read"}),(0,he.tZ)("meta",{name:"twitter:data1",content:p}))}},3366:function(e,t,r){"use strict";function n(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}r.d(t,{Z:function(){return n}})}}]);
//# sourceMappingURL=d0dcf9c1039535d44ee74defc829dfbf62dac3c5-5cf35c60bf7b35efc663.js.map