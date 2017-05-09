/**
 * Created by Administrator on 2017/2/28.
 */
(function(){
    //var song=['周杰伦-美人鱼.mp3','唐嫣-众里寻他.mp3'];
    var prev=document.querySelector('.prev');
    var next=document.querySelector('.next');
    var play=document.querySelector('.play');
    var option=document.querySelector('.option');
    var optionMain=document.querySelector('.optionMain');
    var audio1=document.querySelector('.audio1');
    var audio2=document.querySelector('.audio2');
    var music1=document.querySelector('.music1');
    var music2=document.querySelector('.music2');
    var main=document.querySelector('.music2 .main');
    var lrc=document.querySelector('.music2 .lrc');
    var menu=document.querySelector('.music2 .main .menu');
    var current=document.querySelector('.music2 .current');
    var duration=document.querySelector('.music2 .duration');
    var bar=document.querySelector('.music2 .progress .bar');
    var done=document.querySelector('.music2 .progress .done');
    var close=document.querySelector('.music2 .main .close');
    var back=document.querySelector('.back');
    var sound=document.querySelector('.sound');
    var optionMusic=document.querySelector('.optionMusic');
    var songIndex=0;
    var mark=document.createElement('div');
    var timer1 = null;
    var timer2 = null;
    option.onOff=false;
    play.onOff=false;
    main.style.height=window.innerHeight+'px';
    volumeFn(optionMusic,audio1);
    volumeFn(sound,audio2);
    play.onclick=function(){
        if(this.onOff){
            audio1.pause();
            this.onOff=false;
            removeClass(this,'active');
            clearInterval(timer1);
            clearInterval(timer2);
        }else{
            audio1.play();
            currentLrc();
            this.onOff=true;
            setClass(this,'active');
            done.style.width = audio1.currentTime/audio1.duration*300+'px';
            timer1 = setInterval(function(){
                done.style.width = audio1.currentTime/audio1.duration*300+'px';
            }, 16);
            var now = zero(Math.floor(audio1.currentTime/60))+':'+zero(Math.floor(audio1.currentTime%60));
            current.innerHTML=now;
            var all = zero(Math.floor(audio1.duration/60))+':'+zero(Math.floor(audio1.duration%60));
            duration.innerHTML=all;
            timer2 = setInterval(function(){
                now = zero(Math.floor(audio1.currentTime/60))+':'+zero(Math.floor(audio1.currentTime%60));
                current.innerHTML=now;
                all = zero(Math.floor(audio1.duration/60))+':'+zero(Math.floor(audio1.duration%60));
                duration.innerHTML=all;
            }, 1000);
        }
    };
    prev.onclick=function(){
        songIndex--;
        if(songIndex<0){
            songIndex=data.length-1;
        }
        audio1.src="music/"+data[songIndex].src+"";
        txt=data[songIndex].lrc;
        audio1.play();
        currentLrc();
        play.onOff=true;
        setClass(play,'active');
    };
    next.onclick=function(){
        songIndex++;
        if(songIndex==data.length){
            songIndex=0;
        }
        audio1.src="music/"+data[songIndex].src+"";
        txt=data[songIndex].lrc;
        audio1.play();
        currentLrc();
        play.onOff=true;
        setClass(play,'active');
    };
    option.onclick=function(){
        if(!this.onOff){
            optionMain.style.display='inline-block';
            mark.className='mark';
            mark.style.width=window.innerWidth+'px';
            mark.style.height=window.innerHeight+'px';
            document.querySelector('.warp-music').appendChild(mark);
        }else{
            optionMain.style.display='';
            document.querySelector('.warp-music').removeChild(mark);
        }
        this.onOff=!this.onOff;
    };
    back.onclick=function(){
        optionMain.style.display='';
        document.querySelector('.warp-music').removeChild(mark);
        option.onOff=false;
    };
    music2.style.display='none';
    music1.ondblclick=function(){
        shadow(music2,{
            width:{
                target:1023,
                duration:1000,
                fx:'linear',
                callback:function(obj){
                    console.log(obj);
                    console.log('宽度运动完成');
                }
            },
            height:{
                target:605,
                duration:1000,
                fx:'easeOut',
                callback:function(){
                    console.log('高度运动完成');
                    moveFn();
                }
            }
        });
        menu.appendChild(prev);
        menu.appendChild(next);
        menu.appendChild(play);
        menu.appendChild(option);
        music1.style.display='none';
        music2.style.display='';
    };
    close.onclick=function(){
        shadow(music2,{
            width:{
                target:0,
                duration:1000,
                fx:'linear',
                callback:function(obj){
                    console.log(obj);
                    console.log('宽度运动完成');
                    music2.style.display='none';
                }
            },
            height:{
                target:0,
                duration:1000,
                fx:'easeOut',
                callback:function(){
                    console.log('高度运动完成');
                    moveFn();
                }
            }
        });
        music1.appendChild(prev);
        music1.appendChild(next);
        music1.appendChild(play);
        music1.appendChild(option);
        music1.style.display='';

    };
    var txt=data[1].lrc;
    currentLrc();
    function currentLrc(){
        var lrcArr = txt.split("[");
        var newLrcArr=[];
        var html = '';
        for (var i=0;i < lrcArr.length ;i++ ){
            var arr = lrcArr[i].split("]");
            var time = arr[0].split(".");
            var timer = time[0].split(":");
            var ms = timer[0]*60 + timer[1]*1;//将时间转换为秒
            var text = arr[1];//歌词内容
            newLrcArr.push([ms,text]);
        }
        audio1.addEventListener("timeupdate",function(){
            curTime = parseInt(audio1.currentTime);//获取当前播放的时间
            for(var i=0;i<newLrcArr.length;i++){
                if (curTime==newLrcArr[i][0]){
                    html=newLrcArr[i][1];
                    lrc.innerHTML = html;
                }
            }
        });

    }
    window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;  //  分析音频文件

    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitrequestAnimationFrame || window.mozrequestAnimationFrame || window.msrequestAnimationFrame;
    // 创建一个音乐对象
    var actx = new AudioContext();

    // 创建一个音频节点对象

    var analyser = actx.createAnalyser(); // 创建音频分析 转化成数字 通过canvas 画布表现出来
    // 传经媒体源节点
    var audioSrc = actx.createMediaElementSource(audio1);  // 获取音乐源文件

    audioSrc.connect(analyser) ;// 将音频源文件与分析机制链接起来

    analyser.connect(actx.destination); // 将分析机制与目标点链接 （扬声器）

    //alert(analyser.frequencyBinCount)
    // 线条颜色
    var can = document.getElementById("canvas");
    var cxt = can.getContext("2d");
    color   = cxt.createLinearGradient(can.width/2,0,can.width/2,100);
    color.addColorStop(0,"#a5824a");
    color.addColorStop(0.5,"#f00");
    color.addColorStop(1,"#2a3722");
    colorf  = cxt.createLinearGradient(can.width/2,100,can.width/2,200);
    colorf.addColorStop(0,"#2a3722");
    colorf.addColorStop(0.5,"#f00");
    colorf.addColorStop(1,"#a5824a");

    var num = 100;
    function draw(){

        // 创建一个与音乐频次等长的数组
        var voiceHigh = new Uint8Array(analyser.frequencyBinCount);

        // 将分析出来的音频数据添加到数组里面
        analyser.getByteFrequencyData(voiceHigh) ;
        console.log(voiceHigh)
        var step = Math.round(voiceHigh.length/num);
        cxt.clearRect(0,0,can.width,can.height);
        cxt.beginPath();
        for(var i = 0;i<num;i++){
            var value = (voiceHigh[step*i])/3;
            cxt.fillStyle = color;
            cxt.fillRect(i*10+can.width/2,100,7,-value+1);
            cxt.fillRect((can.width/2)-(i-1)*10,100,7,-value+1); // 实现左右对称 从中间开始画，扩散到两边
            cxt.fillStyle = colorf
            cxt.fillRect(i*10+can.width/2,100,7,value+1); // 下面也是一样
            cxt.fillRect((can.width/2)-(i-1)*10,100,7,value+1); // 实现左右对称 从中间开始画，扩散到两边

        }
        requestAnimationFrame(draw)
    }
    draw();
    function volumeFn(obj,audio){
        var bar=obj.querySelector('.bar');
        var btn=obj.querySelector('.btn');
        var v=css(btn,'left')/css(bar,'width');
        btn.onmousedown=function(ev){
            var absLeft=getPos(bar).left;
            var disX=ev.clientX-getPos(this).left;
            var max=css(bar,'width')-css(btn,'width');
            document.onmousemove=function(ev){
                var left=ev.clientX-disX-absLeft;
                if(left<0){
                    left=0;
                }
                if(left>max){
                    left=max;
                }
                btn.style.left=left+'px';
                v=css(btn,'left')/max;
                audio.volume=v;
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            };
        };
        audio.volume=v;
    }

    function moveFn(){
        var timer=null;
        clearInterval(timer);
        var aLi=document.querySelectorAll('.main ul li');
        var n=0;
        console.log(css(aLi[0],'backgroundPositionX'))
        timer=setInterval(function(){
            for(var i=0;i<aLi.length;i++){
                aLi[i].style.backgroundPositionX=css(aLi[i],'backgroundPositionX')-10+'px';
            }
            n++;
            if(n>834/10){
                clearInterval(timer);
            }
        },1);
    }


    function creatMain(){
        var ul=document.createElement('ul');
        var width=css(main,'width');
        var opcity1=1;
        var opcity2=0;
        for(var i=0;i<width/2;i++){
            var li=document.createElement('li');
            li.style.width=2+'px';
            li.style.backgroundPositionX=-(i*2)+'px';
            if(i>320){
                li.style.opacity=opcity1;
                opcity1-=1/80;
            }
            if(i<80){
                li.style.opacity=opcity2;
                opcity2+=1/80;
            }
            ul.appendChild(li);
        }
        main.appendChild(ul);
    }

    function setClass(obj,className){
        if(!obj.className){
            obj.className=className;
        }else{
            var arr=obj.className.split(' ');
            var index=arrIndex(arr,className);
            if(!index){
                obj.className+=' '+className;
            }
        }
    }
    function removeClass(obj,className){
        if(obj.className){
            var arr=obj.className.split(' ');
            var index=arrIndex(arr,className);
            if(index){
                arr.splice(index,1);
                obj.className=arr.join(' ');
            }
        }

    }
    function arrIndex(arr,className){
        for(var i=0;i<arr.length;i++){
            if(arr[i]==className){
                return i;
            }
        }
        return false;
    }
    function css(obj,attr){
        return parseFloat(obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr]);
    }
    function getPos(obj) {
        var pos = {left:0, top:0};
        while (obj) {
            pos.left += obj.offsetLeft;
            pos.top += obj.offsetTop;
            obj = obj.offsetParent;
        }
        return pos;

    }
    function zero(n){
        return n<10? '0'+n:''+n;
    }
})();