<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<style type="text/css">
    #sourceAuto {
        display: none;
        width: 484px;
        height: 190px;
        border: 1px #C0C0C0 solid;
        background: #FFF;
        position: absolute;
        top: 34px;
        left:85px;
        color: #323232;
    }
    #targetAuto{
        display: none;
        width: 484px;
        height: 137px;
        border: 1px #C0C0C0 solid;
        background: #FFF;
        position: absolute;
        top: 34px;
        left:85px;
        color: #323232;
    }
</style>
<!--手动添加数据模态框-->
<div class="modal fade" id="addInfoModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="newProjectModalTitle">
                    请输入节点信息：
                </h4>
            </div>
            <div class="modal-body">
                <!-- <%--输入框组--%> -->
                <div class="input-group">
                     <span class="input-group-addon"style="width: 85px;height: 34px">Source：</span>
                     <input type="text" class="form-control" style="width: 484px"placeholder="请输入节点名称" id="nodeSource" onfocus="autoSource()">
                     <div  id="sourceAuto" style="overflow: auto"></div>
                </div>
                <br>
                <div class="input-group">
                    <span class="input-group-addon"style="width: 85px;height: 34px">Target：</span>
                    <input type="text" class="form-control"style="width: 484px" placeholder="请输入节点名称" id="nodeTarget" onfocus="autoTarget()">
                    <div  id="targetAuto" style="overflow: auto"></div>
                </div>
                <br>
                <div class="input-group">
                    <span class="input-group-addon"style="width: 85px;height: 34px">Weight：</span>
                    <input type="number" class="form-control"style="width: 484px" placeholder="请输入权重" id="weight">
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                <button type="button" class="btn btn-primary" onclick="addmyedge()">确认</button>
            </div>
        </div>
    </div>
</div>
<!--修改模态框-->
<div class="modal fade" id="updatedatainfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal"
                        aria-hidden="true">&times;</button>
                <h4 class="modal-title" id="myModalLabel">修改元素名称</h4>
            </div>
            <div class="modal-body" style="margin: auto;">
                <div id="spindivupdate"></div>
                <form id="updateprocesspop">
                    <table style="width: 100%;font-size:13px" class="table table-striped table-bordered table-hover" id="modal-table">
                        <input type="hidden" id="procedureId_u" name="procedureId" size="24" ></input>
                        <tr>
                            <td>Source：</td>
                            <td><input type="text" style="width:100%" id="source_u"></input></td>
                        </tr><br>
                        <tr>
                            <td>Target：</td>
                            <td><input type="text" style="width:100%" id="target_u"></input></td>
                        </tr><br>
                        <tr>
                            <td>Weight：</td>
                            <td><input type="text" style="width:100%" id="weight_u"></input></td>
                        </tr>
                    </table>
                    <a class="btn btn-sm btn-info" style=""
                       onclick="editItem()"> <i class="ace-icon glyphicon glyphicon-ok bigger-120"></i>
                        提交
                    </a>
                </form>
            </div>
        </div>
    </div>
</div>