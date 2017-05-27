<template>
    <div class="home">
        <div class="main">
            <loading v-show="loading"></loading>
            <router-view :route="route"></router-view>
        </div>
        <circleComponent  v-if="!resourceShow"></circleComponent>
    </div>

</template>
<script>
    import circleComponent from './circle.vue'
    import {mapGetters} from 'vuex'
    export default{
        data(){
            return {
                msg: 'home',
                route:'',
                timelineData:null
            }
        },
        computed:mapGetters([
            'loading',
            'resourceShow'
        ]),
        components: {
            circleComponent,
        },
        mounted(){
            this.fetchData();
            this.$store.dispatch('CHANGE_ROUTE',{color:this.$route.params.color,item:this.$route.params.item});
            this.circleFn();
            this.resourceShowFn();
        },
        updated(){
            this.resourceShowFn();
        },
        methods: {
            fetchData(){
                var _this = this;
                this.$ajax.get('src/data/timeline.data').then(function (res) {
                    _this.timelineData = eval("(" + res.data + ")");
                    _this.$store.dispatch('STORE_TIMELINEALL', {timelineAll: _this.timelineData});
                    _this.$store.dispatch('CHANGE_TIMELINE_MSG');
                    _this.thenFn();
                }).catch(function (err) {
                    console.log(err);
                });
            },
            thenFn(){
                var This=this;
                if (this.$route.params.color || this.$route.params.item) {
                    if (!this.$route.params.item) {
                        console.log(this.$store.getters.backToLineBtnStatus)
                        if (!this.$store.getters.backToLineBtnStatus) {
//                            alert(2)
                            this.$store.dispatch('RESET_ITEMLINE');
                        } else {
                            this.$store.dispatch('BACK_TO_LINE').then(function () {
                                This.$store.dispatch('BACK_TO_LINE_BTN_UP');
                            });
                        }
                    }
                }
            },
            circleFn(){
                if(!this.$route.params.color&&!this.$route.params.item){
                    this.$store.dispatch('CIRCLE_UP');
                }else {
                    this.$store.dispatch('CIRCLE_DOWN');
                }
            },
            resourceShowFn(){
                if(this.$route.path.indexOf('resource')!=-1){
                    this.$store.dispatch('RESOURCE_SHOW');
                    $('.resource').removeClass('slideOutRight').addClass('animated slideInLeft');
                }else {
                    this.$store.dispatch('RESOURCE_HIDE');
                    $('.resource').removeClass('slideInLeft').addClass('animated slideOutRight');
                }
            }
        },
        watch: {
            $route(to,from){
                var _this=this;
                this.route=this.$route.params.color;
                this.$store.dispatch('CHANGE_ROUTE',{color:this.$route.params.color,item:this.$route.params.item}).then(function () {
                    _this.thenFn();
                    _this.$store.dispatch('CHANGE_DETAIL_MSG')
                });
                _this.circleFn();

            }
        },
    }
</script>
<style>
    .home{
        width: 100%;
        height: 100%;
        background-size: 10px 10px;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;
    }
    .main{
        width: 100%;
        height: 100%;
        background: #f4f0ef;
    }

</style>