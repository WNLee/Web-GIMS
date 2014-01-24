define(function(require ,exports ,module) {
    "use strict";
    var jq = require('jquery');
    var _ = {}, Public = {};
    Public.delete = function(data,callback) {
        callback = callback || function() {};
        $.post('/delete',data,function(data,textStatus) {
            callback(data,textStatus);
        });
    };
    return Public;
});