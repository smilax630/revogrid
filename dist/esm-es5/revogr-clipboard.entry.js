var __awaiter=this&&this.__awaiter||function(t,e,r,n){function a(t){return t instanceof r?t:new r((function(e){e(t)}))}return new(r||(r=Promise))((function(r,o){function i(t){try{c(n.next(t))}catch(t){o(t)}}function u(t){try{c(n["throw"](t))}catch(t){o(t)}}function c(t){t.done?r(t.value):a(t.value).then(i,u)}c((n=n.apply(t,e||[])).next())}))};var __generator=this&&this.__generator||function(t,e){var r={label:0,sent:function(){if(o[0]&1)throw o[1];return o[1]},trys:[],ops:[]},n,a,o,i;return i={next:u(0),throw:u(1),return:u(2)},typeof Symbol==="function"&&(i[Symbol.iterator]=function(){return this}),i;function u(t){return function(e){return c([t,e])}}function c(i){if(n)throw new TypeError("Generator is already executing.");while(r)try{if(n=1,a&&(o=i[0]&2?a["return"]:i[0]?a["throw"]||((o=a["return"])&&o.call(a),0):a.next)&&!(o=o.call(a,i[1])).done)return o;if(a=0,o)i=[i[0]&2,o.value];switch(i[0]){case 0:case 1:o=i;break;case 4:r.label++;return{value:i[1],done:false};case 5:r.label++;a=i[1];i=[0];continue;case 7:i=r.ops.pop();r.trys.pop();continue;default:if(!(o=r.trys,o=o.length>0&&o[o.length-1])&&(i[0]===6||i[0]===2)){r=0;continue}if(i[0]===3&&(!o||i[1]>o[0]&&i[1]<o[3])){r.label=i[1];break}if(i[0]===6&&r.label<o[1]){r.label=o[1];o=i;break}if(o&&r.label<o[2]){r.label=o[2];r.ops.push(i);break}if(o[2])r.ops.pop();r.trys.pop();continue}i=e.call(t,r)}catch(t){i=[6,t];a=0}finally{n=o=0}if(i[0]&5)throw i[1];return{value:i[0]?i[1]:void 0,done:true}}};
/*!
 * Built by Revolist
 */import{r as registerInstance,c as createEvent}from"./index-6f753b3c.js";var Clipboard=function(){function t(t){registerInstance(this,t);this.copyRegion=createEvent(this,"copyRegion",3);this.pasteRegion=createEvent(this,"pasteRegion",3)}t.prototype.onPaste=function(t){var e=this.getData(t);var r=e.types.indexOf("text/html")>-1;var n=r?this.canBeParsedAsHTML(e.getData("text/html")):false;var a=n?e.getData("text/html"):e.getData("text");var o=n?this.htmlParse(a):this.textParse(a);this.pasteRegion.emit(o);t.preventDefault()};t.prototype.copyStarted=function(t){this.copyRegion.emit(this.getData(t));t.preventDefault()};t.prototype.doCopy=function(t,e){return __awaiter(this,void 0,void 0,(function(){return __generator(this,(function(r){t.setData("text/plain",e?this.parserCopy(e):"");return[2]}))}))};t.prototype.parserCopy=function(t){return t.map((function(t){return t.join("\t")})).join("\n")};t.prototype.textParse=function(t){var e=[];var r=t.split(/\r\n|\n|\r/);for(var n in r){e.push(r[n].split("\t"))}return e};t.prototype.htmlParse=function(t){var e=[];var r=document.createRange().createContextualFragment(t).querySelector("table");for(var n=0,a=Array.from(r.rows);n<a.length;n++){var o=a[n];e.push(Array.from(o.cells).map((function(t){return t.innerText})))}return e};t.prototype.canBeParsedAsHTML=function(t){return document.createRange().createContextualFragment(t).querySelector("table")!==null};t.prototype.getData=function(t){var e;return t.clipboardData||((e=window)===null||e===void 0?void 0:e.clipboardData)};return t}();export{Clipboard as revogr_clipboard};