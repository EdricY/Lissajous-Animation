!function(t){var e={};function n(i){if(e[i])return e[i].exports;var r=e[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(i,r,function(e){return t[e]}.bind(null,r));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/dist/",n(n.s=2)}([function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));class i{static get TAU(){return 2*Math.PI}static lerp(t,e,n){return t*n+e*(1-n)}static randFloat(t,e){let n=e-t;return Math.random()*n+t}static randInt(t,e){let n=e-t;return Math.floor(Math.random()*n)+t}}},function(t,e,n){"use strict";n.d(e,"a",(function(){return r}));var i=n(0);class r{constructor(t,e){null==t&&(t=0),null==e&&(e=0),this.vals=[t,e]}get x(){return this.vals[0]}set x(t){this.vals[0]=t}get y(){return this.vals[1]}set y(t){this.vals[1]=t}static midpoint(t,e,n=.5){let s=i.a.lerp(t.x,e.x,n),a=i.a.lerp(t.y,e.y,n);return new r(s,a)}}},function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"default",(function(){return a}));var i=n(1),r=n(0);window.OffscreenCanvas||(window.OffscreenCanvas=class{constructor(t,e){let n=document.createElement("canvas");return n.width=t,n.height=e,n}});let s=0;class a{constructor(t,e){this.canvas=t.transferControlToOffscreen(),this.canvas.width=t.clientWidth,this.canvas.height=t.clientHeight,this.ctx=this.canvas.getContext("2d"),this.textCanvas=new OffscreenCanvas(this.canvas.width,this.canvas.height),this.textCtx=this.textCanvas.getContext("2d"),this.textCtx.font="500px monospace",console.log(this.textCtx.font),this.textCtx.textAlign="center",this.textCtx.textBaseline="middle",this.textCtx.fillStyle="red",this.crossCanvas=new OffscreenCanvas(this.canvas.width,this.canvas.height),this.crossCtx=this.crossCanvas.getContext("2d"),this.head=new i.a,this.tail=new i.a,this.a=r.a.randInt(5,30),this.b=r.a.randInt(5,30),console.log(this.a,this.b),this.playAnimation(),this.count=0}playAnimation(){let t=performance.now(),e=this.canvas.width,n=this.canvas.height;this.head.x=e/2+e/2.3*Math.sin(this.b*t/1e4),this.head.y=n/2+n/2.3*Math.cos(this.a*t/1e4),this.tail.x=this.head.x,this.tail.y=this.head.y,requestAnimationFrame(t=>this.animate(t))}animate(t){if(t-s<16)return void requestAnimationFrame(t=>this.animate(t));this.count++,s=t;let e=this.canvas.width,n=this.canvas.height;this.tail.x=this.head.x,this.tail.y=this.head.y,this.head.x=e/2+e/2.3*Math.sin(this.b*t/1e4),this.head.y=n/2+n/2.3*Math.cos(this.a*t/1e4),this.ctx.fillStyle="rgba(0,0,0,.5)",this.ctx.fillRect(0,0,e,n),this.drawHeadTailLine(this.ctx),this.textCtx.clearRect(0,0,e,n),this.textCtx.fillText(function(){let t=new Date,e=t.getHours().toString().padStart(2,"0"),n=t.getSeconds().toString().padStart(2,"0");return`${e}:${n}`}(),this.canvas.width/2,this.canvas.height/2),this.crossCtx.globalCompositeOperation="source-atop",this.crossCtx.fillStyle="rgba(0,0,0,.3)",this.count%3==0&&this.crossCtx.fillRect(0,0,e,n),this.crossCtx.globalCompositeOperation="source-over",this.drawHeadTailLine(this.crossCtx),this.crossCtx.globalCompositeOperation="destination-in",this.crossCtx.drawImage(this.textCanvas,0,0),this.ctx.drawImage(this.crossCanvas,0,0),requestAnimationFrame(t=>this.animate(t))}drawHeadTailLine(t){t.beginPath(),t.strokeStyle="lime",t.lineWidth=100,t.lineJoin="round",t.lineCap="round",t.moveTo(this.head.x,this.head.y),t.lineTo(this.tail.x,this.tail.y),t.stroke()}}t.browser&&(window.LissajousAnimator=a)}.call(this,n(3))},function(t,e){var n,i,r=t.exports={};function s(){throw new Error("setTimeout has not been defined")}function a(){throw new Error("clearTimeout has not been defined")}function o(t){if(n===setTimeout)return setTimeout(t,0);if((n===s||!n)&&setTimeout)return n=setTimeout,setTimeout(t,0);try{return n(t,0)}catch(e){try{return n.call(null,t,0)}catch(e){return n.call(this,t,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:s}catch(t){n=s}try{i="function"==typeof clearTimeout?clearTimeout:a}catch(t){i=a}}();var c,h=[],l=!1,u=-1;function f(){l&&c&&(l=!1,c.length?h=c.concat(h):u=-1,h.length&&d())}function d(){if(!l){var t=o(f);l=!0;for(var e=h.length;e;){for(c=h,h=[];++u<e;)c&&c[u].run();u=-1,e=h.length}c=null,l=!1,function(t){if(i===clearTimeout)return clearTimeout(t);if((i===a||!i)&&clearTimeout)return i=clearTimeout,clearTimeout(t);try{i(t)}catch(e){try{return i.call(null,t)}catch(e){return i.call(this,t)}}}(t)}}function x(t,e){this.fun=t,this.array=e}function v(){}r.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];h.push(new x(t,e)),1!==h.length||l||o(d)},x.prototype.run=function(){this.fun.apply(null,this.array)},r.title="browser",r.browser=!0,r.env={},r.argv=[],r.version="",r.versions={},r.on=v,r.addListener=v,r.once=v,r.off=v,r.removeListener=v,r.removeAllListeners=v,r.emit=v,r.prependListener=v,r.prependOnceListener=v,r.listeners=function(t){return[]},r.binding=function(t){throw new Error("process.binding is not supported")},r.cwd=function(){return"/"},r.chdir=function(t){throw new Error("process.chdir is not supported")},r.umask=function(){return 0}}]);