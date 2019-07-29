d3.json("data.json").then(function(dataJson){
    //GroupExplorer constructing function
    //this is one way to create a javascript object
    function GroupExplorer(data){
        //create an object-include some data
        //this is an another way to create a javascript object
        var defaultConfig = {
            data:{"nodes":[],"links":[]},//critical data set
            windowWidth:800,//window.innerWidth
            windowHeight:550,//window.innerHeight-300
            defaultLinkDistance:150
        }
        //because the initial "data" is null,
        //so you need use jquery syntax "extend" to merge the json data
        //below,merge "data" into "defaultWindow"
        //"true" mean do not cover
        //details see jquery API document
        $.extend(true,defaultConfig,data);
        //so now we get the json file that we need
        //now let`s begin,transform json file to force graph data
        //but first ,we need to get "svg"
        var svg = d3.select("svg");
        svg.attr("width",defaultConfig.windowWidth);
        svg.attr("height",defaultConfig.windowHeight);
        defaultConfig.data.links.forEach(function(e){
            if(typeof e.source=="number"&&typeof e.target=="number"){
                var sourceNode = defaultConfig.data.nodes.filter(function(n){
                    return n.id === e.source;
                })[0];
                var targetNode = defaultConfig.data.nodes.filter(function(n){
                    return n.id === e.target;
                })[0];
                e.source = sourceNode;
                e.target = targetNode;
            }
        });
        //设置一个color的颜色比例尺，为了让不同的扇形呈现不同的颜色
        var colorScale = d3.scaleOrdinal()
            .domain(d3.range(defaultConfig.data.nodes.length))
            .range(d3.schemeCategory10);
        //create a force graph
        var forceSimulation = d3.forceSimulation()
            .force("link",d3.forceLink())
            .force("charge",d3.forceManyBody())
            .force("center",d3.forceCenter(defaultConfig.windowWidth/2,defaultConfig.windowHeight/2));
        //transform nodes data
        forceSimulation.nodes(defaultConfig.data.nodes)
            .on("tick",ticked);
        //tranform links data
        forceSimulation.force("link")
            .links(defaultConfig.data.links)
            .distance(defaultConfig.defaultLinkDistance);
        console.log(defaultConfig.data.nodes);
        console.log(defaultConfig.data.links);
        //define arrow
        svg.append("svg:defs")
            .append("svg:marker")
            .attr("id", "marker")
            .attr('viewBox', '0 -5 10 10')
            .attr("refX", 20)
            .attr("refY",0)
            .attr('markerWidth', 10)
            .attr('markerHeight', 10)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5')
            .attr("fill",function(d,i){
                return colorScale(i);
            });
        //draw links
        var links = svg.append("g")
            .selectAll("line")
            .data(defaultConfig.data.links)
            .enter()
            .append("line")
            .attr("x1",function(n){return n.source.x})
            .attr("y1",function(n){return n.source.y})
            .attr("x2",function(n){return n.target.x})
            .attr("y2",function(n){return n.target.y})
            .attr("stroke",function(d,i){
                return colorScale(i);
            })
            .attr("stroke-width",1)
            .attr("marker-end","url(#marker)");
        //draw links-text
        var links_text = svg.append("g")
            .selectAll("text")
            .data(defaultConfig.data.links)
            .enter()
            .append("text")
            .attr("x",function(e){
                return (e.source.x+e.target.x)/2;
            })
            .attr("y",function(e){
                console.log(e.source.y+"+"+e.target.y)
                return (e.source.y+e.target.y)/2;
            })
            .attr("font-size",10)
            .text(function(e){return e.type});
        //draw nodes group = node+node-text
        var nodes_g = svg.append("g")
            .selectAll("g")
            .data(defaultConfig.data.nodes)
            .enter()
            .append("g")
            .attr("transform",function(e){
                return "translate("+e.x+","+e.y+")";
            })
            .call(d3.drag()
                .on("start",started)
                .on("drag",dragged)
                .on("end",ended));
        //draw nodes
        nodes_g.append("circle")
            .attr("r",10)
            .attr("fill",function(d,i){
                return colorScale(i);
            })
        //   .attr("fill","blue");
        //draw node-text
        nodes_g.append("text")
            .attr("x",-15)
            .attr("y",20)
            .attr("font-size",10)
            .text(function(e){return e.name});
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
        function ended(d) {
            if(!d3.event.active){
                forceSimulation.alphaTarget(0);
            }
            d.fx = null;
            d.fy = null;
        }
        function ticked(){
            links
                .attr("x1",function(n){return n.source.x})
                .attr("y1",function(n){return n.source.y})
                .attr("x2",function(n){return n.target.x})
                .attr("y2",function(n){return n.target.y})
            links_text
                .attr("x",function(e){
                    return (e.source.x+e.target.x)/2;
                })
                .attr("y",function(e){
                    return (e.source.y+e.target.y)/2;
                })
            nodes_g
                .attr("transform",function(e){
                    return "translate("+e.x+","+e.y+")";
                })
        }
    }
    //because in the way of creating a javascript object,
    //you need to use "new" to use it
    new GroupExplorer({data:dataJson});
})