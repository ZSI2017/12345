import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";

Vue.use(Vuex);

const editForm = {
          operationsMapName:"",
          link:"",
          address:"",
          activeTime:"",
          currentState:"",
          Forder:""
      }

const state = {
      loadingFlag :false,
      editForm: editForm
};


const mutations = {
     CHANGESTATUS(state) {
         state.loadingFlag= !state.loadingFlag
     },
     setEditForm(state,payload) {
        Object.assign(state.editForm, payload);
      localStorage.setItem('editForm',JSON.stringify(payload));
    }
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
