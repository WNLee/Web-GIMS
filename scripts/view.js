/** 
* Description: The view.
* @Author: Geek-Lee(GeekLee2020@gmail.com)
* @Version: 1.0
*/

define(function(require ,exports ,module) {
    "use strict";
    var jq = require("jquery");
    var Private = {} ,Public = {};
    Private._tmpls = {};

    Private._tmpl = function(template ,data) {
        var i = 0,
            len = data.length,
            fragment = '';
        function replace(obj) {
            var t ,key ,reg;
            for(key in obj) {
                reg = new RegExp('{{ ' + key + ' }}','ig');
                t = (t||template).replace(reg ,obj[key]);
            }
            return t;
        }
        for(; i < len; i++) {
            fragment += replace(data[i]);
        }
        return fragment;
    };

    Public.addTmpls = function(typename ,str) {
        for (var key in Private._tmpls) {
            if(Private._tmpls[key] === typename) {
                console.log("模板名称存在！");
                return false;
            }
        }
        Private._tmpls[typename] = str;
    };

    Public.setData = function(typename ,data) {
        var htm = "";
        for (var key in Private._tmpls) {
            if(Private._tmpls[key] === typename) {
                console.log("模板不存在！");
                return false;
            }
        }
        htm += Private._tmpl(Private._tmpls[typename] ,data);
        return htm;
    };

    return Public;
});