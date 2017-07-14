import Vue from "vue";
import Vuex from "vuex";
import * as actions from "./actions";
import * as getters from "./getters";
import * as func from './function';

Vue.use(Vuex);

const state = {
    loadingFlag :false
}

const mutations = {
     CHANGESTATUS(state) {
         state.loadingFlag= !state.loadingFlag;
     }
}

export default new Vuex.Store({
      actions,
      getters,
      state,
      mutations

})
//
