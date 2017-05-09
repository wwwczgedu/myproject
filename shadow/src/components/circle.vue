<template>
    <div class="circle">
        <div class="container-fluid">
            <div class="row">
                <!--<div class="col-xs-2 col-md-5"></div>-->
                <div class="col-xs-8 col-md-6 col-xs-offset-2 col-md-offset-3">
                    <div class="elipse">
                        <img src="../assets/images/circle/elipse_bg.png" alt="" class="img-responsive center-block">
                    </div>
                    <div class="inner">
                        <div class="gray">
                            <img src="../assets/images/circle/gray.png" alt="" class="img-responsive center-block">
                            <div class="row" v-for="item in circleData.circleBtnImg">
                                <div class="col-xs-6"></div>
                                <div class="col-xs-6" :class="'circle-'+item.color" :style="circleData.circleDataAngle.color==item.color?circleShowStyle:circleHideStyle">
                                    <img :src="'./src/assets/images/circle/'+item.circleImg" alt="" class="img-responsive">
                                </div>
                            </div>
                        </div>
                        <div class="buttons" @click="resetItemLine">
                            <router-link tag="div" :to="'/'+item.route" :class="'btn'+index" v-for="(item,index) in circleData.circleBtnImg" :style="{backgroundImage: 'url(./src/assets/images/button/'+item.url+')'}" key="index">
                                <div class="btn" :style="[{backgroundColor:item.colorValue},{transform:'rotate(-180deg)'}]">
                                    <div class="arrow" :style="graphicData.arrowStyle['up']"></div>
                                    <div class="text" :style="item.textPos">
                                        <span class="intro" :style="{color:item.colorValue}">{{item.text.intro}}</span>
                                        <br>
                                        {{item.text.other}}
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
//    import circleBtnImg from '../data/event';
//    import graphicData from '../data/graphic';

    export default{
        data(){
            return{
                msg:'home',
                up:true,
                circleData:{
                    circleDataAngle:{},
                    circleBtnImg:[],
                },
                graphicData:{},
//                route:''
            }
        },

        computed:{
            circleShowStyle:function(){
                return {
                    opacity:1,
//                    display:'inline-block',
//                    transform:'rotate('+((Math.ceil(this.circleData.angle)<=180?-180:180)-this.circleData.angle)+'deg)'
                    transform:'rotate('+(180-this.circleData.circleDataAngle.angle)+'deg)'
                }
            },
            circleHideStyle:function(){
                return {
                    opacity:0,
//                    display:'none',
//                    transform:'rotate('+((Math.ceil(this.circleData.angle)<=180?-180:180)-this.circleData.angle)+'deg)'
                    transform:'rotate('+(180-this.circleData.circleDataAngle.angle)+'deg)'
                }
            }
        },
        mounted(){
            this.fetchData();
            this.load();
        },
        updated(){
            this.textpos();
            if(this.up==true){
                this.btnPos(true);
            }else {
                this.btnPos(false);
            }

        },
        methods:{
            fetchData(){
                var _this=this;
                this.$ajax.all([this.getCircleBtnImg(), this.getGraphicData()])
                /* 两个请求现已完成 */
                .then(this.$ajax.spread((c, g)=>{
                    _this.circleData.circleBtnImg=c.data;
                    _this.graphicData=eval("("+g.data+")");
                    console.log('done');


                })
                )
                .catch((error)=>{
                        console.log(error)
                });
            },
            getCircleBtnImg(){
                return this.$ajax.get('src/data/circle.data');
            },
            getGraphicData(){
                return this.$ajax.get('src/data/graphic.data');
            },

            load(){
                let circle;
                let gray;
                const This=this;
                window.onload=function () {
                    This.circleOver();
                    let elipse=$('.elipse');
                    circle=$('.circle');
                    gray=$('.gray');
                    circle.css('bottom',0.5*(window.innerHeight-circle.height()));
                    gray.css('bottom',0.5*(circle.height()-gray.height()));
                    circle.addClass('active');
                    elipse.addClass('active');
                };
                window.onresize=function () {
                    circle.css('bottom',0.5*(window.innerHeight-circle.height()));
                    gray.css('bottom',0.5*(circle.height()-gray.height()));
                    if(This.up)return false;
                    circle.css('bottom',-0.8*circle.height());
                    This.btnPos();
                };
            },
            circleUp(){
                this.circleOver();
                if(this.up)return false;
                let gray=$('.gray');
                let circle=$('.circle');
                let elipse=$('.elipse');
                circle.css('bottom',0.5*(window.innerHeight-circle.height()));
                gray.css('bottom',0.5*(circle.height()-gray.height()));
                circle.addClass('active');
                elipse.addClass('active');
                this.up=true;
                const This=this;
                this.btnPos(true);

                document.onclick=function () {
                    This.circleDown();
                }
            },
            circleDown(){
                const gray=$('.gray');
                const circle=$('.circle');
                const elipse=$('.elipse');
                circle.css('bottom',-0.87*circle.height())
                circle.removeClass('active');
                elipse.removeClass('active');
                gray.css('bottom','');
                this.up=false;
                this.btnPos(false);
            },
            circleOver() {
                let color;
                let angle;
                let over=false;
                const This=this;
                document.onmouseover=function (ev) {
                    over=true;
                    const e=ev||window.event;
                    const oX=window.innerWidth||document.documentElement.clientWidth;
                    const oY=window.innerHeight||document.documentElement.clientHeight;
                    const scale=(e.clientY-oY/2)/(e.clientX-oX/2);
                    const space=360/7;
                    color=null;
                    angle=Math.atan(scale)*180/Math.PI;
                    if((e.clientX-oX/2)>=0){
                        angle=(360-angle)%360;
                    }else {
                        angle=(180-angle)%360;
                    }
                    if(0<=angle&&angle<space){
                        color='blue';
                    }else if(space<=angle&&angle<space*2){
                        color='red';
                    }else if(space*2<=angle&&angle<space*3){
                        color='marine';
                    }else if(space*3<=angle&&angle<space*4){
                        color='purple';
                    }else if(space*4<=angle&&angle<space*5){
                        color='green';
                    }else if(space*5<=angle&&angle<space*6){
                        color='orange';
                    }else if(space*6<=angle&&angle<space*7){
                        color='gray';
                    }
                    This.circleData.circleDataAngle={angle,color};
                };
            },
            btnPos(up){
                const This=this;
                const gray=$('.gray');
                if(up){
                    const btnR=(230)*1.1;
                    $('.inner .buttons>div').each(function (i,ele) {
                        let angle=360/7*(i+0.9);
                        let btnLeft=btnR*Math.cos(angle/180*Math.PI);
                        let btnTop=btnR*Math.sin(angle/180*Math.PI);
                        ele.style.left=btnLeft+'px';
                        ele.style.top=btnTop+'px';
                    });
                }else {
                    const btnR=(230)*1.1;
                    $('.inner .buttons>div').each(function (i,ele) {
                        let angle=15*(i+1)+210;
                        let btnLeft=btnR*Math.cos(angle/180*Math.PI);
                        let btnTop=btnR*Math.sin(angle/180*Math.PI);
                        ele.style.left=btnLeft+'px';
                        ele.style.top=btnTop+'px';
                    });
                    $('.circle .inner .buttons').css('top','230px');
                }

            },
            css(obj,attr){
                return parseFloat(obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]);
            },
            textpos(){
                $('.circle .text').each(function (i,ele) {
                    $(ele).css('marginLeft',-$(ele).height()+15);
                });
            },
            resetItemLine(){
                this.$store.dispatch('RESET_ITEMLINE');
            }
        },
        watch: {
            $route(to,from){
                if(to.path!='/graphic'){
                    this.circleDown();
                }
            }
        },
    }
