/**
 * Created by Jianggy on 2019/6/14.
 */
var express = require('express');
var router = express.Router();

router.post('/userquery',function(req,res,next){
    console.info(req);
    console.info(req.body);
    //var draw = req.body.request.draw;
    var response = {
            head: {
                retcode:"0000"
            },
            response:{
                draw: 0,
                totalcount:"100",
                filtercount:"100",
                userlist:[
                    {"userid":"001","username":"张三","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                        "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                        "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "5"
                    },{"userid":"002","username":"李四","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                        "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                        "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "4.2"
                    },{"userid":"003","username":"王五","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                        "organname":"YY机构","organid":"002","stationname":"岗位003","stationid":"003","rolenamelist":'管理员,技术部,财务部',
                        "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "5",
                        "birthday":"20190101"
                    }
                ]
            }
        };
    res.send(
        response
    )
});

router.post('/rolequery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            rolelist:[
                {"roleid":"001","rolename":"管理员","remark":"xdfdsfsdf","operator":"张三","operatetime":"20190307111213"},
                {"roleid":"002","rolename":"技术部","remark":"xdfdsfsdf","operator":"张三","operatetime":"20190307111213"},
                {"roleid":"003","rolename":"财务部","remark":"xdfdsfsdf","operator":"张三","operatetime":"20190307111213"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/organquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            organlist:[
                {"organid":"001","organcode":"001","organname":"XX机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                {"organid":"002","organcode":"002","organname":"YY机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                {"organid":"003","organcode":"003","organname":"ZZ机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                {"organid":"004","organcode":"004","organname":"HH机构","sort":"3","leader":"赵六","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001",
                 "organlist":[
                     {"organid":"0041","organcode":"0041","organname":"HH1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                     {"organid":"0042","organcode":"0042","organname":"HH2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                     {"organid":"0043","organcode":"0043","organname":"HH3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001",
                         "organlist":[
                             {"organid":"00431","organcode":"00431","organname":"MM1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                             {"organid":"00432","organcode":"00432","organname":"MM2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                             {"organid":"00433","organcode":"00433","organname":"MM3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"}
                         ]}
                 ]},
                {"organid":"005","organcode":"005","organname":"HH机构","sort":"3","leader":"赵六","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001",
                    "organlist":[
                        {"organid":"0051","organcode":"0051","organname":"HH1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                        {"organid":"0052","organcode":"0052","organname":"HH2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '001', areaname:"分区001"},
                        {"organid":"0053","organcode":"0053","organname":"HH3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002",
                            "organlist":[
                                {"organid":"00531","organcode":"00531","organname":"MM1机构","sort":"0","leader":"张三","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002"},
                                {"organid":"00532","organcode":"00532","organname":"MM2机构","sort":"1","leader":"李四","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002"},
                                {"organid":"00533","organcode":"00533","organname":"MM3机构","sort":"2","leader":"王五","phone":"12345678910z","address":"12345678910z","remark":"", areaid: '002', areaname:"分区002"}
                            ]}
                    ]}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/stationquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            stationlist:[
                {"stationid":"001","stationname":"岗位001","sort":"0","remark":"", organname: "XX机构", organid: "001", itemnamelist:'事项001', itemidlist:'001'},
                {"stationid":"002","stationname":"岗位002","sort":"0","remark":"", organname: "XX机构", organid: "001", itemnamelist:'事项001,事项004', itemidlist:'001,004'},
                {"stationid":"003","stationname":"岗位003","sort":"0","remark":"", organname: "YY机构", organid: "002", itemnamelist:'事项002', itemidlist:'002'},
                {"stationid":"004","stationname":"岗位004","sort":"0","remark":"", organname: "YY机构", organid: "002", itemnamelist:'事项002', itemidlist:'002'},
                {"stationid":"005","stationname":"岗位005","sort":"0","remark":"", organname: "ZZ机构", organid: "003", itemnamelist:'事项003', itemidlist:'003'},
                {"stationid":"006","stationname":"岗位006","sort":"0","remark":"", organname: "HH1机构", organid: "0041", itemnamelist:'事项005,事项006', itemidlist:'004,005'}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/itemquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            itemlist:[
                {"itemid":"001","itemname":"事项001","sort":"0","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"002","itemname":"事项002","sort":"1","remark":"", organname: "YY机构", organid: "002"},
                {"itemid":"003","itemname":"事项003","sort":"2","remark":"", organname: "ZZ机构", organid: "003"},
                {"itemid":"004","itemname":"事项004","sort":"3","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"005","itemname":"事项005","sort":"4","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"006","itemname":"事项006","sort":"5","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"007","itemname":"事项007","sort":"6","remark":"", organname: "HH1机构", organid: "0041"}
           ]
        }
    };
    res.send(
        response
    )
});

router.post('/devicequery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            devicelist:[
                {"deviceid":"001","devicename":"设备001","devicetype":"0","sort":"0","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位001", stationid: "001"},
                {"deviceid":"002","devicename":"设备002","devicetype":"0","sort":"1","remark":"设备设备", areaname: "分区001", areaid: "001", stationname: "岗位001", stationid: "001"},
                {"deviceid":"003","devicename":"设备003","devicetype":"0","sort":"2","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位001", stationid: "001"},
                {"deviceid":"004","devicename":"设备004","devicetype":"0","sort":"3","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位002", stationid: "002"},
                {"deviceid":"005","devicename":"设备005","devicetype":"0","sort":"4","remark":"", areaname: "分区001", areaid: "001", stationname: "岗位003", stationid: "003"},
                {"deviceid":"006","devicename":"设备006","devicetype":"0","sort":"5","remark":"", areaname: "分区002", areaid: "002", stationname: "岗位004", stationid: "004"},
                {"deviceid":"007","devicename":"设备007","devicetype":"0","sort":"6","remark":"", areaname: "分区002", areaid: "002", stationname: "岗位005", stationid: "005"},
                {"deviceid":"008","devicename":"设备008","devicetype":"1","sort":"7","remark":"", areaname: "分区003", areaid: "003", stationname: "岗位006", stationid: "006"},
                {"deviceid":"009","devicename":"设备009","devicetype":"1","sort":"8","remark":"", areaname: "分区003", areaid: "003", stationname: "岗位006", stationid: "006"},
                {"deviceid":"010","devicename":"设备010","devicetype":"1","sort":"9","remark":"", areaname: "分区005", areaid: "005", stationname: "岗位006", stationid: "006"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/areaquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            arealist:[
                {"areaid":"001","areaname":"分区001","sort":"0","remark":""},
                {"areaid":"002","areaname":"分区002","sort":"1","remark":""},
                {"areaid":"003","areaname":"分区003","sort":"2","remark":""},
                {"areaid":"004","areaname":"分区004","sort":"3","remark":""},
                {"areaid":"005","areaname":"分区005","sort":"4","remark":""}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/menuquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            menulist:[
                {"menuid":"usermanager","menutype":0,sort:"0", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0",  "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2",  "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"powermanager","menutype":0,sort:"0",  "menuname":"权限管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"menu","menutype":1,sort:"0", "menuname":"菜单管理","url":"menu", menuicon:"icon-home"},
                        {"menuid":"rolepower","menutype":1,sort:"1",  "menuname":"角色权限管理","url":"rolepower", menuicon:"icon-user-following"},
                        {"menuid":"userpower","menutype":1,sort:"2",  "menuname":"用户权限管理","url":"userpower", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0",  "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2",  "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"evamanager","menutype":0,sort:"0", "menuname":"评价管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"evaluation","menutype":1,sort:"0",  "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                        {"menuid":"userevalu","menutype":1,sort:"1",  "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"devicemanager","menutype":0,sort:"0",  "menuname":"终端管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"area","menutype":1,sort:"0", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                        {"menuid":"device","menutype":1,sort:"1",  "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"admanager","menutype":0,sort:"0",  "menuname":"广告管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"ad","menutype":1,sort:"0", "menuname":"广告管理","url":"ad", ad:"icon-home"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/functionquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            functionlist:[
                {"id":"0","functionid":"add","functionname":"增加","remark":"","power":"1"},
                {"id":"1","functionid":"delete","functionname":"删除","remark":"","power":"1"},
                {"id":"2","functionid":"edit","functionname":"修改","remark":"","power":"1"}
            ]
        }
    };
    res.send(
        response
    )
});

//评价查询
router.post('/evaluationquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            evaluationlist:[
                {"evaluationid":"13","evaluationcontent":"满意","evaluationtype":"0","evaluationtarget":"0","status":"0","mark":"5","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"14","evaluationcontent":"满意","evaluationtype":"0","evaluationtarget":"0","status":"0","mark":"5","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"15","evaluationcontent":"其他","evaluationtype":"2","evaluationtarget":"1","status":"0","mark":"0","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"16","evaluationcontent":"其他","evaluationtype":"2","evaluationtarget":"1","status":"0","mark":"0","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"01","evaluationcontent":"服务态度不积极、不主动","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.1","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"02","evaluationcontent":"办事效率低下、推诿扯皮","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.2","remark":"","sort":"1","operator":"2","operatetime":"20190620111213"},
                {"evaluationid":"03","evaluationcontent":"工作纪律不严肃、不规范","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.3","remark":"","sort":"1","operator":"3","operatetime":"20190620111213"},
                {"evaluationid":"04","evaluationcontent":"工作人员业务熟练程度不够","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.4","remark":"","sort":"1","operator":"4","operatetime":"20190620111213"},
                {"evaluationid":"05","evaluationcontent":"不一次性告知，导致“来回跑”","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.5","remark":"","sort":"1","operator":"5","operatetime":"20190620111213"},
                {"evaluationid":"06","evaluationcontent":"上班时间窗口空岗","evaluationtype":"1","evaluationtarget":"0","status":"0","mark":"-0.6","remark":"","sort":"1","operator":"6","operatetime":"20190620111213"},
                {"evaluationid":"07","evaluationcontent":"事项办理收取办事指南以外多余材料","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.1","remark":"","sort":"1","operator":"1","operatetime":"20190620111213"},
                {"evaluationid":"08","evaluationcontent":"事项办理流程与办事指南不符","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.2","remark":"","sort":"1","operator":"2","operatetime":"20190620111213"},
                {"evaluationid":"09","evaluationcontent":"办理事项不能再承诺时限内办结","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.3","remark":"","sort":"1","operator":"3","operatetime":"20190620111213"},
                {"evaluationid":"10","evaluationcontent":"事项办理存在跑多个部门的情况","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.4","remark":"","sort":"1","operator":"4","operatetime":"20190620111213"},
                {"evaluationid":"11","evaluationcontent":"许可事项办理存在明显错误","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.5","remark":"","sort":"1","operator":"5","operatetime":"20190620111213"},
                {"evaluationid":"12","evaluationcontent":"许可事项不予许可未说明原因","evaluationtype":"1","evaluationtarget":"1","status":"0","mark":"-0.6","remark":"","sort":"1","operator":"6","operatetime":"20190620111213"}
            ]
        }
    };
    res.send(
        response
    )
});

//用户评价查询
router.post('/userevaluquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            userevlist:[
                {"userid":"001","username":"张三","itemnname":"XX事项","mark":"4.0",
                    "servicecontent":["服务态度不积极、不主动","xxxx"],"serviceother":"无","itemcontent":["服务态度不积极、不主动","xxxx"],"itemother":"服务态度不积极、不主动服务态度不积极、不主动服务态度不积极、不主动服务态度不积极、不主动",
                    "evaluationtype":"1","evatime":"20190628111213"},
                {"userid":"002","username":"张三","itemnname":"XX事项","mark":"5","servicecontent":["满意"],"serviceother":"","itemcontent":["满意"],"itemother":"",
                    "evaluationtype":"1","evatime":"20190628111213"}
            ]
        }
    };
    res.send(
        response
    )
});

//广告信息查询
router.post('/adquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            adlist:[
                {"adid":"001","imgename":"旅行青蛙","sort":"1","adsrc":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1561367750546&di=4fb6ab8bfef63b610b83d2525290d9ab&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F23%2F20180223130511_eMx85.jpeg","other":"无","remark":"74","deviceidlist":"001,002","devicenamelist":"设备001,设备002"},
                {"adid":"002","imgename":"无","sort":"2","adsrc":"1","other":"无","remark":"70","deviceidlist":"001,002","devicenamelist":"设备001,设备002"}
            ]
        }
    };
    res.send(
        response
    )
});

