define(function(require ,exports ,module) {
    "use strict";
    var _ = {}, Public = {}; 
    _.boo = false;
    _.formvalidator = require("./formvalidator");
    _.select = require("./select");
    _.upfile = require("./file");

    _._radio = function() {
        /** 表单 radio 效果 **/
        $("#addr1 ,#addr2").on("click",function() {
            $(".addr-container")
                   .removeClass("radio-selected");
            $(this).parent(".addr-container")
                   .addClass("radio-selected");
        });
    };

    _._selectInit = function() {
        /** 初始化select **/
        var select = new _.select({
                        container: $(".dropbox")[0],
                        content: $(".dropbox .dcontent")[0],
                        btn: $(".dropbox .dbtn")[0],
                        list: $(".dropbox .droplist")[0],
                        input: $(".dropbox input")[0]
                     }); 
        select.init("#e6f2f2");
    };

    _._upfileInit = function() {
        /** 初始化upfile **/
        var id = function(id) {
            return document.getElementById(id);
        };
        var cssStyle = {
            "position": "absolute",
            "left": "292px",
            "padding": 0,
            "width": "24px",
            "height": "26px",
            "fontSize": 0,
            "opacity": 0,
            "filter": "alpha(opacity=0)",
            "cursor": "pointer"
        };
        var el_eltic = id("photo_text1"),el_wash = id("photo_text2"),
            el_ph1 = id("photo1"),el_ph2 = id("photo2");
        var file1 = new _.upfile("#photo1",cssStyle);
        var file2 = new _.upfile("#photo2",cssStyle);
        var dataFile = "";
        el_ph1.onclick = function(){
            handle(el_eltic,dataFile,file1);
        };
        el_ph2.onclick = function(){
            handle(el_wash,dataFile,file2);
        };        
        function handle(el,dataFile,obj) {
            var ani = window.setInterval(function() {
                var str = obj["getFileName"]();
                if (str) {
                    if (el.value != str) {
                        el.value = dataFile + str;
                    }
                }
            },100);
        }
    };

    _._aniForm = function() {
        /** 表单模块动态效果 **/
        var $bar = $(".infobar"),
            $ctn = $(".info-content"),
            $btn = $(".info-btn");

        $(".addnew").on("click" ,function() {
            if (!_.boo) {
                $bar.animate({"right":"0"},function() {
                    $btn.css("display","none");
                    $ctn.css("display","block");
                    _.boo = true;
                });
            } else {
                $bar.animate({"right":"-320px"},function() {
                    $ctn.css("display","none");
                    $btn.css("display","block");
                    _.boo = false;
                });
            }
        });
            
        $btn.on("click" ,function() {
            if (!_.boo){
                $bar.animate({"right":"0"},function() {
                    $ctn.css("display","block");
                    $btn.css("display","none");
                    _.boo = true;
                });
            }
        });
    };

    _._formsubmit = function() {
        /** 表单验证添加 dormitory 项 **/
        _.formvalidator.addRegxp({"dormitory": /^[1-9]{1}[0-9]{2}$/});

        /** 实例化表单验证 **/
        var forms =  new _.formvalidator.handler("newform");

        /** 调用验证方法并传入参数 **/
        forms.init(function(){
            $(this).parent('.form-layout')
                    .eq(0)
                    .css("background-image"
                        ,"url(./images/fonts-on.png)");
        },function(){
            $(this).parent('.form-layout')
                    .eq(0)
                    .css("background-image"
                        ,"url(./images/fonts-red-no.png)");
        });

        /** 表单验证处理 **/
        $("form[name='newform']").submit(function() {
            var result = forms.getResult();
            var boo_sub = true;
            var $bar = $(".infobar"),
                $ctn = $(".info-content"),
                $btn = $(".info-btn");
            for (var key in result) {
                if (result[key] == false) {
                    boo_sub = false;
                    break;
                } 
            }
            if (boo_sub) {
                if (_.boo) {
                    $bar.animate({"right":"-320px"},function() {
                        $ctn.css("display","none");
                        $btn.css("display","block");
                        _.boo = false;
                    });
                }
            } else if (!boo_sub) {
                alert("表单信息错误！");
                return false;
            }
            return false;
        });        
    };

    Public.basehandle = function() {
        _._radio();
        _._aniForm();
        _._selectInit();
        _._upfileInit();
        _._formsubmit();
    };

    return Public;
});