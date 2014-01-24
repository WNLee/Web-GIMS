/** 
* Description: The form.
* @Author: Geek-Lee(GeekLee2020@gmail.com)
* @Version: 1.0
*/

define(function(require ,exports ,module){
    'use strict';
    var jQuery = require("jquery");
    var _ = {} ,Public = {};

    _.formRegexp = {
        "name": /^[\u4e00-\u9fa5]{1,8}$/,
        "pwd": /^[a~zA-Z0-9]n{6,}$/,
        "phone":/^[1-9]{1}[0-9]{3,10}$/,
        "email": /^.+@.+\.[a-zA-Z]{2,4}$/
    };

    _.result = {};

    _._setNewReg = function(str) {
        var param = {};
        for (var i = 0,len = str.length; i < len; i++) {
            for (var key in _.formRegexp) {  
                if (key === str[i].name) {
                    param[key] = _.formRegexp[key];
                }
            }
        }
        return param;
    };

    _._setNewInput = function(str) {
        var ary = [];
        for (var i = 0,len = str.length; i < len; i++) {
            for (var key in _.formRegexp) {               
                if (key === str[i].name) {
                    ary.push(str[i]);
                }
            }
        }
        return ary;
    };

    _.setResult = function(str) {
        var param = {};
        for (var i = 0,len = str.length; i < len; i++) {
            for (var key in _.formRegexp) {
                if (key === str[i].name) {
                    param[key] = false;
                }
            }
        }
        return param;
    }

    Public.baseHandler = {};

    module.exports = Public.baseHandler;

    Public.baseHandler.addRegxp = function(obj) {
        for (var i in obj) {
            for (var j in _.formRegexp) {
                if (_.formRegexp[j] === obj[i]) {
                    console.log('正则表达式存在！');
                    break;
                }
            }
            _.formRegexp[i] = obj[i];
        }
        return true;
    };

    Public.baseHandler.handler = function(str) {
        this.str = str;
        this.inputArray = document.forms[str]
                            .getElementsByTagName('input');
        this.inputLen = this.inputArray.length;
        this.el = _._setNewInput(this.inputArray);
        this.reg = _._setNewReg(this.inputArray);
        _._result = _.setResult(this.inputArray);
    };

    Public.baseHandler.handler.prototype.getResult = function() {
        return _._result;
    }

    Public.baseHandler.handler.prototype.init = function(callback_right ,callback_error) {
        if (typeof(callback_right) != "function" || typeof(callback_error) != "function") {
            console.log("callback is not a function!");
            return false;
        }
        for(var i = 0, len = this.el.length; i < len; i++) {
            var that = this;
            var handle = (function(i) {
                return function() {
                    if (_.formRegexp[that.el[i].name].test(that.el[i].value)) {
                        _._result[that.el[i].name] = true;
                        callback_right.call(that.el[i]);
                    } else {
                        _._result[that.el[i].name] = false;
                        callback_error.call(that.el[i]);
                    }
                }
            }(i));            
            that.el[i].onfocus = handle;
            that.el[i].onkeyup = handle;
            that.el[i].onblur = handle;
        }
    };
});