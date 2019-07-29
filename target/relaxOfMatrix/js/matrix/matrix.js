let matrix ;
//定义一个Matrix类
class Matrix{
    constructor(id,nodeSet,nodeList,nodeMap,edgesMap){
        this.numMap = new Array();
        this.nodeSet = nodeSet;
        this.nodeList = nodeList;
        this.nodeMap = nodeMap;
        this.edgesMap = edgesMap;
        this.datanum = $('#myBootstrapTtable').bootstrapTable('getData').length;  //获取前台myedges数目
        this.row = new Array();
        this.col = new Array();
        this.value = new Array();
        for(let i=0;i<this.datanum;i++){
            this.row[i] = edgesMap[i][0];
            this.col[i] = edgesMap[i][1];
            this.value[i] = edgesMap[i][2];
        }
        this.nodeList = Array.from(nodeSet);
        for(let i=0;i<nodeList.length;i++){
            this.numMap[i]=this.nodeMap.get(nodeList[i]);
        }
        console.log(this.numMap);

        this.margin = {top: 100, right: 10, bottom: 80, left: 100},
            this.cellSize =20;
        this.col_number = nodeList.length;
        this.row_number = nodeList.length;
        this.width = this.cellSize * this.col_number;
        this.height =this.cellSize * this.row_number;
        this.legendElementWidth = this.width/10,
            this.colorBuckets = 10,
            this.colors = ["#FFF","#40E0D0","#9370DB","#0000FF","#DA70D6","#266f8e","#00CED1","#696969","#00FF00","#ff2d14"];
        this.hcrow = d3.shuffle(this.numMap);
        this.hccol = this.hcrow;
        this.rowLabel = nodeList;
        this.colLabel = nodeList;
        this.id = id;
        this.svg = d3.select("#matrix").append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
    }
    //绘制矩阵
    drawMatrix(){
        $('svg').remove();
        const colorScale = d3.scale.quantile()
            .domain([0, 9])
            .range(this.colors);

        this.svg = d3.select(this.id).append("svg")
            .attr("width", this.width + this.margin.left + this.margin.right)
            .attr("height", this.height + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

        const hcrow = this.hcrow,
            cellSize = this.cellSize,
            hccol = this.hccol
        this.rowLabels = this.svg.append("g")
            .selectAll(".rowLabelg")
            .data(this.rowLabel)
            .enter()
            .append("text")
            .text(function (d) {
                return d;
            })
            .attr("x", 0)
            .attr("y", function (d, i) {
                return hcrow.indexOf(i) * cellSize;
            })
            .style("text-anchor", "end")
            .attr("transform", "translate(-6," + this.cellSize / 1.5 + ")")
            .attr("class", function (d, i) {
                return "rowLabel mono r" + i;
            })
            .on("mouseover", function () {
                d3.select(this).classed("text-hover", true);
            })
            .on("mouseout", function () {
                d3.select(this).classed("text-hover", false);
            })
            .on("click", function () {
                d3.select("#order").property("selectedIndex", 2).node().focus();
            });

        this.colLabels = this.svg.append("g")
            .selectAll(".colLabelg")
            .data(this.colLabel)
            .enter()
            .append("text")
            .text(function (d) {
                return d;
            })
            .attr("x", 0)
            .attr("y", function (d, i) {
                return hccol.indexOf(i) * cellSize;
            })
            .style("text-anchor", "left")
            .attr("transform", "translate(" + this.cellSize / 1.5 + ",-6) rotate (-90)")
            .attr("class", function (d, i) {
                return "colLabel mono c" + i;
            })
            .on("mouseover", function (d) {
                d3.select(this).classed("text-hover", true);
            })
            .on("mouseout", function (d) {
                d3.select(this).classed("text-hover", false);
            })
            .on("click", function (d, i) {
                d3.select("#order").property("selectedIndex", 2).node().focus();
            });

        const edgesMap = this.edgesMap,
            rowLabel = this.rowLabel,
            colLabel = this.colLabel
        this.matrix = this.svg.append("g").attr("class", "g3")
            .selectAll(".cellg")
            .data(this.edgesMap, function (d, i) {
                return edgesMap[i][0] + ":" + edgesMap[i][1];
            })
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
                return hccol.indexOf(edgesMap[i][1]) * cellSize;
            })
            .attr("y", function (d, i) {
                return hcrow.indexOf(edgesMap[i][0]) * cellSize;
            })
            .attr("class", function (d, i) {
                return "cell cell-border cr" + (edgesMap[i][0]) + " cc" + ((edgesMap[i][1]));
            })
            .attr("width", this.cellSize)
            .attr("height", this.cellSize)
            .style("fill", function (d, i) {
                return colorScale((edgesMap[i][2]));
            })
            .on("mouseover", function (d, i) {
                //highlight text
                d3.select(this).classed("cell-hover", true);
                d3.selectAll(".rowLabel").classed("text-highlight", function (r, ri) {
                    return ri == edgesMap[i][0];
                });
                d3.selectAll(".colLabel").classed("text-highlight", function (c, ci) {
                    return ci == edgesMap[i][1];
                });

                //Update the tooltip position and value
                d3.select("#tooltip")
                    .style("left", (d3.event.pageX - 190) + "px")
                    .style("top", (d3.event.pageY - 150) + "px")
                    .select("#value")
                    .text("Source:" + rowLabel[edgesMap[i][0]] + "—>" + "Source:" + colLabel[edgesMap[i][1]] + "\n" + "weight:" + edgesMap[i][2] + "\n" + "Position:" + this.y.baseVal.value / 20 + "Row" + ", " + this.x.baseVal.value / 20 + "Col");
                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function () {
                d3.select(this).classed("cell-hover", false);
                d3.selectAll(".rowLabel").classed("text-highlight", false);
                d3.selectAll(".colLabel").classed("text-highlight", false);
                d3.select("#tooltip").classed("hidden", true);
            });

        const legend = this.svg.selectAll(".legend")
            .data([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
            .enter().append("g")
            .attr("class", "legend");

        const  colors = this.colors,
            legendElementWidth = this.legendElementWidth;
        legend.append("rect")
            .attr("x", function(d, i) { return legendElementWidth * i; })
            .attr("y", this.height+0.6*this.cellSize)
            .attr("width", this.legendElementWidth)
            .attr("height", this.cellSize*0.6)
            .style("fill", function(d, i) { return colors[i]; });

        legend.append("text")
            .attr("class", "mono")
            .text(function(d) { return d; })
            .attr("width", this.legendElementWidth)
            .attr("x", function(d, i) { return legendElementWidth * (i+0.4); })
            .attr("y", this.height + (this.cellSize*2));
        this.legend = legend;
        const matrix = this;
        // Change ordering of cells
        $("#order").on("change",function(){
            matrix.order(this.value);
        });
    }
    //排序
    sort(s){
        let t = this.svg.transition().duration(3000);
        const edgesMap = this.edgesMap,
            cellSize = this.cellSize;
        t.selectAll(".cell")
            .attr("x", function(d,i) { return s.indexOf(edgesMap[i][1]) * cellSize; })
            .attr("y", function(d,i) { return s.indexOf(edgesMap[i][0]) * cellSize; });

        t.selectAll(".rowLabel")
            .attr("y", function (d, i) { return s.indexOf(i) * cellSize; });

        t.selectAll(".colLabel")
            .attr("y", function (d, i) { return s.indexOf(i) * cellSize; });
    }
    //聚类树
   /* tree(data){
        $('svg').remove();
        let nodenum = new Array();
        this.tree = this.svg.append("g").attr("class", "g3")
            .selectAll(".cellg")
            .data(data)
            .enter()
            .append("line")
            .attr("x", function (i,j) {
                for(i=0;i<data[i];i++){
                    for(j=0;j<data[i][j];j++){
                        if(j==0){
                            return 20;
                        }else if(){

                        }
                    }
                }
                return ;
            })
            .attr("y", function (d, i) {
                return hcrow.indexOf(edgesMap[i][0]) * cellSize;
            })
            .attr("class", function (d, i) {
                return "cell cell-border cr" + (edgesMap[i][0]) + " cc" + ((edgesMap[i][1]));
            })
            .attr("width", this.cellSize)
            .attr("height", this.cellSize)
            .style("fill", function (d, i) {
                return colorScale((edgesMap[i][2]));
            })
    }*/
}

//显示关系矩阵
function showMatrix() {
    if (projectId === 0){ //如果没有选择项目弹出提示并隐藏矩阵div
        alert('请选择项目并输入边');
        $("#matrix").style.display = "none";
    }
    $("canvas").remove(); //重新绘制前删除原有svg
    //$("svg").remove(); //重新绘制前删除原有svg
    getRelaxData(); //获取数据并将节点映射为数字，与传入后台一致
    frequency();
   matrix = new Matrix("#matrix",nodeSet,nodeList,nodeMap,edgesMap);//new一个Matrix类
    matrix.drawMatrix(); //绘制矩阵

   /* drawGraph(nodeList,edgesMap);*/

}

//绘制图
function drawGraph(nodes,edges) {
    console.log(nodes);
    console.log(edges);
    let marge = {top: 60, bottom: 60, left: 60, right: 60};
    let svg = d3.select("#graph").select("svg");
    let width = svg.attr("width");
    let height = svg.attr("height");
    let g = svg.append("g").attr("transform", "translate(" + marge.top + "," + marge.left + ")");

    //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
    const colorScale = d3.scaleOrdinal()
        .domain(d3.range(nodes.length))
        .range(d3.schemeCategory10);
    const edgesColor = ["#18a603","#ff3111","#767676","#d5fff5"]
    //新建一个力导向图
    const forceSimulation = d3.forceSimulation()
        .force("link", d3.forceLink())
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter());

    //初始化力导向图，也就是传入数据
    //生成节点数据
    forceSimulation.nodes(nodes)
        .on("tick",ticked);//这个函数很重要，后面给出具体实现和说明
    //生成边数据
    forceSimulation.force("link")
        .links(edges)
        .distance(function(d){//每一边的长度
            return (10-d.relation)*50;
        })
    //设置图形的中心位置
    forceSimulation.force("center")
        .x(width/2)
        .y(height/2);
    //在浏览器的控制台输出
    /*    console.log(nodes);
        console.log(edges);*/

    //定义边箭头
    svg.append("svg:defs")
        .append("svg:marker")
        .attr("id", "marker")
        .attr('viewBox', '0 -5 10 10')
        .attr("refX", 20)
        .attr("refY",0)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
        .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr("fill", function (d, i) {
            return colorScale(i);
        });

    //有了节点和边的数据后，我们开始绘制
    //绘制边
    let links = g.append("g")
        .selectAll("line")
        .data(edges)
        .enter()
        .append("line")
        .attr("stroke", function (d, i) {
            return colorScale(i);
        })
        /* .attr("stroke-dasharray",5)*/
        .attr("stroke-width", 4)
        .on("mouseover", function () {
            d3.select(this).attr("stroke-width", 8)/*.attr("stroke", "black")*/
        })
        .on("mouseout", function () {
            d3.select(this).attr("stroke-width", 4).attr("stroke", function (d, i) {
                return colorScale(i);
            })
        })
        .attr("marker-end","url(#marker)");
    /*    edges.forEach(function (e) {
            if(e.effect == "非有用作用"){
                links.attr("stroke-dasharray",5);
            }else {
                links.attr("stroke-dasharray",0);
            }
        })*/

    let linksText = g.append("g")
        .selectAll("text")
        .data(edges)
        .enter()
        .append("text")
        .text(function (d) {
            return d.relation;
        });

    //绘制节点
    //先为节点和节点上的文字分组
    let gs = g.selectAll(".circleText")
        .data(nodes)
        .enter()
        .append("g")
        .attr("transform", function (d, i) {
            var cirX = d.x;
            var cirY = d.y;
            return "translate(" + cirX + "," + cirY + ")";
        })
        .call(d3.drag()
            .on("start", started)
            .on("drag", dragged)
            .on("end", ended)
        );

    //绘制节点
    gs.append("circle")
        .attr("r",15)
        .attr("fill",function(d,i){
            return colorScale(i);
        })
        .on("mouseover",function () {
            d3.select(this).attr("r",20);
        })
        .on("mouseout",function () {
            d3.select(this).attr("r",15);
        })
    //文字
    gs.append("text")
        .attr("x",-15)
        .attr("y",-25)
        .attr("dy",10)
        .text(function(d){
            return d.name;
        })

    function ticked(){
        links.attr("x1",function(d){return d.source.x;})
            .attr("y1",function(d){return d.source.y;})
            .attr("x2",function(d){return d.target.x;})
            .attr("y2",function(d){return d.target.y;});

        linksText
            .attr("x",function(d){
                return (d.source.x+d.target.x)/2;
            })
            .attr("y",function(d){
                return (d.source.y+d.target.y)/2;
            });

        gs.attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    }
    function started(d){
        if(!d3.event.active){
            forceSimulation.alphaTarget(0.8).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    }
    function dragged(d){
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }
    function ended(d){
        if(!d3.event.active){
            forceSimulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
    }
}

//绘制聚类树
function tree(width,height,data) {

}

//聚类
function clusterMatrix(){
    //获取数据并把边节点映射数字处理
    getRelaxData();
    if (edgesMap.length == 0){
        alert("请输入边数据!!!")
    } else {
        let relaxString = JSON.stringify(edgesMap);
        console.log(relaxString);
        //把数据传后台以及返回聚类数据
        $.ajax({  //把数据post后台
            type: "POST",
            url: "index/requestAndResponse",//http://localhost:8080/relaxOfMatrix/
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            data:relaxString, //发送请求的数据在request payload3
            success: function (list) {  //返回结果数据
                console.log("接收成功");
                //console.log(list);
                let clusterSorted = new Array();
                let layerDepth = 0;
                //let clusterTree = new Array();
                for(let i=0;i<list.length;i++){
                    for(let key in list[i] ){
                        //clusterTree[i][layerDepth] = list[i][key];
                        layerDepth++;
                    }
                    clusterSorted[i]=list[i].layer0;
                }
                console.log(clusterSorted);
                matrix.sort(clusterSorted)
            },
            error: function (textStatus) {
                console.log(textStatus);
            }
        });
    }
}

//按节点出现次数排序
function frequency(){
    let frequency = new Array();
    let outDegree = new Array();
    let inDegree = new Array();
    let degree = new Array();
    let tot = 0;
    for(let t =0;t<edgesMap.length;t++){
        tot += edgesMap[t][2];
    }
    for(let i=0;i<nodeList.length;i++){
        outDegree[nodeMap.get(nodeList[i])] = 0;
        inDegree[nodeMap.get(nodeList[i])] = 0;
        for(let j=0;j<edgesMap.length;j++){
            if(nodeMap.get(nodeList[i]) == edgesMap[j][0]){
                outDegree[nodeMap.get(nodeList[i])] += edgesMap[j][2];
            }else if(nodeMap.get(nodeList[i]) == edgesMap[j][1]){
                inDegree[nodeMap.get(nodeList[i])] += edgesMap[j][2]
            }
        }
        degree[nodeMap.get(nodeList[i])] = outDegree[nodeMap.get(nodeList[i])] + inDegree[nodeMap.get(nodeList[i])];
        frequency[nodeMap.get(nodeList[i])] = degree[nodeMap.get(nodeList[i])]/tot;
    }
    f = d3.range(nodeList.length).sort(function (a,b) {
        return frequency[b]-frequency[a];
    });
    //console.log(frequency);
    //console.log(f);
    //matrix.sort(f)
}