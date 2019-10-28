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
    var uid = req.body.uid;
    req.session["jnfhUname" + uid] = uid;
    req.session["jnfhLogin" + uid] = req.body.loginsucc;
    res.render('main', {
        menu: 'main',
        loginsucc: req.session["jnfhLogin" + uid]
    });
});

router.get('/logout',function(req,res,next){
    console.info(req.body);
    var uid = req.query.uid;
    req.session["jnfhUname" + uid] = "";
    res.redirect('/');
});

router.get('/main',function(req,res,next){
    console.info(req.url);
    var uid = req.query.uid;
    if(req.session["jnfhUname" + uid]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('main', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uid]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/user',function(req,res,next){
    console.info(req.url);
    var uid = req.query.uid;
    if(req.session["jnfhUname" + uid]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('user/user', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uid]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/password',function(req,res,next){
    console.info(req.url);
    var uid = req.query.uid;
    if(req.session["jnfhUname" + uid]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('user/password', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uid]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/device',function(req,res,next){
    console.info(req.url);
    var uid = req.query.uid;
    if(req.session["jnfhUname" + uid]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('device/device', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uid]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/material',function(req,res,next){
    console.info(req.url);
    var uid = req.query.uid;
    if(req.session["jnfhUname" + uid]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('busi/material', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uid]
        });
    }else{
        res.redirect('/');
    }
});

router.get('/hisdata',function(req,res,next){
    console.info(req.url);
    var uid = req.query.uid;
    if(req.session["jnfhUname" + uid]) {  //判断session 状态，如果有效，则返回主页，否则转到登录页面
        res.render('busi/hisdata', {
            menu: req.url.substr(1),
            loginsucc: req.session["jnfhLogin" + uid]
        });
    }else{
        res.redirect('/');
    }
});
module.exports = router;