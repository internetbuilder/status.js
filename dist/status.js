 (function(g){function k(a,c,b){var d=window.location.origin;this.cancelable=this.cancelBubble=this.bubbles=!1;this.data=c||null;this.origin=d||"";this.lastEventId=b||"";this.type=a||"message"}if(!g.EventSource||g.K){var l=(g.K||"")+"EventSource",e=function(a,c){if(!a||"string"!=typeof a)throw new SyntaxError("Not enough arguments");this.URL=a;this.R(c);var b=this;setTimeout(function(){b.G()},0)};e.prototype={CONNECTING:0,OPEN:1,CLOSED:2,w:{F:!1,N:"eventsource",interval:500,m:262144,o:3E5,f:{evs_buffer_size_limit:262144},
J:{Accept:"text/event-stream","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"}},R:function(a){var c=this.w,b;for(b in c)c.hasOwnProperty(b)&&(this[b]=c[b]);for(b in a)b in c&&a.hasOwnProperty(b)&&(this[b]=a[b]);this.f&&this.m&&(this.f.evs_buffer_size_limit=this.m);if("undefined"===typeof console||"undefined"===typeof console.log)this.F=!1},log:function(a){this.F&&console.log("["+this.N+"]:"+a)},G:function(){try{this.readyState!=this.CLOSED&&(this.v(),this.readyState=this.CONNECTING,
this.cursor=0,this.cache="",this.c=new this.h(this),this.H())}catch(a){this.log("There were errors inside the pool try-catch"),this.dispatchEvent("error",{type:"error",data:a.message})}},j:function(a){var c=this;c.readyState=c.CONNECTING;c.dispatchEvent("error",{type:"error",data:"Reconnecting "});this.i=setTimeout(function(){c.G()},a||0)},v:function(){this.log("evs cleaning up");this.i&&(clearInterval(this.i),this.i=null);this.g&&(clearInterval(this.g),this.g=null);this.c&&(this.c.abort(),this.c=
null)},H:function(){if(this.o){this.g&&clearInterval(this.g);var a=this;this.g=setTimeout(function(){a.log("Timeout! silentTImeout:"+a.o);a.j()},this.o)}},close:function(){this.readyState=this.CLOSED;this.log("Closing connection. readyState: "+this.readyState);this.v()},l:function(){var a=this.c;if(a.D()&&!a.B()){this.H();this.readyState==this.CONNECTING&&(this.readyState=this.OPEN,this.dispatchEvent("open",{type:"open"}));var c=a.A();c.length>this.m&&(this.log("buffer.length > this.bufferSizeLimit"),
this.j());0==this.cursor&&0<c.length&&"\ufeff"==c.substring(0,1)&&(this.cursor=1);var b=this.M(c);b[0]>=this.cursor&&(b=b[1],this.P(c.substring(this.cursor,b)),this.cursor=b);a.C()&&(this.log("request.isDone(). reopening the connection"),this.j(this.interval))}else this.readyState!==this.CLOSED&&(this.log("this.readyState !== this.CLOSED"),this.j(this.interval))},P:function(a){a=this.cache+this.O(a);a=a.split("\n\n");var c,b,d,e,f;for(c=0;c<a.length-1;c++){d="message";e=[];parts=a[c].split("\n");
for(b=0;b<parts.length;b++)f=this.S(parts[b]),0==f.indexOf("event")?d=f.replace(/event:?\s*/,""):0==f.indexOf("retry")?(f=parseInt(f.replace(/retry:?\s*/,"")),isNaN(f)||(this.interval=f)):0==f.indexOf("data")?e.push(f.replace(/data:?\s*/,"")):0==f.indexOf("id:")?this.lastEventId=f.replace(/id:?\s*/,""):0==f.indexOf("id")&&(this.lastEventId=null);e.length&&this.dispatchEvent(d,new k(d,e.join("\n"),this.lastEventId))}this.cache=a[a.length-1]},dispatchEvent:function(a,c){var b=this["_"+a+"Handlers"];
if(b)for(var d=0;d<b.length;d++)b[d].call(this,c);this["on"+a]&&this["on"+a].call(this,c)},addEventListener:function(a,c){this["_"+a+"Handlers"]||(this["_"+a+"Handlers"]=[]);this["_"+a+"Handlers"].push(c)},removeEventListener:function(a,c){var b=this["_"+a+"Handlers"];if(b)for(var d=b.length-1;0<=d;--d)if(b[d]===c){b.splice(d,1);break}},i:null,c:null,lastEventId:null,cache:"",cursor:0,onerror:null,onmessage:null,onopen:null,readyState:0,I:function(a,c){var b=[];if(c){var d,e,f=encodeURIComponent;
for(d in c)c.hasOwnProperty(d)&&(e=f(d)+"="+f(c[d]),b.push(e))}return 0<b.length?-1==a.indexOf("?")?a+"?"+b.join("&"):a+"&"+b.join("&"):a},M:function(a){var c=a.lastIndexOf("\n\n"),b=a.lastIndexOf("\r\r");a=a.lastIndexOf("\r\n\r\n");return a>Math.max(c,b)?[a,a+4]:[Math.max(c,b),Math.max(c,b)+2]},S:function(a){return a.replace(/^(\s|\u00A0)+|(\s|\u00A0)+$/g,"")},O:function(a){return a.replace(/\r\n|\r/g,"\n")}};if(window.XDomainRequest&&window.XMLHttpRequest&&void 0===(new XMLHttpRequest).responseType){e.L=
"IE_8-9";var h=e.prototype.w;h.J=null;h.f.evs_preamble=2056;e.prototype.h=function(a){this.a=request=new XDomainRequest;request.onprogress=function(){request.u=!0;a.l()};request.onload=function(){this.s=!0;a.l()};request.onerror=function(){this.b=!0;a.readyState=a.CLOSED;a.dispatchEvent("error",{type:"error",data:"XDomainRequest error"})};request.ontimeout=function(){this.b=!0;a.readyState=a.CLOSED;a.dispatchEvent("error",{type:"error",data:"XDomainRequest timed out"})};var c={};if(a.f){var b=a.f,
d;for(d in b)b.hasOwnProperty(d)&&(c[d]=b[d]);a.lastEventId&&(c.evs_last_event_id=a.lastEventId)}request.open("GET",a.I(a.URL,c));request.send()};e.prototype.h.prototype={a:null,u:!1,s:!1,b:!1,D:function(){return this.a.u},C:function(){return this.a.s},B:function(){return this.a.b},A:function(){var a="";try{a=this.a.responseText||""}catch(c){}return a},abort:function(){this.a&&this.a.abort()}}}else e.L="XHR",e.prototype.h=function(a){this.a=request=new XMLHttpRequest;a.c=this;request.onreadystatechange=
function(){1<request.readyState&&a.readyState!=a.CLOSED&&(200==request.status||300<=request.status&&400>request.status?a.l():(request.b=!0,a.readyState=a.CLOSED,a.dispatchEvent("error",{type:"error",data:"The server responded with "+request.status}),a.close()))};request.onprogress=function(){};request.open("GET",a.I(a.URL,a.f),!0);var c=a.J,b;for(b in c)c.hasOwnProperty(b)&&request.setRequestHeader(b,c[b]);a.lastEventId&&request.setRequestHeader("Last-Event-Id",a.lastEventId);request.send()},e.prototype.h.prototype=
{a:null,b:!1,D:function(){return 2<=this.a.readyState},C:function(){return 4==this.a.readyState},B:function(){return this.b||400<=this.a.status},A:function(){var a="";try{a=this.a.responseText||""}catch(c){}return a},abort:function(){this.a&&this.a.abort()}};g[l]=e}})(this);

