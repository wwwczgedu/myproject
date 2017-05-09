/**
 * Created by Administrator on 2017/5/2 0002.
 */
import * as types from './types'
const state={
    loading:true
};
const mutations={
    [types.LOADING_SHOW](state){
        state.loading=true;
    },
    [types.LOADING_HIDE](state){
        state.loading=false;
    }
};
const getters={
    loading:state=>{
        return state.loading;
    },
};
export default {
    state,
    mutations,
    getters
}