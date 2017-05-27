/**
 * Created by Administrator on 2017/5/2 0002.
 */
import * as types from './types'
export default{
    LOADING_SHOW:({commit})=>{
        commit(types.LOADING_SHOW);
    },
    LOADING_HIDE:({commit})=>{
        commit(types.LOADING_HIDE);
    },
    CIRCLE_UP:({commit})=>{
        commit(types.CIRCLE_UP);
    },
    CIRCLE_DOWN:({commit})=>{
        commit(types.CIRCLE_DOWN);
    },
    RESOURCE_SHOW:({commit})=>{
        commit(types.RESOURCE_SHOW);
    },
    RESOURCE_HIDE:({commit})=>{
        commit(types.RESOURCE_HIDE);
    },
    CHANGE_RESOURCE_ROUTE:({commit},payload)=>{
        commit(types.CHANGE_RESOURCE_ROUTE,payload);
    },
}