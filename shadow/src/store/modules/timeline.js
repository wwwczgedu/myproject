/**
 * Created by Administrator on 2017/5/3 0003.
 */
import * as types from '../types'

// initial state
const state = {
    timelineMsg:null,
    timelineRoute:null,
    itemRoute:null,
    detailIndexStatus:null,
    tabDirection:null
};

// actions
const actions = {
    CHANGE_ROUTE:({commit},payload)=>{
        commit(types.CHANGE_ROUTE,payload);
    },
    CHANGE_TIMELINE_MSG:({commit},payload)=>{
        commit(types.CHANGE_TIMELINE_MSG,payload)
    },
    SET_TIMELINE_LEFT:({commit})=>{
        commit(types.SET_TIMELINE_LEFT);
    },
    BACK_TO_LINE:({commit})=>{
        commit(types.BACK_TO_LINE);
    },
    DETAILPAGE_IN:({commit})=>{
        commit(types.DETAILPAGE_IN);
    },
    DETAILPAGE_OUT:({commit})=> {
        commit(types.DETAILPAGE_OUT);
    },
    PREV:({commit},payload)=> {
        commit(types.PREV,payload);
    },
    NEXT:({commit},payload)=> {
        commit(types.NEXT,payload);
    },
    TAB_IN_TIMELINE:({commit})=> {
        commit(types.TAB_IN_TIMELINE);
    },
    RESET_ITEMLINE:({commit})=> {
        commit(types.RESET_ITEMLINE);
    },
};

// mutations
const mutations = {
    [types.SET_TIMELINE_LEFT](state){
        for(var i=0;i<state.timelineMsg.length;i++){
            if(state.timelineMsg[i].text.intro==state.itemRoute){
                state.detailIndexStatus=i;
            }
        }
        var currentItem=$('.item')[state.detailIndexStatus];
        var itemsLeft=-parseFloat(state.timelineMsg[state.detailIndexStatus].pos.left)+window.innerWidth/2-currentItem.offsetWidth/2+'px';
        var translateY=-$(currentItem).offset().top+(window.innerHeight-$(currentItem).height())/2;
        $('.items').css('left',itemsLeft).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransition transition', function(){
            var item=$('.item');
            for(var i=0;i<item.length;i++){
                if(i<state.detailIndexStatus){
                    $(item[i]).addClass('active animated zoomOutLeft');
                }
                if(i>state.detailIndexStatus){
                    $(item[i]).addClass('active animated zoomOutRight');
                }
                $(item[i]).removeClass('active').css('-webkit-transform','translate('+0+'px, '+0+'px)');
            }
            $($('.item')[state.detailIndexStatus]).addClass('active').css('-webkit-transform','translate('+-350+'px, '+translateY+'px)');
        });
    },
    [types.CHANGE_ROUTE] (state,payload) {
        state.timelineRoute=payload.color;
        state.itemRoute=payload.item;
    },
    [types.CHANGE_TIMELINE_MSG](state,payload){
        state.timelineMsg=payload.timelineMsg;
    },
    [types.BACK_TO_LINE](state){
        var item=$('.item');
        for(var i=0;i<item.length;i++){
            $(item[i]).removeClass('active zoomOutLeft zoomOutRight').css('-webkit-transform','translate('+0+'px, '+0+'px)');
            if(i<state.detailIndexStatus){
                $(item[i]).addClass('zoomInLeft');
            }
            if(i>state.detailIndexStatus){
                $(item[i]).addClass('zoomInRight');
            }
        }
        if (state.detailIndexStatus==0){
            $('.items').css('left',0);
        }
        if (state.detailIndexStatus==state.timelineMsg.length-1){
            var itemLeft=-parseFloat(state.timelineMsg[state.timelineMsg.length-1].pos.left)+window.innerWidth-$('.item').last().width()-30+'px';
            $('.items').css('left',itemLeft);
        }
    },
    [types.DETAILPAGE_IN](){
        $('.detail').addClass('active animated lightSpeedIn');
    },
    [types.DETAILPAGE_OUT](){
        $('.detail').removeClass('lightSpeedIn').addClass('active');
    },
    [types.PREV](state,payload){
        state.tabDirection='prev';
        var first=$('.item').first();
        var left=first.offset().left;
        if(left>-window.innerWidth){
            $('.items').css('left',0);
            state.detailIndexStatus=0;
        }else {
            payload.store.dispatch('TAB_IN_TIMELINE');
        }
    },
    [types.NEXT](state,payload){
        state.tabDirection='next';
        var last=$('.item').last();
        var left=last.offset().left;
        var right=window.innerWidth-left-last.width();
        if(right>-window.innerWidth){
            var itemLeft=-parseFloat(state.timelineMsg[state.timelineMsg.length-1].pos.left)+window.innerWidth-$('.item').last().width()-30+'px';
            $('.items').css('left',itemLeft);
            state.detailIndexStatus=state.timelineMsg.length-1;
        }else {
            payload.store.dispatch('TAB_IN_TIMELINE');
        }

    },
    [types.TAB_IN_TIMELINE](state){
        console.log(state.timelineMsg)
        if(state.tabDirection=='prev'){
            state.detailIndexStatus-=3;
        }else{
            state.detailIndexStatus+=3;
        }
        var itemsLeft=-parseFloat(state.timelineMsg[state.detailIndexStatus].pos.left)+window.innerWidth/2-$('.item')[state.detailIndexStatus].offsetWidth/2+'px';
        $('.items').css('left',itemsLeft);
    },
    [types.RESET_ITEMLINE](){
        $('.items').css('left',0);
        var item=$('.item');
        for(var i=0;i<item.length;i++){
            $(item[i]).removeClass('active lightSpeedIn zoomOutLeft zoomOutRight zoomInLeft zoomInRight rollIn').css('-webkit-transform','translate('+0+'px, '+0+'px)').addClass('animated rollOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('rollOut').addClass('rollIn');
            });
        }
    }
};

export default {
    state,
    actions,
    mutations
}