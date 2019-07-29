package xjtu.service.graph;

import gnu.trove.list.array.TIntArrayList;
import gnu.trove.map.hash.TIntIntHashMap;
import xjtu.service.sparseMatrix.SparseIntMatrix;

import java.util.Set;

public class DirectedGraphBuilder {
    private SparseIntMatrix matrix;
    private TIntArrayList[] adjList;
    private int[] inDegrees;
    private int[] outDegrees;
    private int order=0;
    private int sizeD=0;
    private int layer=0;

    public DirectedGraph fromMatrix(int[][] data){
        if(data[0].length != data.length) return null;

        order = data.length;
        initialise();
        int weight=0;

        for(int n1=0;n1<order;n1++){
            for (int n2=0;n2<order;n2++){
                weight = data[n1][n2];
                if(matrix.get(n1,n2) != 0) throw new Error("duplicate val at"+n1+""+n2);
                if(weight !=0) insertEdgeSym(n1,n2,weight);
            }
        }
        return build();
    }

    public DirectedGraph fromEdges(int[][] edges){
        order = getOrder(edges);
        initialise();
        for(int i=0;i<edges.length;i++){
            int n1 = edges[i][0];
            int n2 = edges[i][1];
            int weight =edges[i][2];
            if (matrix.get(n1, n2) == 0) insertEdgeSym(n1, n2, weight);
        }
        return build();
    }

    public int getOrder(int[][] edges){
        int max =0;
        for(int i=0;i<edges.length;i++){
            int n1 = edges[i][0];
            int n2 = edges[i][1];
            if(n1>max) max = n1;
            if(n2 >max) max = n2;
        }
        max ++;
        return max;
    }

    private void initialise(){
        matrix = new SparseIntMatrix(order);
        inDegrees= new int[order];
        outDegrees=new int[order];
        adjList=new TIntArrayList[order];
        for(int i=0;i<order;i++){
            adjList[i]=new TIntArrayList();
        }
    }

    private void insertEdgeSym(int n1,int n2,int weight){
        insertEdge(n1,n2,weight);
    }

    public void insertEdge(int n1,int n2,int weight){
        matrix.set(n1,n2,weight);
        adjList[n1].add(n2);
        outDegrees[n1] +=weight;
        inDegrees[n2] +=weight;
        sizeD += weight;
    }

    public DirectedGraphBuilder setSize(int order){
        this.order=order;
        initialise();
        return this;
    }

    public DirectedGraphBuilder addEdge(int n1,int n2,int weight){
        if(n1 >= order) throw new Error(""+ n1 +">="+ order);
        if(n2 >= order) throw new Error(""+ n2 +">="+ order);
        if(matrix.get(n1,n2) != 0) throw new Error("already exists");
        if(matrix == null) throw new Error("initialise first");
        insertEdgeSym(n1,n2,weight);
        return this;
    }

    public DirectedGraph coarseGrain(DirectedGraph graph, TIntIntHashMap map){
        this.order = graph.getPartitioning().getNumComms();
        this.layer=graph.getLayer()+1;
        initialise();
        int sum =0;
        for(SparseIntMatrix.Iterator iterator=graph.getPartitioning().commWeightIterator();iterator.hasNext();){
            iterator.advance();
            int weight = iterator.value();
            if(weight != 0){
                int n1 = map.get(iterator.x());
                int n2 = map.get(iterator.y());
                insertEdge(n1,n2,weight);
                sum += weight;
            }
        }
        return build();
    }

    public DirectedGraph build(){
        return new DirectedGraph(this);
    }

    public SparseIntMatrix getMatrix() {
        return matrix;
    }

    public TIntArrayList[] getAdjList() {
        return adjList;
    }

    public int[] getInDegrees() {
        return inDegrees;
    }

    public int[] getOutDegrees() {
        return outDegrees;
    }

    public int getOrder() {
        return order;
    }

    public int getSizeD() {
        return sizeD;
    }

    public int getLayer() {
        return layer;
    }
}
