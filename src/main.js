import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from "vue-router"
import routes  from "./router.js"
import Axios from "axios";
import Vuex from "vuex";
import store from "./vuex/store";
import Cookie from "@/util/cookie.js"
// 引入vuex 进行全局状态管理
import {changeIndex} from "./vuex/actions";
import {changeLoading} from "./vuex/getters";

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
            //    if(to.hash) {
            //        return {
            //            selector:to.hash
            //        }
            //    }
      }
});
// 注册全局的构子 路由
 router.beforeEach((to,from,next) => {

      console.log("from.fullPath");
      console.log(Cookie.get("express"));
      // 这里是对于 登录时的 状态验证
      if(to.fullPath == "/login") {
           Cookie.delete("express");
      }
      if(to.fullPath != "/login" && !Cookie.get("express")) {
              next({
                  path:"/login",
              })
      }else {
               next();
      }
      // 判断是否已经登录
      // 权限管理 路由跳转前进行权限验证
      // 从运营位管理 选择快递页面的 添加返回时出现提示框
      if(from.path == "/addData" && router.app.$store.state.loadingFlag == false) {
          next({
              path:"/addData",
          })
       }else{
           router.app.$store.state.loadingFlag = false;
           next();
      }
  });
new Vue({
  // el: '#app',
    router,
    store,
    render:h=>h(App)
}).$mount("#app");
