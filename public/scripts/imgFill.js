/** 
* Description: The function of imgFill is to fill screen with the background image.
* @Author: Geek-Lee(GeekLee2020@gmail.com)
* @Version: 1.0
*/

define(function(require ,exports ,module) {
    "use strict";
    var jq = require("jquery");
    var Private = {} ,Public = {};

    Public.BaseHandler = function(el ,imgObj) {
        this.width = imgObj.img.width;
        this.height = imgObj.img.height;
        this.iw = imgObj.iw;
        this.ih = imgObj.ih;
        this.el = el;
    }

    module.exports = Public.BaseHandler;
    
    Private._clacImgZoomParam = function(
        Maxwidth ,Maxheight ,width ,height ) {
        var param = {
            marginTop: 0,
            marginLeft: 0,
            width: width,
            height: height,
            left: "50%",
            top: "50%"
            },
            rateWidth = Maxwidth / width,
            rateHeight = Maxheight / height,
            rate = rateWidth >= rateHeight ? rateWidth : rateHeight;
        param.width = Math.round(width * rate) + "px";
        param.height = Math.round(height * rate) + "px";
        param.marginLeft = Math.round(0-(parseInt(param.width ,10) / 2 )) + "px";
        param.marginTop = Math.round(0-(parseInt(param.height ,10) / 2)) + "px";
        return param;
    };

    Private._setStyle = function(el ,obj) {
        for (var key in obj) {
            el.style[key] = obj[key];
        }
    };

    Public.BaseHandler.prototype.init = function() {
        var elem = $(this.el)[0];
        var _cssObj = {
            marginTop: -(this.width / 2),
            marginLeft: -(this.height / 2),
            width: this.width,
            height: this.height
        };
        _cssObj = Private._clacImgZoomParam(
            this.iw ,this.ih ,this.width ,this.height);
        Private._setStyle(elem, _cssObj);
    };
});