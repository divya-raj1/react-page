import Graph from "react-graph-vis";
import React, { useEffect, useState } from "react";

const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    }
  };

export default function Network({ newDevice }) {
    
    const [network, setNetwork] = useState({
        nodes: [],
        edges: []
    })
    
    useEffect(() => {
        getNodes();
    },[]);

    const getNodes = () => {
        const graphObj = { nodes : [{ id: 1, label: "Internet", color: "#e04141" }], edges: []}
        var count = graphObj.nodes.length;
        newDevice.forEach(k => {
            var d1 = count+1;
            graphObj.nodes.push({
                id: d1,
                label: k.device[0]
            })
            graphObj.edges.push({
                from: 1,
                to: d1
            })
            count ++;
            if(k.number > 1) {
                var d2 = count+1;
                for(var i=1; i<=k.number; i++) {
                    graphObj.nodes.push({
                        id: d2,
                        label: i.toString()
                    })
                    graphObj.edges.push({
                        from: d1,
                        to: d2
                    })
                    count++;
                    d2++;
                }
            }
        })
        setNetwork(graphObj)
    }
    
    return (
    <div>
        <Graph graph={network} options={options}  style={{ height: "640px" }} />
    </div>
    )
}
