'use strict'

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({port:5000})

console.log('wss port 5000')

wss.on('connection', (ws)=>{
  setInterval(function(){
    ws.send('666')
  }, 1000)
  ws.on('message', (msg)=>{
    console.log(msg)
  })
})

