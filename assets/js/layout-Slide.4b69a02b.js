(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{414:function(e,t,o){},415:function(e,t,o){},416:function(e,t,o){},424:function(e,t,o){"use strict";const s=e=>"function"==typeof e.value||(console.warn("[Vue-click-outside:] provided expression",e.expression,"is not a function."),!1),n=e=>void 0!==e.componentInstance&&e.componentInstance.$isServer;t.a={bind:(e,t,o)=>{if(!s(t))return;const a=t=>{if(!o.context)return;const s=t.path||(t.composedPath?t.composedPath():[]);s&&s.length>0&&s.unshift(t.target),e.contains(t.target)||((e,t)=>{if(!e||!t)return!1;for(let o=0,s=t.length;o<s;o++)try{if(e.contains(t[o]))return!0;if(t[o].contains(e))return!1}catch(e){return!1}return!1})(o.context.popupItem,s)||e.$vueClickOutside&&e.$vueClickOutside.callback(t)};e.$vueClickOutside={handler:a,callback:t.value};const i="ontouchstart"in document.documentElement?"touchstart":"click";n(o)||document.addEventListener(i,a)},update:(e,t)=>{s(t)&&e.$vueClickOutside&&(e.$vueClickOutside.callback=t.value)},unbind:(e,t,o)=>{const s="ontouchstart"in document.documentElement?"touchstart":"click";!n(o)&&e.$vueClickOutside&&document.removeEventListener(s,e.$vueClickOutside.handler),delete e.$vueClickOutside}}},453:function(e,t,o){"use strict";o(414)},454:function(e,t,o){"use strict";o(415)},455:function(e,t,o){"use strict";o(416)},461:function(e,t,o){"use strict";var s=o(0),n=o(424),a=o(1),i=Object(a.a)({},(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{staticClass:"icon auto-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{d:"M460.864 539.072H564.8L510.592 376l-49.728 163.072zM872 362.368V149.504H659.648L510.528 0l-149.12 149.504H149.12v212.928L0 511.872l149.12 149.504v212.928h212.352l149.12 149.504 149.12-149.504h212.352V661.376l149.12-149.504L872 362.368zM614.464 693.12l-31.616-90.624H438.272l-31.616 90.624h-85.888l144.576-407.68h90.368l144.576 407.68h-85.824zm0 0",fill:"currentColor"}})])}),[],!1,null,null,null).exports,c=Object(a.a)({},(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{staticClass:"icon dark-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{d:"M935.539 630.402c-11.43-11.432-28.674-14.739-43.531-8.354-46.734 20.103-96.363 30.297-147.508 30.297-99.59 0-193.221-38.784-263.64-109.203-108.637-108.637-139.61-270.022-78.908-411.148a39.497 39.497 0 0 0-51.886-51.887c-52.637 22.64-100.017 54.81-140.826 95.616-85.346 85.346-132.346 198.821-132.346 319.52 0 120.7 47.001 234.172 132.347 319.519S408.063 947.11 528.76 947.11c120.7 0 234.172-47.003 319.52-132.351 40.809-40.81 72.978-88.19 95.616-140.826a39.497 39.497 0 0 0-8.356-43.532z",fill:"currentColor"}})])}),[],!1,null,null,null).exports,r=Object(a.a)({},(function(){var e=this.$createElement,t=this._self._c||e;return t("svg",{staticClass:"icon light-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[t("path",{attrs:{d:"M512 256a42.667 42.667 0 0 0 42.667-42.667V128a42.667 42.667 0 0 0-85.334 0v85.333A42.667 42.667 0 0 0 512 256zm384 213.333h-85.333a42.667 42.667 0 0 0 0 85.334H896a42.667 42.667 0 0 0 0-85.334zM256 512a42.667 42.667 0 0 0-42.667-42.667H128a42.667 42.667 0 0 0 0 85.334h85.333A42.667 42.667 0 0 0 256 512zm9.387-298.667a42.667 42.667 0 0 0-59.307 62.72l61.44 59.307a42.667 42.667 0 0 0 31.147 11.947 42.667 42.667 0 0 0 30.72-13.227 42.667 42.667 0 0 0 0-60.16zm459.946 133.974a42.667 42.667 0 0 0 29.44-11.947l61.44-59.307a42.667 42.667 0 0 0-57.6-62.72l-61.44 60.587a42.667 42.667 0 0 0 0 60.16 42.667 42.667 0 0 0 28.16 13.227zM512 768a42.667 42.667 0 0 0-42.667 42.667V896a42.667 42.667 0 0 0 85.334 0v-85.333A42.667 42.667 0 0 0 512 768zm244.48-79.36a42.667 42.667 0 0 0-59.307 61.44l61.44 60.587a42.667 42.667 0 0 0 29.44 11.946 42.667 42.667 0 0 0 30.72-12.8 42.667 42.667 0 0 0 0-60.586zm-488.96 0-61.44 59.307a42.667 42.667 0 0 0 0 60.586 42.667 42.667 0 0 0 30.72 12.8 42.667 42.667 0 0 0 28.587-10.666l61.44-59.307a42.667 42.667 0 0 0-59.307-61.44zM512 341.333A170.667 170.667 0 1 0 682.667 512 170.667 170.667 0 0 0 512 341.333z",fill:"currentColor"}})])}),[],!1,null,null,null).exports;const l=(e,t,o)=>{const s=[];e.remove(...o),e.forEach(e=>{s.push(e)}),e.value="",e.add(...t,...s)};var d=s.default.extend({name:"DarkmodeSwitch",components:{AutoIcon:i,DarkIcon:c,LightIcon:r},data:()=>({darkmode:"auto"}),computed:{darkmodeConfig(){return this.$themeConfig.darkmode||"auto-switch"}},mounted(){this.darkmode=localStorage.getItem("darkmode")||"auto","auto-switch"===this.darkmodeConfig?"auto"===this.darkmode?this.setDarkmode("auto"):this.setDarkmode(this.darkmode):"auto"===this.darkmodeConfig?this.setDarkmode("auto"):"switch"===this.darkmodeConfig?this.setDarkmode(this.darkmode):this.setDarkmode("off")},methods:{setDarkmode(e){if("on"===e)this.toggleDarkmode(!0);else if("off"===e)this.toggleDarkmode(!1);else{const e=window.matchMedia("(prefers-color-scheme: dark)").matches,t=window.matchMedia("(prefers-color-scheme: light)").matches;if(window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{e.matches&&this.toggleDarkmode(!0)}),window.matchMedia("(prefers-color-scheme: light)").addEventListener("change",e=>{e.matches&&this.toggleDarkmode(!1)}),e)this.toggleDarkmode(!0);else if(t)this.toggleDarkmode(!1);else{const e=(new Date).getHours();this.toggleDarkmode(e<6||e>=18)}}this.darkmode=e,localStorage.setItem("darkmode",e)},toggleDarkmode(e){const t=document.body.classList;e?l(t,["theme-dark"],["theme-light"]):l(t,["theme-light"],["theme-dark"])}}}),u=(o(453),Object(a.a)(d,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"darkmode-switch"},["auto-switch"===e.darkmodeConfig?[o("div",{staticClass:"item day",class:{active:"off"===e.darkmode},on:{click:function(t){return e.setDarkmode("off")}}},[o("LightIcon")],1),e._v(" "),o("div",{staticClass:"item auto",class:{active:"auto"===e.darkmode},on:{click:function(t){return e.setDarkmode("auto")}}},[o("AutoIcon")],1),e._v(" "),o("div",{staticClass:"item night",class:{active:"on"===e.darkmode},on:{click:function(t){return e.setDarkmode("on")}}},[o("DarkIcon")],1)]:"switch"===e.darkmodeConfig?o("div",{staticClass:"switch"},[o("input",{staticClass:"switch-input",attrs:{id:"switch",type:"checkbox"},domProps:{checked:"on"!==e.darkmode},on:{click:function(t){return e.setDarkmode("on"===e.darkmode?"off":"on")}}}),e._v(" "),e._m(0)]):e._e()],2)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("label",{staticClass:"label",attrs:{for:"switch"}},[t("span",{staticClass:"label-content"})])}],!1,null,null,null).exports);const h={red:"#e74c3c",blue:"#3498db",green:"#3eaf7c",orange:"#f39c12",purple:"#8e44ad"};var m=s.default.extend({name:"ThemeOptions",components:{DarkmodeSwitch:u},data:()=>({themeColor:{},isDarkmode:!1}),computed:{text(){return this.$themeLocaleConfig.themeColor},themeColorEnabled(){return!1!==this.$themeConfig.themeColor},switchEnabled(){return"disable"!==this.$themeConfig.darkmode&&"auto"!==this.$themeConfig.darkmode}},mounted(){const e=localStorage.getItem("theme");this.themeColor={list:this.$themeConfig.themeColor?Object.keys(this.$themeConfig.themeColor):Object.keys(h),picker:this.$themeConfig.themeColor||h},e&&this.setTheme(e)},methods:{setTheme(e){const t=document.body.classList,o=this.themeColor.list.map(e=>"theme-"+e);if(!e)return localStorage.removeItem("theme"),void t.remove(...o);t.remove(...o.filter(t=>t!=="theme-"+e)),t.add("theme-"+e),localStorage.setItem("theme",e)}}}),v=(o(454),Object(a.a)(m,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"theme-options"},[e.themeColorEnabled?o("ul",{staticClass:"themecolor-select"},[o("label",{attrs:{for:"themecolor-select"},domProps:{textContent:e._s(e.text.themeColor+":")}}),e._v(" "),o("li",[o("span",{staticClass:"default-theme",on:{click:function(t){return e.setTheme()}}})]),e._v(" "),e._l(e.themeColor.list,(function(t){return o("li",{key:t},[o("span",{style:{background:e.themeColor.picker[t]},on:{click:function(o){return e.setTheme(t)}}})])}))],2):e._e(),e._v(" "),e.switchEnabled?o("div",{staticClass:"darkmode-toggle"},[o("label",{staticClass:"desc",attrs:{for:"darkmode-toggle"},domProps:{textContent:e._s(e.text.themeMode+":")}}),e._v(" "),o("DarkmodeSwitch"),e._v(" "),o("ScreenFull",{attrs:{enable:!1!==e.$themeConfig.fullscreen}})],1):e._e()])}),[],!1,null,null,null).exports),k=s.default.extend({name:"ThemeColor",directives:{"click-outside":n.a},components:{ThemeOptions:v},data:()=>({showMenu:!1}),methods:{clickOutside(){this.showMenu=!1}}}),f=(o(455),Object(a.a)(k,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("button",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.clickOutside,expression:"clickOutside"}],staticClass:"color-button",class:{select:e.showMenu},attrs:{tabindex:"-1","aria-hidden":"true"},on:{click:function(t){e.showMenu=!e.showMenu}}},[o("svg",{staticClass:"skin-icon",attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[o("path",{attrs:{d:"M224 800c0 9.6 3.2 44.8 6.4 54.4 6.4 48-48 76.8-48 76.8s80 41.6 147.2 0 134.4-134.4\n        38.4-195.2c-22.4-12.8-41.6-19.2-57.6-19.2C259.2 716.8 227.2 761.6 224 800zM560 675.2l-32\n        51.2c-51.2 51.2-83.2 32-83.2 32 25.6 67.2 0 112-12.8 128 25.6 6.4 51.2 9.6 80 9.6 54.4 0\n        102.4-9.6 150.4-32l0 0c3.2 0 3.2-3.2 3.2-3.2 22.4-16 12.8-35.2\n        6.4-44.8-9.6-12.8-12.8-25.6-12.8-41.6 0-54.4 60.8-99.2 137.6-99.2 6.4 0 12.8 0 22.4\n        0 12.8 0 38.4 9.6 48-25.6 0-3.2 0-3.2 3.2-6.4 0-3.2 3.2-6.4 3.2-6.4 6.4-16 6.4-16 6.4-19.2\n        9.6-35.2 16-73.6 16-115.2 0-105.6-41.6-198.4-108.8-268.8C704 396.8 560 675.2 560 675.2zM224\n        419.2c0-28.8 22.4-51.2 51.2-51.2 28.8 0 51.2 22.4 51.2 51.2 0 28.8-22.4 51.2-51.2 51.2C246.4\n        470.4 224 448 224 419.2zM320 284.8c0-22.4 19.2-41.6 41.6-41.6 22.4 0 41.6 19.2 41.6 41.6 0\n        22.4-19.2 41.6-41.6 41.6C339.2 326.4 320 307.2 320 284.8zM457.6 208c0-12.8 12.8-25.6 25.6-25.6\n        12.8 0 25.6 12.8 25.6 25.6 0 12.8-12.8 25.6-25.6 25.6C470.4 233.6 457.6 220.8 457.6 208zM128\n        505.6C128 592 153.6 672 201.6 736c28.8-60.8 112-60.8 124.8-60.8-16-51.2 16-99.2\n        16-99.2l316.8-422.4c-48-19.2-99.2-32-150.4-32C297.6 118.4 128 291.2 128 505.6zM764.8\n        86.4c-22.4 19.2-390.4 518.4-390.4 518.4-22.4 28.8-12.8 76.8 22.4 99.2l9.6 6.4c35.2 22.4\n        80 12.8 99.2-25.6 0 0 6.4-12.8 9.6-19.2 54.4-105.6 275.2-524.8 288-553.6\n        6.4-19.2-3.2-32-19.2-32C777.6 76.8 771.2 80 764.8 86.4z"}})]),e._v(" "),o("transition",{attrs:{mode:"out-in",name:"menu-transition"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.showMenu,expression:"showMenu"}],staticClass:"color-picker-menu"},[o("ThemeOptions")],1)])],1)}),[],!1,null,null,null));t.a=f.exports},549:function(e,t,o){},745:function(e,t,o){"use strict";o(549)},845:function(e,t,o){"use strict";o.r(t);var s=o(0),n=o(424),a=o(461),i=s.default.extend({name:"Slide",components:{ThemeColor:a.a},directives:{"click-outside":n.a},data:()=>({showMenu:!1}),destroyed(){document.querySelector("html").classList.remove("reveal-full-page"),document.body.classList.remove("reveal-viewport"),document.body.style.removeProperty("--slide-width"),document.body.style.removeProperty("--slide-height")},methods:{toggle(){this.showMenu=!this.showMenu},back(){window.history.go(-1),this.showMenu=!1},home(){this.$router.push("/"),this.showMenu=!1},clickOutside(){this.showMenu=!1}}}),c=(o(745),o(1)),r=Object(c.a)(i,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"presentation"},[o("ThemeColor",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}]}),e._v(" "),o("Content",{key:e.$route.path,staticClass:"presentation-content"}),e._v(" "),o("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.clickOutside,expression:"clickOutside"}],staticClass:"menu",class:{active:e.showMenu}},[o("button",{staticClass:"menu-button",on:{click:e.toggle}},[o("span",{staticClass:"icon"})]),e._v(" "),o("button",{staticClass:"back-button",on:{click:e.back}},[o("svg",{attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[o("path",{attrs:{d:"M1014.749 449.156v125.688H260.626l345.64 345.64-89.239 89.237L19.307 512l497.72-497.721 89.238 89.238-345.64 345.64h754.124z"}})])]),e._v(" "),o("button",{staticClass:"home-button",on:{click:e.home}},[o("svg",{attrs:{viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"}},[o("path",{attrs:{d:"M780.106 420.978L506.994 147.866 233.882 420.978h.045v455.11H780.06v-455.11h.046zm90.977 90.976V876.09a91.022 91.022 0 01-91.023 91.022H233.927a91.022 91.022 0 01-91.022-91.022V511.954l-67.22 67.175-64.307-64.307 431.309-431.31c35.498-35.498 93.115-35.498 128.614 0l431.309 431.31-64.307 64.307L871.083 512z"}})])])])],1)}),[],!1,null,null,null);t.default=r.exports}}]);