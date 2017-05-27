/**
 * Created by Administrator on 2017/5/3 0003.
 */
import * as types from '../types'

// initial state
const state = {
    movieSearch:'one piece',
    moviePage:'1',
    movieTotal:''
};

const getters={
    movieSearch: (state) => {
        return state.movieSearch;
    },
    moviePage: (state) => {
        return state.moviePage;
    },
    movieTotal: (state) => {
        return state.movieTotal;
    },
};

// actions
const actions = {
    CHANGE_MOVIE_SEARCH:({commit},payload)=>{
        commit(types.CHANGE_MOVIE_SEARCH,payload);
    },
    CHANGE_MOVIE_TOTAL:({commit},payload)=>{
        commit(types.CHANGE_MOVIE_TOTAL,payload);
    },
    CHANGE_MOVIE_PAGE:({commit},payload)=>{
        commit(types.CHANGE_MOVIE_PAGE,payload);
    },
};

// mutations
const mutations = {
    [types.CHANGE_MOVIE_SEARCH](state,payload){
        state.movieSearch=payload.search;
    },
    [types.CHANGE_MOVIE_PAGE](state,payload){
        state.moviePage=payload.page;
    },
    [types.CHANGE_MOVIE_TOTAL](state,payload){
        state.movieTotal=payload.movieTotal;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
}