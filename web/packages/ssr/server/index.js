const http = require('http');
const path = require('path');
const mime = require('mime');
const jwt = require('jsonwebtoken');

// const js2json = require('./js2json');
// const test = require('../src/test.json');

const methodMap = require('./methodMap');

/* eslint-disable */
const token = jwt.sign({
  value:4
},'a')
/* eslint-enable */

function getFileName(reqUrl) {
  const URLObj = path.parse(reqUrl);
  const { base } = URLObj;
  if (base) {
    return base;
  }
  return '/';
}

module.exports=function(port){
http.createServer((req, res) => {
  const {
    method,
    url: reqUrl,
    headers,
    headers: { host },
  } = req;
  console.log(headers);
  const fn = methodMap[method];
  res.setHeader('Set-Cookie', [
    'laotie=ai;httponly;samesite=lax',
    'wtf=hehe',
    'ai=hehe;httponly',
    'qie=3;samesite=lax',
    'jiujiu=3;secure;samesite=none',
    'baba=3;samesite=none',
  ]);
    res.setHeader('Access-Control-Allow-Origin','*')
  res.writeHead(200, { 'Content-Type': `${mime.getType(reqUrl)};charset=utf-8` });
  // res.writeHead(301, {'location': 'http://www.baidu.com'});

  fn(getFileName(reqUrl, host))
    .then((result) => {
      res.end(result);
    // res.end(js2json()(res))
    });
})
  .listen(port, '127.0.0.1');

console.log(`server running. port ${port}`);
}
