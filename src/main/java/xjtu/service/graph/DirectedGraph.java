package xjtu.service.graph;

import gnu.trove.list.array.TIntArrayList;
import xjtu.service.sparseMatrix.SparseIntMatrix;

public class DirectedGraph {
    private final SparseIntMatrix matrix;
    private TIntArrayList[] adjList;
    private int layer;

    private int[] inDegrees;//degree of each node which in
    private int[] outDegrees;//degree of each node which out

    private int order;//no.of nodes
    private int size;//sum of edge weights
    private int m;
    private final Partitioning partitioning;

    public DirectedGraph(DirectedGraphBuilder builder){
        matrix =builder.getMatrix();
        adjList=builder.getAdjList();
        inDegrees=builder.getInDegrees();
        outDegrees=builder.getOutDegrees();
        order=builder.getOrder();
        size=builder.getSizeD();
        m=builder.getSizeD();
        layer=builder.getLayer();

        partitioning=new Partitioning();

    }
    public class Partitioning{
        private SparseIntMatrix cmatrix;   // weights between communities
        private int numComms;              // total no. of communities
        private int[] communities;         // comm of each node
        private int[] totDegreesIn;          // total degree of community
        private int[] totDegreesOut;
        private int[] totDegrees;
        private int[] intDegrees;          // int. degree of community

        public Partitioning(){
            cmatrix=new SparseIntMatrix(matrix);
            communities=new int[order];
            totDegreesIn=new int[order];
            totDegreesOut=new int[order];
            totDegrees=new int[order];
            intDegrees=new int[order];
            numComms=order;

            for(int i=0;i<order;i++){
                communities[i]=i;

                totDegreesIn[i] =  inDegree(i);
                totDegreesOut[i] =  outDegree(i);
                totDegrees[i]= inDegree(i)+outDegree(i);

                intDegrees[i]=matrix.get(i,i);// catches self-edges
            }
        }

        public void moveToComm(int node,int newComm){
            rangeCheck(node);
            rangeCheck(newComm);

            int oldComm=community(node);
            double oldTotDegree=totDegree(oldComm);
            double oldNewToDegeree=totDegree(newComm);
            if(oldComm==newComm) return;

            communities[node]=newComm;

            totDegreesIn[oldComm] -= inDegree(node);
            totDegreesIn[newComm] += inDegree(node);
            totDegreesOut[oldComm] -=outDegree(node);
            totDegreesOut[newComm] +=outDegree(node);

            totDegrees[oldComm] -=(inDegree(node)+outDegree(node));
            totDegrees[newComm] +=(inDegree(node)+outDegree(node));

            TIntArrayList neighbours = neighbours(node);
            for(int i=0;i<neighbours.size();i++){
                int neighbour = neighbours.get(i);
                int weight = weight(node,neighbour);
                if(neighbour != node){
                    cmatrix.add(newComm,community(neighbour),weight);
                    cmatrix.add(oldComm,community(neighbour),-weight);
                    if(community(neighbour) == newComm){
                        intDegrees[newComm] += weight;
                    }
                    if(community(neighbour) == oldComm){
                        intDegrees[oldComm] -=weight;
                    }
                }
            }
            int selfWeight = weight(node,node);
            cmatrix.add(newComm,newComm,selfWeight);
            cmatrix.add(oldComm,oldComm,-selfWeight);
            intDegrees[oldComm] -=selfWeight;
            intDegrees[newComm] +=selfWeight;

            if(totDegree(oldComm) ==  0 && oldTotDegree>0) numComms--;
            if(totDegree(newComm) >0 && oldNewToDegeree ==0) numComms++;
            if(totDegree(oldComm) <0) throw new Error("- ve total degeree");
        }

        // weight between a community and a node 尝试把节点node放入相邻社区并计算节点与原社区内度数（权重）
        public int dnodecomm(int node,int comm){
            rangeCheck(node);
            rangeCheck(comm);
            int dnodecomm =0;  //社区C节点的度
            TIntArrayList neighbours = neighbours(node);
            for(int i =0;i<neighbours.size();i++){
                int neigh=neighbours.get(i);
                if(community(neigh) == comm && node != neigh){  //如果节点node与它的邻居在一个社区，则社区权重加上与邻居的权重
                    dnodecomm += weight(node, neigh);
                }
            }
            return dnodecomm;
        }

        public double modularity(){  //模块度
            double q =0d;
            for(int comm=0;comm<order;comm++){
                double ctotIn = totDegreeIn(comm);
                double ctotOut = totDegreeOut(comm);
                double cint = intDegree(comm);
                q += (cint/m) - (ctotIn/m)*(ctotOut/m);
            }
            return q;
        }

        public int community(int node){
            rangeCheck(node);
            return communities[node];
        }
        public double totDegreeIn(int comm) {
            rangeCheck(comm);
            return totDegreesIn[comm];
        }
        public double totDegreeOut(int comm) {
            rangeCheck(comm);
            return totDegreesOut[comm];
        }
        private double totDegree(int comm){
            rangeCheck(comm);
            return totDegrees[comm];
        }
        public int intDegree(int node) {
            rangeCheck(node);
            return intDegrees[node];
        }
        public int outDegree(int node) {
            rangeCheck(node);
            return outDegrees[node];
        }

        public int weight(int n1, int n2) {
            rangeCheck(n1);
            rangeCheck(n2);
            return matrix.get(n1, n2);
        }
        private void rangeCheck(int index) {
            if (index >= order) {
                throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
            }
        }
        private String outOfBoundsMsg(int index) {
            return "Index: " + index + ", Graph order: " + order;
        }

        public int getNumComms() {
            return numComms;
        }

        public int[] getCommunities() {
            return communities;
        }


        public SparseIntMatrix.Iterator commWeightIterator() { return cmatrix.iterator(); }

    }

    public SparseIntMatrix getMatrix() {
        return matrix;
    }


    public int getLayer() {
        return layer;
    }

    public int inDegree(int node){
        rangeCheck(node);
        return inDegrees[node];
    }

    public double outDegree(int node){
        rangeCheck(node);
        return outDegrees[node];
    }

    public int getOrder() {
        return order;
    }

    public int getSize() {
        return size;
    }

    public int getM() {
        return m;
    }

    public TIntArrayList neighbours(int node) {
        rangeCheck(node);
        return adjList[node];
    }

    private void rangeCheck(int index) {
        if (index >= order) {
            throw new IndexOutOfBoundsException(outOfBoundsMsg(index));
        }
    }

    private String outOfBoundsMsg(int index) {
        return "Index: " + index + ", Graph order: " + order;
    }

    public Partitioning getPartitioning() {
        return partitioning;
    }

}
