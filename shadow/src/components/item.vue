<template>
    <div  class="items">
        <router-link tag="div" :to="'/'+item.color+'/'+item.text.intro" class="item" v-for="(item,index) in msg" :style="item.pos" key="index">
            <img :src="'./src/assets/images/indexImg/'+item.type+'/'+item.src" alt="">
            <div class="btn" :style="[{backgroundColor:item.colorValue},item.btnPos]">
                <div class="bg">
                    <div class="arrow"></div>
                    <div class="text">
                        <span class="intro" :style="{color:item.colorValue}">{{item.text.intro}}</span>
                        <br>
                        {{item.text.other}}
                    </div>
                </div>
            </div>
        </router-link>
    </div>

</template>
<script>
export default{
    props:{
        msg:{
            type:Array,
            default: function () {
                return {
                    msg
                }
            }
        }
    }
}
</script>
<style>
    .items{
        height: 100%;
        display: inline-block;
        position: absolute;
        left: 0;
        top: 0;
        transition: .5s;
        transition-timing-function: ease-out;
    }
    .item{
        position: absolute;
        transition: .5s;
        z-index: 10;
    }
    .item.active{
        position: relative;
        transform-origin: 50% 50% 0px;
        transform-style: flat;
    }
    .btn{
        width: 27px;
        height: 27px;
        border-radius: 50%;
        position: absolute;
        opacity: 0;
        transition: .3s;
        padding: 0;
    }
    .btn .bg{
        width: 100%;
        height: 100%;

        background: url("../assets/images/button/icon_plus.png") no-repeat center;
    }
    .item:hover .btn{
        opacity: 1;
    }
    .arrow{
        width: 12px;
        height: 20px;
        position: absolute;
        margin-left: 7px;
        margin-top: 8px;
        background: url("../assets/images/button/arrow.png") no-repeat center;
        transform: rotate(180deg);
        opacity: 0;
        z-index: 10;
        transition: .3s;
    }
    .text{
        background: white;
        position: absolute;
        border: 1px solid #cccccc;
        border-radius: 23px;
        padding: 10px;
        font-size: 12px;
        transform: scale(0, 0);
        transform-origin: center top 0px;
        transition: .3s;
        right: -34px;
        top: 26px;
        opacity: 0;
    }
    .intro{
        display: inline-block;
        font-size: 16px;
        font-weight:  400;
        line-height: 18px;
        text-align: left;
    }
    .item .btn:hover .text{
        width: auto;
        height: auto;
        transform: scale(1, 1);
        z-index: 7 !important;
        opacity: 1;
    }
    .item .btn:hover .arrow{
        opacity: 1;
    }
</style>