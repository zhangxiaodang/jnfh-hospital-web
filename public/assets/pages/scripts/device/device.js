/**
 * Created by Jianggy on 2019/2/19.
 */

var deviceList = [];
var responseComplete = [0, 0];   //终端信息和机构全部返回
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //获取所有床位号
        bedDataGet(null, null);
        //新增编辑终端控件初始化
        DeviceEdit.init();
        //获取终端信息
        DeviceTable.init();
    });
}

var DeviceTable = function () {
    var initTable = function () {
        var table = $('#device_table');
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
                    devno: formData.devno,
                    bedno: formData.bedno,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                deviceDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "devno" },
                { "data": "bedno" },
                { "data": "ip" },
                { "data": "mac" },
                { "data": "online" },
                { "data": "disable" },
                { "data": null }
            ],
            columnDefs: [
                {
                    "targets": [1],
                    "render": function (data, type, row, meta) {
                        return '<input type="checkbox" class="checkboxes" value="1" />';
                    }
                },
                {
                    "targets": [0],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        return meta.settings._iDisplayStart + meta.row + 1;  //行号
                    }
                },
                {
                    "targets": [6],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var online = "离线";
                        if(data === "1") online = "在线";
                        return online
                    }
                },
                {
                    "targets": [7],
                    "data": null,
                    "render": function (data, type, row, meta) {
                        var disable = "否";
                        if(data === "1") disable = "是";
                        return disable
                    }
                },
                {
                    "targets": [8],
                    "render": function (data, type, row, meta) {
                        return '<a href="javascript:;" id="op_edit">编辑</a>';
                    }
                }
            ],
            fnRowCallback: function( nRow, aData, iDisplayIndex, iDisplayIndexFull ) {
                $('td:eq(1)', nRow).attr('style', 'text-align: center;');
            }
        });
        //table.draw( false );
        table.find('.group-checkable').change(function () {
            var set = jQuery(this).attr("data-set");
            var checked = jQuery(this).is(":checked");
            jQuery(set).each(function () {
                if (checked) {
                    $(this).prop("checked", true);
                    $(this).parents('tr').addClass("active");
                } else {
                    $(this).prop("checked", false);
                    $(this).parents('tr').removeClass("active");
                }
            });
        });
        table.on('change', 'tbody tr .checkboxes', function () {
            $(this).parents('tr').toggleClass("active");
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

var DeviceEdit = function() {
    var handleRegister = function() {
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                devno: {
                    required: true
                },
                bedno: {
                    required: true
                },
                disable: {
                    required: true
                }
            },

            messages: {
                devno: {
                    required: "设备编号必须输入"
                },

                bedno: {
                    required: "床位号必须输入"
                },
                disable: {
                    required: "是否禁用必须输入"
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                form.submit();
            }
        });

        //点击确定按钮
        $('#register-btn').click(function() {
            btnDisable($('#register-btn'));
            if ($('.register-form').validate().form()) {
                var device = $('.register-form').getFormData();
            }
            if($("input[name=edittype]").val() == DEVICEADD){
                deviceAdd(device);
            }else {
                deviceEdit(device);
            }
        });
        //新增终端
        $('#op_add').click(function() {
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增终端");
            $(":input",".register-form").not(":button,:reset,:submit,:radio").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            //终端代码可以输入
            $(".register-form").find("input[name=devno]").attr("readonly", false);
            $("input[name=edittype]").val(DEVICEADD);
            $('#edit_device').modal('show');
        });
        //编辑终端
        $('#device_table').on('click', '#op_edit', function (e) {
            e.preventDefault();
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("编辑终端");
            var exclude = [];
            var row = $(this).parents('tr')[0];
            var devno = $("#device_table").dataTable().fnGetData(row).devno;
            var device = new Object();
            for(var i=0; i < deviceList.length; i++){
                if(devno == deviceList[i].devno){
                    device = deviceList[i];
                }
            }
            var options = { jsonValue: device, exclude:exclude,isDebug: false};
            $(".register-form").initForm(options);
            //终端代码不可以输入
            $(".register-form").find("input[name=devno]").attr("readonly", true);
            $("input[name=edittype]").val(DEVICEEDIT);
            $('#edit_device').modal('show');
        });
    };
    return {
        init: function() {
            handleRegister();
        }
    };
}();


var DeviceDelete = function() {
    $('#op_del').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            confirmDialog("数据删除后将不可恢复，您确定要删除吗？", DeviceDelete.deleteDevice)
        }
    });
    return{
        deleteDevice: function(){
            var devicelist = {devnolist:[]};
            $(".checkboxes:checked").parents("td").each(function () {
                devicelist.devnolist.push($(this).siblings().eq(1).text());
            });
            deviceDelete(devicelist);
        }
    }
}();

function getDeviceDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {

            var res = result.response;
            deviceList = res.devicelist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.devicelist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog("终端信息获取失败！");
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("终端信息获取失败！");
    }
}

function getBedDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {
            var bedlist = result.response.bedlist;
            bedNoSelectBuild(bedlist);
        }
    }
}

function deviceInfoEditEnd(flg, result, type){
    var res = "失败";
    var text = "";
    var alert = "";
    switch (type){
        case DEVICEADD:
            text = "新增";
            break;
        case DEVICEEDIT:
            text = "编辑";
            break;
        case DEVICEDELETE:
            text = "删除";
            break;
    }
    if(flg){
        if(result && result.retcode != SUCCESS){
            alert = result.retmsg;
        }
        if (result && result.retcode == SUCCESS) {
            res = "成功";
            DeviceTable.init();
            $('#edit_device').modal('hide');
        }
    }
    if(alert == "") alert = text + "终端" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
}

function bedNoSelectBuild(list){
    var id = $("#bednoquery, #bedno");
    id.empty();
    for (var i = list.length - 1;  i >=0 ; i--) {
        id.prepend('<option value="' + list[i].bedno + '">' + list[i].bedno + '</option>');
    }
    id.prepend('<option value="" selected>请选择</option>');
    id.selectpicker('refresh');
}

$("#device_inquiry").on("click", function(){
    //终端查询
    DeviceTable.init();
});
