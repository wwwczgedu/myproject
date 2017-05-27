<template>
    <div class="resource">
        <div class="main">
            <nav class="navbar navbar-default navbar-fixed-top">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">ONE PIECE</a>
                    </div>
                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <li :class="resourceRoute=='book'?'active':''"><router-link tag="a" to="/resource/book/page/1">BOOK <span class="sr-only">(current)</span></router-link></li>
                            <li :class="resourceRoute=='movie'?'active':''"><router-link tag="a" to="/resource/movie/page/1">MOVIE</router-link></li>
                        </ul>
                        <form class="navbar-form navbar-left">
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="Search" v-model="search" @keydown.enter.prevent="searchFn">
                            </div>
                            <div class="btn btn-default" id="search" @click="searchFn">Submit</div>
                        </form>
                        <ul class="nav navbar-nav navbar-right backHome">
                            <li><router-link tag="div" :to="'/'">{{msg}}</router-link></li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </div><!-- /.container-fluid -->
            </nav>
            <div class="content">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script scoped>
    import { mapGetters,mapActions } from 'vuex';
    export default{
        data(){
            return{
                msg:'×',
                route:'',
                search:''
            }
        },
        mounted(){
            this.changeRoute();
        },
        computed:mapGetters([
            'loading',
            'resourceShow',
            'resourceRoute',
            'bookSearch',
            'movieSearch'
        ]),
        methods:{
            changeRoute(){
                this.route=this.$route.path.split('/')[2];
                this.$store.dispatch('CHANGE_RESOURCE_ROUTE',{resourceRoute:this.route});
            },
            searchFn(){

                if(this.resourceRoute=='book'){
                    this.$store.dispatch('CHANGE_BOOK_SEARCH',{search:this.search});
                }
                if(this.resourceRoute=='movie'){
                    this.$store.dispatch('CHANGE_MOVIE_SEARCH',{search:this.search});
                }
            }
        },
        watch: {
            $route(to,from){
                this.changeRoute();
            }
        },
    }
</script>
<style>
    .resource .main{
        overflow-x: hidden;
        overflow-y: auto;
    }
    .resource{
        width: 100%;
        height: 100%;
        position: relative;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        /*overflow: hidden;*/
    }
    .navbar{
        background: #f4f0ef;
    }
    .resource .navbar .btn {
        width: 0px;
        height: 0px;
        border: 0;
        position: absolute;
        opacity: 1;
        padding: 0;
        left: 470px;
        top: 16px;
    }
    .backHome{
        display: inline-block;
        color: gray;
        font-size: 50px;
        position: absolute;
        cursor: pointer;
        font-weight: 100;
        /*text-shadow: #9a9fca 1px 1px 3px;*/
        /*font-family: cursive;*/
        right: 50px;
        top:-10px;
    }
    .resource .content{
        position: relative;
        padding-top: 20px;
        margin-top: 50px;
    }
    #search{
        width: 60px;
        height: 32px;
        line-height: 32px;
        border-radius: 3px;
        position: initial;
        border: 1px solid #ccc;
    }
</style>