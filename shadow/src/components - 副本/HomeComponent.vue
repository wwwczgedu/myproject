<template>
    <div class="home">
        <div class="main">
            <router-view :route="route"></router-view>
        </div>
        <circleComponent></circleComponent>
    </div>
</template>
<script>
    import circleComponent from './circle.vue';
    export default{
        data(){
            return {
                msg: 'home',
                route:''
            }
        },
        components: {
            circleComponent
        },
        watch: {
            $route(to,from){
                this.route=this.$route.params.color;
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
        /*overflow-x: auto;*/

    }
    .main{
        width: 100%;
        height: 100%;
        background: #f4f0ef;
    }

</style>