/**
 * name: app.js
 * author: Deve
 * date: 2021-08-10
 */

import React, {useState} from 'react';
import ReactDOM from 'react-dom'

export default function App(){
    const [a,b]=useState(0)
    const click=()=>{
        console.log(a,b)
        b(a+1)
    }
    return (<a onClick={click}>index{a}</a>)
}
