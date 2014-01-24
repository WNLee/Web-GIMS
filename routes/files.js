/**
 * files.js
 */

var fs = require("fs")
  , path = require("path"); 

function File(name,num,files) {
    this.files = files;
    this.name = name;
    this.num = num;
};

module.exports = File;

File.prototype.rename = function(str,callback) {
    str = '/'+str+'/';
    callback = callback || function(){};
    var file = {}, usr = this.name;
    for (var key in this.files) {
        file = this.files[key];
        file[0] ? _inner(usr,file) : _rename(usr,file);
    }
    callback();
    function _rename(user,obj) {
        if (obj.size == 0) {
            fs.unlinkSync(obj.path);
        } else {
            var target_path = './public/info/'+user+str+ obj.name;
            fs.renameSync(obj.path, target_path);
        }  
    }
    function _inner(user,arr) {
        if (arr.length) {
            _rename(user,arr.shift());
            _inner(user,arr);
        }
    }
};

File.mkdirSync = function(url,mode,callback) {
    var arr = url.split("/");
    mode = mode || 0755;
    callback = callback || function(){};
    if(arr[0]==="."){
        arr.shift();
    }
    if(arr[0] == ".."){
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!path.existsSync(cur)){
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            callback();
        }
    }
    arr.length && inner(arr.shift());
};

File.rmdirSync = (function(){
    function iterator(url,dirs){
        var stat = fs.statSync(url);
        if(stat.isDirectory()){
            dirs.unshift(url);//收集目录
            inner(url,dirs);
        }else if(stat.isFile()){
            fs.unlinkSync(url);//直接删除文件
        }
    }
    function inner(path,dirs){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,dirs);
        }
    }
    return function(dir,cb){
        cb = cb || function(){};
        var dirs = [];
 
        try{
            iterator(dir,dirs);
            for(var i = 0, el ; el = dirs[i++];){
                fs.rmdirSync(el);//一次性删除所有收集到的目录
            }
            cb()
        }catch(e){//如果文件或目录本来就不存在，fs.statSync会报错，不过我们还是当成没有异常发生
            e.code === "ENOENT" ? cb() : cb(e);
        }
    }
})();

File.getAllFolersAndFiles = (function(){
    function iterator(url, folders, files){
        var stat = fs.statSync(url);
        if(stat.isDirectory()){
            folders.unshift(url);//收集目录
            inner(url,folders, files);
        }else if(stat.isFile()){
            files.unshift(url);//收集文件
        }
    }
    function inner(path,folders,files){
        var arr = fs.readdirSync(path);
        for(var i = 0, el ; el = arr[i++];){
            iterator(path+"/"+el,folders,files);
        }
    }
    return function(dir){
        var folders = [], files = [];
        try{
            iterator(dir,folders,files);
        }catch(e){
        }finally{
            return {
                folders : folders,
                files   : files
            }
        }
    }
})();

File.getAllFiles = function(root) {
  var result = [], files = fs.readdirSync(root)
  files.forEach(function(file) {
    var pathname = root+ "/" + file
      , stat = fs.lstatSync(pathname)
    if (stat === undefined) return
 
    // 不是文件夹就是文件
    if (!stat.isDirectory()) {
      result.push(pathname)
    // 递归自身
    } else {
      result = result.concat(getAllFiles(pathname))
    }
  });
  return result
};

// File.prototype.rename = function(callback) {
//     callback = callback || function(){};
//     var file = {};
//     for (var key in this.files) {
//         file = this.files[key];
//         file[0] ? _inner(file) : _rename(file);
//     }
//     callback();
//     function _rename(obj) {
//         if (obj.size == 0) {
//             fs.unlinkSync(obj.path);
//         } else {
//             var target_path = './public/info/李伟楠/' + obj.name;
//             fs.renameSync(obj.path, target_path);
//         }  
//     }
//     function _inner(arr) {
//         if (arr.length) {
//             _rename(arr.shift());
//             _inner(arr);
//         }
//     }
// };