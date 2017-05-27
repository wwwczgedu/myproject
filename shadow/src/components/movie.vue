<template>
    <div class="movie">
        <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-3" v-for="item in msg.subjects">
                <div class="thumbnail">
                    <img :src="item.images.medium" alt="">
                    <div class="caption">
                        <h4>{{item.title}}</h4>
                        <h5>{{item.original_title}}</h5>
                        <ul>
                            <li>演员：</li>
                            <li v-if="item.casts.length==0">无</li>
                            <li v-for="casts in item.casts" class="casts">{{casts.name}}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <Pagination :bookPage="moviePage" :bookTotal="movieTotal" :resourceRoute="resourceRoute"></Pagination>
    </div>
</template>
<script>
    import Pagination from './pagination.vue';
    import { mapGetters,mapActions } from 'vuex';
    export default{
        data(){
            return{
                msg:''
            }
        },
        components: {
            Pagination,
        },
        created(){
            this.fetchData();
        },
        mounted(){
            this.$store.dispatch('CHANGE_MOVIE_PAGE',{page:this.$route.params.page});
        },
        computed:mapGetters([
            'movieSearch',
            'moviePage',
            'movieTotal',
            'resourceRoute',
            'loading'
        ]),
        methods:{
            fetchData(){
                this.$store.dispatch('LOADING_SHOW');
                var _this=this;
                var url='https://api.douban.com/v2/movie/search';
                this.jsonp(
                    url,
                    {
                        q:_this.movieSearch,
                        "start": _this.moviePage-1,
                        "count": 4
                    },
                    function (res) {
                        _this.msg=res;
                        _this.$store.dispatch('LOADING_HIDE');
                        _this.$store.dispatch('CHANGE_MOVIE_TOTAL',{movieTotal:res.total});
                    }
                );
            },
            jsonp(url, data, callback) {
                var querystring = url.indexOf('?') == -1 ? '?' : '&';
                for (var key in data) {
                    querystring += key + '=' + data[key] + '&';
                }
                var fnSuffix = Math.random().toString().replace('.', '');
                var cbFuncName = 'my_json_cb_' + fnSuffix;
                querystring += 'callback=' + cbFuncName;
                var scriptElement = document.createElement('script');
                scriptElement.src = url + querystring;
                window[cbFuncName] = function(data) {
                    callback(data);
                    document.body.removeChild(scriptElement);
                };
                document.body.appendChild(scriptElement);
            },
        },
        watch: {
            $route(){
                this.$store.dispatch('CHANGE_MOVIE_PAGE',{page:this.$route.params.page});
            },
            moviePage:function (val, oldVal) {
                if (val!=oldVal){
                    this.fetchData();
                }
            },
            movieSearch:function (val, oldVal) {
                if (val!=oldVal){
                    this.fetchData();
                }
            }
        }
    }
</script>
<style>
    .movie{
        font-family: "华文仿宋";
        color: #0f0f0f;
    }
    .movie .thumbnail{
        padding-top: 20px;
        height: 400px;
    }
    .movie li{
        text-align: left;
        list-style: none;
        color: orangered;
    }
</style>