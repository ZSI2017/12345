 import * as func from './function';

 export const  getLoadingFlag = state =>state.loadingFlag;

export default {
    GETEDITFORM(states, row){
        func.local.set(states);
    }
}
