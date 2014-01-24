
/*
 * GET home page.
 */

var crypto = require('crypto')
  , fs = require('fs')
  , file = require('../models/file')
  , info = require('../models/info')
  , rand = require('../models/rand');

module.exports = function(app) {
    app.get('/', function(req, res) {
        var users = info.getAll("1",function(err,arry){
            if (err) {
                arry = [];
            }
            res.render('index', {
                title: 'GIMS',
                data: arry
            });         
        });
    });

    app.post('/addNew', function(req, res) {
        var rands = new rand();
        rands.getRand(rands.date,1000,function(err,randnum) {
            var infos = {
                name: req.body.name,
                num: req.body.num,
                addr: req.body.addr,
                phone: req.body.phone,
                email: req.body.email,
                dormit: req.body.dormit,
                dormitory: req.body.dormitory,
                e_photo_text: req.body.photo_text1,
                w_photo_text: req.body.photo_text2,
                randnum: randnum,
                photourl: 'public/info/'+randnum
            };
            var user = {
                name: randnum,
                num: req.body.phone,
                files: req.files
            };
            var user_info = new info(infos);
            user_info.save(function(err) {
                if (err) {
                  req.flash('error', err);
                  return res.redirect('/');
                }      
                req.flash('success', '新建成功！');
            });
            file.mkdirSync('public/info/'+user.name+'/e/',0755,function() {
                console.log('Success e mkdir!');
            });
            file.mkdirSync('public/info/'+user.name+'/w/',0755,function() {
                console.log('Success w mkdir!');
            });
            var efile = new file(user.name,user.num,req.files['photo1']);
            var wfile = new file(user.name,user.num,req.files['photo2']);
            efile.rename('e',function(){
                console.log('Rename e Success!');
            });
            wfile.rename('w',function(){
                console.log('Rename w Success!');
            });
            res.redirect('/');
        });
    });

    app.get('/compus', function(req, res) {
        var users = info.getAll("1",function(err,arry){
            if (err) {
                arry = [];
            }
            res.send({json:arry});         
        });
    });

    app.get('/notcompus', function(req, res) {
        var users = info.getAll("0",function(err,arry){
            if (err) {
                arry = [];
            }
            res.send({json:arry});         
        });
    });

    app.post('/getInfo', function(req, res) {
        var person_info = {
            "name": req.body.name,
            "phone": req.body.phone,
            "email": req.body.email
        };
        info.getPersonInfo(person_info, function(err,info) {
            if (err) {
                req.flash('error', '查询失败！');
                res.redirect('/');
            }
            if (info) {
                res.send(info);
            } else {
                res.send({"msg": "The person is not exists!"});
            }
        });
    });

    app.post('/delete', function(req, res) {
        var dlt = req.body.delete;
        innerDelete(dlt);
        function innerDelete(arry) {
            if (arry.length) {
                var param = arry.shift();
                info.getPersonInfo(param, function(err,docs) {
                    if (err) {
                        req.flash('error', '删除失败！');
                        res.redirect('/');
                    }
                    file.rmdirSync('public/info/'+docs.randnum);
                    info.delete(param, function(err){
                        if (err) {
                            req.flash('error', '删除失败！');
                            res.redirect('/');
                        }
                        innerDelete(arry);
                    });
                });
            } 
        }
        res.send({"msg":"true"});       
    });
};