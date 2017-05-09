window.onload=function(){
//nav
	(function(){
		var oHeader=document.getElementById('header');
		var oNav=oHeader.getElementsByClassName('nav')[0];
		var aNavLi=oNav.getElementsByTagName('li');
		for(var i = 0; i < aNavLi.length; i++) {
			aNavLi[i].onmouseover = function() {
				for(var i = 0; i < aNavLi.length; i++) {
					aNavLi[i].className = '';
				}
				this.className = 'active';
			}	
		}
	for (var i=0;i<aNavLi.length;i++) {
		aNavLi[i].onmouseleave=function(){
			this.className='';
		}
	}
	})();
//pages	
	(function(){
		var oPages=document.getElementsByClassName('pages')[0];
		var aA=oPages.getElementsByTagName('a');
		for (var i=0;i<aA.length;i++) {
			aA[i].onmouseover=function(){
				for (var i=0;i<aA.length;i++) {
					aA[i].className='';
				}
				this.className='active';
				this.onmouseout=function(){
					this.className='';
				}
			}
		}
	})();
//banner
	(function(){
		var oBanner=document.getElementsByClassName('banner')[0];
		var oBannerLeft=oBanner.getElementsByClassName('left')[0];
		var oBannerRight=oBanner.getElementsByClassName('right')[0];
		var oBannerToLeft=oBannerLeft.getElementsByClassName('toLeft')[0];
		var oBannerToRight=oBannerRight.getElementsByClassName('toRight')[0];
		var obannerImg=document.getElementsByClassName('banner-img')[0];
		var aBannerImg=obannerImg.getElementsByTagName('img');
		oBannerLeft.onmouseover=function(){
			this.className+=' active';
			this.onmouseout=function(){
				this.className='left';
			}
		}
		oBannerRight.onmouseover=function(){
			this.className+=' active';
			this.onmouseout=function(){
				this.className='right';
			}
		}
		var iNow=aBannerImg.length-1;
		oBannerToLeft.onclick=function(){
			aBannerImg[iNow].style.opacity=0;
			if (iNow>1) {
				iNow--;
			}
		}
		oBannerToRight.onclick=function(){
			aBannerImg[iNow].style.opacity=1;
			if (iNow<aBannerImg.length-1) {
				iNow++;
			}
		}
	})();
//search
	(function(){
		var aSosuo=document.getElementsByClassName('sosuo');
		for (var i=0;i<aSosuo.length;i++) {
			aSosuo[i].onfocus=function(){
				if (this.value=='Search website') {
					this.value='';
				}
			}
			aSosuo[i].onblur=function(){
				if (this.value=='') {
					this.value='Search website';
				}
			}
		}
	})();
//featured
	(function(){
		var $oUl=$(".featured").find('.productList');
		var $aLi=$oUl.find('li');
		$oUl.append($aLi.clone());
		$aLi=$oUl.find('li');
		$oUl.width($aLi.innerWidth()*$aLi.length);
		var $oToLeft=$(".featured").find('.toLeft');
		var $oToRight=$(".featured").find('.toRight');
		var iNow=0;
		$oToRight.on('click',function(){
			if (iNow==$aLi.length/2) {
				iNow=0;
//				alert(iNow);
				$oUl.css('left','0');
			}
			$oUl.stop().animate({left:-(iNow+1)*203},500,'swing');
			iNow++;
		});
		$oToLeft.on('click',function(){
			if (iNow==0) {
				iNow=$aLi.length/2;
				$oUl.css('left','-609px');
			}
//			alert(iNow);
			$oUl.stop().animate({left:-(iNow-1)*203},500,'swing');
			iNow--;
		});
	})();
//sotr
	(function(){
		var oSotr=document.getElementsByClassName('sotr')[0];
		var aA=oSotr.getElementsByTagName('a');
		var aDropdownmenu=oSotr.getElementsByClassName('dropdownmenu');
		var aH5=oSotr.getElementsByTagName('h5');
		for (var i=0;i<aA.length;i++) {
			aA[i].index=i;
			aA[i].onclick=function(ev){
				var e=ev||window.event;
				var This=this;
				for (var i=0;i<aDropdownmenu.length;i++) {
					aDropdownmenu[i].style.display='none';
				}
				aDropdownmenu[this.index].style.display='inline-block';
				document.onclick=function(){
					aDropdownmenu[This.index].style.display='none';
				}
				e.cancelBubble=true;
//				alert(this.nextElementSibling);
//				this.nextElementSibling.style.display='inline-block';
			}
			
		}
		for (var i=0;i<aDropdownmenu.length;i++) {
			var aLi=aDropdownmenu[i].getElementsByTagName('li');
			for (var j=0;j<aLi.length;j++) {
				aLi[j].onmouseover=function(){
					this.className='active';
					this.onmouseout=function(){
						this.className='';
					}
				}
				aLi[j].onclick=function(){
					this.parentNode.previousElementSibling.previousElementSibling.innerHTML=this.innerHTML;
				}
			}
		}
	})();
}
