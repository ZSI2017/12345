import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from "vue-router"
import routes  from "./router.js"
import Axios from "axios";
import Vuex from "vuex";
import Cookie from "@/util/cookie.js"


// 引入vuex 进行全局状态管理
import store from "@/vuex/store.js";
import {changeLoading} from "@/vuex/actions";
import {getLoadingFlag} from "@/vuex/getters";

import localEvent from '@/vuex/function.js';

import PageStore from "@/util/table-store.js"
import http from "@/util/http.js"




Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);



//  axios  加入到 vue 的原型方法中
Object.defineProperty(Vue.prototype, '$http', { value: http})
// console.log(routes);
Object.defineProperty(Vue.prototype,'PageStore',{value:PageStore})

 // Vue的 日志与警告
Vue.config.silent = true

const router = new VueRouter({
      routes,
      scrollBehavior(to,from,savedPosition) {
               if(to.hash) {
                   return {
                       selector:to.hash
                   }
               }
      }
});
function filterMenu(result) {
    let uid= result.userInfo.uid;
    store.dispatch('setUid',uid);
    let pm = result.pm;
    let routerArr = router.options.routes;
    let filterName = [];
    if(pm.Auditor) {
          if(pm.Operator) {
            store.dispatch('setAuthority',"开发者");
              if(pm.CustomerService){
                  filterName = [];
              }else {
                 filterName = ['订单管理','订单取消频次管理',"黑名单管理","开发者工具"];
              }
          }else {
            store.dispatch('setAuthority',"审核");
            if(pm.CustomerService){
              filterName = ["开发者工具"];
            }else {
               filterName = ['订单管理','订单取消频次管理',"黑名单管理","开发者工具"];
            }
          }
   }else {
       if(pm.Operator) {
            store.dispatch('setAuthority',"配置");
           if(pm.CustomerService){
             filterName = ["开发者工具"];
           }else {
              filterName = ['订单管理','订单取消频次管理',"黑名单管理","开发者工具"];
           }
       }else {
         if(pm.CustomerService){
           filterName = ["快递公司管理",'入口管理','运营位管理','公告管理','开发者工具'];
         }else {
            filterName = ['订单管理','订单取消频次管理',"黑名单管理","快递公司管理",'入口管理','运营位管理','公告管理','开发者工具'];
         }
       }
   }
  for (var i = 0; i < routerArr.length; i++) {
       if(routerArr[i].children !== undefined) {
            for(let j =0;j<filterName.length;j++) {
              if(routerArr[i].name === filterName[j] || routerArr[i].children[0].name === filterName[j]) {
                    router.options.routes[i].isHide = true;
               }
            }
       }
     }
}
// 注册全局的构子 路由
 router.beforeEach((to,from,next) => {
        // 模拟 权限管理  {"pm":{"Auditor":true,"Operator":true,"CustomerService":true},"userInfo":{"uid":"123456"}}
       //  隐藏 或者显示 导航菜单 服务类型及折扣改管理
       //&&Cookie.get("SMJSESSIONID")&&Cookie.get("SMJSESSIONID") &&Cookie.get("SMJSESSIONID")  &&Cookie.get("SMJSESSIONID")
      // Cookie.delete("express1");
if(store.getters.getisAuthority)  {
   if(Cookie.get("ECOACLJSESSIONID")&&Cookie.get("ctoken")&&Cookie.get("SMJSESSIONID")&&store.getters.getloginOutFlag === false) {

             console.log("ECOACLJSESSIONIDECOACLJSESSIONIDECOACLJSESSIONIDECOACLJSESSIONID");
             localEvent.get("ACL");
             console.log(localEvent.get("ACL") == '');
           if(localEvent.get("ACL") !== '') {
                 let result = localEvent.get("ACL");
                 filterMenu(result);
           }else {
             http.post('/api/user/info/get',{},(result)=>{
                      if(result.error ==  "ACL_NO_PRIVILEGE"){
                           alert(result.redrect)
                        //  window.location.href =  result.redrect;
                      }
                      console.log("+++++++++++++++++");
                      console.log(result);
                      localEvent.set('ACL',result);
                      filterMenu(result);
                        // router.go(0)
                 });
           }
          //  if(to.fullPath == "/login") {
          //      next({
          //             path:"/home",
          //         });
          //  };
       // 跳转到登录页面

   } else if(to.fullPath == "/login") {
      store.dispatch('setLoginOutFlag',false);
       localEvent.clear("ACL");
      //  Cookie.delete("ECOACLJSESSIONID");
      //  Cookie.delete("SMJSESSIONID");
      //  Cookie.delete("ctoken");
   } else {
       store.dispatch('changeNextRouter',to.fullPath);
      //  alert(from.fullPath);
         console.log(to)
       next({
              path:"/login",
          });
      // window.location.href="http://sendexmng-sit.alipay-eco.com/api/loginProxy?realUrl="+encodeURIComponent(window.location.href);
   }
 } else {
     store.dispatch('setAuthority',"开发者");
 }
    // store.dispatch('setAuthority',"开发者");


      // 这里是对于 登录时的 状态验证

      // if(to.fullPath != "/login" && !Cookie.get("express1")) {
          //  Cookie.delete("express1");
          //     next({
          //         path:"/login",
          //     });
      // }else {

        // &&
        // 判断是否已经登录,,,,
        // 权限管理 路由跳转前进行权限验证
        // 从运营位管理 选择快递页面的 添加返回时出现提示框
        //  记录即将进入的路由
        store.dispatch('changeNextRouter',to.fullPath);
        if(((from.path == "/promotion/sendExpress/addData")
          ||(from.path == "/promotion/chooseExpress/addData")
          ||(from.path == "/promotion/expressOrder/addData")
          ||(from.path == "/sendExpressEnter/addData")
          ||(from.path == "/noticeManage/addData")
          ||(from.path == "/nearExpress/addData")
          ||(from.path == "/oneCitySend/addData")
          ||(from.path == '/expressCompany/addData')
          ||(from.path == "/chooseExpressOrder/addData")
          ||(from.path == "/dev/logismerchant/addData")
          ||(from.path == "/promotion/sendExpress/editData")
          ||(from.path == "/promotion/chooseExpress/editData")
          ||(from.path == "/promotion/expressOrder/editData")
          ||(from.path == "/sendExpressEnter/editData")
          ||(from.path == "/noticeManage/editData")
          ||(from.path == "/nearExpress/editData")
          ||(from.path == "/oneCitySend/editData")
          ||(from.path == '/expressCompany/editData')
          ||(from.path == "/chooseExpressOrder/editData")
          ||(from.path == "/dev/logismerchant/editData")
        )&&store.getters.getLoadingChange === false) {
            store.dispatch('changeLoadingFlag');
            next({path:from.path});
         }else{
          //  router.app.$store.state.loadingChange = false
           store.dispatch('changeLoadingChange',false);
            //  router.app.$store.state.loadingFlag = false;
             next();
        }
      // }
       if((to.path != "/orderManage/main") && (to.path != "/orderManage/orderDetail")){
            localEvent.clear("localorderKeyword");
            localEvent.clear("localorderRadio");
       }
  });
new Vue({
  // el: '#app',
    router,
    store,
    render:h=>h(App)
}).$mount("#app");
