(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f3b46484"],{2766:function(t,e,n){},9570:function(t,e,n){"use strict";var a=n("f832"),s=n.n(a);s.a},"9a03":function(t,e,n){"use strict";var a=n("2766"),s=n.n(a);s.a},a352:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticClass:"right-cont"},[n("router-view")],1),n("div",{staticClass:"left-cont"},[n("menu-Vertical",{attrs:{catalogList:t.catalogList}})],1)])},s=[],i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"menu-cont"},t._l(t.catalogList,(function(e,s){return a("div",{key:s,staticClass:"menu-item",on:{click:function(n){return n.stopPropagation(),t.jump(e.path)}}},[a("el-tooltip",{attrs:{effect:"dark",content:e.title,placement:"left"}},[a("img",{attrs:{src:n("a760"),alt:""}})])],1)})),0)},r=[],o={props:{catalogList:{type:Array,default:function(){return[]}}},data:function(){return{}},methods:{jump:function(t){"/login"===t?(sessionStorage.removeItem("userInfo"),this.$router.push({path:t})):this.$route.path!==t&&this.$router.push({path:t})}}},u=o,c=(n("9570"),n("2877")),l=Object(c["a"])(u,i,r,!1,null,"4e401712",null),p=l.exports,f={components:{menuVertical:p},data:function(){return{userInfo:{},catalogList:[{title:"主页",path:"/"},{title:"用户列表",path:"/userList"},{title:"相册",path:"/album"},{title:"标题四",path:"/userList"},{title:"注销",path:"/login"}]}},beforeCreate:function(){this.userInfo=JSON.parse(sessionStorage.getItem("userInfo"))},methods:{}},h=f,m=(n("9a03"),Object(c["a"])(h,a,s,!1,null,"bbdba3e6",null));e["default"]=m.exports},a760:function(t,e,n){t.exports=n.p+"img/3.928316da.jpg"},f832:function(t,e,n){}}]);
//# sourceMappingURL=chunk-f3b46484.546a6ace.js.map