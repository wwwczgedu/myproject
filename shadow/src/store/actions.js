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
    }
}