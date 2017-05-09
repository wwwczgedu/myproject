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
//    import timelineData from '../data/timeline';

    import DetailPage from  './detailPage.vue';
    import Item from  './item.vue';

    import { mapGetters,mapActions } from 'vuex';

    export default{
        data(){
            return{
                timelineData:{item:[]},
                centerIndex:0,
                tabDirection:'prev',
                detailRoute:''
            }
        },
        mounted(){
            this.fetchData();
            this.$store.dispatch('CHANGE_TIMELINE_MSG',{timelineMsg:this.msg});
        },
        computed:{
            msg:function(){
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
            fetchData(){
                var _this=this;
                this.$ajax.get('src/data/timeline.data').then(function(res){
                    _this.timelineData=eval("("+res.data+")");
//                    console.log(_this.timelineData)
                }).catch(function(err){
                    console.log(err);
                });
            },
            prevFn(){
                this.$store.dispatch('PREV',{store:this.$store});
            },
            nextFn(){
                this.$store.dispatch('NEXT',{store:this.$store});
            },
        },
        watch: {
            $route(to,from){
//                console.log(this.$route.params)
                this.detailRoute=this.$route.params.item;
                this.$store.dispatch('CHANGE_TIMELINE_MSG',{timelineMsg:this.msg});
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