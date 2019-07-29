let numMap = new Array();

function showMatrix() {
    let edgesData = new Array();
    let datas = $('#myBootstrapTtable').bootstrapTable('getData');  //获取前台myedges数目
    let datanum =edgesData.length;  //获取前台myedges数目
    for(let i=0;i<datanum;i++){
        edgesData[i]=[datas[i].source,datas[i].target,datas[i].weight];
    }
    edgesMapToNum(edgesData);
    matrix(edgesData);
}

function matrix(edgesData) {
    let margin = {top: 80, right: 10, bottom: 50, left: 100},
        cellSize = 20;
        nodeNumber = nodeList.length;
        width = cellSize * nodeNumber;
        length = width;
        legendElementWidth = width/10,
        colorBuckets = 10,
        colors = ["#FFF","#40E0D0","#9370DB","#0000FF","#DA70D6","#FF4500","#00CED1","#696969","#00FF00","#0000FF"];
        nodeToNum = numMap;
        node = nodeList;
    const colorScale = d3.scale.quantile()
        .domain([0, 9])
        .range(colors);
    let svg = d3.select("#matrix").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    let rowSortOrder = false;
    let colSortOrder = false;
    let rowLabels = svg.append("g")
        .selectAll(".rowLabelg")
        .data(node)
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
        .attr("transform", "translate(-6," + cellSize / 1.5 + ")")
        .attr("class", function (d, i) {
            return "rowLabel mono r" + i;
        })
        .on("mouseover", function (d) {
            d3.select(this).classed("text-hover", true);
        })
        .on("mouseout", function (d) {
            d3.select(this).classed("text-hover", false);
        })
        .on("click", function (d, i) {
            rowSortOrder = !rowSortOrder;
            sortbylabel("r", i, rowSortOrder);
            d3.select("#order").property("selectedIndex", 4).node().focus();
            ;
        });

    let colLabels = svg.append("g")
        .selectAll(".colLabelg")
        .data(node)
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
        .attr("transform", "translate(" + cellSize / 2 + ",-6) rotate (-90)")
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
            colSortOrder = !colSortOrder;
            sortbylabel("c", i, colSortOrder);
            d3.select("#order").property("selectedIndex", 4).node().focus();;
        });

    let heatMap = svg.append("g").attr("class", "g3")
        .selectAll(".cellg")
        .data(edgesData, function (d, i) {
            return edgesData[i][0] + ":" + edgesData[i][1];
        })
        .enter()
        .append("rect")
        .attr("x", function (d, i) {
            return hccol.indexOf(edgesData[i][1]) * cellSize;
        })
        .attr("y", function (d, i) {
            return hcrow.indexOf(edgesData[i][0]) * cellSize;
        })
        .attr("class", function (d, i) {
            return "cell cell-border cr" + (edgesData[i][0] - 1) + " cc" + ((edgesData[i][1]) - 1);
        })
        .attr("width", cellSize)
        .attr("height", cellSize)
        .style("fill", function (d, i) {
            return colorScale((edgesData[i][2]));
        })

        .on("mouseover", function (d, i) {
            //highlight text
            d3.select(this).classed("cell-hover", true);
            d3.selectAll(".rowLabel").classed("text-highlight", function (r, ri) {
                return ri == edgesData[i][0];
            });
            d3.selectAll(".colLabel").classed("text-highlight", function (c, ci) {
                return ci == edgesData[i][1];
            });

            //Update the tooltip position and value
            d3.select("#tooltip")
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 10) + "px")
                .select("#value")
                .text("node:" + rowLabel[edgesData[i][0]] + "—>" + colLabel[edgesData[i][1]] + "\n " + "weight:" + edgesData[i][2] + "\n" + this.x.baseVal.value + ", " + this.y.baseVal.value);
            //Show the tooltip
            d3.select("#tooltip").classed("hidden", false);
        })
        .on("mouseout", function () {
            d3.select(this).classed("cell-hover", false);
            d3.selectAll(".rowLabel").classed("text-highlight", false);
            d3.selectAll(".colLabel").classed("text-highlight", false);
            d3.select("#tooltip").classed("hidden", true);
        });

    var legend = svg.selectAll(".legend")
        .data([0,1,2,3,4,5,6,7,8,9])
        .enter().append("g")
        .attr("class", "legend");

    legend.append("rect")
        .attr("x", function(d, i) { return legendElementWidth * i; })
        .attr("y", height+cellSize)
        .attr("width", legendElementWidth)
        .attr("height", cellSize*0.6)
        .style("fill", function(d, i) { return colors[i]; });

    legend.append("text")
        .attr("class", "mono")
        .text(function(d) { return d; })
        .attr("width", legendElementWidth)
        .attr("x", function(d, i) { return legendElementWidth * i; })
        .attr("y", height + (cellSize*2));

