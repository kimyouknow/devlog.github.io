"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[133],{7083:function(t,e,n){n.r(e),n.d(e,{default:function(){return E}});var i=n(1523),r=n(7294),a=n(7234),o=n(9549),l=function(){var t=(0,a.Xi)().isDarkMode,e=(0,o.Z)().utterances,n=t?"github-dark":"github-light",i=(0,r.useRef)(null);return(0,r.useEffect)((function(){if(null!==i.current){var t,r,a,o,l,u=document.querySelector("iframe.utterances-frame");u?(l={type:"set-theme",theme:n},null===(o=u.contentWindow)||void 0===o||o.postMessage(l,"https://utteranc.es")):(r=document.createElement("script"),a=Object.assign({},e,{"issue-term":e.issueTerm,theme:n}),Object.entries(a).forEach((function(t){var e=t[0],n=t[1];r.setAttribute(e,n)})),null===(t=i.current)||void 0===t||t.appendChild(r))}}),[t]),{utteranceElement:i}},u=n(3431),d=function(){var t=l().utteranceElement;return(0,u.tZ)("div",{ref:t})},m=n(7462),s=n(1008),f=n(6296);var c=(0,s.Z)("div",{target:"e1bffbut9"})("position:relative;width:100%;height:400px;margin-bottom:64px;@media ",(function(t){return t.theme.media.medium}),"{height:300px;}"),h=(0,s.Z)("div",{target:"e1bffbut8"})({name:"1et8ufu",styles:"display:flex;flex-direction:column;width:var(--main-content-width);height:100%;margin:0 auto;padding:var(--padding-l) var(--space-m);color:var(--color-white);background-color:transparent;position:relative;z-index:var(--z-index-second)"}),p=(0,s.Z)("div",{target:"e1bffbut7"})("display:-webkit-box;overflow:hidden;overflow-wrap:break-word;margin-top:auto;text-overflow:ellipsis;white-space:normal;-webkit-line-clamp:2;-webkit-box-orient:vertical;",(function(t){return t.theme.typography.displayBoldLarge}),";@media ",(function(t){return t.theme.media.medium}),"{",(function(t){return t.theme.typography.displayBold}),";}"),g=(0,s.Z)("div",{target:"e1bffbut6"})("display:flex;justify-content:space-between;align-items:center;margin-top:10px;",(function(t){return t.theme.typography.linkMedium}),"@media ",(function(t){return t.theme.media.medium}),"{flex-direction:column;align-items:flex-start;",(function(t){return t.theme.typography.linkBase}),";}@media ",(function(t){return t.theme.media.small}),"{",(function(t){return t.theme.typography.linkSmall}),";}"),b=(0,s.Z)("div",{target:"e1bffbut5"})({name:"11jf4ye",styles:"display:flex;gap:8px"}),v=(0,s.Z)("div",{target:"e1bffbut4"})({name:"1rymze6",styles:"position:relative;display:flex;flex-direction:column;width:var(--main-content-width);margin:0 auto"}),Z=(0,s.Z)("article",{target:"e1bffbut3"})((function(t){return t.theme.markdownStyle}),";"),y=(0,s.Z)("aside",{target:"e1bffbut2"})("position:absolute;height:100%;right:-45%;font-size:0.9rem;>ul{display:inline-block;position:sticky;top:96px;line-height:1.25;max-height:80vh;overflow-y:auto;word-break:keep-all;border-left:2px solid var(--color-text);li{margin:0 0 0.6rem 0.6rem;>ul{margin:0 0 0.6rem 0.6rem;}}p{margin:0 0 0.6rem 0;border-radius:5px;}a{display:inline-block;&:hover{color:var(--color-primary);}}}@media (max-width: 1460px){right:-38%;}@media ",(function(t){return t.theme.media.xLarge}),"{position:relative;right:0;max-width:100%;>ul{padding-left:2rem;}}"),x=(0,s.Z)("div",{target:"e1bffbut1"})({name:"1ttukna",styles:"width:var(--main-content-width);margin:var(--padding-s) auto;border-top:1px solid var(--color-background-secondary);padding-top:var(--padding-s)"}),w=(0,s.Z)((function(t){return(0,u.tZ)(f.G,(0,m.Z)({},t,{style:{position:"absolute"}}))}),{target:"e1bffbut0"})("width:100%;height:400px;object-fit:cover;filter:brightness(0.25);@media ",(function(t){return t.theme.media.medium}),"{height:300px;}"),k=function(){return(0,u.tZ)(x,null,(0,u.tZ)(i.Z,null),(0,u.tZ)(d,null))},C=n(7913),T=n(3179),_=function(t){var e=t.html;return(0,u.tZ)(Z,{dangerouslySetInnerHTML:{__html:e}})},O=function(t){var e=t.tableOfContents;return(0,u.tZ)(y,{className:"table-of-content",dangerouslySetInnerHTML:{__html:e}})},j=function(t){var e=t.tableOfContents,n=t.html;return(0,u.tZ)(v,null,(0,u.tZ)(O,{tableOfContents:e}),(0,u.tZ)(_,{html:n}))},I=function(t){var e=t.title,n=t.date,i=t.categories,r=t.readingTime;return(0,u.tZ)(h,null,(0,u.tZ)(p,null,e),(0,u.tZ)(g,null,(0,u.tZ)("div",null,i.map((function(t){return t.toUpperCase()})).join(" / ")),(0,u.tZ)(b,null,(0,u.tZ)("span",null,n),"·",(0,u.tZ)("span",null,r))))},M=function(t){var e=t.title,n=t.date,i=t.categories,r=t.thumbnail,a=t.readingTime;return(0,u.tZ)(c,null,(0,u.tZ)(w,{image:r,alt:"thumbnail"}),(0,u.tZ)(I,{title:e,date:n,categories:i,readingTime:a}))},S=function(t){var e=t.postPageInfo,n=t.href,i=t.author,r=t.favicon,a=t.seo,o=e.node,l=o.tableOfContents,d=o.html,m=o.frontmatter,s=m.title,f=m.summary,c=m.date,h=m.categories,p=m.thumbnail,g=p.childImageSharp.gatsbyImageData,b=p.publicURL,v=o.fields.readingTime;return(0,u.tZ)(T.Z,null,(0,u.tZ)(C.Z,{author:i,siteUrl:n,title:s,description:f,image:b,keywords:h,favicon:r,seo:a}),(0,u.tZ)(M,{title:s,date:c,categories:h,thumbnail:g,readingTime:v.text}),(0,u.tZ)(j,{tableOfContents:l,html:d}),(0,u.tZ)(k,null))},E=function(t){var e=t.data.allMarkdownRemark.edges,n=t.location.href,i=(0,o.Z)(),r=i.author,a=i.favicon,l=i.seo;return(0,u.tZ)(S,{postPageInfo:e[0],href:n,author:r,favicon:a,seo:l})}}}]);
//# sourceMappingURL=component---src-templates-post-template-tsx-8d4f8b7955a352edc36d.js.map