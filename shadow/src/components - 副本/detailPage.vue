<template>
    <div class="detail">
        <div class="back">
            <div class="bg">
                <img src="../assets/images/button/icon_arrow_up.png" alt="">
                <span>back to timeline</span>
            </div>
        </div>
        <div class="title" :style="{color:msg.colorValue}">{{msg.text.intro}}</div>
        <div class="other">{{msg.text.other}}</div>
        <div class="basic" v-for="(item,index) in msg.detail.basic" key="index">
            {{item[0]}}
            <span class="name">({{item[1]}})</span>
        </div>
        <p class="text1" :style="{color:msg.colorValue}">{{msg.text.intro}}-{{msg.detail.text1}}</p>
        <p class="text2">{{msg.text.intro}}-{{msg.detail.text2}}</p>
        <div class="related">
            <span>Related:</span>
            <div>
                <a href="" v-for="(item,index) in msg.detail.related" key="index" :style="item.style">
                    <img :src="'./src/assets/images/indexImg'+'/'+item.type+'/'+item.src" alt="">
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    mounted(){

    },
    computed:{
        msg(){
            for(var i=0;i<this.timelineData.item.length;i++){
                if(this.detailRoute==this.timelineData.item[i].text.intro){
                    return this.timelineData.item[i];
                }
            }
        }
    },
    methods:{
        test(){
            console.log(this.detailRoute)
        },
        animate(){
            $('.detail').addClass('active animated lightSpeedIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass('active animated lightSpeedIn');
            });
        }
    },
    watch: {
        $route(to,from){
            if (to.path!=from.path){
                this.animate();
            }
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
        background: greenyellow;
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
        background: palevioletred;
    }
    .related a,.related img{
        position: absolute;
    }

</style>