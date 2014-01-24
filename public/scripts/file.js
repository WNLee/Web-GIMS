/** 
* Description: The files.
* @Author: Geek-Lee(GeekLee2020@gmail.com)
* @Version: 1.0
*/

define(function(require ,exports ,module) {
    var jq = require("jquery");
    var _ ={}, Public = {};

    Public.newfile = function(el,obj) {
        this.el = $(el)[0];
        this.cssStyle = obj;
        var init = (function(that) {
            for (var key in that.cssStyle) {
                that.el.style[key] = that.cssStyle[key];
            }
        }(this));
    };

    module.exports = Public.newfile;

    Public.newfile.prototype.getFileName = function() {
        var files = this.el.files,
            array = [];
        if (files) {
            for (var i = 0,len = files.length; i < len; i++) {
                array.push(files[i].name);
                array.join(",");
            }
            return array;
        } else {
            array.push(this.el.value.match(/[^\/\\]*$/)[0]);
            array.join(",");
            return array;
        }
    };
});