<template>
    <div class="chapter">
        <div class="bottom">
            <Item :msg="msg"></Item>
            <div class="tab">
                <div class="prev" @click="prevFn">
                    <img src="../assets/images/button/timeline-prev-btn.png" alt="">
                    <div class="arrow-warp">
                        <img src="../assets/images/button/icon_arrow_left.png" alt="">
                    </div>
                </div>
                <div class="next" @click="nextFn">
                    <img src="../assets/images/button/timeline-next-btn.png" alt="">
                    <div class="arrow-warp">
                        <img src="../assets/images/button/icon_arrow_right.png" alt="">
                    </div>
                </div>
            </div>
            <transition enter-active-class="active animated lightSpeedIn" leave-active-class="animated rollOut">
                <router-view :timelineData="timelineData" :detailRoute="detailRoute"></router-view>
            </transition>
        </div>
    </div>
</template>
<script>
    import timelineData from '../data/timeline';
    import graphicData from '../data/graphic';

    import DetailPage from  './detailPage.vue';
    import Item from  './item.vue';

    import { mapGetters,mapActions } from 'vuex';

    export default{
        data(){
            return{
                timelineData,
                graphicData,
                centerIndex:0,
                tabDirection:'prev',
                detailRoute:''
            }
        },
        mounted(){

        },
        computed:{
            msg(){
                var arr=[];
                for (var i=0;i<this.timelineData.item.length;i++){
                    if (this.timelineData.item[i].color==this.route){
                        arr.push(this.timelineData.item[i]);
                    }
                }
                return arr;
            },
        },
        components: {
            DetailPage,
            Item
        },
        methods:{

            prevFn(){
                this.tabDirection='prev';
                var first=$('.item').first();
                var left=first.offset().left;
                if(left>-window.innerWidth){
                    $('.items').css('left',0);
                    this.centerIndex=0;
                }else {
                    this.tabFn();
                }
            },
            nextFn(){
                this.tabDirection='next';
                var last=$('.item').last();
                var left=last.offset().left;
                var right=window.innerWidth-left-last.width();
                if(right>-window.innerWidth){
                    var itemLeft=-parseFloat(this.msg[this.msg.length-1].pos.left)+window.innerWidth-$('.item').last().width()-30+'px';
                    $('.items').css('left',itemLeft);
                    this.centerIndex=this.msg.length-1;
                }else {
                    this.tabFn();
                }
            },
            tabFn(){
                if(this.tabDirection=='prev'){
                    this.centerIndex-=3;
                }else{
                    this.centerIndex+=3;
                }
                this.setitemsLeft();
            },
            setitemsLeft(){
                var itemsLeft=-parseFloat(this.msg[this.centerIndex].pos.left)+window.innerWidth/2-$('.item')[this.centerIndex].offsetWidth/2+'px';
                $('.items').css('left',itemsLeft);
            }
        },
        watch: {
            $route(to,from){
                this.detailRoute=this.$route.params.item;
            }
        },
        props:{
            route:{
                type:String,
                default: function () {
                    return {
                        route
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .chapter{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .bottom{
        width: 100%;
        height: 100%;
        background: url("../assets/images/timeline-floor.jpg") no-repeat;
        background-position: left bottom;

    }
    .tab .prev,.tab .next{
        position: absolute;
        top: 50%;
        margin-top: -30px;
        transition: .5s;
    }
    .tab .prev{
        left: -6px;
    }
    .tab .next{
        right: -6px;
    }
    .tab .prev:hover{
        left: 0;
    }
    .tab .next:hover{
        right: 0;
    }
    .tab .arrow-warp{
        width: 27px;
        height: 27px;
        border-radius: 50%;
        background: greenyellow;
        position: absolute;
        top: 50%;
        margin-top: -13px;
    }
    .tab .prev .arrow-warp{
        right: 20px;
    }
    .tab .next .arrow-warp{
        left: 20px;
    }
    .tab .prev .arrow-warp img{
        margin-left: -3px;
        margin-top: 5px;
    }
    .tab .next .arrow-warp img{
        margin-top: 5px;
    }
</style>