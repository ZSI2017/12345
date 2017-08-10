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
export const setAuthority = ({commit,state},value) => {
       commit('SETAUth',value)
}
export const setLoginOutFlag= ({commit,state},value) => {
       commit('SETLOGINOUT',value)
}
export const setIsAuthority= ({commit,state},value) => {
       commit('SETISAUTHORITY',value)
}
