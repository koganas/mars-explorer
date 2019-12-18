!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){"use strict";var n=function(e){return e&&e.__esModule?e:{default:e}}(r(1));({init:function(){this.cacheDOM()},cacheDOM:function(){var e=this;this.controlArea=document.querySelector(".control-area"),this.btnCreate=document.querySelector("#newPlateau"),this.btnAddRover=document.querySelector("#addRover"),this.btnCreate.addEventListener("click",(function(){var t=document.querySelector('input[name="xSize"]').value,r=document.querySelector('input[name="ySize"]').value;e.marsExplorer=e.newExplorer(Number(t),Number(r))})),this.btnAddRover.addEventListener("click",(function(){var t=document.querySelector('input[name="xPos"]').value,r=document.querySelector('input[name="yPos"]').value,n=document.querySelector('input[name="compass"]').value,o=document.querySelector('input[name="command"]').value;e.controlArea.innerHTML="",e.addRover(Number(t),Number(r),n,o)}))},newExplorer:function(e,t){return new n.default(e,t)},addRover:function(e,t,r,n){this.marsExplorer.addRover(e,t,r),this.marsExplorer.sendCommand(n)}}).init()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=function(e){return e&&e.__esModule?e:{default:e}}(r(2)),i=function(){function e(t,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.size={x:t,y:r},this.rovers=[],this.activeRover=null,this.checkPosition=this.checkPosition.bind(this),this.execCommand=this.execCommand.bind(this),this.map=document.querySelector(".map"),this.controlArea=document.querySelector(".control-area"),this.btnAdd=document.querySelector("#addRover"),this.createPlateau()}return n(e,[{key:"checkPosition",value:function(e){return this.positionExists(e)&&!this.getRoverByPosition(e)}},{key:"positionExists",value:function(e){var t=e.x,r=e.y;return t>-1&&r>-1&&t<=this.size.x&&r<=this.size.y}},{key:"getRoverByPosition",value:function(e){var t=e.x,r=e.y;return this.rovers.find((function(e){var n=e.getState();return n.pos.x===t&&n.pos.y===r}))}},{key:"addRover",value:function(e,t,r){if(this.activeRover=null,!this.checkPosition({x:e,y:t}))return!1;var n=new o.default(e,t,r);return this.rovers.push(n),this.activeRover=n,this.renderRover(e,t,r,this.rovers.length),this.rovers.length-1}},{key:"activateRover",value:function(e){return!!(this.activeRover=this.rovers[e])}},{key:"execCommand",value:function(e){var t=this;return setTimeout((function(){return t.printInfo(e)}),800),!!this.activeRover&&("M"===e?this.activeRover.move(this.checkPosition):"L"===e||"R"===e?this.activeRover.rotate(e):void 0)}},{key:"sendCommand",value:function(e){var t=this;this.btnAdd.disabled=!0;var r=this.rovers.length-1,n=[].concat(function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}(e)),o=setInterval((function(){t.getCurrentPosition(r),t.execCommand(n.shift()),0===n.length&&(clearInterval(o),setTimeout((function(){t.getCurrentPosition(r),t.btnAdd.disabled=!1}),800))}),800)}},{key:"getCurrentPosition",value:function(e){var t=this.rovers[e].getState(),r=t.pos.x,n=t.pos.y;return this.renderRover(r,n,t.compass,e),r+" "+n+" "+t.compass}},{key:"createPlateau",value:function(){var e=this.size.x,t=this.size.y;this.map.innerHTML="";for(var r=t;r>0;r--){for(var n=document.createElement("tr"),o=e;o>0;o--)n.insertAdjacentHTML("afterbegin",'<td class="map__block"></td>');this.map.insertAdjacentElement("afterbegin",n)}}},{key:"renderRover",value:function(e,t,r,n){var o=this;this.size.x,this.size.y,this.map.querySelectorAll(".rover-"+n).forEach((function(e){return e.className="map__block"})),this.map.querySelectorAll(".map tr").forEach((function(i,a){var s=o.size.y-a;t==s&&i.querySelectorAll("td").forEach((function(t,i){var a=i+1;if(e==a)switch(o.printInfo(a+" "+s+" - "+r),t.className="",r){case"N":t.classList.add("rover","rover-"+n,"north");break;case"S":t.classList.add("rover","rover-"+n,"south");break;case"W":t.classList.add("rover","rover-"+n,"west");break;case"E":t.classList.add("rover","rover-"+n,"east")}}))}))}},{key:"printInfo",value:function(e){var t=document.createElement("li");t.appendChild(document.createTextNode(e)),this.controlArea.appendChild(t)}}]),e}();t.default=i},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),o=function(){function e(t,r,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.pos={x:t,y:r},this.compass=n}return n(e,[{key:"getState",value:function(){return{pos:this.pos,compass:this.compass}}},{key:"rotate",value:function(t){this.compass=e.rotateMap[this.compass][t]}},{key:"move",value:function(t){var r=e.moveMap[this.compass],n={x:this.pos.x,y:this.pos.y};n[r.axis]+=r.count,t(n)&&(this.pos=n)}}]),e}();o.rotateMap={N:{L:"W",R:"E"},S:{L:"E",R:"W"},E:{L:"N",R:"S"},W:{L:"S",R:"N"}},o.moveMap={N:{axis:"y",count:1},S:{axis:"y",count:-1},E:{axis:"x",count:1},W:{axis:"x",count:-1}},t.default=o}]);