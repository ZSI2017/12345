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



import http from "@/util/http.js"

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
//  axios  加入到 vue 的原型方法中
Object.defineProperty(Vue.prototype, '$http', { value: http})
// console.log(routes);

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
// 注册全局的构子 路由
 router.beforeEach((to,from,next) => {

    // console.log(store.dispatch('changeLoading'));
    // console.log(store.getters);
      // 这里是对于 登录时的 状态验证
      if(to.fullPath == "/login") {

           Cookie.delete("express");
      }
      if(to.fullPath != "/login" && !Cookie.get("express")) {
           Cookie.delete("express");
              next({
                  path:"/login",
              });
      }else {
      //  记录即将进入的路由
        store.dispatch('changeNextRouter',to.fullPath);
        // &&
        // 判断是否已经登录
        // 权限管理 路由跳转前进行权限验证
        // 从运营位管理 选择快递页面的 添加返回时出现提示框
        if(((from.path == "/sendExpress/addData")
          ||(from.path == "/chooseExpress/addData")
          ||(from.path == "/expressOrder/addData")
          ||(from.path == "/sendExpressEnter/addData")
          ||(from.path == "/noticeManage/addData")
          ||(from.path == "/nearExpress/addData")
          ||(from.path == "/oneCitySend/addData")
        )&&store.getters.getLoadingChange === false) {

            // console.log("to login");
            // console.log(to);
            store.dispatch('changeLoadingFlag');
            next({path:from.path});
         }else{
          //  router.app.$store.state.loadingChange = false
           store.dispatch('changeLoadingChange',false);
            //  router.app.$store.state.loadingFlag = false;
             next();
        }
      }

  });
new Vue({
  // el: '#app',
    router,
    store,
    render:h=>h(App)
}).$mount("#app");
