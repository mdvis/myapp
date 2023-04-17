/**
* name: 模块功能
* author: Deve
* date: 2020-04-28
*/
const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const mysql = require('mysql');
const router = require('koa-router')();
router
  .get('/le', async (ctx)=>{
  })
  .get('', async (ctx)=>{
  })

const dbConf = require('./mysqlConf')

const pool = mysql.createPool(dbConf);
pool.getConnection(function(err, con){
con.query("select * from user", function(err, result,fields){
  con.release();
  console.log(err, result,fields)
})
})

const server = new Koa()
onerror(server)
server.use(bodyparser())
server.use(json())
server.use(logger())
server.use(json())
server.use(router.routes())
server.listen(9999)
