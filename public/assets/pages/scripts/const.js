/**
 * Created by Administrator on 2019/2/19.
 */
var hostIP = "60.216.52.194";
//var hostUrl = "http://172.16.7.127:8888/wldp/web/front/";
var hostUrl = "http://127.0.0.1:8000/web/";
var loginUrl = "http://172.16.7.127:8888/wldp/web/";
var SUCCESS = "0000";

var DEFAULT = 0;
var USERADD = 1;
var USEREDIT = 2;
var USERDELETE = 3;
var LOGIN = 4;
var MATERIALADD = 5;
var MATERIALEDIT = 6;
var MATERIALDELETE = 7;
var MATERIALSHARE = 8;
var STATIONLIST = 9;
var ORGANADD = 10;
var ORGANEDIT = 11;
var ORGANDELETE = 12;
var STATIONADD = 13;
var STATIONEDIT = 14;
var STATIONDELETE = 15;
var ITEMADD = 16;
var ITEMEDIT = 17;
var ITEMDELETE = 18;
var AREALIST = 19;
var AREAADD = 20;
var AREAEDIT = 21;
var AREADELETE = 22;
var DEVICEADD = 23;
var DEVICEEDIT = 24;
var DEVICEDELETE = 25;
var MENUADD = 26;
var MENUEDIT = 27;
var MENUDELETE = 28;
var FUNCTIONADD = 29;
var FUNCTIONEDIT = 30;
var FUNCTIONDELETE = 31;
var EVALUATIONADD = 32;
var EVALUATIONDELETE = 33;
var EVALUATIONEDIT = 34;
var ADADD = 35;
var ADDELETE = 36;
var ADEDIT = 37;
var STOREYADD = 38;
var STOREYDELETE = 39;
var STOREYEDIT = 40;

var TableLanguage = {
        "aria": {
            "sortAscending": ": 以升序排列此列",
                "sortDescending": ": 以降序排列此列"
        },
        "emptyTable": "暂无数据",
        "info": "当前显示第 _START_ 到 _END_ 项，共 _TOTAL_项",
        "infoEmpty": "当前显示第 0 至 0 项，共 0 项",
        "infoFiltered": "(由 _MAX_ 项结果过滤)",
        "lengthMenu": "每页 _MENU_ 条",
        "search": "搜索:",
        "zeroRecords": "没有匹配的数据",
        "paginate": {
            "previous":"上一页",
            "next": "下一页",
            "last": "首页",
            "first": "末页",
            "page": "第",
            "pageOf": "共"
        },
        "processing": "正在加载中......"
    };
var TableLengthMenu = [
        [10, 20, 30, -1],
        [10, 20, 30, "所有"] // change per page values here
    ];

var PageLength = 20;

//测试数据
var userMenuList = {
    menulist:[
        {"menuid":"systemanager","menutype":1,sort:"0", power:"1", "menuname":"系统管理","url":"", menuicon:"icon-settings",
            "menulist":[
                {"menuid":"user","menutype":0,sort:"0", power:"1", "menuname":"用户管理","url":"user", menuicon:"icon-user"},
                {"menuid":"password","menutype":0,sort:"1", power:"1", "menuname":"修改密码","url":"password", menuicon:"icon-lock"}
            ]
        },
        {"menuid":"devicemanager","menutype":1,sort:"0", power:"1", "menuname":"终端管理","url":"", menuicon:"icon-screen-desktop",
            "menulist":[
                {"menuid":"device","menutype":0,sort:"0", power:"1", "menuname":"终端管理","url":"device", menuicon:"icon-list"}
            ]
        },
        {"menuid":"busimanager","menutype":1,sort:"0", power:"1", "menuname":"业务管理","url":"", menuicon:"icon-briefcase",
            "menulist":[
                {"menuid":"material","menutype":0,sort:"0", power:"1", "menuname":"素材管理","url":"material", menuicon:"icon-picture"},
                {"menuid":"hisdata","menutype":0,sort:"1", power:"1", "menuname":"数据查询","url":"hisdata", menuicon:"icon-layers"}
            ]
        }
    ]
};