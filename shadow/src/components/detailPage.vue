<template>
    <div class="detail">
        <div class="back">
            <div class="bg">
                <img src="../assets/images/button/icon_arrow_up.png" alt="">
                <span @click="backToLine">back to timeline</span>
            </div>
        </div>
        <div class="title" :style="{color:detailMsg.colorValue}">{{detailMsg.text.intro}}</div>
        <div class="other">{{detailMsg.text.other}}</div>
        <div class="basic" v-for="(item,index) in detailMsg.detail.basic" key="index">
            {{item[0]}}
            <span class="name">({{item[1]}})</span>
        </div>
        <p class="text1" :style="{color:detailMsg.colorValue}">{{detailMsg.text.intro}}-{{detailMsg.detail.text1}}</p>
        <p class="text2">{{detailMsg.text.intro}}-{{detailMsg.detail.text2}}</p>
        <div class="related">
            <span>Related:</span>
            <div>
                <a :href="item.route" v-for="(item,index) in detailMsg.detail.related" key="index" :style="item.style">
                    <img :src="'./src/assets/images/indexImg'+'/'+item.type+'/'+item.src" alt="">
                </a>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters,mapActions } from 'vuex';
export default{
    data(){
        return{
            msg:{
                text:{},
                detail:{}
            },
            to:null,
            itemLength:0
        }
    },
    computed:mapGetters([
        'detailMsg'
    ]),
    mounted(){
        this.itemLength=$('.item').length;
        if(this.$store.getters.timelineMsg.length==0){
            if(!this.$store.getters.timelineAll){
                this.fetchData();
            }
            else {
                this.$store.dispatch('CHANGE_TIMELINE_MSG');
            }

        }
        if(this.itemLength!=0){
            this.$store.dispatch('SET_TIMELINE_LEFT');
        }

    },
    beforeUpdate(){
        var This=this;
//        if(this.itemLength==0){
            this.$store.dispatch('SET_TIMELINE_LEFT').then(function () {
//                This.itemLength=$('.item').length;
                This.$store.dispatch('CHANGE_BTN_COLOR');
            });
//        }
    },
    methods:{
        fetchData(){
            var _this=this;
            this.$ajax.get('src/data/timeline.data').then(function(res){
                _this.timelineData=eval("("+res.data+")");
                _this.$store.dispatch('STORE_TIMELINEALL',{timelineAll:_this.timelineData});
                _this.$store.dispatch('CHANGE_TIMELINE_MSG',{timelineMsg:_this.timelineMsg,timelineAll:_this.timelineData});
                _this.getMsg();
                _this.$store.dispatch('CHANGE_BTN_COLOR');
                if(res.status==200){
                    return true;
                }

            }).catch(function(err){
                console.log(err);
            });
        },
        getMsg(){
            var _this=this;
            this.$store.dispatch('CHANGE_ROUTE',{color:this.$route.params.color,item:this.$route.params.item}).then(function () {
                _this.$store.dispatch('CHANGE_DETAIL_MSG');
            });
        },
        detailPageIn(){
            this.$store.dispatch('DETAILPAGE_IN');
        },
        detailPageOut(){
            this.$store.dispatch('DETAILPAGE_OUT');
        },
        backToLine(){
            this.$store.dispatch('BACK_TO_LINE');
            this.$store.dispatch('BACK_TO_LINE_BTN_DOWN');
            this.detailPageOut();
        }
    },
    watch: {
        $route(to,from){
            console.log(this.msg)
            if (this.$route.params.item){
                this.detailRoute=this.$route.params.item;
                this.detailPageIn();
            }
            this.to=to.path
        }
    },
    props:{
        timelineData:{
            type: Object,
            default: function () {
                return {
                    timelineData
                }
            }
        },
        detailRoute:{
            type:String,
            default: function () {
                return {
                    detailRoute
                }
            }
        }
    }
}
</script>
<style scoped>
    .detail{
        width: 500px;
        height: 100%;
        position: absolute;
        transform: translate(754.5px, 0px);
        z-index: 20;
        /*background: greenyellow;*/
        /*right: 100px;*/
    }
    .detail.active{
        right: 100px;
    }
    .detail .back{
        width: 146px;
        height: 32px;
        border-radius: 25px;
        border: 1px solid #cccccc;
        background: #ffffff;
        box-shadow: 0px 0px 6px #ccc;
        margin: 20px auto;
    }
    .detail .bg{
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #a2a2a6;
        position: absolute;
        margin: 5px 0 0 8px;

    }
    .detail .bg img{
        margin-top: -2px;
        margin-left: -1px;
    }
    .detail .bg span{
        display: inline-block;
        width: 146px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 12px;
        position: absolute;
        left: 2px;
        top: -6px;
    }
    .title{
        font-size: 30px;
        line-height: 28px;
    }
    .other{
        font-size: 20px;
    }
    .basic{
        font-size: 18px;
        margin-top: 10px;
        font-weight: bolder;
    }
    .basic span{
        font-weight: normal;
        font-size: 16px;
    }
    .text1{
        margin-top: 14px;
        font-size: 14px;
        text-align: left;
        /*text-indent: 2em;*/
        word-break:normal;
    }
    .text2{
        margin-top: 23px;
        font-size: 12px;
        line-height: 16px;
        text-align: left;
        /*text-indent: 2em;*/
        word-break:normal;
    }
    .related{
        margin-top: -100px;
        margin-left: 130px;
        text-align: left;
        position: relative;
        bottom: -200px;

    }
    .related span{
        font-size: 12px;
        color: rgb(179, 179, 179);
    }
    .related div{
        position: absolute;
        /*background: palevioletred;*/
    }
    .related a{
        margin-top: -80px;
        margin-left: -50px;
        position: absolute;
        display: inline-block;
        width: 300px;
        height: 300px;
        z-index: 200;
    }
    .related img{
        width: 100%;
        height: 100%;
        position: absolute;
    }

</style>