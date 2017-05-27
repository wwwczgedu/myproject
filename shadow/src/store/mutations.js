/**
 * Created by Administrator on 2017/5/2 0002.
 */
import * as types from './types'
const state={
    loading:true,
    circle:true,
    resourceShow:false,
    resourceRoute:''
};
const mutations={
    [types.LOADING_SHOW](state){
        state.loading=true;
    },
    [types.LOADING_HIDE](state){
        state.loading=false;
    },
    [types.CIRCLE_UP](state){
        state.circle=true;
    },
    [types.CIRCLE_DOWN](state){
        state.circle=false;
    },
    [types.RESOURCE_SHOW](state){
        state.resourceShow=true;
    },
    [types.RESOURCE_HIDE](state){
        state.resourceShow=false;
    },
    [types.CHANGE_RESOURCE_ROUTE](state,payload){
        state.resourceRoute=payload.resourceRoute;
    },
};
const getters={
    loading:state=>{
        return state.loading;
    },
    circle:state=>{
        return state.circle;
    },
    resourceShow:state=>{
        return state.resourceShow;
    },
    resourceRoute:state=>{
        return state.resourceRoute;
    },
};
export default {
    state,
    mutations,
    getters
}