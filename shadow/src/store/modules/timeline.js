/**
 * Created by Administrator on 2017/5/3 0003.
 */
import * as types from '../types'

// initial state
const state = {
    btnColor:{
        item:["marine","red","blue","gray","orange","green","purple"],
        colorValue:{
            "marine":"#657cb2",
            "red":"#7f2d2a",
            "blue":"#78bad3",
            "gray":"#585a60",
            "orange":"#f99a2d",
            "green":"#5c9f17",
            "purple":"#654665"
        }
    },
    timelineAll:null,
    timelineMsg:[],
    detailMsg:null,
    timelineRoute:null,
    itemRoute:null,
    detailIndexStatus:0,
    tabDirection:null,
    inTimeline:true,
    prevBtnColor:'red',
    nextBtnColor:'red',
    backToLineBtnStatus:false
};

const getters={
    inTimeline: (state) => {
        return state.inTimeline;
    },
    detailIndexStatus: (state) => {
        return state.detailIndexStatus;
    },
    itemRoute: (state) => {
        return state.itemRoute;
    },
    timelineAll: (state) => {
        return state.timelineAll;
    },
    timelineMsg: (state) => {
        return state.timelineMsg;
    },
    detailMsg: (state) => {
        return state.detailMsg;
    },
    timelineRoute: (state) => {
        return state.timelineRoute;
    },
    prevBtnColor: (state) => {
        return state.prevBtnColor;
    },
    nextBtnColor: (state) => {
        return state.nextBtnColor;
    },
    backToLineBtnStatus: (state) => {
        return state.backToLineBtnStatus;
    }
};

