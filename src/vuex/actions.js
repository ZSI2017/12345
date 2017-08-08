export const changeLoadingFlag = ({commit,state},value) => {
          commit('CHANGESTATUS',value)
};
export const changeNextRouter = ({commit,state},value) =>{
          commit('SETNEXTROUTER',value)
};
export const changeLoadingChange = ({commit,state},value) =>{
          commit('CHANGELOADINGCHANGE',value)
}
export const setUid = ({commit,state},value) => {
       commit('SETUID',value)
}
