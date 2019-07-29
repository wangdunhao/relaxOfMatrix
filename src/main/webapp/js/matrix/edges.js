//全局变量
let myedge = new Array();  //定义一条边
let myedges = new Set();  //定义边的集合,通过后面无法加重复边
let nodeSet = new Set();  //定义节点集合，去重
let nodeList = new Array(); //定义节点数组
//添加边
function addmyedge(){
    let datanum = $('#myBootstrapTtable').bootstrapTable('getData').length;  //获取前台myedges数目
    let myedgesArray = new Array();  //定义边数组
    let source=$("#nodeSource").val();
    let target=$("#nodeTarget").val();
    let weight=$("#weight").val();
    let datas = {
        procedureIdForDelete: datanum + 1,
        source: source,
        target: target,
        weight: weight
    };
    //getNodeData();//后端端获取表格数据
    getRelaxData();//前端获取表格数据
    myedge = [source,target,weight];
    if($("#nodeSource").val() == ""|| $("#nodeTarget").val() == "" || $("#weight").val() == ""){
        alert("信息不能为空，请重新填写！");
    } else{
        if(datanum == 0){ //如果前台没有边数据之间则添加
            $('#myBootstrapTtable').bootstrapTable('append', datas);
            myedges.add(myedge);
            nodeSet.add(source);
            nodeSet.add(target);
        }else {  //如果有边数据则判断边是否重复
            myedgesArray = Array.from(myedges);
            for(let i=0;i<datanum;i++){
                if(myedgesArray[i][0]==source && myedgesArray[i][1]==target){
                    alert("该边已存在，请重新输入！")
                }
            }
            $('#myBootstrapTtable').bootstrapTable('append', datas);
            nodeSet.add(source);
            nodeSet.add(target);
            myedges.add(myedge);
        }
    }
    for(let i=0; i<datanum; i++){   //添加样本超过10个时，table自动翻页
        if(datanum=10*i+1){
            $("#myBootstrapTtable").bootstrapTable('nextPage');
        }
    }
    //添加后清空input中的值
    $("#nodeSource").val("");
    $("#nodeTarget").val("");
    $("#weight").val("");
}
//source输入提示
function autoSource() {
    //getNodeData();
    getRelaxData();
    nodeList = Array.from(nodeSet);
    if($("#nodeSource").val() == ""){
        autoTips("sourceAuto","nodeSource",nodeList );
    }else{
        $("#nodeTarget").css("display", "block");
        $("#weight").css("display", "block");
    }
    if(nodeSet.size != 0){
        $("#targetAuto").css("display", "none");
        $("#nodeTarget").css("display", "none");
        $("#weight").css("display", "none")
    }
    document.onkeydown = function(e){
        var ev = document.all ? window.event : e;
        if(ev.keyCode == 13) {
            $("#nodeTarget").css("display", "block");
            $("#weight").css("display", "block");
            $("#sourceAuto").css("display", "none");
            $("#targetAuto").css("display", "none");
        }
    }
}
//target输入提示
function autoTarget() {
    //getNodeData();
    getRelaxData();
    nodeList = Array.from(nodeSet);
    autoTips("targetAuto","nodeTarget", nodeList);
    if(nodeSet.size != 0){
        $("#sourceAuto").css("display", "none");
        $("#weight").css("display", "none")
    }
}
let old_value = "";
let highlightindex = -1;   //高亮
//自动提示
function autoTips(auto, search, mynodes) {
    if ($("#" + search).val() != old_value || old_value == "") {
        var autoNode = $("#" + auto);   //缓存对象（弹出框）
        var carlist = new Array();
        var n = 0;
        old_value = $("#" + search).val();
        for (i in mynodes) {
            if (mynodes[i].indexOf(old_value) >= 0) {
                carlist[n++] = mynodes[i];
            }
        }
        if (carlist.length == 0) {
            autoNode.hide();
            return;
        }
        autoNode.empty();  //清空上次的记录
        for (i in carlist) {
            var wordNode = carlist[i];   //弹出框里的每一条内容
            var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
            newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer;");
            newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框
            //鼠标移入高亮，移开不高亮
            newDivNode.mouseover(function () {
                if (highlightindex != -1) {        //原来高亮的节点要取消高亮（是-1就不需要了）
                    autoNode.children("div").eq(highlightindex).css("background-color", "white");
                }
                //记录新的高亮节点索引
                highlightindex = $(this).attr("id");
                $(this).css("background-color", "#ebebeb");
            });
            newDivNode.mouseout(function () {
                $(this).css("background-color", "white");
            });
            //鼠标点击文字上屏
            newDivNode.click(function () {
                //取出高亮节点的文本内容
                var comText = autoNode.hide().children("div").eq(highlightindex).text();
                highlightindex = -1;
                //文本框中的内容变成高亮节点的内容
                $("#" + search).val(comText);
                $("#nodeTarget").css("display", "block");
                $("#weight").css("display", "block");
            })
            if (carlist.length > 0) {    //如果返回值有内容就显示出来
                autoNode.show();
            } else {               //服务器端无内容返回 那么隐藏弹出框
                autoNode.hide();
                //弹出框隐藏的同时，高亮节点索引值也变成-1
                highlightindex = -1;
            }
        }
    }
    //点击页面隐藏自动补全提示框
    document.onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != search) {
            if ($("#" + auto).is(":visible")) {
                $("#" + auto).css("display", "none");
                $("#nodeTarget").css("display", "block"); //显示
                $("#weight").css("display", "block");
            }
        }
    }
}
//全局变量
let nodeMap = new Map(); //储存节点映射为数字的节点
let edgesMap = new Array();  //节点映射为数字后的边
//获取输入的表格数据并做映射处理
function getRelaxData() {
    let edgeData = $('#myBootstrapTtable').bootstrapTable('getData');
    var JsonDatas = eval(JSON.stringify(edgeData));
    let datanum = JsonDatas.length;

    myedges.clear();//先清空数据
    nodeSet.clear();//先清空数据

    nodeMap.clear();//先清空原映射数据
    edgesMap.splice(0,edgesMap.length); //先清空素组中原映射数据
    for(let i=0;i<datanum;i++){
        let source = JsonDatas[i].source;
        let target = JsonDatas[i].target;
        let weight = parseInt(JsonDatas[i].weight);
        myedge = [source,target,weight];
        myedges.add(myedge);
        nodeSet.add(source);
        nodeSet.add(target);

    }
    nodeList = Array.from(nodeSet);  //set转换为数组
    for(let i=0;i<nodeList.length;i++){
        nodeMap.set(nodeList[i],i); //映射
    }
    for(let i=0;i<datanum;i++){
        edgesMap[i] = [nodeMap.get(JsonDatas[i].source),nodeMap.get(JsonDatas[i].target),parseInt(JsonDatas[i].weight)];
    }
    console.log(myedges);
}