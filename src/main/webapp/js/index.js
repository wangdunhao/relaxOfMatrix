//将关系数据保存至数据库
function saveRelaxData() {
    if (projectId == 0) {
        alert("尚未选择与之对应的项目，请另存为一个新项目！");
        $('#saveAsNewProjectModal').modal();
    }
    else {
        let datas = $('#myBootstrapTtable').bootstrapTable('getData');
        $.ajax({
            url: "/projectManager/api/v1/project",
            type: "put",
            data: {
                id: projectId,
                projectName: projectName,
                memo: '',
                appResult: '',
                tempProjectID: "",
                appContent: JSON.stringify(datas),
                reservation: ""
            },
            success: function (result) {
                if (result.state) {
                    alert("Excel信息保存数据库成功！");  //请求成功
                }
                else {
                    alert("Excel信息保存数据库出现错误！");  //请求错误
                }
            }
        })
    }
}
//另存为之前首先检查是否选中了一个项目，然后再执行另存为
function checkAndShowModal(){
    if(projectId == 0){   //未选择项目的情况下不能另存为
        alert("请先选择一个项目，然后另存为！");
    }
    else{
        $('#saveAsNewProjectModal').modal();
    }
}
//另存为一个新项目
function saveAsNewProject(){
    // 获取输入框中的内容
    var projectName = $('#newProjectName')[0].value;//获取项目名
    var createTime = new Date().toLocaleDateString() + ',' + new Date().getHours() + ':' + new Date().getMinutes();//获取项目创建时间
    var memo = $('#newProjectRemark')[0].value;//获取备注
    var datas = $('#myBootstrapTtable').bootstrapTable('getData');
    var data = {
        "id": 0,
        "createTime": createTime,
        "editTime": createTime,
        "projectName": projectName,
        "memo": memo,
        "appContent":JSON.stringify(datas),
        "appResult": appResult
    };
    //获取数据库所有项目名
    $.ajax({
        url: "/projectManager/api/v1/project",
        type: "get",
        async: false,
        dataType: "json",
        success: function (result) {
            projectNameArr.length = 0;//数组清零
            result.content.forEach(function (element, index, array) {
                projectNameArr.push(element.projectName);
            })
        }
    });
    //表格添加数据
    if (projectName === ''||projectName.match(/^\s*$/)) {
        alert("请输入项目名！！！");
    } else if (projectName.length > 25) {
        alert("项目名长度不能超过25个汉字，请重新输入");
    } else if (projectNameArr.indexOf(projectName) !== -1) {
        alert("项目已经存在，请重新输入项目名！！！");
    } else {
        // 添加数据库
        $.ajax({
            type: "post",
            url: "/projectManager/api/v1/project",
            data: data,
            success: function (result) {
                alert("另存为新项目成功！");
                if (result.state) {
                    $('.selectList').prepend('<li class="">\n' +
                        '\t\t\t\t\t<a >\n' +
                        '\t\t\t\t\t\t<div>\n' +
                        '\t\t\t\t\t\t\t<div class="sideProjectLi" onmouseover="this.title = this.innerHTML;" onclick="sideCheck(' + result.content.id + ',this)">\n' +
                        '\t\t\t\t\t\t\t\t' + result.content.projectName + '\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t\t<div style="position:absolute;bottom:6px;right:5px;">\n' +
                        '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-pencil align-top bigger-125 purple" id="checkSideLi" onclick="modifyBasicInfo(' + result.content.id + ',this)" data-toggle="modal" data-target="#basicInfo"></i>\n' +
                        '\t\t\t\t\t\t\t\t<i class="ace-icon fa fa-trash-o bigger-120 red" id="deleteSideLi" onclick="removeProject(' + result.content.id + ')"></i>\n' +
                        '\t\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t\t</div>\n' +
                        '\t\t\t\t\t</a>\n' +
                        '\t\t\t\t</li>');
                    //侧边栏高度适应
                    var height = $(window).get(0).innerHeight;//获取屏幕高度
                    if ($('#cityList').children('li').length * 36 < height - 310) {
                        $('.selectList').css('height', $('#cityList').children('li').length * 36);
                    } else {
                        $('.selectList').css('height', height - 310);
                    }
                    //移除属性标注
                    for (var i = 0; i < $('.submenu.nav-show.selectList').find('li').length; i++) {
                        $($('.submenu.nav-show.selectList').find('li')[i]).removeAttr('class');
                    }
                    //高亮项目
                    $('#cityList').children('li').first().attr('class', 'active highlight');
                    //面包屑显示项目名
                    $('.showProjectNameDiv').html($('#cityList').children('li').first()[0].innerText);
                    $('.showProjectNameDiv').removeAttr('style');
                    projectId = result.content.id;//项目全局ID
                    data.id = result.content.id;
                    $('#dynamic-table').DataTable().row.add(data).draw(false);
                    addSelfDefine(result);
                }
            }
        });
        $('#saveAsNewProjectModal').modal('hide');//隐藏模态框
        // 在前台添加表格
    }
}

var updateindex = 1;
window.actionEvents = {
    'click .edit': function (e, value, row, index) {
        $('#updatedatainfo').modal('show');
        $("#source_u").val(row.source);
        $("#target_u").val(row.target);
        $("#weight_u").val(row.weight);
        $("#procedureId_u").val(row.procedureId); //不可见，不能改
        updateindex = index;
        // console.log(row);
    }
}
//编辑菜单
function actionFormatter(value, row, index) {
    return [
        '<a class="edit ml10" href="javascript:void(0)" title="Edit">',
        '<i class="glyphicon glyphicon-edit"></i> 编辑',
        '</a>'
    ].join('');
}
//删除函数
function deleterow() {
    //遍历数组中的每个元素，并按照return中的计算方式 形成一个新的元素，放入返回的数组中
    var ids = $.map($('#myBootstrapTtable').bootstrapTable('getSelections'), function (row) {
        return row.procedureIdForDelete;
    });
    $('#myBootstrapTtable').bootstrapTable('remove', {field: 'procedureIdForDelete', values: ids});
    // var ids=$("#myBootstrapTtable").bootstrapTable("getSelections");

}
//更改样本数据
function editItem() {
    $('#updatedatainfo').modal('hide');
    ////更改表格数据
    var rowdata= {
        source:$("#source_u").val(),
        target:$("#target_u").val(),
        weight:$("#weight_u").val(),
    };
    $('#myBootstrapTtable').bootstrapTable('updateRow',{index: updateindex, row: rowdata});
}
//生成序号自加+1
function generateId(value,row,index) {
    return index+1;
}