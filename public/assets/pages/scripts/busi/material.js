/**
 * Created by Jianggy on 2019/2/19.
 */

var materialList = [];
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //新增编辑素材控件初始化
        MaterialEdit.init();
        //获取素材信息
        MaterialTable.init();
        //获取设备信息
        DeviceTable.init();
    });
}

var MaterialTable = function () {
    var initTable = function () {
        var table = $('#material_table');
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
                    mname: formData.mname,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                materialDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "mid", visible: false },
                { "data": "mname" },
                { "data": "maddr" },
                { "data": "mtime" },
                { "data": "muid" },
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
                    "targets": [4],
                    "render": function (data, type, row, meta) {
                        return '<img src="' + data + '" style="width:100px;">';
                    }
                },
                {
                    "targets": [5],
                    "render": function (data, type, row, meta) {
                        return dateTimeFormat(data);
                    }
                },
                {
                    "targets": [7],
                    "render": function (data, type, row, meta) {
                        return '<a href="javascript:;" id="op_detail">详情</a>';
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

var MaterialEdit = function() {
    var handleRegister = function() {
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                mname:{
                    required: true
                },
                maddr: {
                    required: true
                }
            },

            messages: {
                mname:{
                    required: "素材名称必须选择"
                },
                maddr: {
                    required: "素材必须选择"
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
                var material = $('.register-form').getFormData();
                material.muid = localStorage.getItem("uid") || "";
                //先上传文件
                var oldimage = $("input[name=oldimage]").val();
                if(material.maddr !== oldimage) {
                    var formData = new FormData();
                    formData.append('photo', $("#mimage").get(0).files[0]);
                    $.ajax({
                        type: 'POST',
                        url: '/upload/image',
                        data: formData,
                        dataType: 'json',
                        contentType: false,
                        processData: false,
                        success: function (result) {
                            if (result.ret) {
                                material.maddr = result.url;
                                if ($("input[name=edittype]").val() == MATERIALADD) {
                                    materialAdd(material);
                                } else {
                                    materialEdit(material);
                                }
                            } else {
                                alertDialog("上传素材失败！" + result.msg);
                            }
                        },
                        error: function () {
                            alertDialog("上传素材失败！");
                        }
                    });
                }else{
                    if($("input[name=edittype]").val() == MATERIALADD){
                        materialAdd(material);
                    }else {
                        materialEdit(material);
                    }
                }
            }
        });
        //新增素材
        $('#op_add').click(function() {
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增素材");
            $(":input",".register-form").not(":button,:reset,:submit,:radio").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            //素材代码可以输入
            $(".register-form").find("input[name=materialid]").attr("readonly", false);
            $("input[name=edittype]").val(MATERIALADD);
            $('#edit_material').modal('show');
        });
        //分配图片
        $('#op_share').click(function() {
            var len = $("#material_table .checkboxes:checked").length;
            if(len < 1){
                alertDialog("至少选中一项！");
                return;
            }
            $(":input",".share-form").not(":button,:reset,:submit,:radio").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            var exclude = [];
            var row = $("#material_table .checkboxes:checked").parents("tr")[0];
            var rowData = $("#material_table").dataTable().fnGetData(row);
            var mid = rowData.mid;
            var material = new Object();
            for(var i=0; i < materialList.length; i++){
                if(mid == materialList[i].mid){
                    material = materialList[i];
                }
            }
            var options = { jsonValue: material, exclude:exclude,isDebug: false};
            $(".share-form").initForm(options);
            //设定表的选中状态
            var table = $("#device_table").dataTable();
            var nTrs = table.fnGetNodes();
            for(var i = 0; i < nTrs.length; i++){
                var devno = table.fnGetData(nTrs[i]).devno;
                for(var j=0; i<material.devlist.length; j++){
                    if(devno === material.devlist[j]){
                        jQuery(nTrs[i]).find("input[type=checkbox]").prop("checked", true);
                        jQuery(nTrs[i]).addClass("active");
                    }
                }
            }
            $('#share_material').modal('show');
        });

        $("#share-btn").on("click", function(){
            //发送图片分配
            var len = $("#device_table .checkboxes:checked").length;
            if(len <= 0){
                alertDialog("终端至少要选中一项！");
                return
            }
            var material = $('.share-form').getFormData();
            material.devlist = [];
            $("#device_table .checkboxes:checked").parents("td").each(function () {
                var row = $("#device_table .checkboxes:checked").parents("tr")[0];
                var rowData = $("#device_table").dataTable().fnGetData(row);
                material.devlist.push(rowData.devno);
            });
            materialShare(material);
        });

        //素材详情
        $('#material_table').on('click', '#op_detail', function (e) {
            e.preventDefault();
            var exclude = [];
            var row = $(this).parents('tr')[0];
            var mid = $("#material_table").dataTable().fnGetData(row).mid;
            var material = new Object();
            for(var i=0; i < materialList.length; i++){
                if(mid == materialList[i].mid){
                    material = materialList[i];
                }
            }
            material.mtime = dateTimeFormat(material.mtime);
            var options = { jsonValue: material, exclude:exclude,isDebug: false};
            $(".detail-form").initForm(options);
            $(".detail-form").find("img[name=maddr]").attr("src", material.maddr);
            $("#devlist").text(material.devlist.join(","));
            $('#detail_material').modal('show');
        });
    };
    return {
        init: function() {
            handleRegister();
        }
    };
}();

