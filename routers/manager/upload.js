/**
 * Created by Administrator on 2019/6/18.
 */
var express = require('express');
var router = express.Router();
//用于处理文件上传
var multer = require('multer');
var fs = require('fs');

//设置文件路径
var createFolder = function(folder){
    try{
        fs.accessSync(folder);
    }catch(e){
        fs.mkdirSync(folder);
    }
};

var getDateTime = function(){
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y.toString() + (m < 10 ? "0" + m : m) + (d < 10 ? "0" + d : d) +
        now.toTimeString().substr(0, 8).replace(/:/g, "");
};

var uploadFolder = './public/upload/';
createFolder(uploadFolder);

//设置保存规则
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadFolder)
    },
    filename: function (req, file, cb) {
        var originalname = file.originalname;
        cb(null, getDateTime() + "-" + originalname);
    }
});

//设置过滤规则
var imageFilter = function(req, file, cb){
    var acceptableMime = ['image/jpeg', 'image/png', 'image/jpg', 'image/bmp'];
    if(acceptableMime.indexOf(file.mimetype) !== -1){
        cb(null, true)
    }else{
        cb(null, false);
        cb(new Error('文件类型错误'));
    }
};


var imageUploader  =  multer({
    storage: storage,
    fileFilter: imageFilter,
    limits:{
        fileSize: 2000000
    }
});

var upload = imageUploader.single('photo');

router.post('/image',  function(req, res, next) {
    //var url = 'http://' + req.headers.host  + req.file.destination.substr(1) + '/' + req.file.filename;
    var result;
    console.info(req.file);
    upload(req, res, function (err) {
        if (err) {
            result = {
                ret : false,
                msg: "文件上传失败！" + err
            };
            res.send(result);
            return
        }
        console.info(req.file);
        result = {
            ret : true,
            msg: "文件上传成功！",
            url: 'http://' + req.headers.host  + req.file.destination.substr(1) + req.file.filename
        };
        res.send(result);
    });
});

router.post('/delete', function(req, res, next){
    var filelist = req.body;
    console.info(filelist);
    var result;
    try{
        for(var i=0; i< filelist.mname.length; i++){
            var path = uploadFolder + "/" +filelist.mname[i];
            if(fs.existsSync(path)){
                fs.unlinkSync(path);
            }
        }
        result = {
            ret : true,
            msg: "文件删除成功！"
        };
        res.send(result);
    }catch (e) {
        console.info(e);
        result = {
            ret : false,
            msg: "文件删除失败！"
        };
        res.send(result);
    }
});
module.exports = router;