/**
 * Created by yf on 2016-10-18.
 */
window.onload=function(){

    var oCarouselContent=document.getElementsByClassName('carouselContent')[0];
    var aCarouselBtn=document.getElementsByClassName('carouselBtn');
    for(var i=0;i<aCarouselBtn.length;i++){
        aCarouselBtn[i].index=i;
        aCarouselBtn[i].onclick=function(){
            for(var i=0;i<4;i++){
                aCarouselBtn[i].className='carouselBtn';
            }
            this.className='carouselBtn active';
            oCarouselContent.style.marginLeft=-1170*this.index+'px';
        }
    }
    var j=0;
    timer=setInterval(function(){
        j++;
        if(j>3){
            j=0;
        }
        for(var i=0;i<4;i++){
            aCarouselBtn[i].className='carouselBtn';
        }
        aCarouselBtn[j].className='carouselBtn active';
        oCarouselContent.style.marginLeft=-1170*j+'px';
    },1000);
}