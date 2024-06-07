/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */
import React, { useEffect } from 'react'
import G6 from '@antv/g6'

let count = 10000;
const nodes = []
// const num = (min = 0, max = 2000) => min + (((max - min) + 1) * Math.random())
while (count > 0){
    count -= 1;
    nodes.push({
        id: `n${count}`,
        label: `n${count}`,
        // x: num(),
        // y: num(),
    })
}


const graphData = { nodes };
function G6Demo(){
    const ref = React.createRef();
    useEffect(() => {
        const dom = ref.current;
        const [{ width }] = dom.getClientRects()
        const graph = new G6.Graph({
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
    })

    return (
        <div id="g6" ref={ref} />
    )
}

export default G6Demo;
