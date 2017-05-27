<template>
    <div class="bookDetail">
        <!--<img :src="msg.images.large" alt="">-->
        <h1>{{msg.title}}<span>({{msg.origin_title?msg.origin_title:'无别名'}})</span></h1>
        <h4>作者：{{msg.author=='[]'?msg.author:'无'}}</h4>
        <p>装订：{{msg.binding?msg.binding:'无'}}|出版社：{{msg.publisher?msg.publisher:'无'}}</p>
        <p class="author_intro">作者简介：{{msg.author_intro?msg.author_intro:'无'}}</p>
        <p class="summary">摘要：{{msg.summary?msg.summary:'无'}}</p>
        <router-link tag="div" :to="'/resource/book/page/'+bookPage" class="closeBookDetail">×</router-link>
    </div>
</template>
<script>
    import { mapGetters,mapActions } from 'vuex';
    export default{
        data(){
            return{
                msg:'',
                route:''
            }
        },
        mounted(){
            this.changeRoute();
            this.fetchData();
        },
        computed:mapGetters([
            'bookPage',
        ]),
        methods:{
            fetchData(){
                this.$store.dispatch('LOADING_SHOW');
                var _this=this;
                var url='https://api.douban.com/v2/book/'+this.route;
                this.jsonp(
                    url,
                    {},
                    function (res) {
                        console.log(res)
                        _this.msg=res;
                        _this.$store.dispatch('LOADING_HIDE');
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
            $route(to,from){
                this.changeRoute();
                this.fetchData();
            }
        },
    }
</script>
<style>
    .bookDetail{
        width: 900px;
        background: rgba(235,235,235,0.88);
        position: absolute;
        top: 60px;
        left: 50%;
        margin-left: -450px;
        border-radius: 20px;
        padding: 30px;
        box-shadow: gray 4px 4px 10px;
        cursor: pointer;
    }
    .author_intro,.summary{
        text-align: left;
    }
    .closeBookDetail{
        display: inline-block;
        color: gray;
        font-size: 50px;
        position: absolute;
        cursor: pointer;
        font-weight: 100;
        right: 30px;
        top: 10px;
    }
</style>