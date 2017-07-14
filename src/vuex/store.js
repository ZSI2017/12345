import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import * as func from './function';

Vue.use(Vuex);

// const editForm = {
//           operationsMapName:"",
//           link:"",
//           address:"",
//           activeTime:"",
//           currentState:"",
//           Forder:""
//       }

const state = func.local.get() || {
    editform: [],
    loadingFlag :false
}

const mutations = {
     CHANGESTATUS(state) {
         state.loadingFlag= !state.loadingFlag;
     },
     EDITFORM(states){
        func.local.set(states);
    },
}

/* 从本地存储读取数据 */
for(var item in state){
  localStorage.getItem(item)?
    state[item] = JSON.parse(localStorage.getItem(item)): false;
}

export default new Vuex.Store({
      actions,
      getters,
      state,
      mutations
})
//
