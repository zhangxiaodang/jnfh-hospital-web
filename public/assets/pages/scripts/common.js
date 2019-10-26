/**
 * Created by Administrator on 2019/2/19.
 */
function sendMessageEdit(type, data){
    var head, request;
    head = msgHeadMake(type);
    switch(type){
        case LOGIN:
            head["token"] = "";
            head["uid"] = data[0];
            request = {
                "password":data[1]
            };
            break;
        default :
            request = data;
            break;
    }
    request = {
        "request":request
    };
    request = $.extend({},request,head);
    var oJson = request;
    console.info(oJson);
    return JSON.stringify(oJson);
}

function msgHeadMake(type){
    return {
        "timestamp": getTimeStamp(),
        "token": loginSucc.token,
        "userid": loginSucc.uid,
        "termid": ""
    };
}

function getTimeStamp(){
    var now = new Date(),
        y = now.getFullYear(),
        m = now.getMonth() + 1,
        d = now.getDate();
    return y.toString() + (m < 10 ? "0" + m : m) + (d < 10 ? "0" + d : d) + now.toTimeString().substr(0, 8).replace(/:/g, "");
}

function confirmDialog(tips, func, para){
    bootbox.dialog({
        message: tips,
        title: "提示",
        buttons: {
            success: {
                label: "确定",
                className: "blue",
                callback: function(){
                    func(para)
                }
            },
            danger: {
                label: "取消",
                className: "red"
            }
        }
    });
}

function alertDialog(tips){
    bootbox.dialog({
        message: tips,
        title: "提示",
        buttons: {
            success: {
                label: "确定",
                className: "blue"
            }
        }
    });
}

function sexFormat(sexcode){
    var sex = "女";
    switch (sexcode){
        case "0":
            sex = "男";
            break;
    }
    return sex;
}

function dateTimeFormat(datetime){
    if(datetime.length < 14) return datetime;
    return datetime.substr(0, 4) + "/" + datetime.substr(4, 2) + "/" +
        datetime.substr(6, 2) + " " + datetime.substr(8, 2) + ":" +
        datetime.substr(10, 2) + ":" + datetime.substr(12, 2);
}


function conferenceDateFormat(dateRange){
    if(dateRange.length < 8) return dateRange;
    return dateRange.substr(0, 4) + "/" + dateRange.substr(4, 2) + "/" +
        dateRange.substr(6, 2);
}

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function getNowFormatTime() {
    var date = new Date();
    var seperator1 = ":";
    var hours= date.getHours();
    var minutes = date.getMinutes();
    if (hours >= 1 && hours <= 9) {
        hours = "0" + hours;
    }
    if (minutes >= 0 && minutes <= 9) {
        minutes = "0" + minutes;
    }
    var currentTime = hours + seperator1 + minutes;
    return currentTime;
}

function notifyStatusFormat(status){
    var str;
    switch (status){
        case "0":
            str = "通知中";
            break;
        case "1":
            str = "结束通知";
            break;
        case "2":
            str = "未通知";
            break;
    }
    return str;
}

function notifyTypeFormat(type){
    var str;
    switch (type){
        case "1":
            str = "会议报名通知";
            break;
        case "2":
            str = "会议缴费通知";
            break;
        case "3":
            str = "会议签到通知";
            break;
        case "4":
            str = "会费缴费通知";
            break;
    }
    return str;
}

function selectChilds(datas,row,id,pid,checked) {
    for(var i in datas){
        if(datas[i][pid] == row[id]){
            datas[i].check=checked;
            selectChilds(datas,datas[i],id,pid,checked);
        }
    }
}

function selectParentChecked(datas,row,id,pid){
    for(var i in datas){
        if(datas[i][id] == row[pid]){
            datas[i].check=true;
            selectParentChecked(datas,datas[i],id,pid);
        }
    }
}

function singleSelect(datas,row,id) {
    for(var i in datas){
        if(datas[i].check == true){
            datas[i].check = false;
        }
        if(datas[i][id] == row[id]){
            datas[i].check=true;
        }
    }

}

function passwordCheck(str){
    if(str.length <= 0) return false;
    var charMode, charCode;
    var mode = 0;
    for(var i=0; i<str.length; i++){
        charCode = str.charCodeAt(i);
        if(charCode >= 48 && charCode <= 57) {    //数字
            charMode = 1;
        }else{    //大写
            charMode = 2;
        }
        mode |= charMode;
    }
    return mode == 3;
}

function tableDataSet(draw, recordsTotal, filter, data, callback){
    var returnData = {};
    returnData.draw = draw;
    returnData.recordsTotal = recordsTotal;
    returnData.recordsFiltered = filter;
    returnData.data = data;
    callback(returnData);
}

function bootstrapTreeTableDataSet(totalcount, data, listname, idname, callback){
    var listNew = [];
    treeGridDataMake(listNew, data, listname, 0, idname);
    var returnData = {
        "total": totalcount,
        "data": listNew         //服务端分页这个字段名为rows，客户端分页这个字段名为data
    };

    callback(returnData);
}

function bootstrapTableDataSet(totalcount, data, callback){
    var returnData = {
        "total": totalcount,
        "data": data         //服务端分页这个字段名为rows，客户端分页这个字段名为data
    };

    callback(returnData);
}

function dateFormat(date, sep){
    //如果日期不存在，或者为空，返回当前日期
    if(date == undefined || date == "" || typeof(date) != "string"){
        return getNowFormatDate();
    }
    return date.substr(0,4) + sep + date.substr(4, 2) + sep + date.substr(6, 2);
}