var DeviceTable = function () {
    var initTable = function () {
        var table = $('#device_table');
        pageLengthInit(table);
        table.dataTable({
            "language": TableLanguage,
            "bStateSave": false,
            "lengthMenu": TableLengthMenu,
            "destroy": true,
            "paging": false,
            "pageLength": PageLength,
            "pagingType": "bootstrap_extended",
            "serverSide": true,
            "processing": true,
            "searching": false,
            "ordering": false,
            "autoWidth": false,
            "ajax":function (data, callback, settings) {
                deviceDataGet(null, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "devno" },
                { "data": "bedno" }
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

var MaterialDelete = function() {
    $('#op_del').click(function() {
        var len = $("#material_table .checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            confirmDialog("数据删除后将不可恢复，您确定要删除吗？", MaterialDelete.deleteMaterial)
        }
    });
    return{
        deleteMaterial: function(){
            //先删除服务器上的文件
            var materiallist = {midlist:[], mname:[]};
            $("#material_table .checkboxes:checked").parents("td").each(function () {
                var row = $(this).parents('tr')[0];     //通过获取该td所在的tr，即td的父级元素，取出第一列序号元素
                var rowData = $("#material_table").dataTable().fnGetData(row);
                materiallist.midlist.push(rowData.mid);
                var addr = rowData.maddr;
                materiallist.mname.push(addr.substr(addr.lastIndexOf("/") + 1));
            });
            $.ajax({
                type: 'POST',
                url: '/upload/delete',
                data: materiallist,
                dataType: 'json',
                success: function (result) {
                    if (result.ret) {
                        materialDelete(materiallist);
                    } else {
                        alertDialog(result.msg);
                    }
                },
                error: function (ex) {
                    alertDialog("删除素材失败！");
                }
            });
        }
    }
}();

function getMaterialDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {

            var res = result.response;
            materialList = res.materiallist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.materiallist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog("素材信息获取失败！");
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("素材信息获取失败！");
    }
}

function materialInfoEditEnd(flg, result, type){
    var res = "失败";
    var text = "";
    var alert = "";
    switch (type){
        case MATERIALADD:
            text = "新增";
            break;
        case MATERIALEDIT:
            text = "编辑";
            break;
        case MATERIALDELETE:
            text = "删除";
            break;
        case MATERIALSHARE:
            text = "共享";
            break;
    }
    if(flg){
        if(result && result.retcode != SUCCESS){
            alert = result.retmsg;
        }
        if (result && result.retcode == SUCCESS) {
            res = "成功";
            MaterialTable.init();
            $('#edit_material').modal('hide');
            $('#share_material').modal('hide');
        }
    }
    if(alert == "") alert = text + "素材" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
}

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
        deviceList = [
            {"devno": "000", "bedno":"1"},
            {"devno": "001", "bedno":"2"},
            {"devno": "002", "bedno":"3"},
            {"devno": "003", "bedno":"4"}
        ];
        tableDataSet(1, 4, 4, deviceList, callback);
        //tableDataSet(0, 0, 0, [], callback);
        alertDialog("终端信息获取失败！");
    }
}

$("#material_inquiry").on("click", function(){
    //素材查询
    MaterialTable.init();
});

$("#mimage").change(function(){
    var file = $(this).get(0).files[0];
    var inputObj = $(this).siblings("input[name=maddr]");
    var imgObj = $(this).siblings("img");
    inputObj.val(file);
    if(file == undefined){
        imgObj.attr("src", "");
        inputObj.val("");
        return;
    }
    var render = new FileReader();
    render.readAsDataURL(file);
    render.onload = function(e) {
        imgObj.attr("src", e.target.result);
    }
});