define(function(require ,exports ,module) {
    "use strict";
    var _ = {},Public = {}; 
    _.scrollbar = require("./scrollbar");
    _.ajax = require("./ajax");
    _.view = require("./view");
    _.tmpl = require("./tmpl");

    _._innerText = function($query,ind) {
        var $el = $query.shift();
        if ($el) {
            $el.innerText = ind;
            if ($query.length) {
                _._innerText($query, ind+1)
            }
        }
    }

    _._scrollInit = function() {
        /** 初始化 scrollbar  **/
        var obj = {        
                container: $(".tBody-container")[0],
                scrollbar: $("#scrollbar")[0],
                content: $("#tBody")[0],
                thumb: $("#scrollbar-thumb")[0]
            };
        var scrollbar = new _.scrollbar(obj);
    };

    _._checkInit = function() {
        /** 初始化表格 check  **/
        $(".tBody .row0 span").on("click" ,function() {
            var $this = $(this);
            if ($this.css("background-position") == "0px -167px" ||
                $this.css("background-position") == "0% -167px") {
                $this.css("background-position","0px -147px");
                $this.parents(".tBody").addClass("tBodyselected");     
            } else {
                $this.css("background-position","0px -167px");
                $this.parents(".tBody").removeClass("tBodyselected");
            }
        });
    };

    _._loadInfo = function(num,data) {
        var htm = "";
        var arry = [data];
        var $ctn = $(".info-content");
        _.view.addTmpls("FORMHTML",_.tmpl.FORMHTML);
        htm += _.view.setData("FORMHTML",arry);
        if (data.e_photo_text !== "" && data.w_photo_text !== "") {
            htm += _getTmpl(data,'e_photo_text','e',true);
        } else {
            _.view.addTmpls("PHOTO2",_.tmpl.PHOTO2);
            htm += _.view.setData("PHOTO2",arry);
        };
        $ctn.empty().html(htm);
        _navBtn();
        _picBtn();
        $("#info-num").text(parseInt(num) < 10? '0'+num : num);
        $('.putAlway-btn').on('click' ,function() {
            $(".infobar").animate({"right":"-320"},function() {
                $(".info-content").css("display","none");
                $(".info-btn").css("display","block");
            }).attr('dataView','off');
        });
        function _navBtn() {
            $('.pre-nav li').on('click', function(){
                var $this = $(this);
                $this.addClass('hover').siblings().removeClass('hover');
                $('.img-container,.img-title,.pic-btn').remove();
                if($this.attr('dataType') == 'e') {
                    $('.preview')
                            .append(_getTmpl(data,'e_photo_text','e'),false);
                } else if($this.attr('dataType') == 'w') {
                    $('.preview')
                            .append(_getTmpl(data,'w_photo_text','w'),false);
                }
                _picBtn();
                _navBtn();
            })  
        }
        function _picBtn() {
            $('.pic-btn span').on('click', function(){
                var $this = $(this);
                $this.addClass('hover')
                            .siblings()
                            .removeClass('hover');
                $('.img-container img')
                            .attr({"src":$this.attr('value')});
                $('.img-title')
                            .text($this.attr('title'));
            });            
        }
        function _getTmpl(data,key,type,boo) {
            var _tmpl = "";
            if(boo) {
                _tmpl += '<div class="preview"><ul class="pre-nav"><li '+ 
                         'class="hover" dataType="e">电子版</li><li '+
                         'dataType="w">冲洗版</li></ul>';
            }
            var arry = data[key].toString().split(',');
            _tmpl += '<div class="img-container"><div class="subpic"> '+
                     '<img id="pic" src="info/'+ data.randnum +'/'+type+'/'+
                     arry[0] +'" ' +'alt="'+ arry[0] +'"></div></div><h4 '+
                     'class="img-title">'+ arry[0] +'</h4><div '+
                     'class="pic-btn"><span class="hover" title="'+ 
                     arry[0] +'" value="info/'+ data.randnum +'/'+type+'/'+ 
                     arry[0] +'"alt="'+ arry[0] +'"></span>';

            for(var i=1,l=arry.length;i<l;i++) {
                _tmpl += '<span title="'+ arry[i] +'" value="info/'+
                         data.randnum+'/'+type+'/'+arry[i]+
                         '" alt="'+arry[i]+'"></span>';
            }
            _tmpl += '</div></div>';
            return _tmpl;
        }
    };

    _._getPersonInfo = function() {
        var $elem = $('.data-tr').children('.row3').children('span');
        $elem.on("click", function() {
            var $bar = $(".infobar"),
                $ctn = $(".info-content"),
                $btn = $(".info-btn"),
                viewStatic = $bar.attr('dataView'),
                number = $bar.attr('datanumber');
            var $faElem = $(this).parents(".data-tr");
            var Num = $faElem.children('.row2')
                                .children('span')
                                .text();
            if (viewStatic === 'off') {
                $bar.animate({"right":"0"},function() {
                    $btn.css("display","none");
                    $ctn.css("display","block");
                    $bar.attr('dataView','on');
                    $bar.attr('datanumber',Num);
                });
                var oinfo = {
                    "name": $faElem.children('.row3')
                                    .children('span')
                                    .text(),
                    "phone": $faElem.children('.row5')
                                    .children('span')
                                    .text(),
                    "email": $faElem.children('.row6')
                                    .children('span')
                                    .text()
                };
                $.post("/getInfo", oinfo, function(data) {
                    _._loadInfo(Num,data);
                    console.log(data);
                });
            } else if (number !== Num){
                var oinfo = {
                    "name": $faElem.children('.row3')
                                    .children('span')
                                    .text(),
                    "phone": $faElem.children('.row5')
                                    .children('span')
                                    .text(),
                    "email": $faElem.children('.row6')
                                    .children('span')
                                    .text()
                };
                $.post("/getInfo", oinfo, function(data) {
                    _._loadInfo(Num,data);
                    console.log(data);
                });
                $bar.attr('datanumber',Num);
            } else {  
                $bar.animate({"right":"-320px"},function() {
                    $ctn.css("display","none");
                    $btn.css("display","block");
                    $bar.attr('dataView','off');
                    $bar.attr('datanumber','0');
                });
            }
        });
    };

    _._getNotCompus = function() {
        $('.non-compus-Town').on("click" ,function() {
            $('.compus-Town').removeClass('hover');
            $(this).addClass('hover');
            $.get('/notcompus',function(data,textStatus) {
                if (textStatus == "success") {
                    var htm = "";
                    _.view.addTmpls("TRCONTENT",_.tmpl.TRCONTENT);
                    htm += _.view.setData("TRCONTENT",data.json);
                    if (data.json.length < 9) {
                        for (var i=0,len=9-data.json.length;i<len;i++) {
                            htm += _.tmpl.TRCONTENTSPEC;
                        }
                    }
                    $('#tBody tbody').empty();
                    $('#tBody tbody').html(htm);
                    var $no = $('.data-tr')
                                .children('.row2')
                                .children('span')
                                .toArray();
                    _._innerText($no,1);
                    _._checkInit();
                    _._getPersonInfo();
                }
            });
        });
    };

    _._getCompus = function() {
        $('.compus-Town').on("click" ,function() {
            $('.non-compus-Town').removeClass('hover');
            $(this).addClass('hover');
            $.get('/compus',function(data,textStatus) {
                if (textStatus == "success") {
                    var htm = "";
                    _.view.addTmpls("TRCONTENT",_.tmpl.TRCONTENT);
                    htm += _.view.setData("TRCONTENT",data.json);
                    if (data.json.length < 9) {
                        for (var i=0,len=9-data.json.length;i<len;i++) {
                            htm += _.tmpl.TRCONTENTSPEC;
                        }
                    }
                    $('#tBody tbody').empty();
                    $('#tBody tbody').html(htm);
                    var $no = $('.data-tr')
                                .children('.row2')
                                .children('span')
                                .toArray();
                    _._innerText($no,1);
                    _._checkInit();
                    _._getPersonInfo();
                }
            });
        });
    };

    _._deleteWork = function() {
        /** delete 按钮绑定事件 **/
        $(".delete").on("click" ,function() {
            var deArray = [],
                $elArray = $("#tBody .row2 span"),
                $deElem = $(".tBodyselected");
            for (var i=0;i<$deElem.length;i++) {
                var data = {
                    "name": $deElem.eq(i).children(".row3").text(),
                    "phone": $deElem.eq(i).children(".row5").text()
                };
                deArray.push(data);
                deArray.join(',');
            }
            _.ajax.delete({"delete":deArray},function(data,textStatus) {
                if (data.msg == "true") {
                    var diff = 9 - $elArray.length + $deElem.length;
                    if (diff) {
                        var htm = "";
                        $deElem.remove();
                        htm += $("#tBody tBody").html();
                        for (var i = 0; i < diff; i++) {
                            htm += _.tmpl.TRCONTENTSPEC;
                        }
                        $("#tBody tBody").html(htm);
                        _._checkInit();
                    } else {
                        $deElem.remove();
                        _._checkInit();
                    }
                    _._scrollInit();
                    _._getPersonInfo();
                    $("#scrollbar-thumb").animate({"top":"0"});
                    $("#tBody").animate({"top":"0"});
                    _._innerText($('.data-tr')
                            .children('.row2')
                            .children('span')
                            .toArray(),1);
                } else alert('删除失败！');
            });
        });     
    };

    Public.basehandle = function() {
        _._checkInit();
        _._scrollInit();
        _._getCompus();
        _._getNotCompus();
        _._getPersonInfo();
        _._deleteWork();
    };

    return Public;
});