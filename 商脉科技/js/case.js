$(function(){
//	caseList
	(function(){
		var caseObj={
			img:['img/case-001.png','img/case-002.png','img/case-003.png','img/case-004.png','img/case-005.png','img/case-006.jpg','img/case-001.png','img/case-002.png','img/case-003.png','img/case-004.png','img/case-005.png','img/case-006.jpg'],
			text:['发发兼职案例展示','家校APP案例展示','房贝贝APP案例展示','楼下APP定制','千万花粉为你而来','四川乾隆社会经济信息咨询有限公司','发发兼职案例展示','家校APP案例展示','房贝贝APP案例展示','楼下APP定制','千万花粉为你而来','四川乾隆社会经济信息咨询有限公司'],
			date:['2015-04-14','2015-04-18','2015-05-14','2015-06-28','2015-06-01','2015-07-14','2015-04-14','2015-04-18','2015-05-14','2015-06-28','2015-06-01','2015-07-14'],
			view:['145','36','78','264','122','108','145','36','78','264','122','108'],
		};
//		alert(caseObj.img[0]);
//		alert(caseObj.img.length);
		for (var i=0;i<caseObj.img.length;i++) {
			var aCase=$('<div class="col-md-4 col-xs-12"><div class="markParent"><img src='+caseObj.img[i]+' class="img-responsive"/><div class="mark"><span>MORE+</span></div></div><div class="case-text"><a href="#">'+caseObj.text[i]+'</a><br /><span class="pull-left">'+caseObj.date[i]+'</span><em class="pull-right">view:&nbsp;'+caseObj.view[i]+'</em></div></div>');
			$("#caseList").append(aCase);
		}
		
	})();
	
	(function(){
		var $aMark=$("#case .mark");
		var $aCaseText=$("#case .case-text");
		$("#case").find('.col-md-4').each(function(i,elem){
			$(elem).mouseover(function(){
				$aMark.eq(i).addClass('active');
				$aCaseText.eq(i).addClass('active-case-text');
			});
			$(elem).mouseout(function(){
				$aMark.eq(i).removeClass('active');
				$aCaseText.eq(i).removeClass('active-case-text');
			});
		});
	})();
//	pages
			pages({
				id:'page',
				nowNum:1,
				allNum:2,
				});
			function pages(obj){
				if(!obj.id){
					return false;
				}
				oPage=document.getElementById(obj.id);
				var nowNum=obj.nowNum||1;
				var allNum=obj.allNum||5;
				if(nowNum>1){
					var iA=document.createElement('a');
					iA.href='#'+(nowNum-1);
					iA.innerHTML='上一页';
					iA.className='btn btn-default';
					oPage.appendChild(iA);
					if(nowNum<allNum){
						var iA=document.createElement('a');
						iA.href='#'+(nowNum+1);
						iA.innerHTML='下一页';
						iA.className='btn btn-default';
						oPage.appendChild(iA);
					}
					
				}
				
				if (nowNum==1&&obj.allNum>1) {
					var iA=document.createElement('a');
					iA.href='#'+(nowNum+1);
					iA.innerHTML='下一页';
					iA.className='btn btn-default';
					oPage.appendChild(iA);
				} 
				
				var aA=oPage.getElementsByTagName('a');
				for (var i=0;i<aA.length;i++) {
					aA[i].onclick=function(){
//						alert(parseInt(this.getAttribute('href').substring(1)));
						var nowNum=parseInt(this.getAttribute('href').substring(1));
						oPage.innerHTML='';
						pages({
							id:obj.id,
							nowNum:nowNum,
							allNum:allNum
						});
					}
				}
				
			}

	(function(){

	})();
});