</script>
<style>
    .circle{
        width: 100%;
        position: absolute;
        transition: 1s;
    }
    .circle.active{
        transform: rotate(180deg);
        transform-origin:50% 52%;
    }
    .circle.active div[class*='circle'] {
        /*display: none;*/
    }
    .circle .row{
        margin: 0;
    }
    .circle div[class^='col']{
        padding: 0;
    }
    .circle .elipse{
        visibility: hidden;
        transition-property: visibility;
        transition-duration: .5s;
        transition-timing-function: linear;
        transition-delay: 2s;

    }
    .circle .elipse>img{
        width: 100%;
        height: 100%;
        transition: 2s;
        opacity: 0.3;
        transition-property: transform,opacity;
        transition-duration: 1s;
        transition-timing-function: linear;
        transition-delay: 2s;
        transform: rotate(180deg);
    }
    .circle .elipse.active{
        visibility: visible;

    }
    .circle .elipse.active>img{
        opacity: 1;
        transform: scale(1.5);
    }
    .circle .inner{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .circle .inner .gray{
        width: 100%;
        position: absolute;
    }
    .circle .inner .gray .col-xs-6,.inner .gray .col-md-6{
        position: absolute;
        left: 50%;
        top: 0px;
        transform-origin:0 52%;
        transition: opacity .2s;
        transition-property: transform;
        transition-duration: .2s;
        transition-timing-function: linear;
        transition-delay: 0s;
    }
    .circle .inner .buttons{
        width: 30px;
        height: 30px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -15px;
        margin-top: -15px;
    }
    .circle .inner .buttons div{
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-repeat: no-repeat;
        background-position: center;
        transition: 1s;
        z-index: 12 !important;
    }
    .circle .inner .buttons .btn{
        border-radius: 50%;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
        transition: .3s;

    }
    .circle .inner .buttons .btn:hover {
        opacity: 1;
    }
    .circle .arrow{
        width: 12px;
        height: 20px;
        position: absolute;
        margin-left: -6px;
        margin-top: -6px;
        background: url("../assets/images/button/arrow.png") no-repeat center;
        z-index: 10;
    }
    .circle .text{
        background: white;
        position: absolute;
        border: 1px solid #cccccc;
        border-radius: 23px;
        padding: 10px;
        font-size: 12px;
        transform: scale(0.5, 0.5);
        transform-origin: right bottom 0px;
        transition: .3s;

    }
    .circle .intro{
        display: inline-block;
        font-size: 16px;
        font-weight:  400;
        line-height: 18px;
        text-align: left;
    }
    .circle .inner .buttons .btn:hover .text{
        width: auto;
        height: auto;
        transform: scale(1, 1);

    }
</style>