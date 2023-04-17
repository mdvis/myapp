/**
 * name: index.js
 * author: Deve
 * date: 2021-08-10
 */

import path from 'path';
import fs from 'fs';
import Koa from 'koa';
import React from 'react';
import Router from 'koa-router';
import st from 'koa-static';
import App from './app.cjs';
import koaStatic from 'koa-static';
import { renderToString } from 'react-dom/server'

const ser = new Koa();
const rou = new Router();

ser.use(koaStatic(path.join(__dirname)))
ser.use(st(__dirname));
//rou.get('/', async (ctx)=>{
    //ctx.response.body = `
    //<html>
      //<head>
      //<title>React SSR </title>
      //</head>
      //<body>
        //<div id="root">${renderToString(<App />)}<div>
      //</body>
      //<script src="./client.cjs"></script>
    //</html>
    //`;
//});
ser.use(rou.routes());
ser.listen(9000, function(){console.log(9000,'hehe')})
