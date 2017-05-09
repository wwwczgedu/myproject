window.onload=function(){
	var windowH=window.innerHeight||document.documentElement.clientHeight;
	var oNav=document.getElementById('nav');
	var aNavli=oNav.getElementsByTagName('li');
	var oContent=document.getElementById('content');
	var aContentLi=oContent.getElementsByTagName('li');
	var oContentList=oContent.getElementsByClassName('contentList')[0];
	var aSection=oContent.getElementsByClassName('section');
	var oHome=document.getElementsByClassName('home')[0];
	var oBtn=oHome.getElementsByClassName('btn')[0];
	var oCarouselList=oHome.getElementsByClassName('carouselList')[0];
	var aBtnLi=oBtn.getElementsByTagName('li');
	var aCarouselLi=oCarouselList.getElementsByTagName('li');
	var oPlane1=document.getElementsByClassName('plane1')[0];
	var oPlane2=document.getElementsByClassName('plane2')[0];
	var oPlane3=document.getElementsByClassName('plane3')[0];
	var oPencel1=document.getElementsByClassName('pencel1')[0];
	var oPencel2=document.getElementsByClassName('pencel2')[0];
	var oPencel3=document.getElementsByClassName('pencel3')[0];
	var oAbout=document.getElementsByClassName('about')[0];
	var aAboutImg=oAbout.getElementsByClassName('aboutImg');
	var oTeam=document.getElementsByClassName('team')[0];
	var oTeamTitle=oTeam.getElementsByClassName('title')[0];
	var oTeamDiv2=oTeam.getElementsByClassName('div2')[0];
	var oTab=document.getElementById('tab');
	var aTabli=oTab.getElementsByTagName('li');
	var iNow=0;
	var cjAnimation=[
	{
		inAn:function(){
			setStyle(oCarouselList,'transform','translate(0,0)');
			setStyle(oBtn,'transform','translate(0,0)');
			setStyle(oCarouselList,'opacity','1');
			setStyle(oBtn,'opacity','1');
		},
		outAn:function(){
			setStyle(oCarouselList,'transform','translate(0,-100px)');
			setStyle(oBtn,'transform','translate(0,100px)');
			setStyle(oCarouselList,'opacity','0');
			setStyle(oBtn,'opacity','0');
		}
	},
	{
		inAn:function(){
			setStyle(oPlane1,'transform','translate(0,0)');
			setStyle(oPlane2,'transform','translate(0,0)');
			setStyle(oPlane3,'transform','translate(0,0)');
		},
		outAn:function(){
			setStyle(oPlane1,'transform','translate(-300px,-200px)');
			setStyle(oPlane2,'transform','translate(-300px,200px)');
			setStyle(oPlane3,'transform','translate(200px,-200px)');
		}
	},
	{
		inAn:function(){
			setStyle(oPencel1,'transform','translate(0,0)');
			setStyle(oPencel2,'transform','translate(0,0)');
			setStyle(oPencel3,'transform','translate(0,0)');
		},
		outAn:function(){
			setStyle(oPencel1,'transform','translate(50px,-200px)');
			setStyle(oPencel2,'transform','translate(-50px,-200px)');
			setStyle(oPencel3,'transform','translate(300px,300px)');
		}
	},
	{
		inAn:function(){
			setStyle(aAboutImg[0],'transform','rotateZ(0deg)');
			setStyle(aAboutImg[1],'transform','rotateZ(0deg)');
		},
		outAn:function(){
			setStyle(aAboutImg[0],'transform','rotateZ(-30deg)');
			setStyle(aAboutImg[1],'transform','rotateZ(30deg)');
		}
	},
	{
		inAn:function(){
			setStyle(oTeamTitle,'transform','translate(0,0)');
			setStyle(oTeamDiv2,'transform','translate(0,0)');
			setStyle(oTeamTitle,'opacity','1');
			setStyle(oTeamDiv2,'opacity','1');
		},
		outAn:function(){
			setStyle(oTeamTitle,'transform','translate(-300px,0)');
			setStyle(oTeamDiv2,'transform','translate(300px,0)');
			setStyle(oTeamTitle,'opacity','0');
			setStyle(oTeamDiv2,'opacity','0');
		}
	}
	];
	toMove(0);
//	alert(iNow);
	contentAuto(0);
	sectionAuto();
	for(var i=0;i<aNavli.length;i++){
		aNavli[i].index=i;
		aNavli[i].onclick=function(){
//			alert(this.index);
			iNow=this.index;
			toMove(this.index);
			
		}
	}
	for(var i=0;i<aTabli.length;i++){
		aTabli[i].index=i;
		aTabli[i].onclick=function(){
//			alert(this.index);
//			iNow=this.index;
			toMove(this.index);

		}
	}
	window.onresize=function(){
		contentAuto(iNow);
		sectionAuto();
	}
	document.onmousewheel=contentTap;
	bind(document,'DOMMouseScroll',contentTap,false);
//	bind(document,'click',fn,false);
	function bind(obj,ev,fn,bubble){
		if (obj.addEventListener) {
			obj.addEventListener(ev,fn,bubble);
//			alert(1);
		} else{
//			alert(2);
			obj.attachEvent('on'+ev,function(){
				fn.call(obj);
			});
		}
	}
//	function fn(){alert('text');}
	function toMove(index){
		var windowH=window.innerHeight||document.documentElement.clientHeight;
		var contentLiHeight=windowH-80;
		var oNav=document.getElementById('nav');
	    var aNavli=oNav.getElementsByTagName('li');
		for(var i=0;i<aNavli.length;i++){
			var oDiv=aNavli[i].getElementsByTagName('div')[0];
			oDiv.style.width='';
		}
//		alert(index);
		var oDiv=aNavli[index].getElementsByTagName('div')[0];
		oDiv.style.width='100%';
			
		var oArrow=oNav.getElementsByClassName('arrow')[0];
		oArrow.style.left=aNavli[index].offsetLeft+aNavli[index].offsetWidth/2-oArrow.offsetWidth/2+'px';
		oContentList.style.top=-contentLiHeight*index+'px';
//		console.log(cjAnimation);
		for (var i=0;i<cjAnimation.length;i++) {
			cjAnimation[i].outAn();
		}
		cjAnimation[index].inAn();
		for (var i=0;i<aTabli.length;i++) {
			aTabli[i].className='';
		}
		aTabli[index].className='active';
	}
	function contentAuto(iNow){
		var windowH=window.innerHeight||document.documentElement.clientHeight;
		var contentLiHeight=windowH-80;
		oContent.style.height=contentLiHeight+'px';
		for (var i=0;i<aContentLi.length;i++) {
			aContentLi[i].style.height=contentLiHeight+'px';
		}
//		alert(contentLiHeight);
		oContentList.style.top=-iNow*contentLiHeight+'px';
	}
	function sectionAuto(){
		var windowH=window.innerHeight||document.documentElement.clientHeight;
//		alert(windowH);
		for (var i=0;i<aSection.length;i++) {
			aSection[i].style.marginTop=(windowH-600)/2+'px';
		}
	}
	function contentTap(ev){
//		alert(1);
		var e=window.event||ev;
		var direction;
		var timer;
		if (e.wheelDelta) {
			direction=e.wheelDelta>0?true:false;
		} else{
//			alert(2);
			direction=e.detail<0?true:false;
		}
//		alert(direction);
		if (direction) {
//			alert('up');
			if (iNow>0) {
				iNow--;
			}
			toMove(iNow);
		} else{
//			alert('down');
			
			if (iNow<4) {
				iNow++;
			}
			toMove(iNow);
			
		}
		return false;
//		if(e.preventDefault){
//			e.preventDefault();
//		}
	}
//course-courseList
(function(){
	var courseList={
		src:['url(./img/bks.png)','url(./img/apcoa.png)','url(./img/binoli.png)','url(./img/gu.png)','url(./img/hlx.png)','url(./img/lbs.png)','url(./img/hlx.png)','url(./img/leonberg.png)','url(./img/pcwelt.png)','url(./img/tata.png)','url(./img/gu.png)','url(./img/gu.png)'],
		info:['1interesting...','2interesting...','3interesting...','4interesting...','5interesting...','6interesting...','7interesting...','8interesting...','9interesting...','10interesting...','11interesting...','12interesting...'],
	}
	var oDiv3List=document.getElementsByClassName('div3List')[0];
	for (var i=0;i<courseList.src.length;i++) {
//		alert(i);
		var aCourseList=document.createElement('div');
		aCourseList.className='courseList';
		aCourseList.innerHTML='<div class="courseImg"></div><div class="info">'+courseList.info[i]+'</div>';
		var aCourseImg=aCourseList.getElementsByClassName('courseImg')[0];
		aCourseImg.style.backgroundImage=courseList.src[i];
		oDiv3List.appendChild(aCourseList);
	}
})();

//home carousel
	(function(){
		
		var iNow=0;
		for (var i=0;i<aBtnLi.length;i++) {
			aBtnLi[i].index=i;
			aBtnLi[i].onclick=function(){
				var This=this;
				homeTab(This);
			}
		}
		function homeTab(th){
			for (var i=0;i<aBtnLi.length;i++){
				aBtnLi[i].className='';
			}
			th.className='active';
			if (iNow<th.index) {
				aCarouselLi[th.index].className='active rightShow';
				aCarouselLi[iNow].className='leftHide';
			} else{
				aCarouselLi[th.index].className='active leftShow';
				aCarouselLi[iNow].className='rightHide';
			}

			iNow=th.index;
		}
	})();
//	about aboutImg
	(function(){
//		var oAbout=document.getElementsByClassName('about')[0];
//		var aAboutImg=oAbout.getElementsByClassName('aboutImg');
		var aUpLi=oAbout.getElementsByTagName('li');
		var date={'src':['url(./img/about1.jpg)','url(./img/about3.jpg)']};
		for (var j=4;j<aUpLi.length;j++) {
//			alert(j);
			aUpLi[j].style.backgroundImage=date.src[1];
		}
		for (var i=0;i<aAboutImg.length;i++) {
			aAboutImg[i].onmouseover=function(){
//				alert(1);
				this.className+=' active';
				this.onmouseout=function(){
					this.className='aboutImg';
				}
			}
		}
		
	})();
//	team canves
	(function(){
		var oTeamDiv3=oTeam.getElementsByClassName('div3')[0];
		var aLi=oTeamDiv3.getElementsByTagName('li');
		var oCanves=null;
		creat();
		bindBubble();
		function bindBubble(){
			for (var i=0;i<aLi.length;i++) {
				aLi[i].index=i;
				aLi[i].onmouseover=function(){
					addCanvesBubble();
					oCanves.style.left=this.index*944/8+'px';
					for (var j=0;j<aLi.length;j++) {
						aLi[j].style.opacity=0.5;
					}
					this.style.opacity=1;
				}
//			console.log(oCanves);
			}
			oTeamDiv3.onmouseleave=function(){
				this.removeChild(oCanves);
				oCanves=null;
				for (var j=0;j<aLi.length;j++) {
					aLi[j].style.opacity=1;
				}
			}
		}
		
		function creat(){
			var oUl=document.createElement('ul');
			for (var i=0;i<8;i++) {
				var oLi=document.createElement('li');
				oLi.style.width=944/8+'px';
				oLi.style.height=448+'px';
				oLi.style.backgroundPositionX=-i*944/8+'px';
				oUl.appendChild(oLi);
			}
			oTeamDiv3.appendChild(oUl);
		}
		function addCanvesBubble(){
//			console.log(oCanves);
			if (!oCanves) {
//				alert(index);
				oCanves=document.createElement('canvas');
				oCanves.id='teamCanves';
				oCanves.width=944/8;
				oCanves.height=380;
				oTeamDiv3.appendChild(oCanves);
				creatBubble();
//				console.log(oCanves);
			}
		}
		function creatBubble(){
			var oCanves=document.getElementById('teamCanves');
			var oGC=oCanves.getContext('2d');
			var arr=[];
			var num=0;
			setInterval(function(){
				oGC.clearRect(0,0,oCanves.width,oCanves.height);
				for(var i=0;i<arr.length;i++){
					arr[i].num+=5;
					arr[i].R+=0.1;
					arr[i].a-=0.005;
//					alert(arr[i].y);
//					times=Math.random()*10+40;//times在这儿取小圆会弹跳
					if (arr[i].startY-arr[i].times*(arr[i].num*Math.PI/180)<100) {
						arr.splice(i,1);
					}
//					console.log(arr.length);
					oGC.fillStyle='rgba('+arr[i].r+','+arr[i].g+','+arr[i].b+','+arr[i].a+')';
					oGC.beginPath();
//					alert(times);
						oGC.moveTo(arr[i].startX+arr[i].times*Math.sin(arr[i].num*Math.PI/180),arr[i].startY-arr[i].times*(arr[i].num*Math.PI/180));
						oGC.arc(arr[i].startX+arr[i].times*Math.sin(arr[i].num*Math.PI/180),arr[i].startY-arr[i].times*(arr[i].num*Math.PI/180),arr[i].R,0,2*Math.PI);
					oGC.closePath();
					oGC.fill();
				}
			},1000/60);
			setInterval(function(){
				var x=Math.random()*oCanves.width;
				var y=Math.random()*20+420;
				var R=2;
				var r=Math.round(Math.random()*225);
				var g=Math.round(Math.random()*225);
				var b=Math.round(Math.random()*225);
				var a=1;
				var startX;
				var startY;
				var times=Math.random()*20+30;
				
				arr.push({
					x:x,
					y:y,
					R:R,
					r:r,
					g:g,
					b:b,
					a:a,
					startX:x,
					startY:y,
					num:num,
					times:times,
				});
			},60);
		}
		
	})();
//	入场动画
//	var cjAnimation=[
//	{
//		inAn:function(){
//			setStyle(oCarouselList,'transform','translate(0,0)');
//			setStyle(oBtn,'transform','translate(0,0)');
//		},
//		outAn:function(){
//			setStyle(oCarouselList,'transform','translate(0,-100px)');
//			setStyle(oBtn,'transform','translate(0,100px)');
//		}
//	},
//	{
//		inAn:function(){
//			setStyle(oPlane1,'transform','translate(0,0)');
//			setStyle(oPlane2,'transform','translate(0,0)');
//			setStyle(oPlane3,'transform','translate(0,0)');
//		},
//		outAn:function(){
//			setStyle(oPlane1,'transform','translate(-300px,-200px)');
//			setStyle(oPlane2,'transform','translate(-300px,200px)');
//			setStyle(oPlane3,'transform','translate(200px,-200px)');
//		}
//	},
//	{
//		inAn:function(){
//			setStyle(oPencel1,'transform','translate(0,0)');
//			setStyle(oPencel2,'transform','translate(0,0)');
//			setStyle(oPencel3,'transform','translate(0,0)');
//		},
//		outAn:function(){
//			setStyle(oPencel1,'transform','translate(50px,-200px)');
//			setStyle(oPencel2,'transform','translate(-50px,-200px)');
//			setStyle(oPencel3,'transform','translate(300px,300px)');
//		}
//	},
//	{
//		inAn:function(){
//			setStyle(aAboutImg[0],'transform','rotateZ(0deg)');
//			setStyle(aAboutImg[1],'transform','rotateZ(0deg)');
//		},
//		outAn:function(){
//			setStyle(aAboutImg[0],'transform','rotateZ(-30deg)');
//			setStyle(aAboutImg[1],'transform','rotateZ(30deg)');
//		}
//	},
//	{
//		inAn:function(){
//			setStyle(oTeamTitle,'transform','translate(0,0)');
//			setStyle(oTeamDiv2,'transform','translate(0,0)');
//			setStyle(oTeamTitle,'opacity','1');
//			setStyle(oTeamDiv2,'opacity','1');
//		},
//		outAn:function(){
//			setStyle(oTeamTitle,'transform','translate(-300px,0)');
//			setStyle(oTeamDiv2,'transform','translate(300px,0)');
//			setStyle(oTeamTitle,'opacity','0');
//			setStyle(oTeamDiv2,'opacity','0');
//		}
//	}
//	];
	for (var i=0;i<cjAnimation.length;i++) {
		cjAnimation[i].outAn();
	}
//	console.log(cjAnimation);
//	setTimeout(function(){
//		cjAnimation[4].outAn();
//		setTimeout(function(){
//			cjAnimation[4].inAn();
//		},3000);
//	},3000);
	
//	music
	(function(){
		var oMusic=document.getElementsByClassName('music')[0];
		var oAudio=document.getElementsByTagName('audio')[0];
		var onOff=true;
		oMusic.onclick=function(){
			onOff=!onOff;
			if (onOff) {
				oMusic.style.backgroundImage='url(img/musicon.gif)';
				oAudio.play();
			} else{
				oMusic.style.backgroundImage='url(img/musicoff.gif)';
				oAudio.pause();
			}
		}
	})();
//	load
	var oLoadUp=document.getElementsByClassName('loadUp')[0];
	var oLoadDown=document.getElementsByClassName('loadDown')[0];
	function load(){
		oLoadUp.style.height='0%';
		oLoadDown.style.height='0';
	};
	var imgArr=['./img/about1.jpg','./img/about2.jpg','./img/about3.jpg','./img/about4.jpg','./img/bg1.jpg','./img/bg2.jpg','./img/bg3.jpg','./img/bg4.jpg','./img/bg5.jpg','./img/pencel1.png','./img/pencel2.png','./img/pencel3.png','./img/plane1.png','./img/plane2.png','./img/plane3.png','./img/robot.png','./img/team.png','./img/worksimg1.jpg','./img/worksimg2.jpg','./img/worksimg3.jpg','./img/worksimg4.jpg'];
	var num=0;
	var oLoadLine=document.getElementsByClassName('loadLine')[0];
	for (var i=0;i<imgArr.length;i++) {
		var imgObj=new Image();
		imgObj.src=imgArr[i];
		imgObj.onload=function(){
			num++;
			oLoadLine.style.width=num/imgArr.length*100+'%';
			if (num==imgArr.length) {
				load();
				oLoadLine.style.display='none';
			}
		}
	}
	bind(oLoadUp,'transitionEnd',watchLoadUp,false);
	bind(oLoadUp,'webkitTransitionEnd',watchLoadUp,false);
	function watchLoadUp(){
		cjAnimation[0].inAn();
	}
	function setStyle(obj,attr,value){
		obj.style[attr] = value;
		obj.style['webkit'+attr.substring(0,1).toUpperCase() + attr.substring(1)] = value;
	}
}

