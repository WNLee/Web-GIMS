/** 
* Description: The scrollbar.
* @Author: Geek-Lee(GeekLee2020@gmail.com)
* @Version: 1.0
*/

define(function(require ,exports ,module) {
    "use strict";
    var jq = require("jquery");
    var _ ={}, Public = {};

    Public.basehandle = function(obj) {
        this.container = obj.container;
        this.scrollbar = obj.scrollbar;
        this.content = obj.content;
        this.thumb = obj.thumb;
        var done = (function(o) {
            return o.init.apply(o, arguments);
        }(this));
    }

    module.exports = Public.basehandle;

    Public.basehandle.prototype = {
        init: function() {
            var that = this;
            this._y = 0;
            this.rate = this.container.offsetHeight / this.content.offsetHeight;
            this.thumb.style.height =this.rate*this.scrollbar.offsetHeight+"px";
            this.diff = this.scrollbar.offsetHeight - this.thumb.offsetHeight;
            this.thumb.style.position = "absolute";
            this.thumb.onmousedown = function(oEvent) {
                that.start(oEvent);
            };
        },
        start: function(oEvent) {
            oEvent = oEvent || event;
            var that = this;
            this._y = oEvent.clientY - this.thumb.offsetTop;
            this.thumb.onmousemove = function(oEvent) {
                that.move(oEvent);
            }
            document.body.onmouseup = function() {
                that.stop();
            }
        },
        move: function(oEvent) {
            oEvent = oEvent || event;
            this._offy = oEvent.clientY - this._y;
            if (this._offy > 0 && this._offy < this.diff) {
                this.thumb.style.top = this._offy + "px";
                this.content.style.top = -this._offy / this.rate + "px";
            }
        },
        stop: function() {
            this.thumb.onmousemove = null;
        }
    };
});