/**
 * Created by Administrator on 2019/2/19.
 */
var menuMake = '<li class="sidebar-toggler-wrapper hide">' +
'<div class="sidebar-toggler">' +
    '</div>' +
    '</li>' +
    '<li class="sidebar-search-wrapper">' +
    '<div style="color:white; padding: 0px 0px">' +
    '</div>' +
    '</li>';


function makeMenu(data){
    for(var i=0; i<data.length; i++){
        if(data[i].power == 0) {
            if( i == data.length - 1) menuMake += "</ul>";
            continue;
        }
        if(data[i].menutype == 1){
            menuMake += '<li class="nav-item">' +
                '<a href="javascript:;" class="nav-link nav-toggle" name="' + data[i].menuid + '">' +
                    '<i class="'+ data[i].menuicon +'"></i>' +
                    '<span class="title"> '+ data[i].menuname +' </span>' +
                    '<span class="arrow"></span>' +
                '</a>' +
                    '<ul class="sub-menu">'
        }else{
            menuMake += '<li class="nav-item">' +
                '<a href="' + data[i].url + '?uname=' + loginSucc.uid + '" class="nav-link nav-toggle" data-id="' + data[i].menuid + '">' +
                    '<i class="'+ data[i].menuicon +'"></i>' +
                    '<span class="title"> '+ data[i].menuname +' </span>' +
                '</a>'
        }
        if(data[i].hasOwnProperty("menulist") && data[i].menulist != undefined && data[i].menulist != null ){
            makeMenu(data[i].menulist);
        }else{
            menuMake += "</li>";
            if( i == data.length - 1) menuMake += "</ul>"
        }
    }
    menuMake += "</li>";

}


function logOutEnd(flg, result){
    if(flg){
        if(result.retcode == SUCCESS){
            //跳转页面
            var form = $("<form></form>").attr("action", "/logout").attr("method", "get");
            form.append($("<input/>").attr("type", "hidden").attr("name", "uid").attr("value", loginSucc.uid));
            form.appendTo('body').submit().remove();
        }else{
            alertDialog(result.retmsg)
        }
    }else{
        alertDialog("退出登录失败！")
    }

}