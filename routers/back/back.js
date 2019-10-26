/**
 * Created by Administrator on 2019/6/26.
 */
var express = require('express');
var router = express.Router();


router.get('/',function(req,res,next){
    res.render('back/userBack');
});

router.get('/phone',function(req,res,next){
    res.render('back/phoneUser');
});

router.post('/phone/user',function(req,res,next){
    var user = req.body.user;
    res.render('back/phoneBack',{
        user:JSON.parse(user)
    });
});

router.post('/user',function(req,res,next){
    var user = req.body.user;
    res.render('back/back',{
        user:JSON.parse(user)
    });

});


module.exports = router;