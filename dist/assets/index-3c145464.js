import{x as i,B as r,S as s,b as l,i as c}from"./index-624bd3bb.js";var b=Object.defineProperty,a=Object.getOwnPropertySymbols,d=Object.prototype.hasOwnProperty,m=Object.prototype.propertyIsEnumerable,n=(o,e,t)=>e in o?b(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,p=(o,e)=>{for(var t in e||(e={}))d.call(e,t)&&n(o,t,e[t]);if(a)for(var t of a(e))m.call(e,t)&&n(o,t,e[t]);return o};class u{constructor(e){this.openModal=i.open,this.closeModal=i.close,this.subscribeModal=i.subscribe,this.setTheme=r.setThemeConfig,r.setThemeConfig(e),s.setConfig(p({enableStandaloneMode:!0},e)),this.initUi()}async initUi(){if(typeof window<"u"){await l(()=>import("./index-638a951e.js"),["assets/index-638a951e.js","assets/index-624bd3bb.js","assets/index-d8f5d640.css","assets/browser-a1ac24ac.js"]);const e=document.createElement("w3m-modal");document.body.insertAdjacentElement("beforeend",e),c.setIsUiLoaded(!0)}}}export{u as Web3Modal};