<template>
    <!--<div>{{msg}}</div>-->
    <div class="book">
        <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-3 bookItem" v-for="item in msg.books">
                <router-link tag="div" :to="'/resource/book/page/'+bookPage+'/'+item.id" class="thumbnail">
                    <img :src="item.image" alt="">
                    <div class="caption">
                        <h4>{{item.title}}</h4>
                        <h5>{{item.subtitle}}</h5>
                        <p>{{item.author}}</p>
                        <ul>
                            <li v-for="tag in item.tags" class="tag">{{tag.name}}</li>
                        </ul>
                    </div>
                </router-link>
            </div>
        </div>
        <Pagination :bookPage="bookPage" :bookTotal="bookTotal" :resourceRoute="resourceRoute"></Pagination>
        <transition enter-active-class="active animated slideInUp" leave-active-class="animated rollOut">
            <router-view v-if="route"></router-view>
        </transition>
    </div>

</template>
<script>
    import Pagination from './pagination.vue';
    import { mapGetters,mapActions } from 'vuex';
    export default{
        data(){
            return{
                msg:'',
                route:''
            }
        },
        components: {
            Pagination,
        },
        created(){
            this.fetchData();
        },
        mounted(){
            this.$store.dispatch('CHANGE_BOOK_PAGE',{page:this.$route.params.page});
            this.changeRoute();
        },
        computed:mapGetters([
            'bookSearch',
            'bookPage',
            'bookTotal',
            'resourceRoute'
        ]),
        methods:{
            fetchData(){
                this.$store.dispatch('LOADING_SHOW');
                var _this=this;
                this.jsonp(
                    'https://api.douban.com/v2/book/search',
                    {
                        "q":_this.bookSearch,
                        "start": _this.bookPage-1,
                        "count": 4
                    },
                    function (res) {
//                        console.log(res)
                        _this.msg=res;
                        _this.$store.dispatch('LOADING_HIDE');
                        _this.$store.dispatch('CHANGE_BOOK_TOTAL',{bookTotal:res.total});
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
            changeRoute(){
                this.route=this.$route.params.bookId;
            }
        },
        watch: {
            $route(){
                this.$store.dispatch('CHANGE_BOOK_PAGE',{page:this.$route.params.page});
                this.changeRoute();
            },
            bookPage:function (val, oldVal) {
                if (val!=oldVal){
                    this.fetchData();
                }
            },
            bookSearch:function (val, oldVal) {
                if (val!=oldVal){
                    this.fetchData();
                }
            }
        }
    }
</script>
<style>
    .book{
        font-family: "华文仿宋";
        color: #0f0f0f;
    }
    .bookItem .thumbnail{
        padding-top: 20px;
        height: 450px;
    }
    .tag{
        list-style:none;
        text-align: left;
        color: orangered;
    }
    .book .caption h4,.book .caption h5,.book .caption p{
        display:block;
        white-space:nowrap;
        overflow:hidden;
        text-overflow:ellipsis;
    }
</style>