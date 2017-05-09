window.onload=function(){
	var oNavbar=document.getElementsByClassName('navbar')[0];
	var oBannner=document.getElementById('banner');
	var oBannerCon=oBannner.getElementsByClassName('banner-con')[0];
	var oContent=document.getElementById('content');
	
//	document.onmousewheel=contentShow;
//	bind(document,'DOMMouseScroll',contentShow,false);

	document.onscroll=function(){
		var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
		if (scrollTop==0) {
			oNavbar.style.top=-52+'px';
		} else{
			oNavbar.style.top=0;
		}
	}
	contentAuto();
	oBannner.style.opacity=1;
	oBannerCon.style.color='rgb(204,204,204)';
	
	window.onresize=function(){
		contentAuto();
	}	
	
	function contentAuto(){
		var windowW=window.innerWidth||document.documentElement.clientWidth;
		var windowH=window.innerHeight||document.documentElement.clientHeight;
//		oBannner.style.width=windowW+'px';
		oBannner.style.height=windowH+'px';
		oContent.style.marginTop=windowH+'px';
//		console.log((windowH-263)/2);
		oBannerCon.style.marginTop=(windowH-263)/2+'px';
	}
	function bind(obj,ev,fn,bubble){
		if (obj.addEventListener) {
			obj.addEventListener(ev,fn,bubble);
		} else{
			obj.attachEvent(ev,function(){
				fn.call(obj);
			});
		}
	}
	
	function contentShow(ev){
//		alert(1);
		var e=event||ev;
		var direction;
		if (e.wheelDelta) {
			direction=e.wheelDelta>0?true:false;
		} else{
			direction=e.detail<0?true:false;
		}
		if (direction) {
//			alert('up');
//          alert(oContent.offsetTop);
//          alert(parseInt(oBannner.style.height));
//          alert(oContent.offsetTop<parseInt(oBannner.style.height));

			if(oContent.offsetTop<parseInt(oBannner.style.height)){
				oContent.style.top=oContent.offsetTop+100+'px';
			}
			if (oContent.offsetTop==parseInt(oBannner.style.height)) {
				oNavbar.style.top=-52+'px';
			} 
		} else{
//			alert('down');
			oContent.style.top=oContent.offsetTop-100+'px';
			oNavbar.style.top=0;
		}
		return false;
		if(e.preventDefault){
			e.preventDefault();
		}
	}
	
	
	

	
}



