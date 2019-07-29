package xjtu.service.clustring;


import gnu.trove.map.hash.TIntIntHashMap;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import xjtu.service.graph.DirectedGraph;
import xjtu.service.graph.DirectedGraphBuilder;
import xjtu.service.sparseMatrix.ArrayUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class DirectedLouvain implements Clusterer{

    private final static Logger LOG= LogManager.getLogger(DirectedLouvain.class);
    private int totalMoves=0;
    private int layer=0;// current community layer
    public final List<DirectedGraph> graphs=new ArrayList<DirectedGraph>();
    private final Maximiser m = new Maximiser();
    private final Random random;
    private final DLayerMapper layerMapper=new DLayerMapper();
    private List<int[]> communities;

    public List<int[]> getCommunities() {
        return communities;
    }

    private DirectedLouvain(){
        random=new Random();
    }

    public DirectedLouvain(DirectedGraph graph,long seed){
        this();
        graphs.add(graph);
        random.setSeed(seed);
        LOG.info("Using seed: "+seed);
    }

    public DirectedLouvain(DirectedGraph graph){
        this();
        graphs.add(graph);
        long seed = random.nextLong();
        random.setSeed(seed);
        LOG.info("Using seed:"+seed);
    }
    @Override
    public List<int[]> run() {
        return run(9999);
    }
    public List<int[]> run(int maxLayers){
        if(maxLayers <=0) return null;
        LOG.info("Detecting graph communitise...");
        do {
            LOG.info("Round:"+layer);
            totalMoves =m.run(graphs.get(layer));
            if(totalMoves > 0 && maxLayers >= layer) addNewLayer();

        }while (totalMoves >0 && maxLayers >=layer);
        communities = layerMapper.run();
        return communities;
    }

    public double modularity() { return graphs.get(layer).getPartitioning().modularity(); }

    private void addNewLayer(){
        DirectedGraph last = graphs.get(layer);
        TIntIntHashMap map = layerMapper.createLayerMap(last);
        layer++;
        DirectedGraph coarse = new DirectedGraphBuilder().coarseGrain(last,map);
        graphs.add(coarse);
    }

    class Maximiser{
        private final double precision = 0.000001;
        private DirectedGraph graph;
        private int[] shuffledNodes;

        private int run(DirectedGraph graph){
            this.graph=graph;
            shuffledNodes=new int[graph.getOrder()];
            ArrayUtils.fillRandomly(shuffledNodes);
            totalMoves=0;

            long s1=System.nanoTime();
            ressignCommunities();
            long e1 = System.nanoTime();
            double time = (e1-s1)/1000000000d;
            LOG.info("seconds taken:" +time);
            return totalMoves;
        }

        private void ressignCommunities(){
            double mod=graph.getPartitioning().modularity();
            double oldMod;
            int moves;
            boolean hasChanged;

            do {
                hasChanged=true;
                oldMod=mod;
                moves = maximiseLocalModularity();
                totalMoves += moves;
                mod = graph.getPartitioning().modularity();
                if(mod - oldMod <= precision) hasChanged = false;
                if(moves == 0) hasChanged = false;
            }while (hasChanged);
            LOG.info("Mod:"+mod+
                    " Comms: "+graph.getPartitioning().getNumComms()+
                    " Moves:"+totalMoves);
        }

        private int maximiseLocalModularity(){
            int moves=0;
            for(int i=0;i<graph.getOrder();i++){
                int node=shuffledNodes[i];
                if(makeBestMove(node)){
                    moves++;
                }
            }
            return moves;
        }
        private boolean makeBestMove(int node){
            double max=0d;
            int best=-1;

            for(int i=0;i<graph.neighbours(node).size();i++){
                int community = graph.getPartitioning().community(graph.neighbours(node).get(i));
                double inc=deltaModularity(node,community);
                if(inc > max){
                    max = inc;
                    best = community;
                }
            }

            if(best >= 0 && best != graph.getPartitioning().community(node)){
                graph.getPartitioning().moveToComm(node,best);
                return true;
            }else return false;
        }

        private double deltaModularity(int node,int community){
            double dnodecomm     = graph.getPartitioning().dnodecomm(node,community);
            double ctotIn        = graph.getPartitioning().totDegreeIn(community);
            double ctotOut       = graph.getPartitioning().totDegreeOut(community);
            double nodeDegreeIn  = graph.inDegree(node);
            double nodeDegreeOut = graph.outDegree(node);
            int m = graph.getM();
            return dnodecomm- (ctotIn*nodeDegreeOut+ctotOut*nodeDegreeIn)/m;
        }

    }

}
