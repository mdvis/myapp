/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-28
 */
import React, { useEffect } from 'react'
import cytoscape from 'cytoscape'

let count = 10000;
const nodes = []
// const num = (min = 0, max = 2000) => min + (((max - min) + 1) * Math.random())
while (count > 0){
    count -= 1;
    nodes.push({
        id: `n${count}`,
        data: {
            label: `n${count}`,
        }
        // x: num(),
        // y: num(),
    })
}


function G6Demo(){
    const ref = React.createRef();
    useEffect(() => {
        const dom = ref.current;
        const graph = cytoscape({
            container: dom, // container to render in
            elements: nodes,
            style: [ // the stylesheet for the graph
                {
                    selector: 'node',
                    style: {
                        'background-color': '#666',
                        label: 'data(label)'
                    }
                },
            ],
        });
        window.graph = graph
    }, [])

    return (
        <div ref={ref} style={{ width: '1000px', height: '1000px' }} />
    )
}

export default G6Demo;
