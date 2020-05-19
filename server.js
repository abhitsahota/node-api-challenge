const express = require('express')
const cors = require('cors')

const projectRouter = require('./api/projectRouter')
const actionRouter = require('./api/actionRouter')

const server = express()

server.use(express.json())
server.use(logger)
server.use(cors())

server.use('/api/projects', projectRouter)
server.use('/api/projects/:id/actions', actionRouter)

server.get('/', (req, res) => {
    res.send('We are getting something')
} )

function logger(req, res, next) {
    console.log(`
      ${req.method} on ${req.url} ${new Date}
    `)
    next()
  }

module.exports = server