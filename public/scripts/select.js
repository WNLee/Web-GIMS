define(function(require ,exports ,module) {
    var jq = require("jquery");
    var _ = {}, Public = {};

    _._getCssStyle = function(_obj ,_name) {
        var result;
        _name = _name.toLowerCase();
        if(_name && typeof value === 'undefined'){
            if(_obj.style && _obj.style[_name]){
                result = _obj.style[_name];
            }
            else if(_obj.currentStyle){
                _name = _name.replace(/\-([a-z])([a-z]?)/ig, function(s,a,b){
                    return a.toUpperCase() + b.toLowerCase();
                });
                result = _obj.currentStyle[_name];
            }
            else if(document.defaultView && document.defaultView.getComputedStyle){
                var w3cStyle = document.defaultView.getComputedStyle(_obj, null);
                result = w3cStyle.getPropertyValue(_name);
            }
            return result;
        }
    }

    _._setStyle = function(el_ctnr,el_list,el_ctn) {
        var el_list_li = el_list.childNodes;
        var cssStyle = {
            display: "none",
            position: "absolute",
            left: 0 - parseInt(_._getCssStyle(el_ctnr,"border-left-width"),10) + "px",
            top: _._getCssStyle(el_ctnr,"height"),
            width: _._getCssStyle(el_ctnr,"width"),
            border: _._getCssStyle(el_ctnr,"border-bottom-width") + " " +
                    _._getCssStyle(el_ctnr,"border-bottom-style") + " " +
                    _._getCssStyle(el_ctnr,"border-bottom-color"),
            backgroundColor: _._getCssStyle(el_ctnr,"background-color"),
            zIndex: 2,
            outline: 0
        };
        var li_cssStyle = {
            padding: _._getCssStyle(el_ctn,"padding-top") + " " +
                     _._getCssStyle(el_ctn,"padding-right") + " " +
                     _._getCssStyle(el_ctn,"padding-bottom") + " " +
                     _._getCssStyle(el_ctn,"padding-left"),
            cursor: "pointer"
        }
        for (var key in cssStyle) {
            el_list.style[key] = cssStyle[key];
        }
        for (var key in li_cssStyle) {
            for (var i = el_list_li.length - 1; i >= 0; i--) {
                el_list_li[i].style[key] = li_cssStyle[key];
            }
        }
    };

    function basehandle(obj) {
        this.container = obj.container;
          this.content = obj.content;
            this.input = obj.input;
             this.list = obj.list;
              this.btn = obj.btn;
        var init = (function(obj) {
            _._setStyle(obj.container,obj.list ,obj.content);
        }(this));
    }

    module.exports = basehandle;

    basehandle.prototype.init = function(str) {
        var el_list_li = this.list.childNodes;
        var boo = false, that = this;

        this.btn.onclick = function(event) {
            stopBubble(event);
            if (!boo) {
                show();
            } else if (boo) {
                hide();
            }
        };

        document.body.onclick = function(event){
            stopBubble(event);
            that.list.style.display = "none";
            boo = false;
        };

        for (var i = el_list_li.length - 1; i >= 0; i--) {
            el_list_li[i].onclick = (function(i) {
                return function() {
                    if (document.documentElement.innerText) {
                        that.content.innerText = el_list_li[i].innerText;
                        that.input.value = el_list_li[i].innerText;
                        hide();
                    } else if (document.documentElement.textContent) {
                        that.content.textContent = el_list_li[i].textContent;
                        that.input.value = el_list_li[i].textContent;
                        hide();                       
                    }
                };
            }(i));         
            el_list_li[i].onmouseover = (function(i) {
                return function() {
                    el_list_li[i].style.backgroundColor = str;
                };
            }(i));
            el_list_li[i].onmouseout = (function(i) {
                return function() {
                    el_list_li[i].style.backgroundColor = "";
                };
            }(i));
        }

        function stopBubble(e) {
            if ( e && e.stopPropagation )
                e.stopPropagation();
            else
                window.event.cancelBubble = true;
        }

        function show() {
            that.list.style.display = "block";
            that.list.tabIndex = 0;
            that.list.hideFocus = 'on'; 
            that.list.focus();
            boo = true;
        }

        function hide() {
            that.list.style.display = "none";
            boo = false;
        }
    };

});