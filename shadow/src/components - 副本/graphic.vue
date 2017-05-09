<template>
    <div class="plot-area">
        <div class="plot-area-item" v-for="item in graphicData.item" :style="item.pos">
            <div class="item">
                <img :src="'./src/assets/images/graphic/'+item.color+'/'+item.src[0]" alt="">
                <img :src="'./src/assets/images/graphic/'+item.color+'/'+item.src[1]" alt="">
            </div>
            <div class="btn" :style="[item.btnPos,{backgroundColor:item.colorValue}]">
                <div class="arrow" :style="graphicData.arrowStyle[item.arrowDirection]"></div>
                <div class="text" :style="item.textPos">
                    <span class="intro" :style="{color:item.colorValue}">{{item.text.intro}}</span>
                    <br>
                    {{item.text.other}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import circleBtnImg from '../data/event';
    import graphicData from '../data/graphic';
    export default{
        data(){
            return{
                graphicData:graphicData,
            }
        }
    }
</script>
<style>
    .plot-area{
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 2;
    }
    .plot-area-item{
        position: absolute;
    }
    .plot-area-item .item{
        position: absolute;
    }
    .plot-area-item .item img{
        position: absolute;
        transition: .5s;
    }
    .plot-area-item .item img:nth-of-type(1){
        opacity: 0;
    }
    .plot-area-item .item img:nth-of-type(2){
        opacity: 1;
    }
    .plot-area-item .item:hover img:nth-of-type(1){
        opacity: 1;
    }
    .plot-area-item .item:hover img:nth-of-type(2){
        opacity: 0;
    }
    .plot-area-item .btn{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        position: absolute;
        opacity: 0;
        transition: .3s;
    }
    .plot-area-item:hover .btn{
        opacity: 1;
    }
    .plot-area-item .arrow{
        width: 12px;
        height: 20px;
        position: absolute;
        margin-left: -6px;
        margin-top: -6px;
        background: url("../assets/images/button/arrow.png") no-repeat center;
    }
    .plot-area-item .text{
        background: white;
        position: absolute;
        border: 1px solid #cccccc;
        border-radius: 23px;
        padding: 10px;
        font-size: 12px;
        transform: scale(0.5, 0.5);
        transform-origin: left 50% 0px;
        transition: .3s;

    }
    .plot-area-item .intro{
        display: inline-block;
        font-size: 16px;
        font-weight: 400;
        line-height: 18px;
        text-align: left;
    }
    .plot-area-item:hover .btn .arrow{
        opacity: 1;
        z-index: 4;
    }
    .plot-area-item:hover .text{
        display: inline-block;
        width: auto;
        height: auto;
        transform: scale(1, 1);
        z-index: 7 !important;
        opacity: 1;
    }
</style>