// actions
const actions = {
    CHANGE_ROUTE:({commit},payload)=>{
        commit(types.CHANGE_ROUTE,payload);
    },
    CHANGE_TIMELINE_MSG:({commit},payload)=>{
        commit(types.CHANGE_TIMELINE_MSG,payload)
    },
    CHANGE_DETAIL_MSG:({commit})=>{
        commit(types.CHANGE_DETAIL_MSG)
    },
    SET_TIMELINE_LEFT:({dispatch,commit})=>{
        commit(types.SET_TIMELINE_LEFT);
        // return dispatch('CHANGE_TIMELINE_MSG').then(()=>{
        //     commit(types.SET_TIMELINE_LEFT);
        // });

    },
    BACK_TO_LINE:({commit})=>{
        commit(types.BACK_TO_LINE);
    },
    BACK_TO_LINE_BTN_DOWN:({commit})=>{
        commit(types.BACK_TO_LINE_BTN_DOWN);
    },
    BACK_TO_LINE_BTN_UP:({commit})=>{
        commit(types.BACK_TO_LINE_BTN_UP);
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
    TAB_IN_DETAIL:({commit})=> {
        commit(types.TAB_IN_DETAIL);
    },
    RESET_ITEMLINE:({commit})=> {
        commit(types.RESET_ITEMLINE);
    },
    STORE_TIMELINEALL:({commit},payload)=> {
        commit(types.STORE_TIMELINEALL,payload);
    },
    CHANGE_BTN_COLOR:({commit})=> {
        commit(types.CHANGE_BTN_COLOR);
    },
    CIRCLE_COLOR:({commit})=> {
        commit(types.CIRCLE_COLOR);
    },
};

// mutations
const mutations = {
    [types.SET_TIMELINE_LEFT](state){
        // alert(1)
        if(state.itemRoute){
            state.inTimeline=false;
            // console.log(state.timelineRoute)
            // console.log(state.itemRoute)
            // console.log(state.timelineMsg.length)
            for(var i=0;i<state.timelineMsg.length;i++){
                if(state.timelineMsg[i].text.intro==state.itemRoute){
                    state.detailIndexStatus=i;
                }
            }
            var currentItem=$('.item')[state.detailIndexStatus];
            // console.log(currentItem)
            // console.log(state.detailIndexStatus)
            console.log($('.item').length)
            var itemsLeft=-parseFloat(state.timelineMsg[state.detailIndexStatus].pos.left)+window.innerWidth/2-currentItem.offsetWidth/2+'px';

            var translateY=-$(currentItem).offset().top+(window.innerHeight-$(currentItem).height())/2;
            $('.items').css('left',itemsLeft).one('webkitTransitionEnd mozTransitionEnd MSTransitionEnd oTransition transition', function(){

                var item=$('.item');
                for(var i=0;i<item.length;i++){
                    if(i<state.detailIndexStatus){
                        // console.log(1)
                        // alert(33)
                        $(item[i]).addClass('active animated zoomOutLeft');
                    }
                    if(i>state.detailIndexStatus){
                        $(item[i]).addClass('active animated zoomOutRight');
                    }
                    $(item[i]).removeClass('active').css('-webkit-transform','translate('+0+'px, '+0+'px)');
                }
                $($('.item')[state.detailIndexStatus]).addClass('active').css('-webkit-transform','translate('+-350+'px, '+translateY+'px)');
            });
        }


    },
    [types.CHANGE_ROUTE] (state,payload) {
        // alert('CHANGE_ROUTE')
        state.timelineRoute=payload.color;
        state.itemRoute=payload.item;
    },
    [types.CHANGE_TIMELINE_MSG](state,payload){
        var arr=[];
        for (var i=0;i<state.timelineAll.item.length;i++){
            if (state.timelineAll.item[i].color==state.timelineRoute){
                arr.push(state.timelineAll.item[i]);
            }
        }
        state.timelineMsg=arr;
    },
    [types.CHANGE_DETAIL_MSG](state){
        for(var i=0;i<state.timelineMsg.length;i++){
            if(state.itemRoute==state.timelineMsg[i].text.intro){
                state.detailMsg=state.timelineMsg[i];
            }
        }
    },
    [types.BACK_TO_LINE](state){
        // alert('BACK_TO_LINE')
        state.inTimeline=true;
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
        var hash='#/'+state.timelineMsg[state.detailIndexStatus].color;
        window.location.hash=hash;
    },
    [types.BACK_TO_LINE_BTN_DOWN](state){
        state.backToLineBtnStatus=true;
    },
    [types.BACK_TO_LINE_BTN_UP](state){
        state.backToLineBtnStatus=false;
    },
    [types.DETAILPAGE_IN](state){
        state.inTimeline=false;
        $('.detail').addClass('active animated lightSpeedIn');
    },
    [types.DETAILPAGE_OUT](state){
        // alert('DETAILPAGE_OUT')
        state.inTimeline=true;
        $('.detail').removeClass('lightSpeedIn').addClass('active');
    },
    [types.PREV](state,payload){
        state.tabDirection='prev';
        if(state.detailIndexStatus==0){
            for (var i=0;i<state.btnColor.item.length;i++){
                if(state.btnColor.item[i]==state.timelineRoute){
                    var hash='#/'+state.btnColor.item[i-1];
                    if(i==0){
                        hash='#/'+state.btnColor.item[state.btnColor.item.length-1];
                    }
                    console.log(hash)
                    window.location.hash=hash;
                    payload.store.dispatch('RESET_ITEMLINE');
                }
            }
        }else {
            var first=$('.item').first();
            var left=first.offset().left;
            if(left>-window.innerWidth&&state.inTimeline){
                $('.items').css('left',0);
                state.detailIndexStatus=0;
                console.log('左边不够')
            }else if(state.inTimeline){
                payload.store.dispatch('TAB_IN_TIMELINE');
                payload.store.dispatch('CHANGE_BTN_COLOR');
            }
        }
        if(!state.inTimeline){
            $('.detail').removeClass('lightSpeedIn').addClass('active');
            payload.store.dispatch('BACK_TO_LINE');
            payload.store.dispatch('TAB_IN_DETAIL');
            var hash='#/'+state.timelineMsg[state.detailIndexStatus].color+'/'+state.timelineMsg[state.detailIndexStatus].text.intro;
            window.location.hash=hash;
        }

    },
    [types.NEXT](state,payload){
        state.tabDirection='next';
        if(state.detailIndexStatus==state.timelineMsg.length-1){
            for (var i=0;i<state.btnColor.item.length;i++){
                if(state.btnColor.item[i]==state.timelineRoute){
                    var hash='#/'+state.btnColor.item[i+1];
                    if(i==state.btnColor.item.length-1){
                        hash='#/'+state.btnColor.item[0];
                    }
                    window.location.hash=hash;
                    var item=$('.item');
                    for(var i=0;i<item.length;i++){
                        $(item[i]).removeClass('zoomOutLeft').css('-webkit-transform','translate('+0+'px, '+0+'px)');
                    }
                    payload.store.dispatch('RESET_ITEMLINE');
                    console.log(state.detailIndexStatus)
                }
            }

        }else {
            // alert(state.inTimeline)
            var last=$('.item').last();
            var left=last.offset().left;
            var right=window.innerWidth-left-last.width();
            if(right>-window.innerWidth&state.inTimeline){
                var itemLeft=-parseFloat(state.timelineMsg[state.timelineMsg.length-1].pos.left)+window.innerWidth-$('.item').last().width()-30+'px';
                $('.items').css('left',itemLeft);
                console.log('右边不够')
                state.detailIndexStatus=state.timelineMsg.length-1;
            }else if(state.inTimeline){
                payload.store.dispatch('TAB_IN_TIMELINE');
                payload.store.dispatch('CHANGE_BTN_COLOR');
            }
            if(!state.inTimeline){
                console.log(222)
                $('.detail').removeClass('lightSpeedIn').addClass('active');
                payload.store.dispatch('BACK_TO_LINE');
                payload.store.dispatch('TAB_IN_DETAIL');
                var hash='#/'+state.timelineMsg[state.detailIndexStatus].color+'/'+state.timelineMsg[state.detailIndexStatus].text.intro;
                window.location.hash=hash;
            }
        }




    },
    [types.TAB_IN_TIMELINE](state){
        // console.log(state.timelineMsg)
        if(state.tabDirection=='prev'){
            state.detailIndexStatus-=3;
        }else{
            state.detailIndexStatus+=3;
        }
        // console.log('jjjjjjjjjjjj')
        console.log(state.detailIndexStatus)
        console.log('TAB_IN_TIMELINE')
        var itemsLeft=-parseFloat(state.timelineMsg[state.detailIndexStatus].pos.left)+window.innerWidth/2-$('.item')[state.detailIndexStatus].offsetWidth/2+'px';
        $('.items').css('left',itemsLeft);
    },
    [types.TAB_IN_DETAIL](state){
        // console.log(state.timelineMsg)
        if(state.tabDirection=='prev'){
            state.detailIndexStatus-=1;
        }else{
            state.detailIndexStatus+=1;
        }
        // console.log(state.detailIndexStatus)
        console.log('TAB_IN_DETAIL')
        var itemsLeft=-parseFloat(state.timelineMsg[state.detailIndexStatus].pos.left)+window.innerWidth/2-$('.item')[state.detailIndexStatus].offsetWidth/2+'px';
        $('.items').css('left',itemsLeft);
    },
    [types.RESET_ITEMLINE](){
        // alert('RESET_ITEMLINE')
        $('.items').css('left',0);
        var item=$('.item');
        for(var i=0;i<item.length;i++){
            $(item[i]).removeClass('active lightSpeedIn zoomOutLeft zoomOutRight zoomInLeft zoomInRight rollIn').css('-webkit-transform','translate('+0+'px, '+0+'px)').addClass('animated rollOut').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                $(this).removeClass('rollOut zoomOutLeft zoomOutRight');
                // alert(44)
                $(this).addClass('rollIn')
            });
        }
        state.inTimeline=true;
        state.detailIndexStatus=0;
    },
    [types.STORE_TIMELINEALL](state,payload){
        state.timelineAll=payload.timelineAll;
    },
    [types.CHANGE_BTN_COLOR](state){
        state.prevBtnColor = state.nextBtnColor = state.btnColor.colorValue[state.timelineRoute];
        if(state.detailIndexStatus==0){
            for (var i=0;i<state.btnColor.item.length;i++){
                if(state.btnColor.item[i]==state.timelineRoute){
                    state.prevBtnColor=state.btnColor.colorValue[state.btnColor.item[i-1]];
                    if(i==0){
                        state.prevBtnColor=state.btnColor.colorValue[state.btnColor.item[state.btnColor.item.length-1]];
                    }
                }
            }
        }else if(state.detailIndexStatus==state.timelineMsg.length-1){
            for (var i=0;i<state.btnColor.item.length;i++){
                if(state.btnColor.item[i]==state.timelineRoute){
                    state.nextBtnColor=state.btnColor.colorValue[state.btnColor.item[i+1]];
                    if(i==state.btnColor.item.length-1){
                        state.nextBtnColor=state.btnColor.colorValue[state.btnColor.item[0]];
                    }
                }
            }
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}