//时间人员查询
router.post('/itemuserquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw:draw,
            totalcount:"100",
            filtercount:"100",
            userlist:[
                {"userid":"001","username":"张三","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                    "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                    "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "5"
                },{"userid":"002","username":"李四","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                    "organname":"XX机构","organid":"001","stationname":"岗位002","stationid":"002","rolenamelist":'管理员,技术部,财务部',
                    "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "4.2"
                },{"userid":"003","username":"王五","sex":"0","email":"xxxxx@zzzz","phone":"12345678910z","mobile":"12345678910z",
                    "organname":"YY机构","organid":"002","stationname":"岗位003","stationid":"003","rolenamelist":'管理员,技术部,财务部',
                    "roleidlist":'001,002,003',"remark":"xdfdsfsdf","logontimes":"100","lastlogontime":"20190307111213",image:"sddfsdf", mark: "3.3",
                    "birthday":"20190101"
                }
            ],
            itemlist:[
                {"itemid":"001","itemname":"事项001","sort":"0","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"002","itemname":"事项002","sort":"1","remark":"", organname: "YY机构", organid: "002"},
                {"itemid":"003","itemname":"事项003","sort":"2","remark":"", organname: "ZZ机构", organid: "003"},
                {"itemid":"004","itemname":"事项004","sort":"3","remark":"", organname: "XX机构", organid: "001"},
                {"itemid":"005","itemname":"事项005","sort":"4","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"006","itemname":"事项006","sort":"5","remark":"", organname: "HH1机构", organid: "0041"},
                {"itemid":"007","itemname":"事项007","sort":"6","remark":"", organname: "HH1机构", organid: "0041"}
            ]
        }
    };
    res.send(
        response
    )
});

