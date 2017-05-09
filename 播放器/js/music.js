/**
 * Created by Administrator on 2017/2/28.
 */
(function(){
    var windowW=window.innerWidth||document.documentElement.clientWidth;
    var windowH=window.innerHeight||document.documentElement.clientHeight;
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
    var lrcP=document.querySelector('.music2 .lrc');
    var lrc=document.querySelector('.music2 .lrcCon');
    var menu=document.querySelector('.music2 .main .menu');
    var current=document.querySelector('.music2 .current');
    var duration=document.querySelector('.music2 .duration');
    var progress=document.querySelector('.music2 .progress');
    var bar=document.querySelector('.music2 .progress .bar');
    var done=document.querySelector('.music2 .progress .done');
    var close=document.querySelector('.music2 .main .close');
    var back=document.querySelector('.back');
    var sound=document.querySelector('.sound');
    var optionMusic=document.querySelector('.optionMusic');
    var songIndex=1;
    var mark=document.createElement('div');
    var timer1 = null;
    var timer2 = null;
    option.onOff=false;
    play.onOff=false;
    music2.onOff=false;
    audio1.src="music/"+data[songIndex].src+"";
    var txt=data[songIndex].lrc;
    currentLrc();
    volumeFn(optionMusic,audio1);
    volumeFn(sound,audio2);
    progressFn();
    window.onresize=function(){
        windowW=window.innerWidth||document.documentElement.clientWidth;
        windowH=window.innerHeight||document.documentElement.clientHeight;
        music2.style.width=windowW+'px';
        music2.style.height=windowH+'px';
    };
    play.onclick=function(){
        if(this.onOff){
            audio1.pause();
            this.onOff=false;
            removeClass(this,'active');
            clearInterval(timer1);
            clearInterval(timer2);
            //clearInterval(timer3);
        }else{
            audio1.play();
            this.onOff=true;
            setClass(this,'active');
            progressFn();
            //clearInterval(timer3);
            //timer3=setInterval(function() {
            //    draw();
            //},200);
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
        progressFn();
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
        progressFn();
    };
    option.onclick=function(){
        if(!this.onOff){
            optionMain.style.display='inline-block';
            mark.className='mark';
            mark.style.width=window.innerWidth+'px';
            mark.style.height=window.innerHeight+'px';
            document.querySexlector('.warp-music').appendChild(mark);
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
        music2.onOff=true;
        audio2.pause();
        shadow(music2,{
            width:{
                target:windowW,
                duration:1000,
                fx:'linear',
                callback:function(obj){
                    console.log(obj);
                    console.log('宽度运动完成');
                }
            },
            height:{
                target:windowH,
                duration:1000,
                fx:'linear',
                callback:function(){
                    console.log('高度运动完成');
                    menu.style.opacity=0.6;
                    setStyle(lrcP,'transform','translate(0,0)');
                    setStyle(menu,'transform','translate(0,100px)');

                }
            }
        });
        var menuMark=document.querySelector('.menuMark');
        menuMark.onmouseenter=function(){
            setStyle(menu,'transform','translate(0,0)');
            setStyle(menu,'z-index','5');
            menu.onmouseleave=function(){
                setStyle(menu,'transform','translate(0,100px)');
                setStyle(menu,'z-index','');
            };
        };
        setStyle(music2,'transform','rotateX(0deg)');
        menu.appendChild(prev);
        menu.appendChild(next);
        menu.appendChild(play);
        menu.appendChild(optionMusic);
        setClass(optionMusic,'active');
        music1.style.display='none';
        music2.style.display='';

    };
    close.onclick=function(){
        music2.onOff=false;
        setStyle(menu,'transform','translate(0,100px)');
        setClass(lrcP,'lrcHide');
        bind(menu,'transitionEnd',watchMenu,false);
        bind(menu,'webkitTransitionEnd',watchMenu,false);
        function watchMenu(){
            if(!music2.onOff){
                menu.style.opacity=0;
                setStyle(music2,'transform','rotateX(90deg)');
            }
        }
        audio2.play();
        music1.appendChild(prev);
        music1.appendChild(next);
        music1.appendChild(play);
        optionMain.appendChild(optionMusic);
        removeClass(optionMusic,'active');
        music1.style.display='';

    };
    function currentLrc(){
        var lrcArr = txt.split("[");
        var newLrcArr=[];
        var str='';
        for (var i=0;i < lrcArr.length ;i++ ){
            var arr = lrcArr[i].split("]");
            var time = arr[0].split(".");
            var timer = time[0].split(":");
            var ms = timer[0]*60 + timer[1]*1;//将时间转换为秒
            var text = arr[1];//歌词内容
            newLrcArr.push([ms,text]);
        }
        for(var i=1;i<newLrcArr.length;i++){
            str+='<p class="lrc'+newLrcArr[i][0]+'">'+newLrcArr[i][1]+'</p>';
        }
        lrc.innerHTML = str;

        audio1.addEventListener("timeupdate",function(){
            var aP=document.querySelectorAll('.lrc p');
            var curTime = parseInt(audio1.currentTime);
            for(var m=0;m<aP.length;m++){
                if ('lrc'+curTime==aP[m].className){
                    for(var n=0;n<aP.length;n++){
                        removeClass(aP[n],'active');
                    }
                    setClass(aP[m],'active');
                    lrc.style.top=190-30*m+'px';
                }
            }
        });

    }

    //拖拽歌词播放
    bind(lrc,'mousedown',dragLrc,false);
    function dragLrc(ev){
        var bar=progress.querySelector('.bar');
        var btn=progress.querySelector('.btn');
        audio1.pause();
        clearInterval(timer1);
        clearInterval(timer2);
        var absTop=getPos(lrcP).top;
        var aP=document.querySelectorAll('.lrc p');
        var disT=ev.clientY-getPos(this).top;
        var max=aP.length*30;
        document.onmousemove=function(ev){
            var oTop=ev.clientY-disT-absTop;
            if(oTop<-max+190){
                oTop=-max+190;
            }
            if(oTop>190){
                oTop=190;
            }
            lrc.style.top=oTop+'px';
            var index=Math.round((190-oTop)/30);
            console.log(parseInt(aP[index].className.split('lrc')[1]))
            var currentTime=parseInt(aP[index].className.split('lrc')[1]);
            audio1.currentTime = currentTime;
            done.style.width = currentTime/audio1.duration*css(bar,'width')+'px';
            for(var n=0;n<aP.length;n++){
                removeClass(aP[n],'active');
            }
            setClass(aP[index],'active');
            var now = zero(Math.floor(audio1.currentTime/60))+':'+zero(Math.floor(audio1.currentTime%60));
            current.innerHTML = now;
            return false;
        };
        document.onmouseup=function(){
            audio1.play();
            play.onOff=true;
            setClass(play,'active');
            progressFn();
            document.onmousemove=null;
            document.onmouseup=null;
        };
        return false;
    }




    //播放完成自动调整下一曲
    audio1.addEventListener("ended",function(){
        songIndex++;
        if(songIndex>data.length-1){
            songIndex=0
        }
        audio1.src="music/"+data[songIndex].src+"";
        txt=data[songIndex].lrc;
        audio1.play();
        currentLrc();
        play.onOff=true;
        setClass(play,'active');
        progressFn();
    },false);

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

    //var person=document.querySelector('.person');
    //person.style.transform='rotateX(45deg)';
    //var can = document.getElementById("canvas");
    //var cxt = can.getContext("2d");
    //var num = 100;
    ////color   = cxt.createLinearGradient(can.width/2,0,can.width/2,100);
    ////colorf  = cxt.createLinearGradient(can.width/2,100,can.width/2,200);
    //function draw(){
    //
    //    // 创建一个与音乐频次等长的数组
    //    var voiceHigh= new Uint8Array(analyser.frequencyBinCount);
    //
    //    // 将分析出来的音频数据添加到数组里面
    //    analyser.getByteFrequencyData(voiceHigh) ;
    //    var step = Math.round(voiceHigh.length/num);
    //    cxt.clearRect(0,0,can.width,can.height);
    //    cxt.beginPath();
    //    for(var i = 0;i<num;i++){
    //        var value = (voiceHigh[step*i])/3;
    //        cxt.fillStyle = "#FF0000";
    //        cxt.moveTo(100,500);
    //        for(var x=100;x< 700;x++){
    //            cxt.lineTo(x,-100*Math.sin((x-100)*Math.PI/180)+500)
    //        }
    //        //cxt.fillRect(i*10+can.width/2,100,7,-value+1);
    //        //cxt.fillRect((can.width/2)-(i-1)*10,100,7,-value+1); // 实现左右对称 从中间开始画，扩散到两边
    //        cxt.strokeStyle = "red";
    //        cxt.stroke();
    //        //cxt.fillRect(i*10+can.width/2,100,7,value+1); // 下面也是一样
    //        //cxt.fillRect((can.width/2)-(i-1)*10,100,7,value+1); // 实现左右对称 从中间开始画，扩散到两边
    //
    //    }
        //console.log(voiceHigh)
        //var max=voiceHigh[0];
        //var old=0;
        //var onOff=false;
        //var deg=0;
        //var sum=0;
        //var average=0;
        //for(var i=0;i<voiceHigh.length;i++){
        //    sum+=voiceHigh[i];
        //    if(voiceHigh[i]>max){
        //        old=max;
        //        max=voiceHigh[i];
        //        if(onOff){
        //            deg=-Math.atan(voiceHigh[500]/177)*50;
        //        }else{
        //            deg=Math.atan(voiceHigh[500]/177)*50;
        //        }
        //    }
        //}
        //requestAnimationFrame(draw)
        //average=sum/voiceHigh.length;
        //console.log(average)
        //console.log(max)
        //console.log(old)
        //console.log(deg)
        //console.log(person)
        //person.style.left=max+'px';
        //person.style.transform='rotateZ('+deg+'deg)';
        //bind(person,'transitionEnd',watchLoadUp,false);
        //bind(person,'webkitTransitionEnd',watchLoadUp,false);
        //function watchLoadUp(){
        //    person.style.transform='rotateZ(0deg)';
        //}
    //}

    //var timer3=null;
    //clearInterval(timer3);
    //timer3=setInterval(function() {
    //    draw();
    //},300);
    //draw();
    function bind(obj,ev,fn,bubble){
        if (obj.addEventListener) {
            obj.addEventListener(ev,fn,bubble);
        } else{
            obj.attachEvent('on'+ev,function(){
                fn.call(obj);
            });
        }
    }
    progressDragFn(progress,audio1);
    function progressDragFn(obj,audio){
        var bar=obj.querySelector('.bar');
        var btn=obj.querySelector('.btn');
        btn.onmousedown=function(ev){
            if(audio.paused){
                return;
            }
            audio.pause();
            clearInterval(timer1);
            clearInterval(timer2);
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
                done.style.width = left+'px';
                var currentTime = left/max*audio.duration;
                console.log(currentTime)
                audio.currentTime = currentTime;
                //当前时间转成分秒
                var now = zero(Math.floor(audio.currentTime/60))+':'+zero(Math.floor(audio.currentTime%60));
                current.innerHTML = now;
                return false;
            };
            document.onmouseup=function(){
                audio.play();
                progressFn();
                document.onmousemove=null;
                document.onmouseup=null;
            };
            return false;
        };

    }
    function progressFn(){
        var bar=document.querySelector('.progress .bar');
        var progressBtn=document.querySelector('.progress .btn');
        var max=css(bar,'width')-css(progressBtn,'width');
        var w=audio1.currentTime/audio1.duration*max;
        done.style.width = w+'px';
        progressBtn.style.left=w+'px';
        clearInterval(timer1);
        timer1 = setInterval(function(){
            w= audio1.currentTime/audio1.duration*max;
            done.style.width = w+'px';
            progressBtn.style.left=w+'px';
        }, 16);
        var now = zero(Math.floor(audio1.currentTime/60))+':'+zero(Math.floor(audio1.currentTime%60));
        current.innerHTML=now;
        var all = zero(Math.floor(audio1.duration/60))+':'+zero(Math.floor(audio1.duration%60));
        if(duration.innerHTML==''){
            duration.innerHTML="00:00";
        }
        clearInterval(timer2);
        timer2 = setInterval(function(){
            now = zero(Math.floor(audio1.currentTime/60))+':'+zero(Math.floor(audio1.currentTime%60));
            current.innerHTML=now;
            all = zero(Math.floor(audio1.duration/60))+':'+zero(Math.floor(audio1.duration%60));
            duration.innerHTML=all;
        }, 1000);
    }
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
                return false;
            };
            document.onmouseup=function(){
                document.onmousemove=null;
                document.onmouseup=null;
            };
            return false;
        };
        audio.volume=v;
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
    function setStyle(obj,attr,value){
        obj.style[attr] = value;
        obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
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