function jsonKeyChange(json, oldkey, newkey){
    for (var i = 0; i < json.length; i++) {
        if(!json[i].hasOwnProperty(oldkey)){
            json[i][newkey] = [];
        }else{
            for(var j in json[i]){
                if(j == oldkey){
                    json[i][newkey]=json[i][oldkey];
                    delete json[i][oldkey];
                    var value = json[i][newkey];
                    jsonKeyChange(value, oldkey, newkey);
                }
            }
        }
    }
}

function treeGridDataMake(listNew, list, childrenKey, pid, idKey){
    for(var i=0; i<list.length; i++){
        list[i]["parentid"] = pid;
        list[i]["check"] = '';
        listNew.push(list[i]);
        if(list[i].hasOwnProperty(childrenKey)){
            var children = list[i][childrenKey];
            delete listNew[listNew.length - 1][childrenKey];
            treeGridDataMake(listNew, children, childrenKey, list[i][idKey], idKey)
        }
    }
}

function organNameSelectBuild(organList, id){
    var data = [];
    organListTreeDataMake(organList, data);
    if(id.jstree(true)) {
        id.jstree(true).settings.core.data = data;
        id.jstree(true).refresh();
    }else {
        id.jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                "data": data
            },

            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["wholerow", "checkbox", "types"],
            "checkbox": {
                "keep_selected_style": false,//是否默认选中
                "three_state": false//父子级别级联选择
            }
        })
    }
}

function organNameNotCheckBoxSelectBuild(organList, id){
    var data = [];
    organListTreeDataMake(organList, data);
    if(id.jstree(true)) {
        id.jstree(true).settings.core.data = data;
        id.jstree(true).refresh();
    }else {
        id.jstree({
            "core": {
                "themes": {
                    "responsive": false
                },
                "data": data
            },

            "types": {
                "default": {
                    "icon": "fa fa-folder icon-state-warning icon-lg"
                },
                "file": {
                    "icon": "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["wholerow", "types"],
            "checkbox": {
                "keep_selected_style": false,//是否默认选中
                "three_state": false//父子级别级联选择
            }
        })
    }
}

function organListTreeDataMake(organList, data){
    for(var i=0; i < organList.length; i++){
        var el = {
            text: organList[i].organname,
            id: organList[i].organid,
            "state": {
                "selected": false,
                "opened": true
            }
        };
        if(organList[i].hasOwnProperty("organlist") && organList[i].organlist != ""){
            el.icon = "fa fa-folder icon-state-warning icon-lg";
            el.children = [];
            data.push(el);
            organListTreeDataMake(organList[i].organlist, el.children);
        }else{
            el.icon = "fa fa-file-text-o icon-state-warning icon-lg";
            data.push(el);
        }
    }
}

function clearSelect(id){
    var ref = id.jstree(true);
    try{
        var nodes = ref.get_selected();  //使用get_checked方法
        $.each(nodes, function(i, nd) {
            ref.deselect_node(nd);      //非checkbox函数
        });
        id.jstree(true).refresh();
    }catch(ex){

    }
    id.siblings("input").val("");
}


function clearSelectCheck(id){
    var ref = id.jstree(true);
    try{
        var nodes = ref.get_checked();  //使用get_checked方法
        $.each(nodes, function(i, nd) {
            ref.uncheck_node(nd);      //非checkbox函数

        });
    }catch(ex){

    }
    id.siblings("input").val("");
}

function jsTreeDataClear(id){
    if(id.jstree(true)) {
        id.jstree(true).settings.core.data = [];
        id.jstree(true).refresh();
    }
}

function menuNameSelectBuild(menulist, id, flg){
    var data = [];
    menuListTreeDataMake(menulist, data, flg);
    if(id.jstree(true)) {
        id.jstree(true).settings.core.data = data;
        id.jstree(true).refresh();
    }else{
        id.jstree({
            "core" : {
                "themes" : {
                    "responsive": false
                },
                "data": data
            },

            "types" : {
                "default" : {
                    "icon" : "fa fa-folder icon-state-warning icon-lg"
                },
                "file" : {
                    "icon" : "fa fa-file icon-state-warning icon-lg"
                }
            },
            "plugins": ["wholerow", "types"],
            "checkbox": {
                "keep_selected_style": false,//是否默认选中
                "three_state": false//父子级别级联选择
            }
        });
    }

}

function menuListTreeDataMake(menulist, data, flg){
    for(var i=0; i < menulist.length; i++){
        if(flg && menulist[i].power != 1) continue;
        var el = {
            text: menulist[i].menuname,
            id: menulist[i].menuid,
            "state": {
                "selected": false,
                "opened": true
            }
        };
        if(menulist[i].hasOwnProperty("menulist") && menulist[i].menulist != ""){
            el.icon = "fa fa-folder icon-state-warning icon-lg";
            el.children = [];
            data.push(el);
            menuListTreeDataMake(menulist[i].menulist, el.children);
        }else{
            el.icon = "fa fa-file-text-o icon-state-warning icon-lg";
            data.push(el);
        }
    }
}

function changeDataPower(data){
    for(var i in data){
        if(data[i]['check'] == true){
            data[i]['power'] = '1';
        }else{
            data[i]['power'] = '0';
        }
    }
}


function btnDisable(id){
    id.attr("disabled","disabled");
    setTimeout(btnEnable, 3000, id);
}


function btnEnable(id) {
    id.removeAttr("disabled");
}

function pageLengthInit(id){
    var length = $(id.selector + "_length select").val();
    if(!isNaN(length)){
        PageLength = Number(length);
    }
}