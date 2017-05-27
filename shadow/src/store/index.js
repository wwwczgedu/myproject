/**
 * Created by Administrator on 2017/5/2 0002.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import timeline from './modules/timeline'
import book from './modules/book'
import movie from './modules/movie'
Vue.use(Vuex);
export default new Vuex.Store({
    actions,
    modules: {
        mutations,
        timeline,
        book,
        movie
    }
})
