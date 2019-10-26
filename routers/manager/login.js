/**
 * Created by Administrator on 2019/2/18.
 */
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
    res.render('login');
});

router.post('/login',function(req,res,next){
    console.info(req.body);
    var uname = req.body.uname;
    req.session["jnfhUname" + uname] = uname;
    req.session["jnfhLogin" + uname] = req.body.loginsucc;
    res.render('main', {
        menu: 'main',
        loginsucc: req.session["jnfhLogin" + uname]
    });
});

router.get('/main',function(req,res,next){
    console.info(req.url);
    var uname = req.query.uname;
    if(req.session["jnfhUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('main', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uname]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/user',function(req,res,next){
    console.info(req.url);
    var uname = req.query.uname;
    if(req.session["jnfhUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('user/user', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uname]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/password',function(req,res,next){
    console.info(req.url);
    var uname = req.query.uname;
    if(req.session["jnfhUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('user/password', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uname]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/device',function(req,res,next){
    console.info(req.url);
    var uname = req.query.uname;
    if(req.session["jnfhUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('device/device', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uname]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/material',function(req,res,next){
    console.info(req.url);
    var uname = req.query.uname;
    if(req.session["jnfhUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('busi/material', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uname]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/hisdata',function(req,res,next){
    console.info(req.url);
    var uname = req.query.uname;
    if(req.session["jnfhUname" + uname]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('busi/hisdata', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uname]
        });
    }else{
        res.redirect('/');
    }
});
module.exports = router;