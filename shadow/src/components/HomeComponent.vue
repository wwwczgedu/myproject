<template>
    <div class="home">
        <div class="main">
            <loading v-show="loading"></loading>
            <router-view :route="route"></router-view>
        </div>
        <circleComponent></circleComponent>
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

            }
        },
        computed:mapGetters([
            'loading'
        ]),
        components: {
            circleComponent,
        },
        watch: {
            $route(to,from){
                this.route=this.$route.params.color;
                this.$store.dispatch('CHANGE_ROUTE',{color:this.$route.params.color,item:this.$route.params.item});
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