//时间人员查询
router.post('/tokenquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            token:"1234567890123456789"
        }
    };
    res.send(
        response
    )
});

router.post('/userpowerquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            menulist:[
                {"menuid":"usermanager","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2", power:"1", "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"powermanager","menutype":0,sort:"0", power:"1", "menuname":"权限管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"menu","menutype":1,sort:"0", power:"1", "menuname":"菜单管理","url":"menu", menuicon:"icon-home"},
                        {"menuid":"rolepower","menutype":1,sort:"1", power:"1", "menuname":"角色权限管理","url":"rolepower", menuicon:"icon-user-following"},
                        {"menuid":"userpower","menutype":1,sort:"2", power:"1", "menuname":"用户权限管理","url":"userpower", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"evamanager","menutype":0,sort:"0", power:"1", "menuname":"评价管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"evaluation","menutype":1,sort:"0", power:"1", "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                        {"menuid":"userevalu","menutype":1,sort:"1", power:"1", "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"devicemanager","menutype":0,sort:"0", power:"1", "menuname":"终端管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"area","menutype":1,sort:"0", power:"1", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                        {"menuid":"device","menutype":1,sort:"1", power:"1", "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"admanager","menutype":0,sort:"0", power:"1", "menuname":"广告管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"ad","menutype":1,sort:"0", power:"1", "menuname":"广告管理","url":"ad", ad:"icon-home"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/userownpowerquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            menulist:[
                {"menuid":"usermanager","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2", power:"1", "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/rolepowerquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            rolequeryilist:[
                {"menuid":"usermanager","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2", power:"1", "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"powermanager","menutype":0,sort:"0", power:"1", "menuname":"权限管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"menu","menutype":1,sort:"0", power:"1", "menuname":"菜单管理","url":"menu", menuicon:"icon-home"},
                        {"menuid":"rolepower","menutype":1,sort:"1", power:"1", "menuname":"角色权限管理","url":"rolepower", menuicon:"icon-user-following"},
                        {"menuid":"userpower","menutype":1,sort:"2", power:"1", "menuname":"用户权限管理","url":"userpower", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"evamanager","menutype":0,sort:"0", power:"1", "menuname":"评价管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"evaluation","menutype":1,sort:"0", power:"1", "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                        {"menuid":"userevalu","menutype":1,sort:"1", power:"1", "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"devicemanager","menutype":0,sort:"0", power:"1", "menuname":"终端管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"area","menutype":1,sort:"0", power:"1", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                        {"menuid":"device","menutype":1,sort:"1", power:"1", "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"admanager","menutype":0,sort:"0", power:"1", "menuname":"广告管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"ad","menutype":1,sort:"0", power:"1", "menuname":"广告管理","url":"ad", ad:"icon-home"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});


router.post('/userPowersquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head: {
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            userquerylist:[
                {"menuid":"usermanager","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"", menuicon:"icon-users",
                    "menulist":[
                        {"menuid":"user","menutype":1,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                        {"menuid":"password","menutype":1,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"},
                        {"menuid":"role","menutype":1,sort:"2", power:"1", "menuname":"角色管理","url":"role", menuicon:"icon-badge"}
                    ]
                },
                {"menuid":"powermanager","menutype":0,sort:"0", power:"1", "menuname":"权限管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"menu","menutype":1,sort:"0", power:"1", "menuname":"菜单管理","url":"menu", menuicon:"icon-home"},
                        {"menuid":"rolepower","menutype":1,sort:"1", power:"1", "menuname":"角色权限管理","url":"rolepower", menuicon:"icon-user-following"},
                        {"menuid":"userpower","menutype":1,sort:"2", power:"1", "menuname":"用户权限管理","url":"userpower", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"organmanager","menutype":0,sort:"0", power:"1", "menuname":"机构管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"organ","menutype":1,sort:"0", power:"1", "menuname":"机构管理","url":"organ", menuicon:"icon-home"},
                        {"menuid":"station","menutype":1,sort:"1", power:"1", "menuname":"岗位管理","url":"station", menuicon:"icon-user-following"},
                        {"menuid":"item","menutype":1,sort:"2", power:"1", "menuname":"事项管理","url":"item", menuicon:"icon-star"}
                    ]
                },
                {"menuid":"evamanager","menutype":0,sort:"0", power:"1", "menuname":"评价管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"evaluation","menutype":1,sort:"0", power:"1", "menuname":"评价管理","url":"evaluation", menuicon:"icon-home"},
                        {"menuid":"userevalu","menutype":1,sort:"1", power:"1", "menuname":"用户评价","url":"userevalu", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"devicemanager","menutype":0,sort:"0", power:"1", "menuname":"终端管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"area","menutype":1,sort:"0", power:"1", "menuname":"分区管理","url":"area", menuicon:"icon-home"},
                        {"menuid":"device","menutype":1,sort:"1", power:"1", "menuname":"终端管理","url":"device", menuicon:"icon-user-following"}
                    ]
                },
                {"menuid":"admanager","menutype":0,sort:"0", power:"1", "menuname":"广告管理","url":"", menuicon:"icon-diamond",
                    "menulist":[
                        {"menuid":"ad","menutype":1,sort:"0", power:"1", "menuname":"广告管理","url":"ad", ad:"icon-home"}
                    ]
                }
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/rolefunctionquery',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:{
            draw: draw,
            totalcount:"100",
            filtercount:"100",
            functionlist:[
                {"id":"0","functionid":"add","functionname":"增加","remark":"", power:"1"},
                {"id":"1","functionid":"delete","functionname":"删除","remark":"", power:"1"},
                {"id":"2","functionid":"edit","functionname":"修改","remark":"", power:"0"}
            ]
        }
    };
    res.send(
        response
    )
});

router.post('/userfunctionquerys',function(req,res,next){
    var draw = req.query.currentpage;
    var response = {
        head:{
            retcode:"0000"
        },
        response:[
            {
                "menuid":"user",
                "functionlist":[
                    {"functionid":"op_add","functionname":"增加","remark":"", power:"1"},
                    {"functionid":"op_del","functionname":"删除","remark":"", power:"1"},
                    {"functionid":"op_edit","functionname":"修改","remark":"", power:"0"},
                    {"functionid":"password_reset","functionname":"重置密码","remark":"", power:"0"}
                ]},
            {
                "menuid":"menu",
                "functionlist":[
                    {"functionid":"op_add","functionname":"增加","remark":"", power:"1"},
                    {"functionid":"op_del","functionname":"删除","remark":"", power:"1"},
                    {"functionid":"op_edit","functionname":"修改","remark":"", power:"0"}
                ]
            }
        ]
    };
    res.send(
        response
    )
});

module.exports = router;