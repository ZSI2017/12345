// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
// import App from './App'
// import router from './router/index.js'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
//
// Vue.use(Element);
// Vue.config.productionTip = false
// /* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   // template: '<App/>',
//   // components: { App }
//   render:h => h(App)
// })
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import VueRouter from "vue-router"
import routes  from "./router.js"
import Axios from "axios";
import Vuex from "vuex";
import store from "./vuex/store"

// 引入vuex 进行全局状态管理
import {changeIndex} from "./vuex/actions";
import {changeLoading} from "./vuex/getters";


Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
//  axios  加入到 vue 的原型方法中
Object.defineProperty(Vue.prototype, '$http', { value: Axios })

console.log(routes);
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
      // 从运营位管理 选择快递页面的 添加返回时出现提示框
      if(from.path == "/addData") {


      }
         console.log(to);
         console.log(from);
         console.log("  next:"+next);
         next();
  });
new Vue({
  // el: '#app',
    router,
    store,
    render:h=>h(App)
}).$mount("#app");
