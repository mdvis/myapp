const jsonServer = require('json-server')
const db = require('./db')

const server = jsonServer.create()
const data = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const routes = require('./routes')

server.use(jsonServer.rewriter(routes))
server.use(middlewares)
server.use(data)
server.use(jsonServer.bodyParser)
server.listen(3333, () => {
    console.log('json server 3333')
})
