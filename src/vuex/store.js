import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);



const state = {
      loadingFlag :false
};

const mutations = {
     CHANGESTATUS(state) {
         state.loadingFlag= !state.loadingFlag
     },
}

export default new Vuex.Store({
      state,
      mutations
})
//
