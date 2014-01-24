/**
 * info
 */

var mongodb = require('./db');

function Info(obj) {
    this.name = obj.name;
    this.num = obj.num;
    this.addr = obj.addr;
    this.phone = obj.phone;
    this.email = obj.email;
    this.dormit = obj.dormit;
    this.dormitory = obj.dormitory;
    this.e_photo_text = obj.e_photo_text;
    this.w_photo_text = obj.w_photo_text;
    this.randnum = obj.randnum;
    this.photourl = obj.photourl;
}

module.exports = Info;

Info.prototype.save = function(callback) {
    callback = callback || function() {};
    var posts = {
        name: this.name,
        num: this.num,
        addr: this.addr,
        phone: this.phone,
        email: this.email,
        dormit: this.dormit,
        dormitory: this.dormitory,
        e_photo_text: this.e_photo_text,
        w_photo_text: this.w_photo_text,
        randnum: this.randnum,
        photourl: this.photourl
    };

    mongodb.open(function(err, db){
        if (err) {
           return callback(err);
        }
        db.collection('info', function (err, collection) {
            if (err) {
              mongodb.close();
              return callback(err);
            }
            collection.insert(posts, {
               safe: true
            },function(err, post) {
               mongodb.close();
               callback(null);
               console.log('The information has been insert!');
            });
        });
    });
};

Info.getAll = function(addr,callback) {
    addr = addr || 1;
    callback = callback || function() {};
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('info', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.find({"addr":addr}).toArray(function (err,arry) {
                mongodb.close();
                if (err) {
                    callback(err);//失败！返回 err
                }
                callback(null,arry);//成功！ 以数组形式返回查询的结果
            });
        });
    });
};

Info.getPersonInfo = function(personInfo,callback) {
    personInfo = personInfo || {};
    callback = callback || function() {};
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('info', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = personInfo;
            collection.findOne(query,function(err,docs) {
                mongodb.close();
                if (err) {
                    callback(err);
                }
                callback(null,docs);
            });
        });
    });
}

Info.delete = function(obj,callback) {
    PersonInfo = obj || {};
    callback = callback || function() {};
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('info', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            var query = {};
            if (obj.name && obj.phone) {
                query.name = obj.name;
                query.phone = obj.phone;
            }
            collection.remove(query,function(err) {
                mongodb.close();
                console.log("Remove Success!");
                if (err) {
                    callback(err);
                }
                callback(null);
            });
        });
    });
};