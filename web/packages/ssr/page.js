/**
* name: 模块功能
* author: Deve
* date: 2020-03-25
*/

'use strict'

navigator.serviceWorker.register('./sw.js')
  .then(res=>console.log(res,'res'))

setTimeout(function(){
fetch('./index.html')
}, 1000)


document.addEventListener('click', errorUpload, false )

function errorUpload() {
  let img = new Image();
  img.src='/errorUpload?aaa=aaa&bbb=bbb';
}

const ws = new WebSocket('ws://localhost:5000')
ws.onopen=function(data){
  console.log('open', data)
  ws.send('lao tie shuang ji 666')
}
ws.onmessage=function(data){
  document.querySelector('body').append(data.data)
}

window.onerror=function(...a){
  console.log('onerror', a)
}

window.addEventListener('error', function(e){console.log('error', e)}, false)
