/**
 * name: index.jsx
 * author: Deve
 * date: 2021-04-19
 */

/* eslint-disable */
import React, { useEffect } from 'react'
import vis from './vis'

let count = 500;
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
        // create a network
        const data = {
            nodes: new vis.DataSet(nodes),
        };
        const options = {};
        new vis.Network(dom, data, options);
    }, [])

    return (
        <div ref={ref} style={{ width: '1000px', height: '1000px' }} />
    )
}

export default G6Demo;
