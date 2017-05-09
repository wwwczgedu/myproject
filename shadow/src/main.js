import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routerConfig from './router.config'
import store from './store'
import axios from 'axios'
import loading from './components/loading'

Vue.use(VueRouter);
Vue.use(loading);
Vue.prototype.$ajax=axios;
axios.interceptors.request.use((config)=>{
    store.dispatch('LOADING_SHOW');
    return config;
},(error)=>{
    return Promise.reject(error);
});
axios.interceptors.response.use((config)=>{
    store.dispatch('LOADING_HIDE');
    return config;
},(error)=>{
    return Promise.reject(error);
});

const router=new VueRouter(routerConfig);
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
