package xjtu.service.clustring;
import gnu.trove.map.hash.TIntIntHashMap;
import xjtu.service.graph.DirectedGraph;

import java.util.ArrayList;
import java.util.List;

public class DLayerMapper {
    private final List<DirectedGraph> graphs=new ArrayList<DirectedGraph>();
    // maps between communities on L and nodes on L + 1:
    private final List<TIntIntHashMap> layerMaps=new ArrayList<>();
    private int layer=0;

    // map from community -> node on layer above
    protected TIntIntHashMap createLayerMap(DirectedGraph graph){
        int count = 0;
        layer++;
        boolean[] isFound = new boolean[graph.getOrder()];
        TIntIntHashMap map=new TIntIntHashMap();
        // Arrays.sort(communities);
        for(int node=0;node<graph.getOrder();node++){
            int comm = graph.getPartitioning().community(node);
            if(! isFound[comm]){
                map.put(comm,count);
                isFound[comm] = true;
                count++;
            }
        }
        if(map.size() != graph.getPartitioning().getNumComms()) throw new Error("Map creation failed:"+
                graph.getPartitioning().getNumComms()+"!="+map.size());
        layerMaps.add(map);
        graphs.add(graph);
        return map;
    }

    // uses the layer maps to assign a community from each layer to the base layer graph.
    protected List<int[]> run(){
        List<int[]> rawComms = new ArrayList<int[]>();
        List<int[]> communities = new ArrayList<int[]>();
        communities.add(graphs.get(0).getPartitioning().getCommunities());

        for(int i=0;i<layer;i++){
            rawComms.add(graphs.get(i).getPartitioning().getCommunities());
        }
        for(int i=0;i<layer-1;i++){
            communities.add(mapToBaseLayer(i,rawComms));
        }
        return communities;
    }

    // maps layers to each other until the specified layer has been mapped to the base layer
    private int[] mapToBaseLayer(int layer,List<int[]> rawComms){
        int[] a=mapToNextLayer(graphs.get(layer),layerMaps.get(layer),rawComms.get(layer+1));
        layer--;
        while (layer >=0){
            a=mapToNextLayer(graphs.get(layer),layerMaps.get(layer),a);
            layer--;
        }
        return a;
    }

    // maps each node in a layer to its community on the layer above it
    private int[] mapToNextLayer(DirectedGraph graph,TIntIntHashMap map,int[] commsL2){
        int[] commsL1=graph.getPartitioning().getCommunities();
        int[] NL1toCL2=new int[graph.getOrder()];

        for(int nodeL1=0;nodeL1<graph.getOrder();nodeL1++){
            int commL1=commsL1[nodeL1];
            int nodeL2=map.get(commL1);
            int commL2=commsL2[nodeL2];
            NL1toCL2[nodeL1] = commL2;
        }
        return NL1toCL2;
    }
}
