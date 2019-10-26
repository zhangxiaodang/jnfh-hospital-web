/**
 * Created by Jianggy on 2019/2/19.
 */

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //获取HIS信息
        HisTable.init();
    });
}

var HisTable = function () {
    var initTable = function () {
        var table = $('#his_table');
        pageLengthInit(table);
        table.dataTable({
            "language": TableLanguage,
            "bStateSave": false,
            "lengthMenu": TableLengthMenu,
            "destroy": true,
            "pageLength": PageLength,
            "pagingType": "bootstrap_extended",
            "serverSide": true,
            "processing": true,
            "searching": false,
            "ordering": false,
            "autoWidth": false,
            "ajax":function (data, callback, settings) {
                var formData = $(".inquiry-form").getFormData();
                var da = {
                    bedno: formData.bedno,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                bedDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": "patient" },
                { "data": "bedno" },
                { "data": "chiefdoctor" },
                { "data": "doctor" },
                { "data": "headnurse" },
                { "data": "nurse" }
            ],
            columnDefs: [
                {
                    "targets": [0],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;  //行号
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {

            }
        });
    };
    return {
        init: function (data) {
            if (!jQuery().dataTable) {
                return;
            }
            initTable(data);
        }
    };

}();

function getBedDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var res = result.response;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.bedlist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog("HIS信息获取失败！");
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("HIS信息获取失败！");
    }
}

$("#his_inquiry").on("click", function(){
    //HIS查询
    HisTable.init();
});
