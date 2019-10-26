/**
 * Created by Jianggy on 2019/2/19.
 */

jQuery(document).ready(function() {
    deviceDataGet(null, null);
});


function getDeviceDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var res = result.response;
            var deviceList = res.devicelist;
            var total = deviceList.length;
            var online = 0, offline = 0;
            for(var i=0; i<deviceList.length; i++){
                (deviceList[i].online == 1) ? online ++ : offline ++;
            }
            deviceNumberSet(total, online, offline);
        }else{
            deviceNumberSet(0, 0, 0);
        }
    }else{
        deviceNumberSet(0, 0, 0);
    }
}

function deviceNumberSet(a, b, c){
    $("#total").text(a);
    $("#online").text(b);
    $("#offline").text(c);
}