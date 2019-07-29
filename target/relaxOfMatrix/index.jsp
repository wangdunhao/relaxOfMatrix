<%--
  Created by IntelliJ IDEA.
  User: wangdunhao
  Date: 2018/11/16
  Time: 9:56
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>创新方法工作平台</title>
    <!--添加页面框架-->
    <link rel="import" id="frame" href="/webresources/common/html/appFrame.html">
    <script type="text/javascript" src="js/buttonAction.js"></script>
    <%--bootstraptable--%>
    <link rel="stylesheet" href="/webresources/bootstrap/bootstrap-table/bootstrap-table.css">
    <script type="text/javascript" src="/webresources/ace-master/assets/js/jquery.dataTables.min.js"></script>
    <script type="text/javascript" src="/webresources/bootstrap/bootstrap-table/bootstrap-table.js"></script>
    <script type="text/javascript" src="/webresources/bootstrap/bootstrap-table/locale/bootstrap-table-zh-CN.js"></script>
    <!--截图插件-->
    <script type="text/javascript" src="js/d3/canvg.min.js"></script>
    <!-- 前端主功能 -->
    <script type="text/javascript" src="js/index.js"></script>
   <%-- <script type="text/javascript" src="js/d3/d3.min.js"></script>--%>
</head>
<body class="no-skin">
<div id="mainFunctionHtml">
    <div id="myCustomLi">
        <li class="active">
            <a data-toggle="tab" href="#abc">
                <i class="green ace-icon fa fa-desktop bigger-120"></i>输入边</a>
        </li>
        <li class="">
            <a data-toggle="tab" href="#def" >
                <i class="purple ace-icon fa fa-pencil-square-o bigger-120"></i>关系分析</a>
        </li>
    </div>
    <div id="myCustomTab">
        <%--界面1--%>
        <div class="tab-pane active" id="abc"style="height: 600px">
            <jsp:include page="jsp/start.jsp"/>
        </div>
        <%--界面2--%>
        <div class="tab-pane" id="def" style="height: 1200px">
            <jsp:include page="jsp/after.jsp"/>
        </div>
    </div>
</div>
<!--弹出模态框-->
            <jsp:include page="jsp/model.jsp"/>
<!--帮助页面-->
            <jsp:include page="jsp/help.jsp"/>
</body>
</html>
