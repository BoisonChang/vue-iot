!function(e){const t=e.en=e.en||{};t.dictionary=Object.assign(t.dictionary||{},{"Cannot upload file:":"Cannot upload file:"})}(window.CKEDITOR_TRANSLATIONS||(window.CKEDITOR_TRANSLATIONS={})),
/*!
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md.
 */(()=>{var e={704:(e,t,o)=>{e.exports=o(79)("./src/core.js")},448:(e,t,o)=>{e.exports=o(79)("./src/upload.js")},79:e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(r){var n=t[r];if(void 0!==n)return n.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";o.r(r),o.d(r,{UploadAdapter:()=>a});var e=o(704),t=o(448);const n="ckCsrfToken",s="abcdefghijklmnopqrstuvwxyz0123456789";function i(){let e=function(e){e=e.toLowerCase();const t=document.cookie.split(";");for(const o of t){const t=o.split("=");if(decodeURIComponent(t[0].trim().toLowerCase())===e)return decodeURIComponent(t[1])}return null}(n);var t,o;return e&&40==e.length||(e=function(e){let t="";const o=new Uint8Array(e);window.crypto.getRandomValues(o);for(let e=0;e<o.length;e++){const r=s.charAt(o[e]%s.length);t+=Math.random()>.5?r.toUpperCase():r}return t}(40),t=n,o=e,document.cookie=encodeURIComponent(t)+"="+encodeURIComponent(o)+";path=/"),e}class a extends e.Plugin{static get requires(){return[t.FileRepository]}static get pluginName(){return"CKFinderUploadAdapter"}init(){const e=this.editor.config.get("ckfinder.uploadUrl");e&&(this.editor.plugins.get(t.FileRepository).createUploadAdapter=t=>new d(t,e,this.editor.t))}}class d{constructor(e,t,o){this.loader=e,this.url=t,this.t=o}upload(){return this.loader.file.then((e=>new Promise(((t,o)=>{this._initRequest(),this._initListeners(t,o,e),this._sendRequest(e)}))))}abort(){this.xhr&&this.xhr.abort()}_initRequest(){const e=this.xhr=new XMLHttpRequest;e.open("POST",this.url,!0),e.responseType="json"}_initListeners(e,t,o){const r=this.xhr,n=this.loader,s=(0,this.t)("Cannot upload file:")+` ${o.name}.`;r.addEventListener("error",(()=>t(s))),r.addEventListener("abort",(()=>t())),r.addEventListener("load",(()=>{const o=r.response;if(!o||!o.uploaded)return t(o&&o.error&&o.error.message?o.error.message:s);e({default:o.url})})),r.upload&&r.upload.addEventListener("progress",(e=>{e.lengthComputable&&(n.uploadTotal=e.total,n.uploaded=e.loaded)}))}_sendRequest(e){const t=new FormData;t.append("upload",e),t.append("ckCsrfToken",i()),this.xhr.send(t)}}})(),(window.CKEditor5=window.CKEditor5||{}).adapterCkfinder=r})();