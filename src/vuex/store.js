import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import * as func from './function';

Vue.use(Vuex);

const state = {
    loadingFlag :false,    // 记录是否 弹出 离开提示的弹框
    loadingChange:false,   // 记录是否 要进行 离开的路由监控
    nextRouter:'',          // 记录即将进入 的路由路径
    uid:'',               // 记录用户的uid
    authority:'',     // 记录 当前用户的权限
    loginOutFlag:false,    // 记录 是否点击登出 按钮
    isAuthority:true,     // 默认是不开启 权限登录；
}

const mutations = {
     CHANGESTATUS(state) {
         state.loadingFlag= !state.loadingFlag;
     },
     SETNEXTROUTER(state,nextRouter) {
          state.nextRouter = nextRouter;
     },
     CHANGELOADINGCHANGE(state,flag) {
          state.loadingChange = flag;
     },
     SETUID(state,uid) {
          state.uid = uid;
     },
     SETAUth(state,str) {
           state.authority = str;
     },
     SETLOGINOUT(state,flag) {
          state.loginOutFlag = flag;
     },
     SETISAUTHORITY(state,flag) {
          state.isAuthority = flag;
     }

}

export default new Vuex.Store({
      actions,
      getters,
      state,
      mutations

})
//
