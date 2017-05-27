<template>
    <div class="chapter">
        <div class="bottom">
            <Item :msg="msg"></Item>
            <div class="tab">
                <div class="prev" @click="prevFn">
                    <img src="../assets/images/button/timeline-prev-btn.png" alt="">
                    <div class="arrow-warp" :style="{backgroundColor:prevBtnColor}">
                        <img src="../assets/images/button/icon_arrow_left.png" alt="">
                    </div>
                </div>
                <div class="next" @click="nextFn">
                    <img src="../assets/images/button/timeline-next-btn.png" alt="">
                    <div class="arrow-warp" :style="{backgroundColor:nextBtnColor}">
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
//    import timelineData from '../data/timeline';

    import DetailPage from  './detailPage.vue';
    import Item from  './item.vue';

    import { mapGetters,mapActions } from 'vuex';

    export default{
        data(){
            return{
                msg:null,
                timelineData:{item:[]},
                centerIndex:0,
                tabDirection:'prev',
                detailRoute:'',
                prevBtnColor:'',
                nextBtnColor:''
            }
        },
        mounted(){
            this.fetchData();
            this.getMsg();
            this.getBtnColor();
        },
        updated(){
            this.getBtnColor();
            if(this.$route.params.item){
                this.$store.dispatch('SET_TIMELINE_LEFT');
            }
        },
        computed:{

        },
        components: {
            DetailPage,
            Item
        },
        methods:{
            fetchData(){
                var _this=this;
                this.$ajax.get('src/data/timeline.data').then(function(res){
                    _this.timelineData=eval("("+res.data+")");
                    _this.getMsg();
                    _this.$store.dispatch('CHANGE_TIMELINE_MSG',{timelineMsg:_this.timelineMsg,timelineAll:_this.timelineData});
                    _this.$store.dispatch('SET_TIMELINE_LEFT');
                }).catch(function(err){
                    console.log(err);
                });
            },
            getMsg(){
                var arr=[];
                for (var i=0;i<this.timelineData.item.length;i++){
                    if (this.timelineData.item[i].color==this.$store.getters.timelineRoute){
                        arr.push(this.timelineData.item[i]);
                    }
                }
                this.msg=arr;
            },
            prevFn(){
                this.$store.dispatch('PREV',{store:this.$store});
                this.getBtnColor();
            },
            nextFn(){
                this.$store.dispatch('NEXT',{store:this.$store});
                this.getBtnColor();
            },
            getBtnColor(){
                this.$store.dispatch('CHANGE_BTN_COLOR');
                this.prevBtnColor=this.$store.getters.prevBtnColor;
                this.nextBtnColor=this.$store.getters.nextBtnColor;
            }
        },
        watch: {
            $route(to,from){
                this.detailRoute=this.$route.params.item;
                this.$store.dispatch('CHANGE_TIMELINE_MSG',{timelineMsg:this.msg});
                this.getMsg();
                this.getBtnColor();
                if(this.$route.params.item){
                    this.$store.dispatch('SET_TIMELINE_LEFT');
                }
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
        z-index: 11;
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