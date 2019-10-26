/**
 * Created by Jianggy on 2019/2/19.
 */

var userList = [];
var responseComplete = [0, 0];   //用户信息和机构全部返回
if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        //新增编辑用户控件初始化
        UserEdit.init();
        //获取用户信息
        UserTable.init();
    });
}

var UserTable = function () {
    var initTable = function () {
        var table = $('#user_table');
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
                    uid: formData.uid,
                    uname: formData.uname,
                    currentpage: (data.start / data.length) + 1,
                    pagesize: data.length == -1 ? "": data.length,
                    startindex: data.start,
                    draw: data.draw
                };
                userDataGet(da, callback);
            },
            columns: [//返回的json数据在这里填充，注意一定要与上面的<th>数量对应，否则排版出现扭曲
                { "data": null},
                { "data": null},
                { "data": "uid" },
                { "data": "uname" },
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

var UserEdit = function() {
    var handleRegister = function() {
        var validator = $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                uid: {
                    required: true
                },
                uname: {
                    required: true
                }
            },

            messages: {
                uid: {
                    required: "登录名必须输入"
                },

                uname: {
                    required: "姓名必须输入"
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
                var user = $('.register-form').getFormData();
            }
            if($("input[name=edittype]").val() == USERADD){
                userAdd(user);
            }else {
                userEdit(user);
            }
        });
        //新增用户
        $('#op_add').click(function() {
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("新增用户");
            $(":input",".register-form").not(":button,:reset,:submit,:radio").val("")
                .removeAttr("checked")
                .removeAttr("selected");
            //用户代码可以输入
            $(".register-form").find("input[name=userid]").attr("readonly", false);
            $("input[name=edittype]").val(USERADD);
            $('#edit_user').modal('show');
        });
        //编辑用户
        $('#user_table').on('click', '#op_edit', function (e) {
            e.preventDefault();
            //清除校验错误信息
            validator.resetForm();
            $(".register-form").find(".has-error").removeClass("has-error");
            $(".modal-title").text("编辑用户");
            var exclude = [];
            var row = $(this).parents('tr')[0];
            var userid = $("#user_table").dataTable().fnGetData(row).userid;
            var user = new Object();
            for(var i=0; i < userList.length; i++){
                if(userid == userList[i].uid){
                    user = userList[i];
                }
            }
            var options = { jsonValue: user, exclude:exclude,isDebug: false};
            $(".register-form").initForm(options);
            //用户代码不可以输入
            $(".register-form").find("input[name=userid]").attr("readonly", true);
            $("input[name=edittype]").val(USEREDIT);
            $('#edit_user').modal('show');
        });
    };
    return {
        init: function() {
            handleRegister();
        }
    };
}();


var UserDelete = function() {
    $('#op_del').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            confirmDialog("数据删除后将不可恢复，您确定要删除吗？", UserDelete.deleteUser)
        }
    });
    return{
        deleteUser: function(){
            var userlist = {uidlist:[]};
            $(".checkboxes:checked").parents("td").each(function () {
                userlist.uidlist.push($(this).siblings().eq(1).text());
            });
            userDelete(userlist);
        }
    }
}();

var PasswordRest = function() {
    jQuery('#password_reset').click(function() {
        var len = $(".checkboxes:checked").length;
        if(len < 1){
            alertDialog("至少选中一项！");
        }else{
            confirmDialog("您确定要重置密码吗？", PasswordRest.passwordRest)
        }
    });
    return{
        passwordRest: function(){
            var password = hex_md5("123456");
            var userlist = {uidlist:[], password:password};
            $(".checkboxes:checked").parents("td").each(function () {
                userlist.uidlist.push($(this).siblings().eq(0).text());
            });
            passwordReset(userlist);
        },
        passwordRestResult: function(flg){
            var result = "密码重置成功！";
            if(!flg) result = "密码重置失败！";
            alertDialog(result);
        }
    }
}();

function getUserDataEnd(flg, result, callback){
    App.unblockUI('#lay-out');
    if(flg){
        if (result && result.retcode == SUCCESS) {

            var res = result.response;
            userList = res.userlist;
            tableDataSet(res.draw, res.totalcount, res.totalcount, res.userlist, callback);
        }else{
            tableDataSet(0, 0, 0, [], callback);
            alertDialog("用户信息获取失败！");
        }
    }else{
        tableDataSet(0, 0, 0, [], callback);
        alertDialog("用户信息获取失败！");
    }
}

function userInfoEditEnd(flg, result, type){
    var res = "失败";
    var text = "";
    var alert = "";
    switch (type){
        case USERADD:
            text = "新增";
            break;
        case USEREDIT:
            text = "编辑";
            break;
        case USERDELETE:
            text = "删除";
            break;
    }
    if(flg){
        if(result && result.retcode != SUCCESS){
            alert = result.retmsg;
        }
        if (result && result.retcode == SUCCESS) {
            res = "成功";
            UserTable.init();
            $('#edit_user').modal('hide');
        }
    }
    if(alert == "") alert = text + "用户" + res + "！";
    App.unblockUI('#lay-out');
    alertDialog(alert);
}

function passwordResetEnd(flg, result){
    App.unblockUI('#lay-out');
    PasswordRest.passwordRestResult(flg);
}

$("#user_inquiry").on("click", function(){
    //用户查询
    UserTable.init();
});
