var projectId = 0;//项目Id
var projectName;//项目名
var appResult = null;//word报告
var appNameChinese = '关系矩阵';//app中文名（必填）
var USER_NAME = '';//当前登录用户名

// 添加项目后，自定义操作
function addSelfDefine(result) {
    $("#myBootstrapTtable").bootstrapTable('removeAll'); //添加项目后，删除原table
    console.log("add project successful");
}

// 查看项目后，自定义操作
function checkSelfDefine(node, result) {
    // 上一层函数查看basicAction.js中checkProject()函数
    $("#myBootstrapTtable").bootstrapTable('removeAll'); //查看时，删除原tabl
    $("canvas").remove(); //重新绘制前删除原有svg
    if(result.state && result.content.appContent != ""){
        let json = eval(result.content.appContent);
        console.log(json);
        let datanum = json.length;
        for(let i=0; i<datanum; i++){
            let source = json[i].source;
            let target = json[i].target;
            let weight = json[i].weight;
            let edges = {
                procedureIdForDelete: datanum + 1,
                source,
                target,
                weight
            };
            $('#myBootstrapTtable').bootstrapTable('append', edges);
        }
        console.log("check project successful");
    }else {
        console.log(result.error);
    }
}

//删除项目后，自定义操作
function removeSelfDefine(result) {
    // 上一层函数查看basicAction.js中removeProject()函数
    /*
    * your code.....
    **/
    console.log("remove project successful");
}

//定制初始化内容
function setCustomContext() {

    $("#WYeditor").html("");   //加载前先清空
    var title = "关系矩阵APP分析结果";
    var chap1 = "计算结果";
    var myconclusion=$("#td9").html();
    title = "<h2>1 " + title + "</h2>";
    chap1 = "<h3>1.1 " + chap1 + "</h3>";
    chap2 = "<h3>1.2  结论： <br>" + myconclusion + "</h3>";
    canvg();  //将SVG格式的图片转化成canvas格式
    var canv0 = document.getElementsByTagName("canvas")[0];

    var image0 = new Image();

    if (canv0 != null) {
        image0.src = canv0.toDataURL("image/png");
    }

    var editor = $("#WYeditor");
    editor.append(title,chap1,image0,chap2);

    // canvas图片获取方式
    /*var img = $("#canvas")[0];  //选择页面中的img元素
    var image = new Image();
    if (img != null) {
        image.src = img.toDataURL("image/png");
    }
    var img1 = image;
    // 其他示例
    var img2 = $("#matrix");  //选择页面中的img元素
    var wordImgArr = [img1, img2];//定义图片数组
    var customText = {//word编辑区自定义文本内容
        'title': "<h2>1 **App分析结果 </h2>",
        'chap1': "<h3>1.1 *******</h3>",
        'img1': wordImgArr[0],
        'chap2': "<h3>1.2 *******</h3>",
        'img2': wordImgArr[1],
        'chap3': "<h3>1.3 结论****</h3>"
    };
    for (var variable in customText) {//遍历自定义文本对象
        $("#WYeditor").append(customText[variable]);//插入元素
    }*/
}