window.f||(window.f={});
window.f.w=function(){function c(a){var g,b,e,c;this.options=null!=a?a:{};d=this;c=["status_page","selector"];e=null==this.options;a=0;for(g=c.length;a<g;a++)e=c[a],e=!(e in this.options);if(this.options==={}||e)console.warn(m+" Initialization options missing or invalid, consult the documentation.");else{g={ssl:!0,default_style:!0,pane_position:"bottom-right",led_position:"left",i18n:{}};for(b in g)a=g[b],null==this.options[b]&&(this.options[b]=a);g={heading:"Issues",loading:"Loading status...",scheduled:"Scheduled"};
for(b in g)a=g[b],null==this.options.i18n[b]&&(this.options.i18n[b]=a);/^https?:\/\//i.test(this.options.status_page)||(b=this.options.ssl?"https":"http",this.options.status_page=b+"://"+this.options.status_page);this.ready(function(){return d.C()})}}var m,d,q,h,b,r,n,k,p,t,u;d=null;m="[Status Widget]";b={};c.prototype.ready=function(a){return"loading"!==document.readyState?a():document.addEventListener("DOMContentLoaded",a)};c.prototype.A=function(){var a;a=document.createElement("link");a.rel="stylesheet";
a.href="https://libraries.hund.io/status-js/status-1.0.0.css";document.head.appendChild(a)};c.prototype.C=function(){b.b=document.querySelector(this.options.selector);b.b.style.visibility="hidden";if(null===b.b)console.warn(m+" Unable to find element with selector: "+this.options.selector);else return this.options.default_style&&this.A(),this.connect(),q(b.b,"status-widget"),b.u=h("span","status-widget__led",b.b),b.state=h("span","status-widget__state",b.b),"left"!==this.options.led_position&&b.b.appendChild(b.u),
k(b.state,this.options.i18n.loading),b.a=h("div","status-widget--pane",b.b),b.a.dataset.open=!1,b.a.dataset.position=this.options.pane_position,b.K=h("strong","status-widget--pane__heading",b.a),k(b.K,this.options.i18n.heading),b.i=h("div","status-widget--pane__container",b.a),b.m=h("span","status_widget--pane__text",b.i),k(b.m,"Querying monitoring service..."),b.j=h("a","status-widget--pane__footer",b.a),b.j.href=this.options.status_page,b.j.target="status",this.h(!0,!0),b.b.addEventListener("click",
function(a){a.preventDefault();a.stopPropagation();(a="false"===b.a.dataset.open)&&d.h();return b.a.dataset.open=a},!1),b.a.addEventListener("click",function(a){return a.stopPropagation()}),document.addEventListener("click",function(){if(b.a.dataset.open)return b.a.dataset.open=!1},!1)};c.prototype.connect=function(){var a;return window.EventSource?(a=this.options.status_page+"/live",null!=this.options.component&&(a+="/"+this.options.component),a=new window.EventSource(a),a.onopen=function(){return b.b.style.visibility=
"visible"},this.B(a)):console.log(m+" Unsupported browser.")};c.prototype.B=function(a){var b,d,e,c;d={error:this.G,ping_event:this.L,init_event:this.H,status_event:this.M,issue_event:this.J,update_event:this.N};c=[];for(b in d)e=d[b],c.push(a.addEventListener(b,e,!1));return c};c.prototype.G=function(a){a.preventDefault();a.readyState===window.EventSource.CLOSED&&console.log(m+" Connection closed.");return!1};c.prototype.L=function(){if("true"===b.a.dataset.open)return d.v()};c.prototype.H=function(a){var b,
c,e;console.log(m+" Connection established.");a=d.g(a);if("issues"in a)for(d.issues={},d.c=[],e=a.issues,a=0,c=e.length;a<c;a++)b=e[a],d.issues[b.id]=b,5>Object.keys(d.issues).length&&d.c.push(b.id);return d.o()};c.prototype.M=function(a){return d.g(a)};c.prototype.J=function(a){a=d.g(a);"issue"in a&&(a.issue.updates=[],d.issues[a.issue.id]=a.issue,4<=d.c.length&&d.c.pop(),d.c.unshift(a.issue.id));return d.o()};c.prototype.N=function(a){var b;a=d.g(a);if("update"in a&&(b=a.update.issue_id,b in d.issues))return d.issues[b].updates.unshift(a.update),
d.o()};c.prototype.g=function(a){a=r(a);d.O(a.state);d.v();return a};c.prototype.O=function(a){var g;null==a&&(a="pending");g=b.u.dataset.state=a;"state"in d.options.i18n&&a in d.options.i18n.state&&(g=d.options.i18n.state[a]);k(b.state,g)};c.prototype.o=function(){var a,g,c,e,l;null!=b.l&&b.i.removeChild(b.l);b.l=h("div","status_widget--pane__issues",b.i);if(0===Object.keys(d.issues).length)k(b.m,"There are currently no issues.");else{b.m.dataset.hidden=!0;e=d.c;l=[];a=0;for(c=e.length;a<c;a++)g=
e[a],g in d.issues&&l.push(d.D(d.issues[g]));return l}};c.prototype.D=function(a){var g,c,e,l;g=h("div","status_widget--issue",b.l);c=d.I(a);c={component:{type:"strong",text:a.component},title:{type:"a",text:a.title+": "},body:{type:"p",text:u(c.body)},label:{type:"span",text:c.label},time:{type:"span",text:c.F}};for(e in c)l=c[e],c[e]=h(l.type,"status_widget--issue__"+e,g),k(c[e],l.text);c.title.href=d.options.status_page+"/issues/"+a.id;return c.title.target="status"};c.prototype.v=function(){d.s=
p();return d.h(!1)};c.prototype.h=function(a,c){var h;null==c&&(c=!1);if("false"!==b.a.dataset.open||c)if(null==d.s&&(d.s=p()),h=p()-d.s,k(b.j,"Updated "+t(h)+" ago"),null==a&&(a=!1),a)return setInterval(function(){return d.h(!1)},1E3)};c.prototype.I=function(a){var b,c,e,h,k;k=!!a.standing;h=!!a.scheduled;b=0<a.updates.length;h&&(k||(e=d.options.i18n.scheduled),c=a.starts_at);b&&(a=a.updates[0]);b=a.body;k&&(e=a.label);h||(c=a.created_at);return{body:b,label:e,F:(new Date(1E3*c)).toLocaleString()}};
u=function(a){a=a.replace(/<(?:.|\n)*?>/gm,"").replace(/\n/g," ");return a.substr(0,140)+(140<a.length?"\u2026":"")};n=function(a){return 1<a?"s":""};p=function(){return(new Date).getTime()};t=function(a){var b;a=Math.floor(a/1E3);return(b=Math.floor((a%=86400)/3600))?b+" hour"+n(b):(b=Math.floor((a%=3600)/60))?b+" minute"+n(b):(a%=60)?a+" second"+n(a):"<1 second"};q=function(a,b){a.classList?a.classList.add(b):a.className+=" "+b};h=function(a,b,c){a=document.createElement(a);q(a,b);c.appendChild(a);
return a};k=function(a,b){void 0!==typeof a.textContent?a.textContent=b:a.innerText=b};r=function(a){try{if("data"in a)return JSON.parse(a.data)}catch(b){console.warn(m+" Received invalid event payload.")}return{}};return c}();window.Status=window.f;window.Status.Widget=window.f.w;
