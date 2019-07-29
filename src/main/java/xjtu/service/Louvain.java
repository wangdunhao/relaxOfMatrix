package xjtu.service;

import org.springframework.stereotype.Service;
import xjtu.service.clustring.DirectedLouvain;
import xjtu.service.clustring.LayeredCommunityStructure;
import xjtu.service.graph.DirectedGraph;
import xjtu.service.graph.DirectedGraphBuilder;

import java.util.*;

@Service
public class Louvain {
    public List<Map<String,Integer>>  start(String [][] data) {
        int[][] matrixData=new int[data.length][data[0].length];
        for(int i=0;i<data.length;i++){
            for(int j=0;j<data[i].length;j++){
                matrixData[i][j]=Integer.valueOf(data[i][j]);
                System.out.print(matrixData[i][j]);
            }
        }
        System.out.println();
        System.out.println("开始执行Louvain算法");

        return doLouvain(matrixData);
    }
    public List<Map<String,Integer>>  doLouvain(int[][] data){
        List<Map<String,Integer>> clusterdata = new ArrayList<>();
        DirectedGraph graph=new DirectedGraphBuilder().fromEdges(data);
        DirectedLouvain louvainDetector=new DirectedLouvain(graph);
        LayeredCommunityStructure lcs=new LayeredCommunityStructure(louvainDetector.run());

        int order=graph.getOrder();

        List<int[]> communities=louvainDetector.getCommunities();
        for(int node=0;node<order;node++){
            Map<String,Integer> map = new HashMap<>();
            map.put("layer0",node);
            for(int layer=0;layer<lcs.layers();layer++){
                int t = layer+1;
                map.put("layer"+t,communities.get(layer)[node]);
            }
            clusterdata.add(map);
        }
        System.out.println("before:");
        System.out.println(clusterdata);
        clusterdata=sort(clusterdata);
        System.out.println("after:");
        System.out.println(clusterdata);

        return clusterdata;
    }
    //按照聚类结果进行约束排序
    public List<Map<String,Integer>> sort(List<Map<String,Integer>> list){
        int maxLayerNum = 0;
        for(String key:list.get(0).keySet()){
            int num = Integer.parseInt(key.substring(5));
            maxLayerNum = num > maxLayerNum ? num : maxLayerNum;
        }
        //int maxLayerUnitsNum=0;
        List<Integer> maxLayerUnits=new ArrayList<>();
        for(Map<String,Integer> map:list){
            Integer clazzValue=map.get("layer"+maxLayerNum);
            if(!maxLayerUnits.contains(clazzValue)) {
                maxLayerUnits.add(clazzValue);
            }
        }
       /* int maxLayerUnitsNum=maxLayerUnits.size();
        int count=0;*/
        List<Map<String,Integer>> finalList=new ArrayList<>();
        for(Integer unitValue:maxLayerUnits){
            //存放符合unitValue类别的节点
            List<Map<String,Integer>> tmpList=new ArrayList<>();
            //遍历所有节点，找出符合unitValue的节点放入子桶中
            for(Map<String,Integer> node:list){
                if(node.get("layer"+maxLayerNum).equals(unitValue)){
                    tmpList.add(node);
                }
            }
            finalList.addAll(tmpList);
        }
        maxLayerNum--;
        while(maxLayerNum>0){
            //清空上一次排序7用到的标签
            maxLayerUnits.clear();
            //重新统计
            for(Map<String,Integer> map:finalList){
                Integer clazzValue=map.get("layer"+maxLayerNum);
                if(!maxLayerUnits.contains(clazzValue)) {
                    maxLayerUnits.add(clazzValue);
                }
            }
            finalList.clear();
            //遍历所有的节点，按标签放入桶中并合并
            for(Integer unitValue:maxLayerUnits){
                //存放符合unitValue类别的节点
                List<Map<String,Integer>> tmpList=new ArrayList<>();
                //遍历所有节点，找出符合unitValue的节点放入子桶中
                for(Map<String,Integer> node:list){
                    if(node.get("layer"+maxLayerNum).equals(unitValue)){
                        tmpList.add(node);
                    }
                }
                finalList.addAll(tmpList);
            }
            maxLayerNum--;
        }
        return finalList;
    }

}
