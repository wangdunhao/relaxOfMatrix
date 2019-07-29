<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script type="text/javascript" src="js/matrix/edges.js"></script>
    <!-- 主界面区 -->
    <div id="main"style="height:500px" >

        <div id="dataInfo" class="tab-pane active">
            <div id="toolbar" class="btn-group">
                <a class="btn btn-xs btn-info" onclick="" data-toggle="modal" data-target="#addInfoModal">
                    <i class="ace-icon glyphicon glyphicon-plus"></i>
                    添加样本
                </a>
                <button type="button" class="btn btn-xs btn-danger" style="margin-right: 40px" onclick="deleterow()">
                    <i class="glyphicon glyphicon-trash"></i>
                    删除
                </button>
<%--                <button type="button" class="btn btn-xs btn-info" onclick="downloadexcel()">
                    <i class="glyphicon glyphicon-download">文件模板下载</i>
                </button>
                <button type="button" class="btn btn-xs btn-success" data-toggle="modal"
                        data-target="#addselectfilemodal">
                    <i class="glyphicon glyphicon-import">文件导入</i>
                </button>--%>
                <button type="button"  class="btn btn-xs btn-info"  onclick="saveRelaxData()">
                    <i class="ace-icon fa fa-save bigger-120"></i>保存
                </button>
                <button type="button"  class="btn btn-xs btn-info"  onclick="saveAsNewProject()">
                    <i class="ace-icon fa fa-random bigger-120"></i>另存为
                </button>
            </div>

        <table id="myBootstrapTtable" data-toggle="table" data-search="true" data-show-refresh="true"
               data-show-toggle="true" data-toolbar="#toolbar" data-pagination="true"  class="table table-striped table-bordered"
               data-side-pagination="client">
            <thead>
            <tr>
                <th class="col-sm-2 center" data-field="state" data-checkbox="true"></th>
                <th data-field="procedureIdForDelete" data-visible="false">procedureId</th>
                <th class="col-sm-2 center" data-field="procedureId" data-formatter="generateId">Edges</th>
                <th class="col-sm-2 center" data-field="source">Source</th>
                <th class="col-sm-2 center" data-field="target">Target</th>
                <th class="col-sm-2 center" data-field="weight">Weight</th>
                <th class="col-sm-2 center" data-field="action" data-formatter="actionFormatter" data-events="actionEvents">编&nbsp辑</th>
            </tr>
            </thead>
        </table>
        <br>
     </div>
    </div>