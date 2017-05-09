/**
 * Created by Administrator on 2017/2/18.
 */
(function() {
    var data =[
        {
            id:1,
            name:'云盘',
            infor: [
                {
                    name: '图片1',
                    type: 'photo',
                    src: 'imgbg.jpg',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '图片2',
                    type: 'photo',
                    src: 'imgbg.jpg',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '图片3',
                    type: 'photo',
                    src: 'imgbg.jpg',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '云盘。1',
                    type: 'file',
                    src: '',
                    date: '2017-02-19',
                },
                {
                    name: '云盘。2',
                    type: 'file',
                    src: '',
                    date: '2017-02-19',
                },
                {
                    name: '云盘。3',
                    type: 'file',
                    src: '',
                    date: '2017-02-19',
                },{
                    name: '文档1',
                    type: 'doc',
                    src: 'imgbg.jpg',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '文档2',
                    type: 'doc',
                    src: 'imgbg.jpg',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '视频1',
                    type: 'video',
                    src: 'imgbg.jpg',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '视频2',
                    type: 'video',
                    src: 'imgbg.jpg',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '音乐1',
                    type: 'music',
                    src: '',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '音乐2',
                    type: 'music',
                    src: '',
                    size: '24k',
                    date: '2017-02-19',
                },
                {
                    name: '音乐3',
                    type: 'music',
                    src: '',
                    size: '24k',
                    date: '2017-02-19',
                }
            ]
        }
    ];
    var $group=$('.group');
    var $display=$('.display');
    var $sort=$('.sort');
    var $main=$('.main');
    var $addMenu=$('.addMenu');
    var addTimer=null;
    var newFileId=1;
    var selectedArr=[];
    var deletedArr=[];
    init();
    window.onhashchange=function(){
        tab();
    };
    function init(){
        tab();
        setActive($('.transfer')[0]);
        setActive($('.search')[0]);
        setActive($group,true,'a');
        setActive($display,true,'a');
        setActive($sort,true,'a');
        //添加属性creat控制新建文件夹按钮的功能
        $addMenu.find('li')[3].creat=true;
        $addMenu.find('li')[3].onclick=function(ev){
            var e=ev||window.event;
            e.cancelBubble=true;
            console.log(this.creat)
            if(this.creat){
                newFile();
                this.creat=false;
            }else{
                saveFile($('.fileUl input').first());
                this.creat=true;
                setPos($('.fileUl')[0],4,66,'li');
            }

        };
        //重命名
        rename();

        //设置搜索框点击效果
        $('.search')[0].onclick=function(ev){
            $(this).addClass('click');
            var e=ev||window.event;
            e.cancelBubble=true;
            $(document).click(function(){
                if($('.search').children('input').val()==''){
                    $('.search').removeClass('click active');
                }
            });
        };
        //默认"全部"为显示状态
        $('.all').addClass('active');
        //设置左侧菜单栏移入和点击效果
        $('.conLeft li').each(function(i,ele){
            $(ele).hover(function(){
                $(this).css('background','rgba(235, 113,72, 0.1)');
            },function(){
                $(this).css('background','');
            });
            ele.onclick=function(ev){
                ev.cancelBubble=true;
                $('.conLeft li').each(function(i,ele){
                    $(ele).removeClass('active');
                });
                $(this).addClass('active');
            };
        });
        //设置添加按钮移入效果
        $('.add').mouseenter(function(){
            $(this).addClass('active');
            clearTimeout(addTimer);
        }).mouseleave(function(){
                clearTimeout(addTimer);
                addTimer=setTimeout(function(){
                    $('.add').removeClass('active');
                },50);
            $addMenu.find('li').each(function(i,ele){
                $(ele).removeClass('active');
            });
        });
        setActive($addMenu,true,'li');
    }
    //切换页面函数
    function tab(){
        var hash=infoFn(window.location.hash);
        switch (hash){
            case '':
                creatAll(1);
                break;
            case 'doc':
                creatRowStyle('doc');
                break;
            case 'video':
                creatRowStyle('video');
                break;
            case 'music':
                creatRowStyle('music');
                break;
        }
    }
    //创建“全部”页面函数
    function creatAll(mid){
        $('.fileUl').remove();
        $('.otherUl').remove();
        if(!$('.nav').length){
            var $nav=$('<ul class="nav"><li></li></ul>');
            var $navCon=$('<li>云盘</li>');
            $navCon.appendTo($nav);
            var $checkAll=$('<li class="checkAll">√</li>');
            $checkAll[0].onOff=false;
            selectFn($checkAll);
            $checkAll.prependTo($nav);
            $nav.appendTo($main);
        }
        var $fileUl=$('<ul class="fileUl clear"></ul>');
        var $otherUl=$('<ul class="otherUl clear"></ul>');
        for(var i=0;i<data.length;i++){
            if(data[i].id==mid){
                console.log(data[i])
                var nowData=data[i].infor||[];
                break;
            }
        }
        for(var j=0;j<nowData.length;j++){
            if(nowData[j].type=='file'){
                var $l=creatFileLi(nowData[j]);
                if(!nowData[j].have){
                    $l[0].dataId=+new  Date()+Math.random();
                    nowData[j].fileId=$l[0].dataId;
                    data.push(
                        {
                            id:$l[0].dataId,
                            name:nowData[j].name,
                            infor:[]
                        }
                    );
                }else{
                    $l[0].dataId=nowData[j].fileId;
                }
                nowData[j].have=true;
                $fileUl.append($l);
            }else{
                nowData[j].id=+new  Date()+Math.random();
                var $ol=creatOtherLi(nowData[j]);
                $ol[0].dataId=nowData[j].id;
                $otherUl.append($ol);
            }
        }

        $fileUl.appendTo($main);
        setPos($fileUl[0],4,66,'li');
        $otherUl.appendTo($main);
        setPos($otherUl[0],4,191,'li');
        //创建文件夹函数
        function creatFileLi(dt){
            var $li=$('<li><span class="glyphicon glyphicon-folder-close"></span></li>');
            var $input=$('<input type="text" value="" disabled/>');
            $input.val(dt.name);
            $input[0].onclick=function(ev){
                var e=ev||window.event;
                e.cancelBubble=true;
            };
            document.onclick=function(){
                //alert('doc')
                var $input=$('.fileUl').find('li').first().find('input');
                saveFile($input);
                $addMenu.find('li')[3].creat=true;
                setPos($fileUl[0],4,66,'li');
            };
            $input.appendTo($li);
            $li[0].onOff=false;
            $li.mouseenter(function(){
                mouseenterFn(this);
            });
            var $check=$('<div class="check"><span>√</span></div>');
            $check.onOff=false;
            selectFn($check);
            $check.appendTo($li);
            return $li;
        }
        function creatOtherLi(data){
            var $li=$('<li><div class="preview"></div><span></span></li>');
            $li[0].onOff=false;
            $li.mouseenter(function(){
                mouseenterFn(this);
            });
            var $input=$('<input type="text" value='+data.name+' disabled/>');
            var $check=$('<div class="check"><span>√</span></div>');
            $check.onOff=false;
            $input.appendTo($li);
            selectFn($check);
            $check.appendTo($li);
            return $li;
        }
        var $fileUl=$('.fileUl');
        var $otherUl=$('.otherUl');
        var $nav=$('.nav');
        docClick($fileUl);
        docClick($otherUl);
        docClick($nav);
        $('.fileUl').find('li').each(function(){
            enterFn(arguments[1]);
        });

    }
    function creatRowStyle(type){
        var $tempUl=$('<ul class="rowtypeUl"></ul>');
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[i].infor.length;j++){
                if(data[i].infor[j].type==type){
                    var $tempLi=creatRowStyleLi(data[i].infor[j]);
                    $tempLi[0].dataId=data[i].infor[j].id;
                    $tempLi.appendTo($tempUl);
                    //console.dir($tempLi[0])
                }
            }
        }
        $('.main').html('').append($tempUl);
        setPos($('.main')[0],1,55,'.rowtype')
    }
    function creatRowStyleLi(dt){
        var $li=$('<li class="rowtype clear"><input type="text" class="text" value="'+dt.name+'" disabled></input></li>');
        $('<ul class="list clear"><li class="download"><span class="glyphicon glyphicon-cloud-download"></span>下载</li><li class="shaer"><span class="glyphicon glyphicon-share-alt"></span>分享</li><li class="rename"><span class="glyphicon glyphicon-edit"></span>重命名</li><li class="delete"><span class="glyphicon glyphicon-trash"></span>删除</li></ul><div class="size">'+dt.size+'</div><time>'+new Date(dt.id).getFullYear()+'-'+(new Date(dt.id).getMonth()+1)+'-'+new Date(dt.id).getDate()+' '+new Date(dt.id).getHours()+':'+new Date(dt.id).getMinutes()+'</time>').appendTo($li);
        $li[0].onOff=false;
        $li.mouseenter(function(){
            mouseenterFn(this);
        });
        var $check=$('<div class="check"><span>√</span></div>');
        $check.appendTo($li);
        selectFn($check);
        return $li
    }
    //新建文件夹
    function newFile(){
        var hash=infoFn(window.location.hash);
        if(hash!=''){
            //alert(1)
            return false;
        }
        for(var i=0;i<data.length;i++){
            if(data[i].id==newFileId){
                data[i].infor.unshift(
                    {
                        name: '',
                        type: 'file',
                        src: '',
                        date: '2017-02-19',
                    }
                );
            }
        }
        creatAll(newFileId);
        $('.fileUl').find('li').first().find('input').addClass('active').removeAttr('disabled').focus();
    }
    //顶层操作栏显示隐藏函数
    function operateShowFn(){
        var $selectedFile=$('.fileUl').find('.check.active');
        var $selectedOther=$('.otherUl').find('.check.active');
        var $rowStyle=$('.rowtypeUl').find('.check.active');
        if($selectedFile.length==0&&$selectedOther.length==0&&$rowStyle.length==0){
            $('.operate').removeClass('active');
            if($('.checkAll').length!=0){
                $('.checkAll').removeClass('active');
                $('.checkAll')[0].onOff=false;
            }
        }else{
            var number=$selectedFile.length+$selectedOther.length||$rowStyle.length;
            var sum=$('.fileUl').find('.check').length+$('.otherUl').find('.check').length||$('.rowtypeUl').find('.check');
            $('.operate').addClass('active');
            $('.operate strong').html(number);
            if($('.checkAll').length!=0){
                if(number!=sum){
                    $('.checkAll').removeClass('active');
                    $('.checkAll')[0].onOff=false;
                }else{
                    $('.checkAll').addClass('active');
                    $('.checkAll')[0].onOff=true;
                }
            }
        }
        
    }
    //删除文件函数
    function deleteFn(){
        $('.operate .delete').click(function(ev){
            var e=window.event||ev;
            e.cancelBubble=true;
            selectedArr=[];
            var $selectedFile=$('.fileUl').find('.check.active');
            $selectedFile.each(function(){
                selectedArr.push($(arguments[1]).closest('li')[0].dataId);
                $(arguments[1]).closest('li')[0].remove();
                setPos($('.fileUl')[0],4,66,'li');
                for(var i=0;i<data.length;i++){
                    for(var j=0;j<selectedArr.length;j++){
                        if(data[i].id==selectedArr[j]){
                            deletedArr.push(data.splice(i,1));
                            console.dir(data);
                            for(var m=0;m<data.length;m++){
                                if(data[m].id==newFileId){
                                    for(var n=0;n<data[m].infor.length;n++){
                                        if(data[m].infor[n].fileId==selectedArr[j]){
                                            data[m].infor.splice(n,1);
                                            //alert('删除了')
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            var $selectedOther=$('.otherUl').find('.check.active');
            $selectedOther.each(function(){
                console.dir($(arguments[1]).closest('li')[0].dataId)
                selectedArr.push($(arguments[1]).closest('li')[0].dataId);
                $(arguments[1]).closest('li')[0].remove();
                setPos($('.otherUl')[0],4,191,'li');
                    for(var m=0;m<data.length;m++){
                        if(data[m].id==newFileId){
                            for(var n=0;n<data[m].infor.length;n++){
                                for(var j=0;j<selectedArr.length;j++){
                                    if(data[m].infor[n].id&&data[m].infor[n].id==selectedArr[j]){
                                        data[m].infor.splice(n,1);
                                        //alert('删除了');
                                    }
                                }

                            }
                        }
                    }
            });
            operateShowFn();
        });
    }
    //重命名函数
    function rename(){
        $('.operate .rename').click(function(ev){
            var e=window.event||ev;
            e.cancelBubble=true;
            var $selectedFile=$('.fileUl').find('.check.active');
            var $selectedOther=$('.otherUl').find('.check.active');
            var $rowStyle=$('.rowtypeUl').find('.check.active');
            var number=$selectedFile.length+$selectedOther.length+$rowStyle.length;
            if(number>1){
                alert('只能对单个文件夹命名！');
                return false;
            }
            var $input;
            if($selectedFile.closest('li').find('input').length==0){
                $input=$selectedOther.closest('li').find('input');
            }else{
                $input=$selectedFile.closest('li').find('input')
            }
            var $rowStyleInput=$rowStyle.closest('li').find('input');
            $input.addClass('active').removeAttr('disabled').focus().select();
            $rowStyleInput.addClass('active').removeAttr('disabled').focus().select();
            document.onclick=function(){
                if($selectedOther.closest('li').find('input').length!=0){
                    for(var i=0;i<data.length;i++){
                        if(data[i].id==newFileId){
                            for(var j=0;j<data[i].infor.length;j++){
                                if(data[i].infor[j].id==$selectedOther.closest('li')[0].dataId){
                                    data[i].infor[j].name=$input.val();
                                }
                            }
                        }
                    }
                    creatAll(newFileId);
                }else if($selectedFile.closest('li').find('input').length!=0){
                    saveFile($input);
                }else{
                    if($rowStyleInput.val()==''){
                        alert('请输入文件名');
                    }else{
                        for(var i=0;i<data.length;i++){
                            for(var j=0;j<data[i].infor.length;j++){
                                if(data[i].infor[j].id==$rowStyle.closest('li')[0].dataId){
                                    data[i].infor[j].name=$rowStyleInput.val();
                                }
                            }
                        }
                    }
                    tab();
                    $rowStyleInput.removeClass('active').attr('disabled');
                    $rowStyle[0].onOff=false;
                    $rowStyle.removeClass('active');
                    $rowStyle.closest('li')[0].onOff=false;
                    $rowStyle.closest('li.active').removeClass('active');
                    operateShowFn();
                }
            };
        });
    }
    //点击进入文件夹函数
    var idArr=[1];//idArr保存点击进入的文件夹的id
    function enterFn(obj){
        obj.onclick=function(ev){
            var e=ev||window.event;
            e.cancelBubble=true;
            var $navText=$('.nav').find('li').last();
            for(var i=0;i<data.length;i++){
                if(this.dataId==data[i].id){
                    console.log('进入了'+data[i].name);
                    idArr.push(this.dataId);
                    var arr=$navText.text().split('>');
                    for(var j=0;j<arr.length;j++){
                        arr[j]='<em fileId='+idArr[j]+'>'+arr[j]+'</em>';
                    }
                    $navText.html(arr.join('<span>></span>')+'<span>></span>'+data[i].name);
                    creatAll(this.dataId);
                    newFileId=this.dataId;
                }
            }
            $('.nav').find('em').each(g);
            function g(){
                arguments[1].onclick=function(ev){
                    var e=ev||window.event;
                    e.cancelBubble=true;
                    var arr=$navText.text().split('>');
                    for(var j=0;j<arr.length;j++){
                        arr[j]='<em fileId='+idArr[j]+'>'+arr[j]+'</em>';
                    }
                    arr.length=$(this).index('em');
                    if($(this).index('em')==0){
                        $navText.html($(this).html());
                    }else{
                        $navText.html(arr.join('<span>></span>')+'<span>></span>'+$(this).html());
                    }
                    creatAll(this.getAttribute('fileId'));
                    newFileId=this.getAttribute('fileId');
                    $('.nav').find('em').each(g);
                };
            }
        };
    }
    //设置移入和点击效果
    function setActive(obj,isParent,e){
        if(isParent){
            obj.find(e).each(function(i,ele) {
                if(i==0){
                    ele.onOff=true;
                }else{
                    ele.onOff=false;
                }
                $(ele).mouseenter(function () {
                    mouseenterFn(this);
                }).click(function(){
                    obj.find(e).each(function(i,ele) {
                        $(ele).removeClass('active');
                        ele.onOff=false;
                    });
                    $(this).addClass('active');
                    this.onOff=true;
                });
            });
        }else{
            obj.onOff=false;
            obj.onmouseenter=function(){
                mouseenterFn(obj);
            };
            $(obj).click(function(){
                $(obj).addClass('active');
                this.onOff=true;
            });
        }
    }
    function mouseenterFn(th){
        $(th).addClass('active').mouseleave(function () {
            if (!th.onOff) {
                $(th).removeClass('active');
            }
        });
    }
    function selectFn($obj){
        $obj.click(function(ev){
            var e=window.event||ev;
            if(this.onOff){
                $(this).removeClass('active');
                this.onOff=false;
                if(this.className.indexOf('checkAll')!=-1){
                    var $fileUl=$('.fileUl');
                    var $otherUl=$('.otherUl');
                    $fileUl.find('li').each(function(){
                        $(arguments[1]).removeClass('active');
                        arguments[1].onOff=false;
                        $(arguments[1].querySelector('.check')).removeClass('active');
                        arguments[1].querySelector('.check').onOff=false;
                    });
                    $otherUl.find('li').each(function(){
                        $(arguments[1]).removeClass('active');
                        arguments[1].onOff=false;
                        $(arguments[1].querySelector('.check')).removeClass('active');
                        arguments[1].querySelector('.check').onOff=false;
                    });
                }else{
                    $(this).closest('li')[0].onOff=false;
                }
            }else{
                $(this).addClass('active');
                this.onOff=true;
                if(this.className.indexOf('checkAll')!=-1){
                    var $fileUl=$('.fileUl');
                    var $otherUl=$('.otherUl');
                    $fileUl.find('li').each(function(){
                        $(arguments[1]).addClass('active');
                        arguments[1].onOff=true;
                        $(arguments[1].querySelector('.check')).addClass('active');
                        arguments[1].querySelector('.check').onOff=true;
                    });
                    $otherUl.find('li').each(function(){
                        $(arguments[1]).addClass('active');
                        arguments[1].onOff=true;
                        $(arguments[1].querySelector('.check')).addClass('active');
                        arguments[1].querySelector('.check').onOff=true;
                    });
                }else{
                    $(this).closest('li')[0].onOff=true;
                }
            }
            e.cancelBubble=true;
            operateShowFn();
            deleteFn();

        });

    }
    function docClick($obj){
        $(document).click(function(){
            $obj.find('li').each(f);
            function f(){
                if(arguments[1].onOff){
                    $(arguments[1]).removeClass('active');
                    arguments[1].onOff=false;
                    $(arguments[1].querySelector('.check')).removeClass('active');
                    arguments[1].querySelector('.check').onOff=false;
                }
            }
        });
        operateShowFn();
    }
    //获取搜索信息或哈希值函数
    function infoFn(val){
        var str=val.slice(1).split('&');
        return str[0];
    }
    //元素定位函数
    function setPos(obj,n,h,el){
        var li=obj.querySelectorAll(el);
        for(var i=0;i<li.length;i++){
            li[i].style.position='absolute';
            li[i].style.left=214*(i%n)+'px';
            li[i].style.top=Math.floor(i/n)*h+'px';
        }
        obj.style.height=parseInt((i-1)/n)*h+'px';
    }
    function saveFile($obj){
        if($obj.val()==''){
            $('.fileUl').find('li').first().remove();
            data.pop();
            for(var i=0;i<data.length;i++){
                if(data[i].id==newFileId){
                    data[i].infor.shift();
                }
            }
            setPos($('.fileUl')[0],4);
        }else{
            for(var i=0;i<data.length;i++){
                if(data[i].id==newFileId){
                    for(var j=0;j<data[i].infor.length;j++){
                        if(data[i].infor[j].name==''){
                            data[i].infor[j].name=$obj.val();
                            data[i].infor[j].have=false;
                            //点击给新文件夹命名重新渲染前删除原来没有命名的数据
                            data.pop();
                        }else{
                            if(data[i].infor[j].fileId&&data[i].infor[j].fileId==$obj.closest('li')[0].dataId){
                                data[i].infor[j].name=$obj.val();
                                data[i].infor[j].have=false;
                                //点击给新文件夹命名重新渲染前删除原来没有命名的数据
                                data.pop();
                            }
                        }
                    }
                    creatAll(newFileId);
                }
            }
        }
    }
})();