<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script src="https://d3js.org/d3.v3.min.js"></script>  <!--引入d3.js插件-->

<%--<script src="js/d3/d3.min.js"></script>--%>
<script src="js/matrix/matrix.js"></script>            <!--绘制矩阵-->
<link type="text/css" rel="stylesheet" href="css/matrix.css"/>  <!--矩阵样式-->

<div>
    <a class="btn btn-xs btn-primary"  value = "cluster" data-toggle="modal" data-target="#gaModal" onclick="showMatrix()"> <!---->
        <i class="menu-icon fa fa-desktop bigger-120"></i> 显示矩阵
    </a>
    <a class="btn btn-xs btn-primary" id = "cluster" value = "cluster" data-toggle="modal" data-target="#gaModal" onclick="clusterMatrix()"> <!---->
        <i class="ace-icon fa fa-gears bigger-120"></i>聚类分析
    </a>
    <%--<a id="saveProject" class="btn btn-xs btn-info" style="" onclick="saveData()">
        <i class="ace-icon fa fa-save bigger-120"></i>保存
    </a>
    <a id="saveAsProject" class="btn btn-xs btn-success" style="" onclick="checkAndShowModal()">
        <i class="ace-icon fa fa-random bigger-120"></i>另存为
    </a>--%>
    <!--关系矩阵中的提示框-->
    <div id="tooltip" class="hidden">
        <p><span id="value"/>
    </div>
</div> <br>
<!--矩阵样式-->
<link type="text/css" rel="stylesheet" href="css/bar.css"/>
<!--关系矩阵容器-->
<div id="matrix" style='overflow:auto; float:left;width:65%; height:900px;'></div>
<%--
<!--图容器-->
<div id="graph" style='width:100%; height:600px;border:2px dashed #266f8e'>
    <svg width="1300" height="600"></svg>
</div>--%>
