/**
 * name: timeline/index.jsx
 * author: Deve
 * date: 2021-04-19
 */
import React, { useEffect, useState } from 'react'
import G6 from '@antv/g6'
import Timeline from '@WLH/timeline'
import Selection from '@WLH/graph-selection'

G6.Graph.prototype.selected = function (item){
    this.update(item, {
        style: {
            stroke: 'blue',
            lineWidth: 5,
        },
    })
}

let count = 20;
let count2 = 50;
let count3 = count-1;
const nodes = []
const edges = []
const num = (min = 0, max = 200) => min + (((max - min) + 1) * Math.random())
while (count > 0){
    count -= 1;
    nodes.push({
        id: `n${count}`,
        label: `n${count}`,
        x: num(),
        y: num(),
    })
}
while (count2 > 0){
    count2 -= 1;
    edges.push({
        date: `2021-05-${Math.floor(num(1,31))}`,
        target: `n${Math.floor(num(0,count3))}`,
        source: `n${Math.floor(num(0,count3))}`,
    })
}


const initdata = {
    nodes,
    edges,
};
let graph = null;
function Tmline(){
    const ref = React.createRef();
    const [graphData, setGraphData] = useState(initdata);
    useEffect(() => {
        const dom = ref.current;
        const [{ width }] = dom.getClientRects()
        graph = new G6.Graph({
            container: dom,
            width,
            height: 400,
            fitView: true,
            fitViewPadding: [20, 40, 50, 20],
            modes: {
                default: ['click-select', 'drag-canvas', 'zoom-canvas', 'drag-node'],
            },
            gpuEnabled: true,
        });
        graph.data(graphData);
        graph.render();
        window.graph = graph
    }, [graphData])
    window.addItem = (a) => { graphData.nodes.push(a); setGraphData({ ...graphData, nodes: graphData.nodes }) }

    function clickHandler(currentNodes){
        const allNodes = graph.getNodes()
        const list = allNodes.filter(item => currentNodes.includes(item.getModel().id))
        list.forEach(item => graph.selected(item))
    }

    function getSelectedNodes(inPath){
        const allNodes = graph.getNodes()
        const list = allNodes.filter(item => {
            const data = item.getModel()
            const g6Pos = graph.getCanvasByPoint(data.x, data.y)
            console.log(data.id, data.x, data.y, g6Pos)
            return inPath([g6Pos.x*2, g6Pos.y*2])
        })
        list.forEach(item => graph.selected(item))
    }

    return (
        <div>
            <Selection
                getSelectedNodes={getSelectedNodes }
            >
                <div ref={ref} />
            </Selection>
            <Timeline
                data={graphData}
                onClick={clickHandler}
            />
        </div>
    )
}

export default Tmline;
