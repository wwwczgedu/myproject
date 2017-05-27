/**
 * Created by Administrator on 2017/5/3 0003.
 */
import * as types from '../types'

// initial state
const state = {
    bookSearch:'one piece',
    bookPage:'1',
    bookTotal:''
};

const getters={
    bookSearch: (state) => {
        return state.bookSearch;
    },
    bookPage: (state) => {
        return state.bookPage;
    },
    bookTotal: (state) => {
        return state.bookTotal;
    },
};

// actions
const actions = {
    CHANGE_BOOK_SEARCH:({commit},payload)=>{
        commit(types.CHANGE_BOOK_SEARCH,payload);
    },
    CHANGE_BOOK_TOTAL:({commit},payload)=>{
        commit(types.CHANGE_BOOK_TOTAL,payload);
    },
    CHANGE_BOOK_PAGE:({commit},payload)=>{
        commit(types.CHANGE_BOOK_PAGE,payload);
    },
};

// mutations
const mutations = {
    [types.CHANGE_BOOK_SEARCH](state,payload){
        state.bookSearch=payload.search;
    },
    [types.CHANGE_BOOK_PAGE](state,payload){
        state.bookPage=payload.page;
    },
    [types.CHANGE_BOOK_TOTAL](state,payload){
        state.bookTotal=payload.bookTotal;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}