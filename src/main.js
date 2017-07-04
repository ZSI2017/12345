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

Vue.use(ElementUI);
Vue.use(VueRouter);
//  axios  加入到 vue 的原型方法中
Object.defineProperty(Vue.prototype, '$http', { value: Axios })

console.log(routes);
const router = new VueRouter({
      routes
});
// 注册全局的构子 路由
 // router.beforeEach((to,from,next) => {
 //        //  console.log("to: "+to+"  from:"+from+"  next:"+next);
 //  });
new Vue({
  // el: '#app',
    router,
    render:h=>h(App)
}).$mount("#app");
