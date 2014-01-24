/**
*  getRand
*/

var mongodb = require('./db');

function Rand() {
    var date = new Date();
    this.date = date.getFullYear()*10000 + (date.getMonth()+1)*100 + date.getDate();
    this.prev = this.date*1000;
}

module.exports = Rand;

Rand.setDate = function(num,callback) {
    callback = callback || function() {};
    mongodb.open(function(err,db) {
        if(err) {
            return callback(err);
        }
        db.collection('rand', function(err,coll) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            coll.update({
                'rand':'1'
            }, {
                $set: {
                    'date': num
                }
            }, function(err) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null);
                console.log('The Date has updated!');
            });
        });
    });
};

Rand.setArray = function(obj,callback) {
    callback = callback || function() {};
    if(!obj.arry) {
        var ary = new Array; 
        for (var i=0; i < obj.count; i++){ 
            ary[i] = i; 
        }
    } else {
        ary = obj.arry;
    }
    mongodb.open(function(err,db) {
        if(err) {
            return callback(err);
        }
        db.collection('rand', function(err, coll) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            coll.update({
                'rand':'1'
            }, {
                $set: {
                    'array': ary
                }
            }, function(err) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                callback(null);
                console.log('The Array has been set!');
            });
        });
    });
};

Rand.getOne = function(count,callback) {
    callback = callback || function() {};
    mongodb.open(function(err, db) {
        if(err) {
            return callback(err);
        }
        db.collection('rand', function(err,coll) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            coll.findOne({'rand':'1'}, function(err,docs) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                if(docs) {
                    var num = 0;
                    do { 
                        num = Math.floor(Math.random() * count); 
                    } while (docs.array[num] == null);
                    docs.array[num] = null;
                    Rand.setArray({'count':null,'arry':docs.array}, function(){
                        console.log('num:' + num);
                        callback(num);
                    });
                }
            });
        });
    });
};

Rand.prototype.getRand = function(date,count,callback) {
    callback = callback || function() {};
    mongodb.open(function(err,db) {
        if(err) {
            return callback(err);
        }
        db.collection('rand', function(err,coll) {
            if(err) {
                mongodb.close();
                return callback(err);
            }
            coll.findOne({'rand':'1'}, function(err,docs) {
                mongodb.close();
                if(err) {
                    return callback(err);
                }
                if(docs) {
                    console.log(docs.date,date);
                    if(date != docs.date) {
                        Rand.setDate(date,function(err) {
                            Rand.setArray({'count':count,'array':null},function(err) {
                                Rand.getOne(count, function(num){
                                    callback(null,docs.date*count + num);
                                });
                            });
                        });
                    } else if(!docs.array) {
                        Rand.setArray({'count':count,'array':null},function(err) {
                            Rand.getOne(count, function(num){
                                callback(null,docs.date*count + num);
                            });
                        });
                    } else {
                        Rand.getOne(count, function(num){
                            callback(null,docs.date*count + num);
                        });
                    }
                }
                console.log('The Rand has got!');
            });
        });
    });
}

