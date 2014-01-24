define(function(require ,exports ,module) {
    "use strict";
    var _ = {},Public = {}; 
    _.scrollbar = require("./scrollbar");
    _.tmpl = require("./tmpl");

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
            var boo = false;
            if (!boo) {
                $this.css("background-position","0px -147px");
                $this.parents(".tBody").addClass("tBodyselected");   
                boo = true;    
            } else {
                $this.css("background-position","0px -167px");
                $this.parents(".tBody").removeClass("tBodyselected");
                boo = false;
            }
        });
    };

    _._deleteWork = function() {
        /** delete 按钮绑定事件 **/
        $(".delete").on("click" ,function() {
            var deArray = [],
                $elArray = $("#tBody .row2 span"),
                $deElem = $(".tBodyselected");
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
            $("#scrollbar-thumb").animate({"top":"0"});
            $("#tBody").animate({"top":"0"});
        });     
    };

    Public.basehandle = function() {
        _._checkInit();
        _._scrollInit();
        _._deleteWork();
    };

    return Public;
});