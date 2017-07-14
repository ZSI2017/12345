// export const changeLoading = function({dispatch,state},value) {
//           dispatch('CHANGESTATUS',value)
// }

export default {
    editform: ({commit}, row) => commit('EDITFORM', {items: row})
}

