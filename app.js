/**
 * Created by Jianggy on 2018/11/29.
 * 应用程序启动入口文件
 */

var express = require("express");
var session = require('express-session');
var app = express();

var swig = require("swig");
var bodyParser = require('body-parser');

var log4js = require("./log");
const logger = log4js.logger('http');

var config = require("./config/config");

//2配置模板应用模块
//定义当前应用所使用的模板引擎，第一个参数：模板引擎名称，同时也是模板文件的后缀；第二个参数：解析处理模板内容的方法
app.engine("html", swig.renderFile);
//3设置模板文件存放的目录,第一个参数必须是views，第二个参数是目录
app.set("views", "./views");
//4注册模板，第一个参数：必须是view engine,第二个参数与定义模板引擎的第一个参数名称一致
app.set("view engine", "html");

swig.setDefaults({cache:false});

//设置静态文件托管
//托管规则：用户发送http请求到后端，后端解析url，找到匹配规则，执行绑定的函数，返回对应的内容，静态文件直接读取制定目录下文件返回给用户，动态文件：处理业务逻辑，加载模板，解析模板返回上数据

app.use('/public',express.static(__dirname + '/public'));

//设置日志处理
log4js.configure();
app.use(log4js.useLog(logger));

//app.use(bodyParser.raw);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : null //1000 * 60 * 3 // 设置 session 的有效时间，单位毫秒
    },
    name: 'jnfh'
}));

/**
 * [description] 给app绑定首页路由，把一个url路径通过一个或多个方法绑定
 * @param  {[type]} req       request对象，保存客户端请求相关的一些数据
 * @param  {[type]} res       response对象
 * @param  {[type]} next      函数,用于执行下一个和当前路径匹配的函数
 * @return {[type]}           [description]
 */

app.use('/',require('./routers/manager/login'));
app.use('/web/test/front',require('./routers/manager/test'));
app.use('/upload',  require('./routers/manager/upload'));
app.use('/back',  require('./routers/back/back'));
app.listen(config.port);

