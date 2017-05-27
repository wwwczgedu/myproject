<template>
    <router-link tag="div" to="/resource/book/page/1" class="menu" v-show="!resourceShow">
        {{msg}}
    </router-link>
</template>
<script>
    import { mapGetters,mapActions } from 'vuex';
    export default{
        data(){
            return{
                msg:'menu。'
            }
        },
        computed:mapGetters([
            'resourceShow'
        ])
    }
</script>
<style>
.menu{
    color: gray;
    font-size: 40px;
    z-index: 300;
    position: absolute;
    top: 30px;
    left: 50px;
    cursor: pointer;
    text-shadow: #9a9fca 1px 1px 3px;
    font-family: cursive;
}
</style>