// Change ordering of cells

    function sortbylabel(rORc,i,sortOrder){
        var t = svg.transition().duration(3000);
        var log2r=[];
        var sorted; // sorted is zero-based index
        d3.selectAll(".c"+rORc+i)
            .filter(function(ce){
                log2r.push(ce.value);
            });
        if(rORc=="r"){ // sort log2ratio of a gene
            sorted=d3.range(col_number).sort(function(a,b){ if(sortOrder){ return log2r[b]-log2r[a];}else{ return log2r[a]-log2r[b];}});
            t.selectAll(".cell")
                .attr("x", function(d,i) { return sorted.indexOf(edgesMap[i][1]-1) * cellSize; });
            t.selectAll(".colLabel")
                .attr("y", function (d, i) { return sorted.indexOf(i) * cellSize; });
        }else{ // sort log2ratio of a contrast
            sorted=d3.range(row_number).sort(function(a,b){if(sortOrder){ return log2r[b]-log2r[a];}else{ return log2r[a]-log2r[b];}});
            t.selectAll(".cell")
                .attr("y", function(d) { return sorted.indexOf(edgesMap[i][0]-1) * cellSize; });
            t.selectAll(".rowLabel")
                .attr("y", function (d, i) { return sorted.indexOf(i) * cellSize; });
        }
    }

    d3.select("#order").on("change",function(){
        order(this.value);
    });

    function order(value){
        if(value=="hclust"){
            var t = svg.transition().duration(3000);
            t.selectAll(".cell")
                .attr("x", function(d,i) { return hccol.indexOf(edgesData[i][1]) * cellSize; })
                .attr("y", function(d,i) { return hcrow.indexOf(edgesData[i][0]) * cellSize; });

            t.selectAll(".rowLabel")
                .attr("y", function (d, i) { return hcrow.indexOf(i+1) * cellSize; });

            t.selectAll(".colLabel")
                .attr("y", function (d, i) { return hccol.indexOf(i+1) * cellSize; });

        }else if (value=="probecontrast"){
            var t = svg.transition().duration(3000);
            t.selectAll(".cell")
                .attr("x", function(d,i) { return edgesData[i][1] * cellSize; })
                .attr("y", function(d,i) { return edgesData[i][0] * cellSize; });

            t.selectAll(".rowLabel")
                .attr("y", function (d, i) { return i * cellSize; });

            t.selectAll(".colLabel")
                .attr("y", function (d, i) { return i * cellSize; });

        }else if (value=="probe"){
            var t = svg.transition().duration(3000);
            t.selectAll(".cell")
                .attr("y", function(d,i) { return edgesData[i][0] * cellSize; });

            t.selectAll(".rowLabel")
                .attr("y", function (d, i) { return i * cellSize; });
        }else if (value=="contrast"){
            var t = svg.transition().duration(3000);
            t.selectAll(".cell")
                .attr("x", function(d,i) { return edgesData[i][1] * cellSize; });
            t.selectAll(".colLabel")
                .attr("y", function (d, i) { return i * cellSize; });
        }
    }
    //
    var sa=d3.select(".g3")
        .on("mousedown", function() {
            if( !d3.event.altKey) {
                d3.selectAll(".cell-selected").classed("cell-selected",false);
                d3.selectAll(".rowLabel").classed("text-selected",false);
                d3.selectAll(".colLabel").classed("text-selected",false);
            }
            var p = d3.mouse(this);
            sa.append("rect")
                .attr({
                    rx      : 0,
                    ry      : 0,
                    class   : "selection",
                    x       : p[0],
                    y       : p[1],
                    width   : 1,
                    height  : 1
                })
        })
        .on("mousemove", function() {
            var s = sa.select("rect.selection");

            if(!s.empty()) {
                var p = d3.mouse(this),
                    d = {
                        x       : parseInt(s.attr("x"), 10),
                        y       : parseInt(s.attr("y"), 10),
                        width   : parseInt(s.attr("width"), 10),
                        height  : parseInt(s.attr("height"), 10)
                    },
                    move = {
                        x : p[0] - d.x,
                        y : p[1] - d.y
                    }
                ;

                if(move.x < 1 || (move.x*2<d.width)) {
                    d.x = p[0];
                    d.width -= move.x;
                } else {
                    d.width = move.x;
                }

                if(move.y < 1 || (move.y*2<d.height)) {
                    d.y = p[1];
                    d.height -= move.y;
                } else {
                    d.height = move.y;
                }
                s.attr(d);

                // deselect all temporary selected state objects
                d3.selectAll('.cell-selection.cell-selected').classed("cell-selected", false);
                d3.selectAll(".text-selection.text-selected").classed("text-selected",false);

                d3.selectAll('.cell').filter(function(cell_d, i) {
                    if(
                        !d3.select(this).classed("cell-selected") &&
                        // inner circle inside selection frame
                        (this.x.baseVal.value)+cellSize >= d.x && (this.x.baseVal.value)<=d.x+d.width &&
                        (this.y.baseVal.value)+cellSize >= d.y && (this.y.baseVal.value)<=d.y+d.height
                    ) {

                        d3.select(this)
                            .classed("cell-selection", true)
                            .classed("cell-selected", true);

                        d3.select(".r"+(cell_d.row-1))
                            .classed("text-selection",true)
                            .classed("text-selected",true);

                        d3.select(".c"+(cell_d.col-1))
                            .classed("text-selection",true)
                            .classed("text-selected",true);
                    }
                });
            }
        })
        .on("mouseup", function() {
            // remove selection frame
            sa.selectAll("rect.selection").remove();

            // remove temporary selection marker class
            d3.selectAll('.cell-selection').classed("cell-selection", false);
            d3.selectAll(".text-selection").classed("text-selection",false);
        })
        .on("mouseout", function() {
            if(d3.event.relatedTarget.tagName=='html') {
                // remove selection frame
                sa.selectAll("rect.selection").remove();
                // remove temporary selection marker class
                d3.selectAll('.cell-selection').classed("cell-selection", false);
                d3.selectAll(".rowLabel").classed("text-selected",false);
                d3.selectAll(".colLabel").classed("text-selected",false);
            }
        });
}

function edgesMapToNum(edgesData) {
    for(let i=0;i<edgesData.length;i++){
        nodeSet.add(edgesData[i][0]);
        nodeSet.add(edgesData[i][1]);
    }
    nodeList = Array.from(nodeSet);
    for(let i=0;i<nodeList.length;i++){
        nodeMap.set(nodeList[i],i); //节点映射
        numMap[i]=nodeMap.get(nodeList[i]);
    }
    for(let i=0;i<edgesData.length;i++){
        edgesMap[i] = [nodeMap.get(edgesData[i][0]),nodeMap.get(edgesData[i][1]),edgesData[i][2]];
    }
}




