/* eslint-disable no-console */
const logger = require('./logger')
const app = require('./app')
const port = app.get('port')
// const server = app.listen(port);
const fs = require('fs')
const https = require('https')
const ssl = require('../config/production.json').ssl
const secure = require('express-force-https')
app.use(secure)

const server = https.createServer({
  key: fs.readFileSync(ssl.key),
  cert: fs.readFileSync(ssl.cert)
}, app).listen(port)

// Call app.setup to initialize all services and SocketIO
app.setup(server)

process.on('unhandledRejection', (reason, p) =>
  console.log(reason, p)
// logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info('Feathers application started on https://%s:%d', app.get('host'), port)
)
