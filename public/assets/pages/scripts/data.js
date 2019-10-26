/**
 * Created by Administrator on 2019/2/28.
 */
function loginCheck(data){
    App.blockUI({target:'.login-container',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "login",    //请求发送到TestServlet处
        data: sendMessageEdit(LOGIN, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("loginCheck:" + JSON.stringify(result));
            loginCheckEnd(true, result);
        },
        error: function (errorMsg) {
            console.info("loginCheck-error:" + JSON.stringify(errorMsg));
            loginCheckEnd(false, "");
        }
    });
}

function logoutCheck(data){
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "logout",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("logoutCheck:" + JSON.stringify(result));
            logOutEnd(true, result);

        },
        error: function (errorMsg) {
            console.info("logoutCheck-error:" + JSON.stringify(errorMsg));
            logOutEnd(false, "");
        }
    });
}

function userDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {uid: "", uname: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "userquery",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("userDataGet:" + JSON.stringify(result));
            getUserDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("userDataGet-error:" + JSON.stringify(errorMsg));
            getUserDataEnd(false, "", callback);
        }
    });
}

function userAdd(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "useradd",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("userAdd:" + JSON.stringify(result));
            userInfoEditEnd(true, result, USERADD);
        },
        error: function (errorMsg) {
            console.info("userAdd-error:" + JSON.stringify(errorMsg));
            userInfoEditEnd(false, "", USERADD);
        }
    });
}

function userDelete(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "userdel",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("userDelete:" + JSON.stringify(result));
            userInfoEditEnd(true, result, USERDELETE);
        },
        error: function (errorMsg) {
            console.info("userDelete-error:" + JSON.stringify(errorMsg));
            userInfoEditEnd(false, "", USERDELETE);
        }
    });
}

function userEdit(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "userup",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("userEdit:" + JSON.stringify(result));
            userInfoEditEnd(true, result, USEREDIT);
        },
        error: function (errorMsg) {
            console.info("userEdit-error:" + JSON.stringify(errorMsg));
            userInfoEditEnd(false, "", USEREDIT);
        }
    });
}

function passwordReset(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "resetpasswd",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("passwordReset:" + JSON.stringify(result));
            passwordResetEnd(true, result);
        },
        error: function (errorMsg) {
            console.info("passwordReset-error:" + JSON.stringify(errorMsg));
            passwordResetEnd(false, "");
        }
    });
}

function passwordModify(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "chgpasswd",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("passwordModify:" + JSON.stringify(result));
            passwordModifyEnd(true, result);
        },
        error: function (errorMsg) {
            console.info("passwordModify-error:" + JSON.stringify(errorMsg));
            passwordModifyEnd(false, "");
        }
    });
}

function deviceDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {devno: "", bedno: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "devquery",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("deviceDataGet:" + JSON.stringify(result));
            getDeviceDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("deviceDataGet-error:" + JSON.stringify(errorMsg));
            getDeviceDataEnd(false, "", callback);
        }
    });
}

function deviceAdd(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "devadd",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("deviceAdd:" + JSON.stringify(result));
            deviceInfoEditEnd(true, result, DEVICEADD);
        },
        error: function (errorMsg) {
            console.info("deviceAdd-error:" + JSON.stringify(errorMsg));
            deviceInfoEditEnd(false, "", DEVICEADD);
        }
    });
}

function deviceDelete(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "devdel",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("deviceDelete:" + JSON.stringify(result));
            deviceInfoEditEnd(true, result, DEVICEDELETE);
        },
        error: function (errorMsg) {
            console.info("deviceDelete-error:" + JSON.stringify(errorMsg));
            deviceInfoEditEnd(false, "", DEVICEDELETE);
        }
    });
}

function deviceEdit(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "devup",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("deviceEdit:" + JSON.stringify(result));
            deviceInfoEditEnd(true, result, DEVICEEDIT);
        },
        error: function (errorMsg) {
            console.info("deviceEdit-error:" + JSON.stringify(errorMsg));
            deviceInfoEditEnd(false, "", DEVICEEDIT);
        }
    });
}

function bedDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {bedno: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "bedquery",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("bedDataGet:" + JSON.stringify(result));
            getBedDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("bedDataGet-error:" + JSON.stringify(errorMsg));
            getBedDataEnd(false, "", callback);
        }
    });
}


function materialDataGet(data, callback){
    App.blockUI({target: '#lay-out',boxed: true});
    if(data == null){
        data = {mname: "", currentpage: "", pagesize: "", startindex: "0", draw: 1}
    }
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "matquery",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("materialDataGet:" + JSON.stringify(result));
            getMaterialDataEnd(true, result, callback);
        },
        error: function (errorMsg) {
            console.info("materialDataGet-error:" + JSON.stringify(errorMsg));
            getMaterialDataEnd(false, "", callback);
        }
    });
}

function materialAdd(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "matadd",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("materialAdd:" + JSON.stringify(result));
            materialInfoEditEnd(true, result, MATERIALADD);
        },
        error: function (errorMsg) {
            console.info("materialAdd-error:" + JSON.stringify(errorMsg));
            materialInfoEditEnd(false, "", MATERIALADD);
        }
    });
}

function materialDelete(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "matdel",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("materialDelete:" + JSON.stringify(result));
            materialInfoEditEnd(true, result, MATERIALDELETE);
        },
        error: function (errorMsg) {
            console.info("materialDelete-error:" + JSON.stringify(errorMsg));
            materialInfoEditEnd(false, "", MATERIALDELETE);
        }
    });
}

function materialEdit(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "matupdate",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("materialEdit:" + JSON.stringify(result));
            materialInfoEditEnd(true, result, MATERIALEDIT);
        },
        error: function (errorMsg) {
            console.info("materialEdit-error:" + JSON.stringify(errorMsg));
            materialInfoEditEnd(false, "", MATERIALEDIT);
        }
    });
}

function materialShare(data){
    App.blockUI({target:'#lay-out',boxed: true});
    $.ajax({
        type: "post",
        contentType: "application/json",
        async: true,           //异步请求（同步请求将会锁住浏览器，用户其他操作必须等待请求完成才可以执行）
        url: hostUrl + "matshare",    //请求发送到TestServlet处
        data: sendMessageEdit(DEFAULT, data),
        dataType: "json",        //返回数据形式为json
        success: function (result) {
            console.info("materialShare:" + JSON.stringify(result));
            materialInfoEditEnd(true, result, MATERIALSHARE);
        },
        error: function (errorMsg) {
            console.info("materialShare-error:" + JSON.stringify(errorMsg));
            materialInfoEditEnd(false, "", MATERIALSHARE);
        }
    });
}